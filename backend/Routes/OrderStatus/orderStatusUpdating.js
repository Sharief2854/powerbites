const express = require("express");
const ordersModel = require("../../Model/orderModel");
const updateOrderStatus = require("../../Controllers/OrderStatusController/orderStatus");

const router = express.Router();

//sending the order status to customer through email
router.post("/updateStatus/:id",updateOrderStatus)

module.exports = router;