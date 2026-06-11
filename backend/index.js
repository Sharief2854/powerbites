require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ConnectDB = require('./config/ConnectDB');
const RegRouter = require("./Routes/Auth/Registration")
const ResetRouter = require("./Routes/Auth/ResetPassword")
const LoginRouter = require("./Routes/Auth/Login")
const adminRouter = require("./Routes/admin/adminCRUD");
const isAdmin = require('./MiddleWare/adminAuth');

ConnectDB()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/auth",RegRouter)
app.use("/resetPass",ResetRouter)
app.use("/auth",LoginRouter)

app.use("/crudAdmin",isAdmin,adminRouter)



app.listen(4500,()=>{
    console.log("server is running on port 4500")
})
