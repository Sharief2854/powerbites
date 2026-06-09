const express = require("express");
const ResetModel = require("../Model/ResetModel");

async function forgotPassword(req,res) {
     try {
        let id = req.params.id;
        let body = req.body;
        let user = await userModel.findOne({ email: body.email })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }
        //creating OTP
        let otp = Math.trunc(Math.random() * 10000);


        const info = await transporter.sendMail({
            from: "Powerbites",
            to: user.email,
            subject: "Reset Password Request",
            text: `Hello ${user.name}, ${otp}`,
        });

        //validating otp
        let setOtp = await otpModel.create({
            otp: otp,
            user: user._id
        })
    
        if (!setOtp) {
            return res.status(400).json({
                message: "Failed to generate OTP",

            });

        }

     

        res.status(200).json({
            message: "Please check your email",

        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }

}

async function VerifyOtp(req,res) {
    try {
        let id = req.params.id;
        let body = req.body;
        let result = await otpModel.findOne({ otp: body.otp, user: id })
        if (!result) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }


        //deleting otp
        let deleteOtp = await otpModel.deleteOne({ otp: body.otp, user: id })
        if (!deleteOtp) {
            return res.status(400).json({
                message: "Failed to delete OTP",
            });
        }

        res.status(200).json({
            message: "Otp verified successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

async function resetPassword(req,res){
     try {
        let id = req.params.id;
        let body = req.body;

        let resetPassword = await ResetModel.create({
            email: body.email,
            password: body.password,
            user: body.id
        })

        if (!resetPassword) {

            return res.status(400).json({
                message: "Failed to create reset record",
            });

        }


        let response = await userModel.findByIdAndUpdate({ _id: id }, { password: body.password }, { new: true })
        if (!response) {
            return res.status(400).json({
                message: "Failed to reset password"
            })
        }
        //deleteRecord

        let record = await ResetModel.findByIdAndDelete({ _id: id })
        if (!record) {
            return res.status(400).json({
                message: "Failed to delete reset record"
            })
        }

        res.status(200).json({
            message: "Password reset successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }

}
    

module.exports = { forgotPassword, VerifyOtp, resetPassword };