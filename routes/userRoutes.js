const userRoute = require('../controllers/userController')
const express = require('express');
const Router = express.Router()

Router.post("/createuser",userRoute.createUser);
Router.post("/login",userRoute.login);
Router.get("/getUser",userRoute.getAllUsers);
Router.put("/updateuser/:id",userRoute.updateUser);
Router.delete("/deleteuser",userRoute.deleteuser);

module.exports = Router;