const express = require('express')
const Router = express.Router()
const ordercontroller = require('../controllers/orderController')
const auth = require('../Middleware/auth')

Router.post("/addorder",auth,ordercontroller.placeOrder)

module.exports = Router
