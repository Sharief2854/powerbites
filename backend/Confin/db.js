const express = require("express")
const mongoose = require("mongoose") 

async function connectDB(){
   try{
    await mongoose.connect(process.env.DATA_BASE_URL)
       console.log("database connected");
   }
   catch(err){
       console.log("database error",err);
   }
}
module.exports = connectDB