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

const verifyPayment = async (req, res) => {

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

        let cart = await cartModel.find({ customer: req.userId });

        await Promise.all(cart.map(async (item) => {
            let productData = await ProductModel.findById(item.product);
            if (productData) {
                productData.stock -= item.quantity;
                await productData.save();
            }
        }));

        const orderDetails = await Promise.all(cart.map(async (item) => {
            const prod = await ProductModel.findById(item.product);
            return {
                name: prod.name,
                price: prod.price,
                discount: prod.discount,
                offer: prod.offer,
                image: prod.image[0],
                quantity: item.quantity
            };
        }));

        const orderData = {
            customer: req.userId,
            product: cart.map(item => item.product),
            details: orderDetails,
            total: req.body.amount,
            paymentID: razorpay_payment_id,
            coupon: req.body.coupon || "",
            orderStatus: "order placed",
            address: req.body.addressId
        };

        await ordersModel.create(orderData);
        await cartModel.deleteMany({ customer: req.userId });
        

        let order = await ordersModel.create({})

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