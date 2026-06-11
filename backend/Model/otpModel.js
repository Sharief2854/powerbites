const mongoose = require('mongoose');



const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "5m" 
    }
})

const otpModel = mongoose.model("otp", otpSchema)
module.exports = otpModel