const express = require("express")
const router = express.Router()
const userModel = require("../model/userModel")
const {userLogin} = require("../Controller/loginController")
router.post("/login",userLogin)

router.post("/getUser",async(req,res)=>{
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