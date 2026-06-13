const express = require("express");
const userModel = require("../../Model/userModel");
const addressModel = require("../../Model/addressModel");
const photoModel = require("../../Model/photoModel");

// Customer profile update controller functions
async function updateCustomerProfile(req, res) {
    try {
        let userId = req.userId;

        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }

        let { name, password, phone } = req.body;

        if (!name && !password && !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const user = await userModel.findById(userId);


        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.role !== "customer") {
            return res.status(403).json({
                message: "Customer access only",
            });
        }


        if (name) {
            user.name = name;
        }
        if (password) {
            user.password = password;
        }
        if (phone) {
            user.phone = phone;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                name: user.name,
                password: user.password,
                phone: user.phone
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// delete customer profile controller function
async function deleteCustomerProfile(req, res) {
    try {

        let userId = req.userId;
        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }

        let result = await userModel.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "Profile deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//get customer profile controller function
async function getCustomerProfile(req, res) {
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
};

// Customer photo upload controller functions
async function postCustomerPhoto(req, res) {
    console.log("postcustcgvhbjk")
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
        console.log("File received:", req.file);

        const rawpath = req.file.path;


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
};

// Customer photo update controller functions
async function updateCustomerPhoto(req, res) {
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
        console.log("File received:", req.file);
        const rawpath = req.file.path;
        const usefullUrl = rawpath.replace(/\\/g, "/");
        const photo = await photoModel.findOne({ userId });
        if (!photo) {
            const newPhoto = new photoModel({
                userId,
                url: usefullUrl
            });
            await newPhoto.save();
            res.status(201).json({
                message: "Photo updated successfully",
                photo: newPhoto
            });
        } else {
            photo.url = usefullUrl;
            await photo.save();
            res.status(200).json({
                message: "Photo updated successfully",
                photo: photo
            });
        }
    } catch (error) {
        console.error("Error updating photo:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Customer adding address management controller functions
async function addingAddress(req, res) {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }

        let { label, street, city, state, pincode, country } = req.body;
        if (!label || !street || !city || !state || !pincode || !country) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }       
        const count = await addressModel.countDocuments({ userId });
        const newAddress = new addressModel({
            userId,
            label,
            street,
            city,   
            state,
            pincode,
            country,
            isDefault: count === 0 ? true : false
        });
        await newAddress.save();

        if (count > 0) {
            await addressModel.updateMany(
                { userId, _id: { $ne: newAddress._id } },
                { $set: { isDefault: false } }
            );
        }                   
        res.status(201).json({
            message: "Address added successfully",
            address: newAddress
        });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }   
};

// Customer delete address management controller functions
async function deleteAddress(req, res) {
    try {
        let userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        let addressId = req.params.id;

        const result = await addressModel.findOneAndDelete({
            _id: addressId,
            userId
        });

        if (!result) {
            return res.status(404).json({
                message: "Address not found"
            });
        }
        if (result.isDefault) {
            const anotherAddress = await addressModel.findOne({ userId });

            if (anotherAddress) {
                anotherAddress.isDefault = true;
                await anotherAddress.save();
            }
        }

        return res.json({
            message: "Address deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Customer update address management controller functions
async function updateAddress(req, res) {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }
        let addressId = req.params.id;
        let { label, street, city, state, pincode } = req.body;
        const address = await addressModel.findOne({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                message: "Address not found or does not belong to user",
            });
        }
        if (label) {
            address.label = label;
        }
        if (street) {
            address.street = street;
        }
        if (city) {
            address.city = city;
        }
        if (state) {
            address.state = state;
        }
        if (pincode) {
            address.pincode = pincode;
        }
        await address.save();

        res.status(200).json({
            message: "Address updated successfully",
            address: address
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


module.exports = {
    updateCustomerProfile,
    deleteCustomerProfile,
    addingAddress,
    deleteAddress,
    updateAddress,
    getCustomerProfile,
    postCustomerPhoto,
    updateCustomerPhoto,
    
}
