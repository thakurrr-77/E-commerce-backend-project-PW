/**
 * i need to write the controller / logic to register and sign for user 
 */

const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const JWT  = require("jsonwebtoken")
const security = require("../configs/auth.config")

exports.signup = async(req,res)=>{
    /**
     * Logic to create the user 
     */

    // 1. Read the request body 

    const request_body = req.body

    // 2. insert the data in collection of mongodb 
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        passWord : bcrypt.hashSync(request_body.password,8)
    }

    try{

        const user_created = await user_model.create(userObj)

        const res_obj = {
            name : user_created.name,
            email : user_created.email,
            userId : user_created.userId,
            userType : user_created.userType,
            updateAt : user_created.updatedAt

        }

        res.status(201).send(res_obj);

    }catch(err){

        console.log("error ", err)
        res.status(500).send({
            message : "some error happend registering the user "
        })
    }
    // 3. return the response back to the user
}

    // for login controller 

    exports.signin = async (req,res)=>{

        // 1. if the user id present int the databases 

        const user = await user_model.findOne({userId : req.body.userId})

        if(user==null){
            return res.status(400).send({
                message : "user id is not a valid "
            })
        }


        // 2. password is match the user id 

        const isValidPassword = bcrypt.compareSync(req.body.passWord,user.passWord);

        if(!isValidPassword){
            return res.status(401).send({
                message : "wrong password please enter valid password "
            })
        }

        // 3. using jwt we will create the access token with a given TTL and return 

        const token = JWT.sign({id : user.userId},security.secret,{
            expiresIn : 120 
        })

        res.status(201).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accessToken : token
        })


    }