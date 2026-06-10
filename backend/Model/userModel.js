const express = require('express');
const mongoose = require('mongoose');



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    
    },
    role:{
        type:String,
        default:"customer",
        enum:["customer","admin"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
     createdAt: {
        type: Date,
        default: Date.now,
        expires: "10d" 
    }

},
{
    timestamps:true
}  
 )


const userModel = mongoose.model("users",userSchema)
module.exports = userModel  
