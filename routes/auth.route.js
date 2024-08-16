// POST localhost:8888/ecomm/api/v1/auth/signup

/**
 * i need to intercept this 
 */

const authController = require("../controllers/auth.controller")

const auth_mw = require("../middleware/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[auth_mw.verifySignUpBody],authController.signup)


    // sign in router 
    // POST localhost:8888/ecomm/api/v1/auth/signup
    app.post("/ecomm/api/v1/auth/signin",[auth_mw.verifySignInBody],authController.signin)
}