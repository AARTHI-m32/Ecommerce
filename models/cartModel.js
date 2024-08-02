const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id : {
        type : String,
       required : true
    },
    products : [{
        productid : {
            type : String
        },
        quantity : {
            type : Number
        }
    },],
})

const Cart = mongoose.model("carts" , cartSchema)
module.exports = Cart