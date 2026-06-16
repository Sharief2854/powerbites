const express = require("express");

//aading new category
async function addCategory(req,res){
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and description are required"
            });
        }

        const existingCategory = await ProductCategoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const newCategory = new ProductCategoryModel({
            name,
            description
        });

        await newCategory.save();

        res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        });

    } catch (error) {
        console.log(error); // 👈 IMPORTANT for debugging
        res.status(500).json({
            message: error.message
        });
    }
}

//update Category
async function updateCategory(req,res){
 try {
        const categoryId = req.params.id;

        const updatedCategory = await ProductCategoryModel.findByIdAndUpdate(
            categoryId,
            req.body,
            {
                returnDocument: "after" ,
                runValidators: true
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//get category
async function getCategory(req,res){
    try {
        const categories = await ProductCategoryModel.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}




module.exports = {
    addCategory,
    updateCategory,
    getCategory

}