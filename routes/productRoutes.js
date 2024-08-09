const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productController')
const auth = require('../Middleware/auth')

Router.get("/products", productController.getAllProducts);
Router.post("/createproducts" , auth , productController.createProduct);
Router.put("/updateuser", auth , productController.updateproduct)
Router.delete("/deleteproducts" , auth , productController.deleteProduct);

module.exports=Router;