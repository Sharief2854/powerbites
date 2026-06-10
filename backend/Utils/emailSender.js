const transporter = require("../config/emailConfig");

async function emailSender(user){

      try{
        let otp = Math.trunc(Math.random() * 10000)
    
    
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