const express = require("express");
const upload = require('../../config/multerConfig');
const ProductModel = require("../../Model/ProductModel");
const { addProduct, updateProduct, deleteProduct, allProduct } = require("../../Controllers/ProductController/Produrcts");

const router = express.Router();

router.post("/addProduct", upload.array("file", 100), addProduct);

router.put("/updateProduct/:id",upload.array("file", 100),updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/all", allProduct);

//geting total number of products for admin dashboard
// router.get("/totalProducts", getTotalProducts);




module.exports = router;