const express = require("express");
const { verifyPayment, createOrder } = require("../../Controllers/RazorPay/razorpayController");

const router = express.Router();

router.post("/create-order", createOrder);

router.post("/verify-payment", verifyPayment);

module.exports = router;