const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const AddToCart = async (req, res) => {

    const userid = req.user;
    
    try {
        const userfound = await Cart.findOne({ user_id: userid })
        console.log(!userfound)
        if (userfound) {
            const index = await userfound.products.findIndex( products => products.productid === req.body.products.productid)
            console.log(index)
            if(index!=-1){
                userfound.products[index].quantity = req.body.products.quantity
             //   console.log(userfound.products[index].quantity)
                await userfound.save();
                return res.status(200).json({
                    message: "quantity updated successfullly",
                
            })
        }
            else{
        const updatecart = await Cart.findOneAndUpdate({ user_id: userid }, 
            {
                $push: {
                    products: req.body.products
                }
            },
            { new: true }
        )
    
        return res.status(200).json({
            message: "updated successfullly",
            updated: updatecart
        })
        }
    } 
    
    
    else{   

        const createcart = await Cart.create({
            user_id: userid,
            products: req.body.products
        })
        return res.status(200).json({
            message: " cart created successfullly",
            updated: createcart
        })
}}catch (error) {
    res.status(500).json({
        "status" : "failure",
        "error" : error.message,
    })
    }
}

const getCartProducts = async (req,res) => {
    const userid = req.user;
    try{
        const user = await Cart.findOne({user_id : userid})

        if(!user){
            res.status(401).json({
            message : "user not found"
            })
        }
       
        let products = [];
        let totalAmount = 0
        for(let i=0;i<user.products.length;i++){
            const  cart = user.products[i];
            const product = await Product.findOne({ id : cart.productid})
            if(product){
                const total = cart.quantity * product.price
                products.push({
                    title: product.title,
                    image: product.image,
                    description:product.description,
                    price: product.price,
                    quantity: cart.quantity,
                    subtotal : total
                })
                totalAmount += total
            }
        }
        let carts = {products,totalAmount}
        res.status(200).json({
            message : "Cart Products found",
            product : carts
            })
           
    }catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}

const deleteCartProduct = async (req,res) => {
    const userid = req.user;
    const productid = req.body.productid
    try{
        const user = await Cart.findOne({user_id : userid})
        if(!user){
            res.status(401).json("User not found")
        }
        const length = user.products.length
        if(user.products.length<=1){ //if the cart has only one element then the user will be deleted
            if(user.products[0].productid ==productid){  //if the given product exists then delete
        const deleteUser = await Cart.deleteOne({user_id : userid })
         res.status(200).json("Cart totally deleted")}
         else{
            res.status(400).json("Product not found ")
         }
       } 
       
        else{
            const newC = user.products.filter( (e) => { //to filter products that does not match with the product that has to be deleted 
                    return e.productid !== productid //stored as a new array
            })
            user.products=newC
            await user.save()
            if(length != newC.length){
            res.status(200).json({
                message : "Product deleted from cart",
                deleted : user
            })
        }
        else{
            res.status(200).json({
                message : "No such Product in cart",
            })
        }
      }
}

    catch(error){
        res.status(500).json({
            "message":"failure",
            "error" : error.message
        })
    }
}
module.exports = { AddToCart,getCartProducts,deleteCartProduct }