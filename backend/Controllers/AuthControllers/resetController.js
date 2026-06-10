const userModel = require("../../Model/userModel");
const transporter = require("../../config/emailConfig");
const otpModel = require("../../Model/otpModel");
const emailSender = require("../../Utils/emailSender");

async function forgotPassword(req,res) {
     try {
        let body = req.body;

        if (!body.email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }
       

        let user = await userModel.findOne({ email: body.email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        let existingOtp = await otpModel.find({user:user._id})

        if(!existingOtp){
            res.status().json({
                message:"otp is already sent"
            })
        }
        
        //creating OTP
        let info = await emailSender(user);

        if (!info) {
            return res.status(400).json({
                message: "Failed to send OTP",
            });
        }

        
        let setOtp = await otpModel.create({
            otp: info.otp,
            user: user._id
        })
    
        if (!setOtp) {
            return res.status(400).json({
                message: "Failed to generate OTP",

            });

        }

     

        res.status(200).json({
            message: "OTP sent Please check your email",
            user: user._id

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

        const deletedOtp = await otpModel.findOneAndDelete({ otp: body.otp, user: id });

        if (!deletedOtp) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
            });
        }

        res.status(200).json({
            message: "Otp verified successfully",
            
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

        if (!body.password) {
            return res.status(400).json({
                message: "Password is required",
            });
        }

        let user = await userModel.findById(id);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        user.password = body.password;
        await user.save(); 

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