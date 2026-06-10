const jwt=require("jsonwebtoken");

function isAdmin(req,res,next){

    let head=req.headers.authorization;
    if(!head){
        res.status(401).json({
            message: "Token not provided"
        })
        return;
    }
    
    let token=head.split(" ")[1]

    let decoded=jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.role != "admin"){
        res.status(401).json({
            message:"inavlid token"
        })
        return;
    }

    if(!decoded ){
        res.status(401).json({
            message:"inavlid token"
        })
        return;
    }
    // check databse
    next();

}
module.exports=isAdmin;