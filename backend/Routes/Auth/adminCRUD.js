const express = require("express");
const userModel = require("../../Model/userModel");
const {getCustomers,deletecustomer,filterCustomers} = require("../../Controller/AdminCustomerCont");

const router = express.Router();

//get customers
router.get("/getAllcustomers", getCustomers);

//deleting customers
router.delete("/deletecustomer/:id", deletecustomer);

//filter and get by alphabtes
router.get("/filter/:query", filterCustomers);


module.exports = router;