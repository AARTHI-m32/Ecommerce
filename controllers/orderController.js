const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const { v4: uuidv4 } = require('uuid');

const placeOrder = async(req,res) => {
    const userid = req.user
    var totalamount=0
    try{
        const cart = await Cart.findOne({user_id:userid})
        
        if(cart){
        
        for(let i=0;i<products.length;i++){
            const pro = await Product.findOne({id:products[i].productid})
            totalamount += (pro.price * products[i].quantity)
        }
        
        const orderedDate = new Date();
        const estimatedDate = new Date(orderedDate.getTime() + 10 * 24 * 60 * 60 * 1000);
        //estimatedate = new Date(orderedDate.setDate(orderedDate.getDate()+10))

    const order = await Order.create({
        orderid : uuidv4(),
        user_id:userid,
        name : req.body.name,
        phoneno : req.body.phoneno,
        address : req.body.address,
        products : cart.products,
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

const getOrder = async(req,res) => {
       const userid = req.user;
try{
       const order = await Order.find({user_id:userid})
 //    console.log(order)
       
       if(order){
        var result =[]
        for(let j=0;j<order.length;j++){ 
       
            var productlist = []       
        for(let i=0;i<order[j].products.length;i++){
        const product = await Product.findOne({id : order[j].products[i].productid})
        productlist.push({
            title : product.title,
            description : product.description,
            image : product.image,
            price : product.price,
            quantity : order[j].products[i].quantity          
        })
    }
       
        
         result.push ({
            productDetail : productlist,
            total : order[j].totalamount,
            orderdate : order[j].ordereddate,
            estimatedate : order[j].estimateddate
        })
    }
        res.status(200).json({
            message : "fetched",
            OrderDetails : result
        }
        )
       }

       else(
        res.status(200).json("No orders found")
       )
    }
    catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}

module.exports = { placeOrder , getOrder }