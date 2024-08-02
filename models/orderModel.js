const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
     },
    phoneno : {
        type : String,
        required : true
    } ,
    address : {
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
    totalamount : {
        type : Number,
    },
    ordereddate : {
        type : Date,
        default : Date.now
    },
    estimateddate : {
        type : Date,
    },

})

const Order = mongoose.model("orders" , orderSchema)
module.exports = Order