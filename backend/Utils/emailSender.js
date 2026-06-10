const transporter = require("../config/emailConfig");
const otpGenerator = require('otp-generator');


async function emailSender(user){

      try{
        let otp = otpGenerator.generate(4, { digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false })
        console.log(otp)
    
    
            const info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: user.email,
                subject: "Welcome to Powerbites",
                text: `Welcome to Powerbites, ${user.name} your verification code is ${otp}`,

            })

            // Return an object so the controller can access info.otp
            return { otp: otp };
      }
      catch(err){
        console.log(err)
      }
}

module.exports = emailSender;