const User = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const createUser = async(req,res) => {
    try{
    const newUser = await User.create({ 
           id:uuidv4(),     //to generate random id  
           username:req.body.username,
           email:req.body.email,
           password:req.body.password,
    })
    if(newUser){
    res.status(200).json({
        "status" : "success",
        "message" : "User created successfully",
        User : newUser,
    }
    )}
}
catch(error){
    res.status(500).json({
        "status" : "failure",
        "error" : error.message,
    })
}
}

const login = async(req,res) => {
   
       const {email,password} = req.body;
       const user = await User.findOne({email});

       try{
         if(!user) {
            return res.status(404).json({
                message : "User not found"
            })
         }
         const isvalidpassword = await bcrypt.compare(password , user.password);
         if(!isvalidpassword){
            return res.status(404).json({
                message: "Invalid Password",
            })
         }
         const token = jwt.sign({userId : user.id} , "secret_key" , {    //to generate token
            expiresIn : '1h'
         })
         res.json({token})
       }
    
    catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}

const updateUser = async (req,res) => {
    try{
        const id=req.params.id;
        const updateduser = await User.findOneAndUpdate({id:id},
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                }
            }
        )
        if(updateduser){
            res.status(200).json({
                "status" : "success",
                "message" : "Updated successfully",
                UpdatedDetails : updateduser
            })
        }
        else{
            res.status(404).json({
                "status" : "failure",
                "message" : "Updation failed",
                
            })
        }
    }
    catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}
const deleteuser = async(req,res) => {   
    try{
       const id = req.query.id;
       const deleteduser = await User.deleteOne({id:id})
       if(deleteduser){
        res.status(200).json({
            "status" : "success",
            "message" : "user deleted successfully",
            DeletedUser : deleteduser,
        })
       }
       else{
        res.json("User not found");
       }
    }
    catch(error){
        res.status(500).json({
            "status" : "failure",
            "error" : error.message,
        })
    }
}

const getAllUsers = async(req,res) => {
    try{
    const users = await User.find();
    res.send(users);
}
catch(error){
    console.error(error);
}}


module.exports = {createUser,getAllUsers,login,updateUser,deleteuser}