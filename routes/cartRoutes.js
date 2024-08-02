const express = require('express')
const Router = express.Router()
const cartController = require("../controllers/cartController")
const auth = require('../Middleware/auth')

Router.post("/addtocart",auth,cartController.AddToCart);
Router.get("/getcart",auth,cartController.getCartProducts);
Router.delete("/deletecartproduct",auth,cartController.deleteCartProduct);

module.exports = Router