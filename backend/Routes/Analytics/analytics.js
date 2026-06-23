const express = require("express");
const ordersModel = require("../../Model/orderModel");
const {analyticsPeriod,analyticSpecific} = require("../../Controllers/AnalyticsController/adminAnalytics");

const router = express.Router();

//getting products analytics for admin API
router.get("/analytics/:period",analyticsPeriod);

router.get("/analyticSpecifc",analyticSpecific)

module.exports = router;