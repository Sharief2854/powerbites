

const mongoose = require('mongoose');



const cartSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
   },
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Products",
    required:true
   },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
},
{
    timestamps:true
}  
 )


const cartModel = mongoose.model("cart",cartSchema)
module.exports = cartModel  
