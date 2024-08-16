

// call the for this point 

const auth_mw = require("../middleware/auth.mw")

const category_Controller = require("../controllers/category.controller")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken,auth_mw.admin],category_Controller.createNewCategory)
}