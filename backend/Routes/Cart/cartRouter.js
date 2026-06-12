const express = require('express');
const {setCart, deleteItem, setQuantity, getCart} = require('../../Controllers/CartControllers/cart');

const router = express.Router();

router.post("/setCart", setCart)
router.delete("/deleteItem/:id",deleteItem)
router .post("/setQuantity/:id",setQuantity)
router.get("/getCart",getCart)




module.exports = router;