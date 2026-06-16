const express = require("express");
const ProductModel = require("../../Model/ProductModel");
const userModel = require("../../Model/userModel");

const router = express.Router();

//gettotal products,customers,orders,revenue,recent orders for admin dashboard

router.get("/getTotal", async (req, res) => {
    try {
       const totalProducts = await ProductModel.countDocuments();
       const totalCustomers = await userModel.countDocuments({ role: "customer" });
       const totalOrders = await OrderModel.countDocuments();
       const totalRevenue = await OrderModel.aggregate([
           { $group: { _id: null, total: { $sum: "$totalAmount" } } }
       ]);
       const recentOrders = await OrderModel.find().sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            totalProducts,
            totalCustomers,
            totalOrders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;