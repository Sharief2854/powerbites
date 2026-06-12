const express = require("express");
const userModel = require("../../Model/userModel");
const isCustomer = require("../../MiddleWare/customerAuth");
const addressModel = require("../../Model/addressModel");
const { updateCustomerProfile, deleteCustomerProfile, addingAddress, deleteAddress, updateAddress } = require("../../Controllers/CustomerController/customerProfUpdate");
const photoModel = require("../../Model/photoModel");


const router = express.Router();

// customer updating their own profile
router.put("/updateProfile", updateCustomerProfile)

// customer deleting their own profile
router.delete("/deleteProfile/:id", deleteCustomerProfile);

// customer adding address to their profile
router.post("/addAddress/:id", addingAddress);

//get customer profile details for profile page
router.get("/getProfile", async (req, res) => {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Profile retrieved successfully",
            user: user
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

//customer uploading photo to their profile
router.post("/uploadPhoto/:id", async (req, res) => {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                message: "Validation Error: Please select an image file to upload."
            });
        }
        const rawpath = req.file.path;
        const fileFilter = (req, file, cb) => {
            const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true); 
            } else {
                cb(new Error("Validation Error: Invalid file type. Only JPEG, JPG, PNG, WEBP, and GIF are allowed!"), false); // Reject file
            }
        };
        // if (req.file.size > 5 * 1024 * 1024) {
        //     return res.status(400).json({
        //         message: "Validation Error: File size exceeds the 5MB limit."
        //     });
        // }

        const usefullUrl = rawpath.replace(/\\/g, "/");

        const newPhoto = new photoModel
            ({
                userId,
                url: usefullUrl
            });
        await newPhoto.save();
        res.status(201).json({
            message: "Photo uploaded successfully",
            photo: newPhoto
        });
    } catch (error) {
        console.error("Error uploading photo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



//customer deleting address from their profile
router.delete("/deleteAddress/:id", deleteAddress);

//customer updating address from their profile
router.put("/updateAddress/:id", updateAddress);






module.exports = router;