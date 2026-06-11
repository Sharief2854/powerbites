const express = require('express');
const setCart = require('../../Controllers/CartControllers/cart');

const router = express.Router();

router.post("/setCart", setCart)




module.exports = router;