const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose');

const productroutes = require('./routes/productRoutes');
const userroutes = require('./routes/userRoutes')
const cartroutes =require('./routes/cartRoutes')
const orderroutes =require('./routes/orderRoutes')

mongoose.
connect('mongodb+srv://aarthi32:Aarthi32@cluster0.grrieqs.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0')
.then(() => { 
    console.log('Mongodb connected');
});

app.set('view engine','ejs');

app.use('/', productroutes);
app.use('/user', userroutes);
app.use('/cart',cartroutes);
app.use('/order',orderroutes)

app.listen(3001 , ()=> {
    console.log("Server is running on port 3000");
});

//https://ecommerceamern.onrender.com