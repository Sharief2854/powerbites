
//import './App.css'

import { Box } from "@mui/material"
import Register from "./pages/Common/Register"
import Login from "./pages/Common/Login"
import VerifyOtp from "./pages/Common/VerifyOtp"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import MainAuthCard from "./Pages/Common/MainAuthCard";
import ForgotPassword from "./Pages/Common/ForgetPassword";
import ResetPassword from "./Pages/Common/ResetPassword";
import ForgotVerifyOtp from "./Pages/Common/ForgetVerifyOtp";


function App() {

  return (
    <Box>
      <BrowserRouter>

      <Routes>
        <Route path ="/" element={<Register/>}/>
        <Route path ="/verifyOtp/:id" element={<VerifyOtp/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/forget" element={<ForgotPassword/>}/>
        <Route path ="/reset" element={<ResetPassword/>}/>
        <Route path ="/forgetverifyOtp" element={<ForgotVerifyOtp/>}/>
        <Route path ="/auth" element={<MainAuthCard/>}/>
      </Routes>
      
      </BrowserRouter>
     
    </Box>
  )
}

export default App
