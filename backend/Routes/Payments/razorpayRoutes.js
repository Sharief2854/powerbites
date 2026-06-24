const express = require("express");
const { verifyPayment, createOrder } = require("../../Controllers/RazorPay/razorpayController");
const isCustomer = require("../../MiddleWare/customerAuth");

const router = express.Router();

router.post("/create-order", isCustomer,createOrder);

router.post("/verify-payment",isCustomer, verifyPayment);

module.exports = router;