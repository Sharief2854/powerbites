const express = require("express");
// const ProductCatogeryModel = require("../../Model/ProductCategoryModel");
const ProductCategoryModel = require("../../Model/ProductCategoryModel");
const { compose } = require("nodemailer/lib/xoauth2");
const { addCategory, updateCategory, getCategory } = require("../../Controllers/CategoryController/productCategorycont");
const router = express.Router();


//aading new category
router.post("/addProductCategory", addCategory);

//update category
router.put("/updateProductCategory/:id", updateCategory);
    

//get all categories
router.get("/allCategories", getCategory);



module.exports = router;
