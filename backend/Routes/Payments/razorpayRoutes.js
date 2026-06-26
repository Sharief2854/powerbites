const express = require("express");
const { verifyPayment, createOrder, refundPayment } = require("../../Controllers/RazorPay/razorpayController");
const isCustomer = require("../../MiddleWare/customerAuth");
const isAdmin = require("../../MiddleWare/adminAuth"); // Assuming you have this middleware

const router = express.Router();

router.post("/create-order", isCustomer,createOrder);

router.post("/verify-payment",isCustomer, verifyPayment);

// Route for processing refunds, accessible only by admins
router.post("/refund", isAdmin, refundPayment);

module.exports = router;