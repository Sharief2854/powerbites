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
const CartRouter = require('./Routes/Cart/cartRouter');
const bannerRouter = require('./Routes/Banner/bannerRoutes');


const customerProfileRouter = require('./Routes/customer/customerProfile');
const isCustomer = require('./MiddleWare/customerAuth');
ConnectDB()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/auth",RegRouter,LoginRouter)
app.use("/resetPass",ResetRouter)
// app.use("/auth",LoginRouter)

// Admin routes CRUD opertions with authentication middleware
app.use("/crudAdmin",isAdmin,adminRouter)
app.use("/cart",CartRouter)
app.use("/banner",bannerRouter)

// Customer profile updating routes with authentication middleware
app.use("/updateCustomerProfile", isCustomer,customerProfileRouter) 



app.listen(4500,()=>{
    console.log("server is running on port 4500")
})
