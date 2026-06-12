const express = require("express");
const userModel = require("../../Model/userModel");
const addressModel = require("../../Model/addressModel");


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

async function addingAddress(req, res) {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }

        let { label, street, city, state, pincode } = req.body;

        if (!label || !street || !city || !state || !pincode) {
            return res.status(400).json({
                message: "All address fields are required"
            });
        }

        const user = await addressModel.create({
            userId,
            label,
            street,
            city,
            state,
            pincode
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "Address added successfully",
            address: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

async function deleteAddress(req, res) {
    try {
        let userId = req.userId;
        console.log("User ID from token:", userId);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID missing in token"
            });
        }

        let addressId = req.params.id;
        let result = await addressModel.findOneAndDelete({ _id: addressId, userId });

        if (!result) {
            return res.status(404).json({
                message: "Address not found or does not belong to user",
            });
        }
        res.status(200).json({
            message: "Address deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

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
}


module.exports = {
    updateCustomerProfile,
    deleteCustomerProfile,
    addingAddress,
    deleteAddress,
    updateAddress
}
