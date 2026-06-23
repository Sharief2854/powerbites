const crypto = require("crypto");
const razorpay = require("../../config/razorpayConfig");
const cartModel = require("../../Model/cartModel");
const ordersModel = require("../../Model/orderModel");
const ProductModel = require("../../Model/ProductModel");

const createOrder = async (req, res) => {
    try {
        const amount = Number(req.body.amount || req.body.final_price || 0);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        const options = {
            amount: amount * 100,
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
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            coupon_id,
            addressId,
        } = req.body;

        const finalPrice = Number(req.body.final_price ?? req.body.amount ?? 0);

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !addressId ||
            !finalPrice
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment details",
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid Signature",
            });
        }

        const cart = await cartModel.find({ customer: req.userId }).populate("product");

        if (!cart || cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        const orderDetails = [];

        for (const item of cart) {
            const productData = item.product;

            if (!productData || !productData._id) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product in cart",
                });
            }

            const product = await ProductModel.findById(productData._id);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product in cart",
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            product.stock -= item.quantity;
            await product.save();

            const discountedPrice =
                product.discount > 0
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;

            orderDetails.push({
                product: product._id,
                price: product.price,
                discount: product.discount || 0,
                discounted_price: discountedPrice,
                offer: null,
                image: product.image?.[0] || "",
                quantity: item.quantity,
            });
        }

        if (orderDetails.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid products found for checkout",
            });
        }

        const orderData = {
            customer: req.userId,
            products: orderDetails,
            total: finalPrice,
            paymentID: razorpay_payment_id,
            coupon: coupon_id || null,
            final_price: finalPrice,
            orderStatus: "order placed",
            address: addressId,
        };

        const createdOrder = await ordersModel.create(orderData);
        await cartModel.deleteMany({ customer: req.userId });

        return res.json({
            success: true,
            message: "Payment Verified",
            order: createdOrder,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { createOrder, verifyPayment };