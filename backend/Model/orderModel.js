

const mongoose = require('mongoose');



const ordersSchema= new mongoose.Schema({

   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
   },
   product:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Product",
    required:true,
    
    
   },
   
    details:[{
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        discount:{
            type:Number,
        },
        offer:{
            type:String,
        },
        image:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
    }],
   
    total:{
        type:Number,
        required:true
    },
    paymentID:{
        type:String,
        required:true
    },
    coupon:{
        type:String,
        
    },
   orderStatus:{
    type:String,
    enum:["order placed","preparing order", "order shipped", 
        "order delivered", "order cancelled"],
    default:""

   },
   address:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address",
    required:true
   }
    
},
{
    timestamps:true
}  
 )


const ordersModel = mongoose.model("orders",ordersSchema)
module.exports = ordersModel  
