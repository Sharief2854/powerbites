require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const forgetpassword = require('./Routes/Auth/ForgetPassword');
const adminCRUD = require('./Routes/Auth/adminCRUD');
const ConnectDB = require('./Config/connectDB');
const isAdmin = require('./MiddleWare/adminAuth');

ConnectDB()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/Auth",forgetpassword)
app.use("/crudAdmin",adminCRUD)


app.listen(4500,()=>{
    console.log("server is running on port 4500")
})