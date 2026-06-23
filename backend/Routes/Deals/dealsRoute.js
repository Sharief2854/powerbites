

const express = require("express");
const router = express.Router();
const dealsController = require("../../Controllers/Deals/dealsController");


router.post("/setDeal", dealsController.setDeal);
router.put("/updateDeal/:productId", dealsController.updateDeal);
router.put("/removeDeal/:productId", dealsController.removeDeal);
router.post("/applydeal",isCustomer ,dealsController.applydeal);

module.exports = router;