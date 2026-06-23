const express = require("express");
const ordersModel = require("../../Model/orderModel");
const {analyticsPeriod,analyticSpecific, topSellingProducts} = require("../../Controllers/AnalyticsController/adminAnalytics");

const router = express.Router();

//getting products analytics for admin API
router.get("/analytics/:period",analyticsPeriod);

router.get("/analyticSpecifc",analyticSpecific)

//getting best sold products per year month and week
router.get("/bestSoldProducts",topSellingProducts)

module.exports = router;