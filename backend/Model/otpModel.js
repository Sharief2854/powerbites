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

const otpModel = mongoose.model("otp", otpSchema)
module.exports = otpModel