

require("dotenv").config();
const express = require("express");
const app = express();
const userRouter= require("./router/userRouter");
const connected = require("./Confin/db");
const cors = require("cors");
const isUser=require("./middleWare/authMid")
app.use(express.json()); 
connected()
app.use("/user",isUser ,userRouter)
app.get("/home", (req, res) => {
  res.send("server working");
});


console.log("hii")
app.listen(process.env.PORT, () => {
  console.log("server is running on port 5000");
});