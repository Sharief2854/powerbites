const express = require("express");
const userModel = require("../../Model/userModel");
const isCustomer = require("../../MiddleWare/customerAuth");
const addressModel = require("../../Model/addressModel");
const {updateCustomerProfile,deleteCustomerProfile,addingAddress,deleteAddress,updateAddress, getCustomerProfile, postCustomerPhoto, updateCustomerPhoto} = require("../../Controllers/CustomerController/customerProfUpdate");
const photoModel = require("../../Model/photoModel");
const upload = require("../../config/multerConfig");


const router = express.Router();

// customer updating their own profile
router.put("/updateProfile",updateCustomerProfile)

// customer deleting their own profile
router.delete("/deleteProfile/:id",deleteCustomerProfile);

//get customer profile details for profile page
router.get("/getProfile", getCustomerProfile);

//customer uploading photo to their profile
router.post("/uploadPhoto/:id",upload.single("file"),postCustomerPhoto);

//customer updating photo in their profile
router.put("/updatePhoto/:id",upload.single("file"),updateCustomerPhoto);

// customer adding address to their profile and also setting default address if it is the first address of the customer
router.post("/addAddress/:id",addingAddress);

//customer deleting address from their profile and if the deleted address was default then setting another address as default if it exists
router.delete("/deleteAddress/:id",deleteAddress);

//customer updating address from their profile
router.put("/updateAddress/:id",updateAddress);






module.exports = router;