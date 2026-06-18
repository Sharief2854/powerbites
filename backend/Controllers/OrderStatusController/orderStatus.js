const ordersModel = require("../../Model/orderModel");
const transporter = require("../../config/emailConfig");

async function updateOrderStatus(req, res) {
    try {
        const orderId = req.params.id;

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

        let { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Validation Error: 'status' field is required inside the payload."
            });
        }

        // normalize input (VERY IMPORTANT)
        status = status.trim().toLowerCase();

        const allowedStatuses = [
            "order placed",
            "preparing order",
            "order shipped",
            "order delivered",
            "order cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`
            });
        }

        // 1. Update only status (no validation issues)
        await ordersModel.updateOne(
            { _id: orderId },
            { $set: { orderStatus: status } }
        );

        // 2. Fetch fresh updated order
        const updatedOrder = await ordersModel.findById(orderId)
            .populate("customer");

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // 3. Email content
        let subject = "";
        let html = "";

        switch (status) {
            case "order placed":
                subject = "Order Placed Successfully 🎉";
                html = `
                    <div style="font-family:Arial;padding:20px">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s"
                     alt="Order placed" 
                     style="width:100%;max-width:600px;border-radius:10px"
                      />
                        <h2>Hello ${updatedOrder.customer?.name || "Customer"}</h2>
                        <p>Your order has been placed successfully.</p>
                        <p><b>Order ID:</b> ${updatedOrder._id}</p>
                        <a href="http://http://localhost:5173//orders/${updatedOrder._id}"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Track Your Order
  </a>
   <a href="http://http://localhost:5173//"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Visit site
  </a>
                    </div>
                `;
                break;

            case "preparing order":
                subject = "Your Order is Being Prepared 👨‍🍳";
                html = `
                    <div style="font-family:Arial;padding:20px">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" 
                    alt="order is getting prepared" 
                    style="width:100%;max-width:600px;border-radius:10px" />
                        <h2>Hello ${updatedOrder.customer?.name || "Customer"}</h2>
                        <p>Your order is currently being prepared.</p>
                        <p><b>Order ID:</b> ${updatedOrder._id}</p>
                         <a href="http://http://localhost:5173//orders/${updatedOrder._id}"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Track Your Order
  </a>
   <a href="http://http://localhost:5173//"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Visit site
  </a>
                    </div>
                `;
                break;

            case "order shipped":
                subject = "Your Order Has Been Shipped 🚚";
                html = `
                    <div style="font-family:Arial;padding:20px">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s"
                     alt="Order shipped" 
                     style="width:100%;max-width:600px;border-radius:10px"
                      />
                        <h2>Hello ${updatedOrder.customer?.name || "Customer"}</h2>
                        <p>Your order has been shipped and is on the way.</p>
                        <p><b>Order ID:</b> ${updatedOrder._id}</p>
                         <a href="http://http://localhost:5173//orders/${updatedOrder._id}"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Track Your Order
  </a>
   <a href="http://http://localhost:5173//"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Visit site
  </a>
                    </div>
                `;
                break;

            case "order delivered":
                subject = "Order Delivered ✅";
                html = `
                    <div style="font-family:Arial;padding:20px">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s"
                     alt="Order deliverd"
                      style="width:100%;max-width:600px;border-radius:10px" 
                      />
                        <h2>Hello ${updatedOrder.customer?.name || "Customer"}</h2>
                        <p>Your order has been delivered successfully.</p>
                        <p><b>Order ID:</b> ${updatedOrder._id}</p>
                         <a href="http://http://localhost:5173//orders/${updatedOrder._id}"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Track Your Order
  </a>
   <a href="http://http://localhost:5173//"
     style="
        display:inline-block;
        padding:12px 20px;
        margin-top:10px;
        background:#28a745;
        color:white;
        text-decoration:none;
        border-radius:5px;
        font-weight:bold;
     ">
     Visit site
  </a>
                    </div>
                `;
                break;

            case "order cancelled":
                subject = "Order Cancelled ❌";
                html = `
                    <div style="font-family:Arial;padding:20px">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZmP2iJmKKDGP2QGEaW4Ylfqv4ZiKrRWSrw&s" 
                    alt="Order placed" 
                    style="width:100%;max-width:600px;border-radius:10px" 
                    />
                        <h2>Hello ${updatedOrder.customer?.name || "Customer"}</h2>
                        <p>Your order has been cancelled.</p>
                        <p><b>Order ID:</b> ${updatedOrder._id}</p>
                    </div>
                `;
                break;
            default:
                return res.status(400).json({
                    message: "Invalid status"
                });
        }

        // 4. Send email safely
        if (updatedOrder?.customer?.email) {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: updatedOrder.customer.email,
                subject,
                html
            });
        }

        return res.status(200).json({
            message: "Order status updated and email sent successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = updateOrderStatus;