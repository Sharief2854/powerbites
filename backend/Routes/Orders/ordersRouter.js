const express = require("express");
const { getOrders, getAllOrders, updateOrderStatus } = require("../../Controllers/OrdersController/orders");
const isCustomer = require("../../MiddleWare/customerAuth");
const isAdmin = require("../../MiddleWare/adminAuth");
const router = express.Router();

// Customer Routes (Protected by isCustomer token)
router.get("/getOrders", isCustomer, getOrders);

// Admin Routes (Protected by isAdmin token)
router.get("/admin/getAllOrders", isAdmin, getAllOrders);

// Admin modifying a specific item uses :id param
router.put("/admin/updateOrder/:id", isAdmin, updateOrderStatus);

module.exports = router;   