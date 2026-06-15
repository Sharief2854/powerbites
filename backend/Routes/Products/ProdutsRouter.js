const express = require("express");
const upload = require('../../config/multerConfig');
const router = express.Router(); 

const {addProduct,updateProduct,deleteProduct,allProduct,getProductbyId, search,filterProducts} = require("../../Controllers/ProductController/Produrcts");
const ProductModel = require("../../Model/ProductModel");


router.post("/addProduct", upload.array("file", 100), addProduct);

router.put("/updateProduct/:id",upload.array("file", 100),updateProduct);

router.delete("/deleteProduct/:id", deleteProduct,);
router.get("/all", allProduct)
 router.get("/product/:id",getProductbyId)
 router.get("/search",search)
router.get("/filter",filterProducts)

module.exports = router;