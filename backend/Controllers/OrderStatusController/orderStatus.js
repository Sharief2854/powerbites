const mongoose = require("mongoose");
const ordersModel = require("../../Model/orderModel");
const  transporter  = require("../../config/emailConfig");

async function updateOrderStatus(req, res) {
    try {
        let orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Validation Error: Request body cannot be empty."
            });
            
        }

        // console.log("body is",req.body)

        let { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Validation Error: 'status' field is required inside the payload."
            });
        }

        
        const allowedStatuses = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: `Validation Error: Invalid status provided. Allowed values are: ${allowedStatuses.join(", ")}`
            });
        }

        
        const order = await ordersModel.findById(orderId)
            .populate("customer")
            .populate("products.product")
            .populate("address");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

    
        order.orderStatus = status;
        await order.save();

        
        let subject = "";
        let html = "";

        switch (status) {
            case "order placed":
                subject = "Order Placed Successfully 🎉";
                html = `
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" alt="Order placed" style="width:100%;max-width:600px;border-radius:10px" />
                    <h2>Hello ${order.customer.name}</h2>
                    <p>Your order has been placed successfully.</p>
                    <p>Order ID: ${order._id}</p>
                `;
                break;

            case "preparing order":
                subject = "Your Order is Being Prepared 👨‍🍳";
                html = `
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" alt="Preparing Order" style="width:100%;max-width:600px;border-radius:10px" />
                    <h2>Hello ${order.customer.name}</h2>
                    <p>Your order is currently being prepared.</p>
                `;
                break;

            case "order shipped":
                subject = "Your Order Has Been Shipped 🚚";
                html = `
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" alt="Order Shipped" style="width:100%;max-width:600px;border-radius:10px" />
                    <h2>Hello ${order.customer.name}</h2>
                    <p>Your order has been shipped and is on the way.</p>
                `;
                break;

            case "order delivered":
                subject = "Order Delivered ✅";
                html = `
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" alt="Order delivered" style="width:100%;max-width:600px;border-radius:10px" />
                    <h2>Hello ${order.customer.name}</h2>
                    <p>Your order has been delivered successfully.</p>
                `;
                break;

            case "order cancelled":
                subject = "Order Cancelled ❌";
                html = `
                    <h2>Hello ${order.customer.name}</h2>
                    <p>Your order status has been updated to cancelled.</p>
                `;
                break;
            default:
                return res.status(400).json({
                    message: "Invalid order status"
                });
        }

        if (order.customer && order.customer.email) {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: order.customer.email,
                subject: subject,
                html: html
            });
        }

        res.status(200).json({
            message: "Order status updated and notification email sent successfully.",
            order
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = updateOrderStatus;