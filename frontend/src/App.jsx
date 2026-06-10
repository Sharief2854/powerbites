
//import './App.css'

import { Box } from "@mui/material"
import Register from "./pages/Common/Register"
import Login from "./pages/Common/Login"
import VerifyOtp from "./pages/Common/VerifyOtp"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import MainAuthCard from "./Pages/Common/MainAuthCard";


function App() {

  return (
    <Box>
      <BrowserRouter>

      <Routes>
        <Route path ="/" element={<Register/>}/>
        <Route path ="/verifyOtp" element={<VerifyOtp/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/auth" element={<MainAuthCard/>}/>
      </Routes>
      
      </BrowserRouter>
     
    </Box>
  )
}

export default App
