const express = require("express");
const router = express.Router();
// const upload = require("../../../uploads/multer");
const upload = require("../../../config/multer");

const { deleteProduct,updateProduct,addProduct,allProduct} = require('../../../Controllers/ProductController/ProdectContoller');

// router.post("/AddProduct",upload.("photo"), addProduct);
router.post("/AddProduct", upload.array("photos", 5), addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct,);
router.get("/all", allProduct);

module.exports = router;
