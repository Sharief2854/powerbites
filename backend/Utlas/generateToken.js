const jwt = require("jsonwebtoken")

function generateToken(user){
    let token=jwt.sign({id:user._id,role:user.role },process.env.JWT_SCEATECODE,{expiresIn:"1d"})
    return token
}

module.exports=generateToken