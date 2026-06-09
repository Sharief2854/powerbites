const express = require("express");
const mongoose=require("mongoose")
 

let ResetSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    user:{
        user:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    
    }
    
},{timestamps:true}
)
let ResetModel=mongoose.model("Reset",ResetSchema)

module.exports=ResetModel