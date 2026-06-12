import { Box } from "@mui/material"
import Register from "./Pages/Common/Register"
import Login from "./Pages/Common/Login"
import VerifyOtp from "./Pages/Common/VerifyOtp"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import MainAuthCard from "./Pages/Common/MainAuthCard";
import ForgotPassword from "./Pages/Common/ForgetPassword";
import ResetPassword from "./Pages/Common/ResetPassword";
import ForgotVerifyOtp from "./Pages/Common/ForgetVerifyOtp";
import Home from "./Pages/Common/Home";
import DashboardLayout from "./Pages/Admin/Layout/Dashboard";
import UserDetails from "./Pages/Admin/UsersOperations/UserDetails";
import LandingPage from "./Pages/Common/LandingPage";
import Products from "./Pages/Admin/Products/Products";
import UpdateProducts from "./Pages/Admin/Products/UpdateProducts";
import CustomerProfile from "./Pages/Customer/CustomerProfile";


function App() {

  return (
    <Box>
        <BrowserRouter>
      <Routes>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/verifyOtp/:id" element={<VerifyOtp/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/forget" element={<ForgotPassword/>}/>
        <Route path ="/resetpassword/:id" element={<ResetPassword/>}/>
        <Route path ="/forgetverifyOtp/:id" element={<ForgotVerifyOtp/>}/>
        <Route path ="/auth" element={<MainAuthCard/>}/>
        <Route path ="/home" element={<Home/>}/>
        

        <Route path="/dashboard" element={<DashboardLayout/>}/>

        <Route path ="/admin" element={<Home/>}>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/products/updateProduct/:id" element={<UpdateProducts/>}/>
        </Route>
        <Route path ="/profile" element={<CustomerProfile/>}/>

      </Routes>
      
      </BrowserRouter>
    </Box>
  )
}

export default App