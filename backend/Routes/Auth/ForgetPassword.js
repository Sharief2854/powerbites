const express = require("express");
const mongoose = require("mongoose");
const { transporter } = require("../../Config/MailConfig");
const ResetModel = require("../../Model/ResetModel");
const { VerifyOtp, forgotPassword, resetPassword } = require("../../Controller/resetController");
const router = express.Router();
const userModel = require("../../Model/userModel");

//forgot Password
router.post("/forgetpassword/:id",forgotPassword);

//verifying otp
router.post("/VerifyOtp/:id",VerifyOtp);

//reset password
router.post("/resetpassword/:id", resetPassword)






module.exports = router;