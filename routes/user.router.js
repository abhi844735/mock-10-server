const express=require("express");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const ejs=require("ejs");
const bcrypt=require("bcrypt");
const { Usermodel } = require("../models/user.model");
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
const userRoute=express.Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.email, // replace with your email address
      pass: process.env.password // replace with your email password
    }
  });

userRoute.post("/register",async(req,res)=>{
    try {
        let {username,email,password}=req.body;
        bcrypt.hash(password,5,async(err,secure_pass)=>{
            if(err){
                res.send({message:err.message})
            }else{
                let user=await new Usermodel({username,email,password:secure_pass});
                await user.save()
            }
            res.send({message:"registration successfully"})
        })
    
      
    } catch (error) {
        res.send({message:error.message})
    }
})
userRoute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let data = await Usermodel.find({email});
        if(data.length>0){
            let id=data[0]._id;
            // console.log(data)
            let user=await Usermodel.findById(id);
            let secure_pass=user.password
            // console.log(user)
            bcrypt.compare(password,secure_pass,(err,result)=>{
                if(err){
                    res.send({message:err.message})
                }
                else{
                    if(result){
                        let token=jwt.sign({userId:id},process.env.key);
                        res.send({message:"login successfully",token})
                    }else{
                        res.send({message:"wrong credentails"});
                    }
                }
            })
        }else{
            res.send({message:"email not found"})
        }
    } catch (error) {
        res.send({message:error.message})
    }
})
module.exports={userRoute}