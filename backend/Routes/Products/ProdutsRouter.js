const express = require("express");
const upload = require('../../config/multerConfig');
const {addProduct,updateProduct,deleteProduct,allProduct} = require("../../Controllers/ProductControllers/ProductController");

const router = express.Router();
router.post("/addProduct", upload.array("file", 100), addProduct);

router.put("/updateProduct/:id",upload.array("file", 100),updateProduct);
router.delete("/deleteProduct/:id", deleteProduct,);
router.get("/all", allProduct)


module.exports = router;