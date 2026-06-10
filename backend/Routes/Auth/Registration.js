const express = require('express');
const { regController,verifyOtp } = require('../../Controllers/AuthControllers/regController');
const router = express.Router();

router.post("/register",regController)
router.post("/verifyOtp/:id",verifyOtp)


module.exports = router;