const express = require("express")
const router = express.Router()

router.post("/login",async(req,res)=>{
      let body = req.body;
    console.log(body)
    try{
      let user= await userModel.findOne({email:body.email})
      if(!user){
        return res.status(400).json({
        message: "User already exists"
        })
      }
        let token = genareteToken(user)
         console.log(token)
        if(!token){
            res.json({
            message:"token invalid"
        })
        }
        res.status(200).json({
          message:"login successfull",
          token:token,
          role:user.role,
        })
    }

    catch(err){
     res.json({
      message:"server problem"
     })
    }
  
})

router.post("/getuser",async(req,res)=>{
    let body = req.body;
    console.log(body)
    try{
     let user= await userModel.findOne({email:body.email})
     res.send("user data sucessfully fetched")
    }
    catch(err){
        res.status(500).json({
        message:"server problem"
      })
    }
})
module.exports = router;