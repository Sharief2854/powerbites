require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ConnectDB = require('./config/ConnectDB');
const RegRouter = require("./Routes/Auth/Registration")

ConnectDB()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/Auth",RegRouter)


app.listen(4500,()=>{
    console.log("server is running on port 4500")
})
