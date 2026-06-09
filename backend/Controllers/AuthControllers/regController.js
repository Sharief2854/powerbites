const userModel = require("../../Model/userModel");
const otpModel = require("../../Model/otpModel");
const transporter = require("../../config/emailConfig");




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

        let otp = Math.trunc(Math.random() * 10000)


        const info = await transporter.sendMail({
            from: "Powerbites",
            to: response.email,
            subject: "Welcome to Powerbites",
            text: `Welcome to Powerbites,${response.name} your verification code is ${otp}`,

        })
        if (!info) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        let setOtp = await otpModel.create({
            otp: otp,
            user: response._id
        })

        if (!setOtp) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        res.status(200).json({
            message: "check your email"
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
        if (!body.otp|| userId) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        let result = await otpModel.findOne({ otp: body.otp, user: body.userId })

        if(!result){
            return res.status(400).json({
                message:"Invalid otp"
            })
        }

       let user= await userModel.findByIdAndUpdate(body.userId,{
            isVerified:true
        })

       let deleteOtp =await otpModel.findByIdAndDelete(result._id)

       if(!deleteOtp){
        return res.status(400).json({
            message:"Something went wrong"
        })
       }


        res.status(200).json({
            message:"Otp verified",
            user
        })
        

        }
        catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    }

module.exports ={regController,verifyOtp}
