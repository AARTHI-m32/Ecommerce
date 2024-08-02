const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const placeOrder = async(req,res) => {
    const userid = req.user
    var totalamount=0
    try{
        const cart = await Cart.findOne({user_id:userid})
        
        if(cart){
            const products = cart.products.map(product => ({
                productid: product.productid,
                quantity: product.quantity
            }))

        for(let i=0;i<products.length;i++){
            const pro = await Product.findOne({id:products[i].productid})
            totalamount += (pro.price * products[i].quantity)
        }
        
        const orderedDate = new Date();
        const estimatedDate = new Date(orderedDate.getTime() + 10 * 24 * 60 * 60 * 1000);
        //estimatedate = new Date(orderedDate.setDate(orderedDate.getDate()+10))

    const order = await Order.create({
        user_id:userid,
        name : req.body.name,
        phoneno : req.body.phoneno,
        address : req.body.address,
        products : products,
        ordereddate : orderedDate,
        estimateddate : estimatedDate,
        totalamount : totalamount
    })
    const deletecart = await Cart.findOneAndDelete({user_id:userid})
    res.status(200).json({
        message : "Order placed successfully",
        deleted : deletecart
    })
}
else{
    res.status(200).json("No items selected to place order")
}
    }
    catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports = { placeOrder }