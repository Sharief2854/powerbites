
const jwt = require('jsonwebtoken');


function genetateAccessToken(user){


const accessToken = jwt.sign(
    { id:user._id,role:user.role},
    process.env.JWTKEY,
    {expiresIn:"1d"}

)
return accessToken;


}

function generateRefreshToken(user){
    const refreshToken = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWTKEY,
        {expiresIn:"7d"})

        return refreshToken;
}

module.exports = {
    genetateAccessToken,
    generateRefreshToken
}




