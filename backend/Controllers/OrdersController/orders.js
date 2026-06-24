const ordersModel = require("../../Model/orderModel");

async function getOrders(req, res) {
    try {

        let orders = await ordersModel.find({ customer: req.userId })

        if (!orders) {
            return res.status(400).json({
                message: "No orders found"
            })

        }

        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })

    }
}

async function getAllOrders(req, res) {
    try {
        let orders = await ordersModel.find().populate("customer", "name email");

        if (!orders) {
            return res.status(400).json({
                message: "No orders found"
            })
        }


        res.status(200).json({
            message: "All orders fetched successfully",
            orders
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}


async function updateOrderStatus(req, res) {
    try {
        let orderId = req.params.id;
        let { status } = req.body;

        let updatedOrder = await ordersModel.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", updatedOrder });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function deleteOrder(req, res) {
    try {
        let orderId = req.params.id

        let deletedOrder = await ordersModel.findByIdAndDelete(orderId)
        if (!deletedOrder) {
            return res.status(404).json({
                message: "Order not found"
            })

        }

        res.status(200).json({
            message: "Order deleted successfully",
            deletedOrder
        })


    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message

        })
    }
}

module.exports = { getOrders, getAllOrders, updateOrderStatus, deleteOrder };