const express = require("express");
const userModel = require("../../Model/userModel");
const isCustomer = require("../../MiddleWare/customerAuth");
const addressModel = require("../../Model/addressModel");
const {updateCustomerProfile,deleteCustomerProfile,addingAddress,deleteAddress,updateAddress} = require("../../Controllers/CustomerController/customerProfUpdate");


const router = express.Router();

// customer updating their own profile
router.put("/updateProfile",updateCustomerProfile)

// customer deleting their own profile
router.delete("/deleteProfile/:id",deleteCustomerProfile);

// customer adding address to their profile
router.post("/addAddress/:id",addingAddress);

//customer deleting address from their profile
router.delete("/deleteAddress/:id",deleteAddress);

//customer updating address from their profile
router.put("/updateAddress/:id",updateAddress);






module.exports = router;