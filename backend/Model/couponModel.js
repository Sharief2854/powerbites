

const mongoose = require('mongoose');



const couponSchema = new mongoose.Schema({
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
        default: 0
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
        type: Number,
        required: true
    },
    max_discount: {
        type: Number,
        validate: {
            validator: function(value) {
                if (value == null) return true; // Valid if no max_discount is provided
                // Retrieve discount during document save OR query update
                const discountVal = this.discount || (this.get && this.get('discount'));
                return !!discountVal && discountVal !== "0" && discountVal !== "";
            },
            message: "Max discount can only be applied when there is a valid discount."
        }
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


const couponModel = mongoose.model("coupon", couponSchema)
module.exports = couponModel  
