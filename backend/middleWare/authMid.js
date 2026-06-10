
const jwt = require("jsonwebtoken");

function isUser(req, res, next) {
  try {
  
    let user = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Token missing",
      });
    }
    let arr = authHeader.split(" ");
    let token = arr[1];
    let decode = jwt.verify(token, process.env.EMAIL);
    req.userId = decode.id

    console.log("token",token);
    console.log("hhh",decode);

    if (decode.role!="user") {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "server error",
    });
  }
}
module.exports = isUser