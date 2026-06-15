import { Box } from "@mui/material"
import { BrowserRouter,Routes,Route } from "react-router-dom";

import MainAuthCard from "./Pages/Common/MainAuthCard";
import Login from "./Pages/Common/Login"
import Register from "./Pages/Common/Register"
import VerifyOtp from "./Pages/Common/VerifyOtp"
import ForgotPassword from "./Pages/Common/ForgetPassword";
import ResetPassword from "./Pages/Common/ResetPassword";
import ForgotVerifyOtp from "./Pages/Common/ForgetVerifyOtp";
import Home from "./Pages/Common/Home";
<<<<<<< HEAD
import DashboardLayout from "./Pages/Admin/Layout/Dashboard";
=======
//import DashboardLayout from "./Pages/Admin/Layout/Dashboard";
//import UserDetails from "./Pages/Admin/UsersOperations/UserDetails";
>>>>>>> 7e4f853f106b0662a32b1183722c859c81c31b33
import LandingPage from "./Pages/Common/LandingPage";
import LandingPageLayout from "./Pages/Common/LandingPageLayout";

import UserDetails from "./Pages/Admin/UsersOperations/UserDetails";
import Products from "./Pages/Admin/Products/AdminProducts";
import UpdateProducts from "./Pages/Admin/Products/UpdateProducts";
<<<<<<< HEAD
import AdminProducts from "./Pages/Admin/Products/AdminProducts";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import CustomerDashboard from "./Pages/Customer/Layout/CustomerDashboard";
import CustomerProfile from "./Pages/Customer/CustomerProfile";
import Overview from "./Pages/Admin/Home/AdminHome";
=======
import DashboardLayout from "./Pages/Admin/Layout/Dashboard";
import AdminProducts from "./Pages/Admin/Products/AdminProducts";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import CustomerDashboard from "./Pages/Customer/Layout/CustomerDashboard";
import CustomerProfiles from "./Pages/Customer/CustomerProfiles";
import CustomerEditProfile from "./Pages/Customer/CustomerEditProfile";
import CustomerProfile from "./Pages/Customer/CustomerProfiles";
>>>>>>> 7e4f853f106b0662a32b1183722c859c81c31b33


function App() {

  return (
    <Box>
        <BrowserRouter>
      <Routes>
        <Route path ="/" element={<LandingPageLayout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path ="/home" element={<LandingPage/>}/>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/verifyOtp/:id" element={<VerifyOtp/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/forget" element={<ForgotPassword/>}/>
        <Route path ="/resetpassword/:id" element={<ResetPassword/>}/>
        <Route path ="/forgetverifyOtp/:id" element={<ForgotVerifyOtp/>}/>
        <Route path ="/auth" element={<MainAuthCard/>}/>
        <Route path ="/home" element={<Home/>}/>
        </Route>
<<<<<<< HEAD
=======
        <Route path ="/editprofile" element={<CustomerEditProfile/>}/>
        <Route path ="/CustomerProfile" element={<CustomerProfiles/>}/>
        
        

>>>>>>> 7e4f853f106b0662a32b1183722c859c81c31b33

        <Route path ="/admin" element={<ProtectedRoutes role="admin"><DashboardLayout/></ProtectedRoutes>}>

        <Route index element={<Overview/>}/>
        <Route path ="/admin/overview" element={<Overview/>}/>
        <Route path ="/admin/customers" element={<UserDetails/>}/>
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="/admin/products/updateProduct/:id" element={<UpdateProducts/>}/>
        </Route>

        <Route path ="/customer" element={<ProtectedRoutes role="customer"><CustomerDashboard/></ProtectedRoutes>}>
        <Route path="/customer/users" element={<UserDetails/>}/>
        <Route path="/customer/profile" element={<CustomerProfiles/>}/>
         <Route path ="/customer/editprofile" element={<CustomerEditProfile/>}/>
         <Route path ="/customer/editprofile/:id" element={<CustomerEditProfile/>}/>
        </Route>
      </Routes>
            
      </BrowserRouter>
    </Box>
  )
}

export default App