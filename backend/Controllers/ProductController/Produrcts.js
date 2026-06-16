const express = require("express");
const ProductModel = require("../../Model/ProductModel");



async function allProduct(req, res) {
    try {

     const data = await ProductModel.find();
        if (!data) {
            return res.status(400).json({
                message: "No Products found"
            })
        }
        res.status(200).json({
            message: "Banners fetched successfully", data
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
        let body = req.body
        console.log( body)
        console.log(req.files, "file")

    //   const image= req.files.map(file => file.path)
    //     let Product = await ProductModel.create(body)

     if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Product image is required." });
        }

      const imagePaths = req.files.map(file => file.path);

        const ProductData = {...body,image: imagePaths };
        const Product = await ProductModel.create(ProductData);
                if(!Product){
                    return res.status(400).json({
                        message:"Something went wrong while creating the Products."
                    })
                }

        if (!Product) {
            return
            res.status(400).json({
                message: "product not found"
            })
        }
        res.send(Product)

    }
    catch (err) {
        res.status(500).json({
            message: "server problem"
        })
    }


}



// async function updateProduct(req, res) {
//     try {
//         let id = req.params.id
//        const ProductData = { ...req.body };

//         if (req.files && req.files.length > 0) {
//             const imagePaths = req.files.map(file => file.path);
//             updateData.image = imagePaths;
//         }

//         let Products = await ProductModel.findByIdAndUpdate(id, ProductData, { new: true, runValidators: true });

//         if(!Products){
//             return res.status(404).json({
//                 message:"Products not found"
//             })
//         }
//         res.status(200).json({
//             data: Products,
//             message: "product updated successfully"
//         })
//     }

        
//     catch (err) {
//         res.status(500).json({
//             message: "server problem"
//         })
//     }

// }
async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const ProductData = { ...req.body };

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            ProductData.image = imagePaths;
        }

        const product = await ProductModel.findByIdAndUpdate(id, ProductData,{new: true,}
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
        if (!id) {
            return
            res.send.status(404)({
                message: " please given id"
            })
        }
        let data = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Product successful delete",
        })
        console.log(result)
    }
    catch (error) {
        res.status(500).json({
            message: "server error", err, data
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

module.exports = { addProduct, updateProduct, deleteProduct, allProduct, getTotalProducts };