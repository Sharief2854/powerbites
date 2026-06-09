const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service:'gmail',
    auth:{
        user:"",
        pass:""
    
    }
})
module.exports = transporter;