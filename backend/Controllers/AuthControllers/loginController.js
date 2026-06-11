const emailSender = require("../../Utils/emailSender");
const userModel = require("../../Model/userModel");
const otpModel = require("../../Model/otpModel");
const { generateAccessToken } = require("../../Utils/TokenGenerator");



 async function login(req,res){
    try {
        let body = req.body;
        

        if (!body) {
            return res.status(400).json({
                message: "All fields are required"
            })

        }
                console.log(body)

        
        if (!body.email || !body.password) {
            return res.status(400).json({
                message: "email or password is missing"
            })
        }

        let user = await userModel.findOne({ email: body.email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (user.password !== body.password) {
            return res.status(400).json({
                message: "Invalid password"
            })

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
                user: user._id
            })
            if (!setOtp) {
                return res.status(400).json({
                    message: "Something went wrong"
                })

                return res.status(400).json({
                    message: "Please verify your email",
                    user: user._id
                })
            }



            return res.status(400).json({
                message: "Please verify your email",
                user: user._id
            })
        }

        let accessToken = generateAccessToken(user);

        res.status(200).json({
            message: "Login successful",
            token: accessToken,
        })



    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports =  login 


 