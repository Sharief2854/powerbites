const express = require("express");
const ProductModel = require("../../Model/ProductModel");
const sendProductNotification = require("../../Utils/sendProductNotification");
const ProductCategoryModel = require("../../Model/productCategoryModel");

async function allProduct(req, res) {
    try {
        const data = await ProductModel.find().populate({ path: "category" }).sort({ createdAt: -1 });

        const Productdata = await ProductModel.find().sort({ updatedAt:-1});
        if (!data) {
            return res.status(400).json({
                message: "No products found"
            });
        }
        res.status(200).json({
            message: "Banners fetched successfully",
            data
        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}


async function addProduct(req, res) {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "Product image is required."
            });
        }

        const imagePaths = req.files.map(file =>
            `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
        );


        // console.log("Category from Postman:", req.body.category);

        const categoryNames = req.body.category.split(",").map(name => name.trim());
        console.log("Category Names:", categoryNames);

        const categories = await ProductCategoryModel.find({
            name: { $in: categoryNames }
        });

        console.log("Categories Found:", categories);

        const ProductData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            discount: req.body.discount,
            category: categories.map(p => p._id),
            image: imagePaths
        };

        const Product = await ProductModel.create(ProductData);

        const productWithCategory = await ProductModel.findById(Product._id)
            .populate("category", "name");

        return res.status(201).json({
            message: "Product added successfully",
            Product: productWithCategory
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}
async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const ProductData = { ...req.body };

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file =>
                `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
            );
            ProductData.image = imagePaths;
        }
        const product = await ProductModel.findByIdAndUpdate(id, ProductData, { new: true, }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            data: product,
            message: "Product updated successfully"
        });

    }

    catch (err) {
        return res.status(500).json({
            message: "Error updating product",
            error: err.message
        });
    }
}

async function deleteProduct(req, res) {

    try {
        let id = req.params.id
        let data = await ProductModel.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product successful delete",
        })
    }
    catch (error) {
        res.status(500).json({
            message: "server error", error: error.message
        })
    }

}

async function getTotalProducts(req, res) {
    try {
        const count = await ProductModel.countDocuments();
        res.status(200).json({ totalProducts: count });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getProductsByCategory(req, res) {
    try {
        const groupedProducts = await ProductModel.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "productcategories", // The collection name for ProductCategoryModel
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $group: {
                    _id: "$categoryDetails.name",
                    products: { $push: "$$ROOT" }
                }
            }
        ]);

        return res.status(200).json({
            message: "Products fetched successfully",
            data: groupedProducts
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { addProduct, updateProduct, deleteProduct, allProduct, getTotalProducts, getProductsByCategory };