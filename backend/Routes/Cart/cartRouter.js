const express = require('express');
const {setCart, deleteItem, setQuantity, getCart, applyCoupon} = require('../../Controllers/CartControllers/cart');

const router = express.Router();

router.post("/setCart", setCart)
router.delete("/deleteItem/:id",deleteItem)
router .post("/setQuantity/:id",setQuantity)
router.get("/getCart",getCart)
router.post("/applyCoupon", applyCoupon)




module.exports = router;