
//import './App.css'

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
import DashboardLayout from "./Pages/Common/Dashboard";


function App() {

  return (
    <Box>
        <BrowserRouter>
      <Routes>
        <Route path="/reg" element={<Register />} />
        <Route path="/verifyOtp/:id" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        <Route path="/forgetverifyOtp/:id" element={<ForgotVerifyOtp />} />
        <Route path="/auth" element={<MainAuthCard />} />
        <Route path="/home" element={<Home />} />
       <Route path="/" element ={<DashboardLayout/>} />
      </Routes>
    </BrowserRouter>
     
    </Box>
  )
}

export default App