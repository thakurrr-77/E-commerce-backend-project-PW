const mongoose  = require("mongoose")


/**
 * name 
 * user id 
 * password
 * email
 * usertype
 */

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    passWord : {
        type : String,
        required : true,
        minLength : 8
    },
    email : {
        type : String,
        required : true,
        minLength : 15,
        unique : true
    },
    userType : {
        type : String,
        default : "CUSTUMER",
        enum : ["CUSTUMER","ADMIN"] // fixed value 
    }
},{versionKey: false, timestamps: true});

module.exports = mongoose.model("User",userSchema);
 