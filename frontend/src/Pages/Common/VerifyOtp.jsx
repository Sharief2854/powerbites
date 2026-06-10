import { Box, Button, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import AuthCard from './AuthCard'
import Login from './Login';
import { validateOtp } from '../utils/Validation';


function VerifyOtp({verOtp}) {

    const [showOtp,setShowOtp] = useState(false);
    const[otp,setOtp] =useState("");

    const otpError = otp ? validateOtp(otp):"";

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("otp :",otp,"types",typeof otp);
        console.log("verOtp :",verOtp,"verotp type",typeof verOtp);
        if(verOtp !== Number(otp)){
           alert("Otp Not match");
           setShowOtp(false)
           return "";
        }
         setShowOtp(true)
            console.log("otp success",otp)
        
    }

    if(showOtp){
        return (
            <Box>
                <Login/>
            </Box>
        )
    }


  return (
   <Box>
    <AuthCard title="Verify OTP">
        <Box component='form' onSubmit={handleSubmit}>
            <TextField fullWidth label="OTP" name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} error={!!otp}  autoComplete="otp" margin="normal" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Verify</Button>
        </Box>
        <SnackbarProvider/>
    </AuthCard>
   </Box>
  )
}

export default VerifyOtp
