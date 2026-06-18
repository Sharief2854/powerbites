

const mongoose = require('mongoose');



const ordersSchema= new mongoose.Schema({

   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
   },
  
   
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        discount:{
            type:Number,
        },
        discounted_price:{
            type:Number,
            required:true
        },
        offer:{
            type:String,
            required:true
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"cuopon"
        
    },
    final_price:{
        type:Number,
        required:true
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
