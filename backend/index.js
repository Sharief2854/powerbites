require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ConnectDB = require('./config/connectDB');
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
const conditionalJsonParser = require('./MiddleWare/jsonParserMiddleware');

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
const dashboardRouter = require('./Routes/Dashboard/dashboardRoute')
const productfiltering = require('./Routes/ProductfilteringRoutes/Productfiltering');
const AnalyticsRouter = require('./Routes/Analytics/analytics')
const adminToamin = require ("./Routes/AdminToadmin/adminToadminCurd")
let dealsRouter = require('./Routes/Deals/dealsRoute');
const CompanyDetails =require("./Routes/CompanyDetails/CompanyDetails")
const companyRouter = require("./Routes/CompanyDetails/CompanyDetails");




ConnectDB()
// app.post("/upload",)
const app = express()
app.use(cors())

// Use the conditional JSON parser middleware.
// IMPORTANT: The webhook route needs the raw body for signature verification.
// We apply the raw parser specifically for this route.
app.use('/api/payment/refund-webhook', express.raw({ type: 'application/json' }));

// This is crucial for the Razorpay webhook to work correctly.
app.use(conditionalJsonParser);

app.use("/upload", express.static("upload"));
const path = require("path");

app.use("/upload", express.static(path.join(__dirname, "upload")))

);





app.use("/auth",RegRouter,LoginRouter)
app.use("/resetPass",ResetRouter)

// Admin routes CRUD opertions with authentication middleware
app.use("/crudAdmin",isAdmin,adminRouter)
app.use("/cart",isCustomer,CartRouter)
app.use("/products",ProductRouter)
app.use("/banner", bannerRouter)
app.use("/offer",offerRouter)

app.use("/adminToadmin",isAdmin,adminToamin)

app.use("/company", companyRouter);

app.use("/orders",ordersRouter)

app.use("/coupon",couponRouter)
app.use("/category",productCategoryRouter)
app.use("/api/payment",PaymentRouter)
app.use("/deals",isAdmin,dealsRouter)

// Customer profile updating routes with authentication middleware
app.use("/updateCustomerProfile", isCustomer,customerProfileRouter)
app.use("/developer",DeveloperRouter)
app.use("/review",reviewRouter)
app.use("/orderStatus",orderStatusRouter)
app.use("/dashboard",isAdmin,dashboardRouter)
app.use("/products",productfiltering)
app.use("/dashboard",dashboardRouter)
app.use("/adminAnalytics",AnalyticsRouter)

app.use("/company",CompanyDetails)


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
