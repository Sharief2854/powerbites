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

        // 1. Find user or create a new one
        let userToProcess = await userModel.findOne({ email: body.email });

        if (userToProcess) {
            if (userToProcess.isVerified) {
                return res.status(403).json({
                    message: "User already exists",
                    existingUser: userToProcess
                });
            }
            // If not verified, execution naturally continues below to resend OTP
        } else {
            userToProcess = await userModel.create(body);
            if (!userToProcess) {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }
        }

        let existingOtp = await otpModel.findOne({ user: userToProcess._id })

        if (existingOtp) {
            return res.status(404).json({
                message: "otp is already sent"
            })
        }

        //let info = await emailSender(response)


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
        let result = await userModel.findByIdAndUpdate(userToProcess._id, { "createdAt.expires": "5m" }, { returnDocument: 'after' }).select("-password -name -email -phone -role -isVerified")

        res.status(200).json({
            message: "check your email",
            result
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
            { isVerified: true, "createdAt.expires": null },
            { returnDocument: 'after' }
        );

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "OTP verified successfully",

        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { regController, verifyOtp };


module.exports = { regController, verifyOtp }
