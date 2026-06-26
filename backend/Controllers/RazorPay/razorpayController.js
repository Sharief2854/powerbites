const crypto = require("crypto");
const razorpay = require("../../config/razorpayConfig");
const RefundModel = require("../../Model/refundModel");
const cartModel = require("../../Model/cartModel");
const ordersModel = require("../../Model/orderModel");
const ProductModel = require("../../Model/ProductModel");
const couponModel = require("../../Model/couponModel");
const dealsModel = require("../../Model/dealsModel");
const addressModel = require("../../Model/addressModel");

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

        // Enforce unified coupon logic for multi-item carts
        let appliedCouponId = null;
        if (cart.length > 1) {
            // For multi-item carts, use unified coupon only
            if (cart[0].isUnified && cart[0].unifiedCoupon) {
                appliedCouponId = cart[0].unifiedCoupon;
            } else if (coupon_id) {
                // Validate that the coupon is part of a deal
                const deal = await dealsModel.findOne({ coupon: coupon_id });
                if (!deal) {
                    return res.status(400).json({
                        success: false,
                        message: "For multiple items in cart, coupon must be part of a deal",
                    });
                }
                appliedCouponId = coupon_id;
            }
        } else {
            // Single-item cart: use provided coupon or cart's coupon
            appliedCouponId = coupon_id || (cart[0].coupon ? cart[0].coupon : null);
        }

        // Validate coupon if provided
        if (appliedCouponId) {
            const coupon = await couponModel.findById(appliedCouponId);
            if (!coupon) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon not found",
                });
            }
            if (coupon.status !== "Active") {
                return res.status(400).json({
                    success: false,
                    message: "Coupon is not active",
                });
            }
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
                name: product.name,
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

        const addressDoc = await addressModel.findOne({ _id: addressId, userId: req.userId });
        if (!addressDoc) {
            return res.status(400).json({
                success: false,
                message: "Address not found for this user",
            });
        }

        const orderData = {
            customer: req.userId,
            products: orderDetails,
            total: finalPrice,
            paymentID: razorpay_payment_id,
            coupon: appliedCouponId || null,
            final_price: finalPrice,
            orderStatus: "order placed",
            shippingAddress: {
                label: addressDoc.label,
                street: addressDoc.street,
                city: addressDoc.city,
                state: addressDoc.state,
                pincode: addressDoc.pincode,
                country: addressDoc.country,
            },
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

const refundPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;

        if (!orderId || !amount) {
            return res.status(400).json({
                success: false,
                message: "orderId and amount are required.",
            });
        }

        const refundAmount = Number(amount);
        if (isNaN(refundAmount) || refundAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid refund amount.",
            });
        }

        const order = await ordersModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        if (!order.paymentID) {
            return res.status(400).json({ success: false, message: "Payment ID not found for this order." });
        }

        if (order.orderStatus === "refunded") {
            return res.status(400).json({ success: false, message: "This order has already been refunded." });
        }

        // Initiate refund with Razorpay
        const refund = await razorpay.payments.refund(order.paymentID, {
            amount: refundAmount * 100, // Amount in paise
            speed: "normal", // or "optimum"
        });

        if (!refund) {
            return res.status(500).json({ success: false, message: "Refund initiation failed." });
        }

        // Update order status in your database
        order.orderStatus = "refunded";
        await order.save();

        res.json({ success: true, message: "Refund processed successfully.", refund });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const handleWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    try {
        // The request body is a raw buffer. Do not parse it yet.
        // 1. Verify the webhook signature
        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(req.body); // Use the raw body directly
        const digest = shasum.digest("hex");

        if (digest !== signature) {
            console.warn("Webhook signature mismatch.");
            return res.status(400).json({ status: "Signature mismatch" });
        }
        
        // If signature is okay, now we can safely parse the body.
        const event = JSON.parse(req.body.toString());

        // 2. Process the event
        if (event.event === "refund.processed") {
            const refund = event.payload.refund.entity;
            const refundDoc = await RefundModel.findOne({ refundId: refund.id });

            if (refundDoc) {
                refundDoc.status = 'processed';
                await refundDoc.save();

                // Also update the main order status
                await ordersModel.updateOne(
                    { _id: refundDoc.order, orderStatus: 'refund pending' },
                    { $set: { orderStatus: 'order cancelled' } }
                );
                console.log(`Refund ${refund.id} processed and order ${refundDoc.order} updated.`);
            }
        } else if (event.event === "refund.failed") {
            const refund = event.payload.refund.entity;
            const refundDoc = await RefundModel.findOne({ refundId: refund.id });

            if (refundDoc) {
                refundDoc.status = 'failed';
                await refundDoc.save();
                // You might want to send an email to an admin here
                console.error(`Refund ${refund.id} for order ${refundDoc.order} failed.`);
            }
            console.error("Refund failed webhook received:", event.payload);
        }

        res.json({ status: "ok" });

    } catch (error) {
        console.error("Error handling Razorpay webhook:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = { createOrder, verifyPayment, refundPayment, handleWebhook };