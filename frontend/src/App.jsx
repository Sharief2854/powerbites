import { Box } from "@mui/material"
import { BrowserRouter,Routes,Route } from "react-router-dom";

import MainAuthCard from "./Pages/Common/MainAuthCard";
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import VerifyOtp from "./Pages/Common/VerifyOtp"
import ForgotPassword from "./Pages/Common/ForgetPassword";
import ResetPassword from "./Pages/Common/ResetPassword";
import ForgotVerifyOtp from "./Pages/Common/ForgetVerifyOtp";
import Home from "./Pages/Customer/Layout/Home";

import DashboardLayout from "./Pages/Admin/Layout/Dashboard";
import LandingPage from "./Pages/Common/LandingPage";
import LandingPageLayout from "./Pages/Common/LandingPageLayout";

import UserDetails from "./Pages/Admin/UsersOperations/UserDetails";
import Products from "./Pages/Admin/Products/AdminProducts";
import UpdateProducts from "./Pages/Admin/Products/UpdateProducts";
import AdminProducts from "./Pages/Admin/Products/AdminProducts";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import CustomerDashboard from "./Pages/Customer/Layout/CustomerDashboard";
import Overview from "./Pages/Admin/Home/AdminHome";
import CustomerProducts from "./Pages/Customer/CustomerProducts/CustomerProducts";
import ProductPage from "./Pages/Customer/CustomerProducts/ProductPage";
import CustomerCart from "./Pages/Customer/Cart/CustomerCart";
import OrderList from "./Pages/Customer/CustomerOrder/OrderList";
import CustomerProfile from "./Pages/Customer/Profile/CustomerProfiles";
import CustomerEditProfile from "./Pages/Customer/Profile/CustomerEditProfile";
import CustomerEditAddress from "./Pages/Customer/Profile/CustomerEditAddress";
import EmailVerify from "./Pages/Common/EmailVerify";



function App() {

  return (
    <Box>
        <BrowserRouter>
        <Routes>
        <Route path ="/" element={<LandingPageLayout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/verify-email" element={<EmailVerify/>}/>
        <Route path ="/verify-otp" element={<VerifyOtp/>}/>
        <Route path ="/login" element={<Login/>}/>
        
        <Route path ="/forget" element={<ForgotPassword/>}/>
        <Route path ="/forget/forgetverifyOtp" element={<ForgotVerifyOtp/>}/>
        <Route path ="/forget/forgetverifyOtp/resetpassword" element={<ResetPassword/>}/>
        <Route path ="/auth" element={<MainAuthCard/>}/>
        </Route>
        

        <Route path ="/admin" element={<ProtectedRoutes role="admin"><DashboardLayout/></ProtectedRoutes>}>
        <Route index element={<Overview/>}/>
        <Route path ="/admin/overview" element={<Overview/>}/>
        <Route path ="/admin/customers" element={<UserDetails/>}/>
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="/admin/products/updateProduct/:id" element={<UpdateProducts/>}/>
        <Route path="/admin/offsers" element={<Offsers/>}/>
        </Route>

        <Route path ="/customer" element={<ProtectedRoutes role="customer"><CustomerDashboard/></ProtectedRoutes>}>
        <Route index element={<Home/>}/>
         <Route path ="/customer/home" element={<Home/>}/>
        <Route path="/customer/users" element={<UserDetails/>}/>
        <Route path="/customer/profile" element={<CustomerProfile/>}/>
        <Route path="/customer/products" element={<CustomerProducts/>}/>
        <Route path="/customer/productpage/:id" element={<ProductPage/>}/>
        <Route path="/customer/cart" element={<CustomerCart/>}/>
        <Route path ="/customer/editprofile" element={<CustomerEditProfile/>}/>
        <Route path ="/customer/editaddress" element={<CustomerEditAddress/>}/>
        <Route path ="/customer/editaddress/:id" element={<CustomerEditAddress/>}/>
        <Route path ="/customer/orderlist" element={<OrderList/>}/>
        <Route path ="/customer/reviews/:id" element={<ReviewOfProducts/>}/>
        </Route>

      </Routes>
            
      </BrowserRouter>
    </Box>
  )
}

export default App
