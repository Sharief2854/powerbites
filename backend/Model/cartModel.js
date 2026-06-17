

const mongoose = require('mongoose');



const cartSchema= new mongoose.Schema({

   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
   },
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
   },
    quantity:{
        type:Number,
        required:true
    }
  
    
},
{
    timestamps:true
}  
 )


const cartModel = mongoose.model("cart",cartSchema)
module.exports = cartModel  
