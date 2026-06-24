const express = require("express");
const ordersModel = require("../../Model/orderModel");
const {analyticsPeriod,analyticSpecific, topSellingProducts, leastSellingProducts, bestSellingProduct,totalCustomers,totalOrders, totalProductsSold, orderStatusSummary, cancelledOrdersAnalytics, topCustomer} = require("../../Controllers/AnalyticsController/adminAnalytics");

const router = express.Router();

//getting products analytics for admin API
router.get("/analytics/:period",analyticsPeriod);

router.get("/analyticSpecifc",analyticSpecific)

//getting best sold products per year month and week
router.get("/bestSoldProducts",topSellingProducts)

//getting least sold product
router.get("/leastSoldProducts",leastSellingProducts)

//top selling products present
router.get("/topSellingProducts",bestSellingProduct)

//getting total customers
router.get("/totalCustomers",totalCustomers)

//getting total orders
router.get("/totalOrders",totalOrders)

//total products sold
router.get("/totalProductsSold",totalProductsSold)

//order status summary
router.get("/orderStatusSummary",orderStatusSummary)

//cancelled orders
router.get("/cancelledOrdersAnalytics",cancelledOrdersAnalytics)

//getting top customer
router.get("/topCustomer",topCustomer)





module.exports = router;