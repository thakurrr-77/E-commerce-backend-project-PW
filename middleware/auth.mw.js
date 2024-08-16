/**
 * 
 */

const { secret } = require("../configs/auth.config")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const security = require("../configs/auth.config")


const verifySignUpBody = async (req,res,next)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                message : "name was not provided please enter your name"
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                message : "email was not provided please enter your email"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message : "passWord was not provided please enter your password"
            })
        }
        if(!req.body.userId){
            return res.status(400).send({
                message : "userId was not provided please enter your userId "
            })
        }

        // check if user is the same user id is already present then 
        const user = await user_model.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "userID is already  present "
            })
        }

        next();

    }
    catch(err){
        console.log("Error while validating the request object ",err);
        res.status(500).send({
            message : "Error while validating the request body  "
        })
    }
}



const verifySignInBody = async (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "please enter your user id"
        })
    }
    if(!req.body.passWord){
        return res.status(401).send({
            message : "please enter your password "
        })
    }
    
    next()
}


const verifyToken = (req,res,next)=>{
    // check if the token is present in the header 

    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : "no token found"
        })
    }

    // check if the valid token 

    jwt.verify(token,security.secret,async (err,decode)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized !"
            })
        }
        const user = await user_model.findOne({userId : decode.id})

        if(!user){
            return res.status(400).send({
                message : "UnAthorized !,   this user for this token doesnot exist "
            })
        }
        req.user = user
        next()
    })

    // then move to the next 
}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType=="ADMIN"){
        next()
    }
    else{
        return res.status(403).send({
            message : "only admin have access to modyfy the data"
        })
    }

}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    admin : isAdmin

}