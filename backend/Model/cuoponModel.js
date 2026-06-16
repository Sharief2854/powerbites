

const mongoose = require('mongoose');



const cuoponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    min_order_value: {
        type: Number,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        
    },
    discount: {
        type: String,
        required: true
    },
    max_discount: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        default:"inActive",
        enum:["Active","inActive"]
    },
    starts_At:{
        type:Date,
        required:true
    },
    ends_At:{
        type:Date,
        required:true
    },
    


},
    {
        timestamps: true
    }
)


const cuoponModel = mongoose.model("cuopon", cuoponSchema)
module.exports = cuoponModel  
