const Product = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const getAllProducts = async (req,res) => {

 //   console.log(req.user)

    try{
       const products = await Product.find();
       res.send(products);
    }
    catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
};

const createProduct = async (req,res) => {
    try{
        const newproduct = await Product.create({
             id:uuidv4(),
             title:req.body.title,
             category:req.body.category,
             description:req.body.description,
             price:req.body.price,
             image:req.body.image,
             rating:req.body.rating

        })
        res.status(200).json(
            {
                status: 'success',
                message: 'Product created successfully',
                product: newproduct
            }
        );
    }catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}

const updateproduct = async(req,res) => {
    try{
        const id=req.query.id;
        const updatedproduct = await Product.findOneAndUpdate({id:id},
           { $set : {
                 title:req.body.title,
                 category:req.body.category,
                 description:req.body.description,
                 price:req.body.price,
                 image:req.body.image,
                 rating:req.body.rating
            }},
            { new: true }
        );
        if(updatedproduct){
            res.status(200).json({
                status: 'success',
                message: 'Product updated successfully',
                product: updatedproduct
            })
        }
        else{
            res.status(404).json({
                "status" : "failure",
                "message" : "Updation failed",
            
            })
        }

    }
    catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}

const deleteProduct = async(req,res) => {
    try{
    const id=req.query.id;
    const delproduct = await Product.findOneAndDelete({id:id});
    if(delproduct){
    res.status(200).json({
          status : "success",
          message:"Product deleted successfully",
          deleted: delproduct,});}
    else{
        res.status(404).json({
            "status" : "failure",
            "message" : "Deletion failed",           
        })
    }
}
catch(error){
    res.status(500).json({
        "status" : "failure",
        "error" : error.message,
    })
}

}

module.exports ={ getAllProducts,createProduct,updateproduct,deleteProduct};