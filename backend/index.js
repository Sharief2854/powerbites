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
const multer = require('multer');


const customerProfileRouter = require('./Routes/customer/customerProfile');
const isCustomer = require('./MiddleWare/customerAuth');
const upload = require('./config/multerConfig');


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
app.use("/banner",isAdmin,bannerRouter)

// Customer profile updating routes with authentication middleware
app.use("/updateCustomerProfile", isCustomer,customerProfileRouter) 

// Global error handling middleware to catch Multer errors safely
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            message: `Multer Error: ${err.message}. Make sure your form-data key is named exactly "file".` 
        });
    }
    next(err);
});

app.listen(4500,()=>{
    console.log("server is running on port 4500")
})
