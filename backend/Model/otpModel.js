const express = require('express');
const mongoose = require('mongoose');



const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

})

const userModel = mongoose.model("otp", userSchema)
module.exports = userModel