/**
 * This will be the starting file of  the project 
 */

const express = require("express");
const mongoose = require("mongoose")
const server_config = require("./configs/server.config")
const app = express();
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs") // use to encript the password 

app.use(express.json()) // middleware -> convert the json to the javascript 


/**
 * Create an admin user at the starting the application 
 * if not already present 
 */


// COnnection with mongodb 

mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on("error",()=>{
    console.log("error while connecting databases ");
})

db.once("open",()=>{
    console.log("databases connect successfully")
    init();
})


async function init(){
    let user = await user_model.findOne({userId: "admin"})

    if(user){
        console.log("admin is already present ")
        return;
    }
    try{

        user = await user_model.create({
            name : "jitendra",
            userId : "admin",
            email : "jraj41797@gmail.com",
            userType : "ADMIN",
            passWord : bcrypt.hashSync("welcome@1")
        })
        console.log("admin created user by object ",user)

    }catch(err){
        console.log(err);
    }
}

/**
 * stich the route server 
 */
require("./routes/auth.route")(app)
require("./routes/category.route")(app)


/**
 * start the server 
 */

app.listen(server_config.PORT, ()=>{
    console.log("server started at port nummber :",server_config.PORT)
});



