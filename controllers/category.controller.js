

/**
 * Controller for creating the category
 *  
 */

const category_model = require("../models/category.model")

exports.createNewCategory  = async (req,res)=>{
    // read the body 

    const req_body = req.body;



    // create the category body 

    const cat_data = {
        name : req_body.name,
        description : req_body.description
    }

    // insert into mongo db 

    try{
        const category = await category_model.create(cat_data);
        return res.status(201).send(category)

    }catch(err){
        console.log("error while creating the category")
        return res.status(500).send({
            message : "error while creating the category"
        })
    }
    // return the response of the created category 

}