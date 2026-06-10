const express = require("express")
const mongoose = require("mongoose") 

async function connectDB(){
   try{
    await mongoose.connect(process.env.ATLAS)
       console.log("database connected");
   }
   catch(err){
       console.log("database error",err);
   }
}
module.exports = connectDB