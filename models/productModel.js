const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    id:{
        type:String,
        unique: true,
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
    },
    image:{
        type:String,
        required: true,
    },
    rating:{
        rate:{
            type:String,
        },
        count:{
            type:Number,
        },
    }
});

const Product = mongoose.model('products' , productSchema);
module.exports = Product;