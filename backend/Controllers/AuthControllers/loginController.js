const emailSender = require("../../Utils/emailSender");
const userModel = require("../../Model/userModel");
const otpModel = require("../../Model/otpModel");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../../Utils/TokenGenerator");



 async function login(req,res){
    try {
        let body = req.body;
        

        if (!body) {
            return res.status(400).json({
                message: "All fields are required"
            })

        }

        if (!body.email || !body.password) {
            return res.status(400).json({
                message: "email or password is missing"
            })
        }

        let user = await userModel.findOne({ email: body.email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                isUser: false
            })
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        if (user.isVerified === false) {

             let info = await emailSender(user)

            if (!info) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            let setOtp = await otpModel.create({
                otp: info.otp,
                email: user.email
            })
            if (!setOtp) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }



            return res.status(400).json({
                message: "your are not verified,Please check your email",
                isVerified: user.isVerified,
                user: user._id
            })
        }


        let accessToken = generateAccessToken(user);
        let refreshToken = generateRefreshToken(user);

        // cookie


        res.status(200).json({
            message: "Login successful",
            token: accessToken,
            refreshToken: refreshToken,
            
        })



    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports =  login 


 