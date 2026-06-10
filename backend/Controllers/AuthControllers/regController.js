const userModel = require("../../Model/userModel");
const otpModel = require("../../Model/otpModel");
const transporter = require("../../config/emailConfig");
const emailSender = require("../../Utils/emailSender");




async function regController(req, res) {
    try {
        let body = req.body;



        if (!body.name || !body.email || !body.password || !body.phone) {
           return res.status(400).json({
                message: "All fields are required"
            })
        }
        let response = await userModel.create(body)
        if (!response) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }

        let info = await emailSender(response)

      
        if (!info) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        let setOtp = await otpModel.create({
            otp: info.otp,
            user: response._id
        })

        if (!setOtp) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        res.status(200).json({
            message: "check your email",
            response
        })


    } catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}

async function verifyOtp(req, res) {
    try {
        let userId = req.params.id;
        let body = req.body;
        if (!body.otp || !userId) {
            return res.status(400).json({
                message: "OTP and User ID are required"
            });
        }

        const deletedOtp = await otpModel.findOneAndDelete({ otp: body.otp, user: userId });

        if (!deletedOtp) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true }
        );

        if (!user) {
           
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "OTP verified successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { regController, verifyOtp };
        

module.exports ={regController,verifyOtp}
