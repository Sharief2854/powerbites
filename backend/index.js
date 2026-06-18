require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ConnectDB = require('./config/ConnectDB');
const RegRouter = require("./Routes/Auth/Registration")
const ResetRouter = require("./Routes/Auth/ResetPassword")
const LoginRouter = require("./Routes/Auth/Login")
const adminRouter = require("./Routes/admin/adminCRUD");
const ProductRouter = require("./Routes/Products/ProdutsRouter")
const isAdmin = require('./MiddleWare/adminAuth');
const CartRouter = require('./Routes/Cart/cartRouter');
const bannerRouter = require('./Routes/Banner/bannerRoutes');
const offerRouter = require('./Routes/Offer/offerRouter');
const multer = require('multer');

const couponRouter = require('./Routes/Coupon/couponRouter');


const customerProfileRouter = require('./Routes/customer/customerProfile');
const isCustomer = require('./MiddleWare/customerAuth');
const upload = require('./config/multerConfig');
const PaymentRouter = require('./Routes/Payments/razorpayRoutes');
const DeveloperRouter = require('./Routes/DevepolerRoutes/Devepoler');
const reviewRouter = require('./Routes/Review/Review');
// const productCategoryRouter =require("./Routes/ProcutsCatoegory/categoryCRUD")
const ordersRouter = require('./Routes/Orders/ordersRouter');

const productCategoryRouter = require('./Routes/ProcutsCatoegory/categoryCRUD');
const orderStatusRouter = require('./Routes/OrderStatus/orderStatusUpdating');





ConnectDB()
// app.post("/upload",)
const app = express()
app.use(cors())
app.use(express.json())
app.use("/upload", express.static("upload"));
const path = require("path");

app.use("/upload", express.static(path.join(__dirname, "upload"))

);




app.use("/auth",RegRouter,LoginRouter)
app.use("/resetPass",ResetRouter)

// Admin routes CRUD opertions with authentication middleware
app.use("/crudAdmin",isAdmin,adminRouter)
app.use("/cart",isCustomer,CartRouter)
app.use("/products",ProductRouter)
app.use("/banner",bannerRouter)
app.use("/offer",offerRouter)


app.use("/orders",ordersRouter)

app.use("/coupon",couponRouter)
app.use("/category",productCategoryRouter)
app.use("/payment",PaymentRouter)

// Customer profile updating routes with authentication middleware
app.use("/updateCustomerProfile", isCustomer,customerProfileRouter)
app.use("/developer",DeveloperRouter)
app.use("/review",reviewRouter)
app.use("/orderStatus",orderStatusRouter)



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
