const express = require("express");
// const ProductCatogeryModel = require("../../Model/ProductCategoryModel");
const ProductCategoryModel = require("../../Model/ProductCategoryModel");
const router = express.Router();

router.post("/addProductCategory",async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        
        const existingCategory = await ProductCategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        // Create a new category
        const newCategory = new ProductCategoryModel({ name });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
