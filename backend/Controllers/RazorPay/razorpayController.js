const crypto = require("crypto");
const razorpay = require("../../config/razorpayConfig");



const createOrder = async (req, res) => {
    try {

        const options = {
            amount: req.body.amount * 100, // ₹500 -> 50000 paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const verifyPayment = (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");

    if (generatedSignature === razorpay_signature) {

        return res.json({
            success: true,
            message: "Payment Verified",
        });

    }

    return res.status(400).json({
        success: false,
        message: "Invalid Signature",
    });
};

module.exports = {createOrder,verifyPayment}