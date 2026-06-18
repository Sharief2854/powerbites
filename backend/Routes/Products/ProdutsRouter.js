const express = require("express");
const upload = require('../../config/multerConfig');
const ProductModel = require("../../Model/ProductModel");
const isAdmin = require('../../MiddleWare/adminAuth');
const { addProduct, updateProduct, deleteProduct, allProduct } = require("../../Controllers/ProductController/Produrcts");

const router = express.Router();
router.post("/addProduct",upload.array("file", 5), addProduct);
    
router.put("/updateProduct/:id",isAdmin,upload.array("file", 5),updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/all", allProduct);





module.exports = router;