const express = require("express");
const upload = require('../../config/multerConfig');
const ProductModel = require("../../Model/ProductModel");
const isAdmin = require('../../MiddleWare/adminAuth')
const { addProduct, updateProduct, deleteProduct, allProduct, getTotalProducts } = require("../../Controllers/ProductController/Produrcts");

const router = express.Router();
router.post("/addProduct",upload.array("file", 100), addProduct);
router.post(
  "/test",
  upload.array("file", 100),
  (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    res.json({
      body: req.body,
      files: req.files
    });
  }
);
    
 


router.put("/updateProduct/:id",isAdmin,upload.array("file", 100),updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/all", allProduct);

//geting total number of products for admin dashboard
// router.get("/totalProducts", getTotalProducts);




module.exports = router;