
import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { validateEmail } from "../utils/Validation";
import AuthCard from "./AuthCard";
import MainAuthCard from "./MainAuthCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosConfig";
//import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Optional: run `npm install @mui/icons-material` if you haven't

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Validation Check
  const emailError = email ? validateEmail(email) : "";
  const isFormValid = email && !emailError;

  const handleSubmit = async(event) => {
    event.preventDefault();

    try{
    if (!isFormValid) return;

    console.log("Sending recovery link to:", email);
    // TODO: Integrate your actual Password Reset API endpoint here
    let response = await api.post("http://localhost:4500/resetPass/forgotpassword",{email});

    console.log("res data :",response.data)
    // Toggle success state to show a beautiful success confirmation
    setIsSubmitted(true);

    navigate(`/forgetverifyOtp/${response.data.user}`)

  }
  catch(err){
    console.log(err.response.data.message);
    alert(err.response.data.message);
  }
}


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        background: 'linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)',
        boxShadow: 'inset 0px 4px 20px rgba(74, 27, 241, 0.3)',
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
            <Typography variant="h6" sx={{ opacity: 0.9, textAlign: 'center' }}>
              Don't worry, we've got you covered!
            </Typography>
          </Box>
        } 
        rightContent={
          <AuthCard 
            title={isSubmitted ? "Check Your Email" : "Forgot Password?"} 
            sx={{
              width: '100%',
              boxShadow: 'none',
              bgcolor: 'transparent'
            }}
          >
            {!isSubmitted ? (
              // STEP 1: Request Email Form
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Enter your registered email address below. We'll send you instructions to reset your password safely.
                </Typography>

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  error={!!emailError}
                  helperText={emailError}
                  autoComplete="email"
                  margin="normal"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isFormValid}
                  sx={{ mt: 3, py: 1.2, fontWeight: 'bold' }}
                >
                  Send Recovery OTP
                </Button>
              </Box>
            ) : (
              // STEP 2: Beautiful Post-Submission UI Success State
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  py: 2 
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                   bgcolor: 'rgba(74, 27, 241, 0.1)',
    fontSize: '28px', // Controls emoji size
                    mb: 2
                  }}
                >
                 ✉️
                </Box>
                <Typography variant="body1" fontWeight="medium" gutterBottom>
                  Reset Link Dispatched!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  We have sent a secure verification link to <strong>{email}</strong>. Please check your inbox and spam folder.
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setIsSubmitted(false)}
                  sx={{ py: 1, borderColor: '#4A1BF1', color: '#4A1BF1', fontWeight: 'bold' }}
                >
                  Resend Otp
                </Button>
              </Box>
            )}
            
            {/* BACK TO LOGIN FOOTER LINK */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#4A1BF1",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/login")}
              >
                ← Back to Login
              </Typography>
            </Box>
          </AuthCard>
        } 
      />
    </Box>
  );
}

export default ForgotPassword;