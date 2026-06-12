import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { validateOtp } from "../utils/Validation";
import AuthCard from "./AuthCard";
import { useNavigate, useParams } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";
import axios from "axios";
function ForgotVerifyOtp() {
  const [otp, setotp] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const userId = useParams().id;

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setotp(value);
    setError("");
  };


   const otpError = otp ? validateOtp(otp) : "";

    // Evaluates to true only if OTP is typed and contains zero validation errors
    const isFormValid = otp && !otpError;

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    if (otp.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }
    //let otp = otp;
    let res = await axios.post(`http://localhost:4500/resetPass/verifyOtp/${userId}`,{otp});

    console.log("res data :",res.data)

    if (res.status !== 200) {
      setError("Invalid OTP");
      return;
    }

    setVerified(true);
    navigate(`/resetpassword/${userId}`);
  }
  catch(err){
    console.log(err);
    alert(err.response.data.message);
  }
  };



  return (
   <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Complete dynamic viewport coverage
        p: 2,
        background: "linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)",
        boxShadow: "inset 0px 4px 20px rgba(74, 27, 241, 0.3)",
      }}
    >
      <MainAuthCard
        leftContent={
          <Box
            sx={{
               maxWidth: 350,
              width: "100%",
              height: "100%", 
              flex: 1, // Tells the box to grow and fill the parent flex container
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography variant="h4" fontWeight="bold">PowerBites</Typography>
            <Typography variant="h6">Welcome to PowerBites</Typography>
          </Box>
        }
        rightContent={
          <AuthCard
            title="Verify OTP"
            sx={{
              width: "100%",
              boxShadow: "none",
              bgcolor: "transparent",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                A verification code has been generated. Please enter it below to verify your account.
              </Typography>

              <TextField
                fullWidth
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!otpError} // FIX: Changed from !!otp so it doesn't stay red continuously
                helperText={otpError} // Displays your custom validation message
                autoComplete="one-time-code"
                margin="normal"
                slotProps={{ htmlInput: { maxLength: 6 } }} // Limits standard input length if needed
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid} // Safe button lockout if checks fail
                sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
              >
                Verify
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                mt: 3,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Back to sign up?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#4A1BF1",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/register")} // Safely fall back if they want to escape
              >
                Register
              </Typography>
            </Box>
          </AuthCard>
        }
      />
    </Box>
  );
}

export default ForgotVerifyOtp;