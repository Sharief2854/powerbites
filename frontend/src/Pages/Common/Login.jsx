import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { validateEmail, validatePassword, PasswordField } from "../utils/Validation";
import AuthCard from "./AuthCard";
import MainAuthCard from "./MainAuthCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation Checks
  const emailError = formData.email ? validateEmail(formData.email) : "";
  const passwordError = formData.password ? validatePassword(formData.password) : "";

  // Form validity rule: fields must be filled and error-free
  const isFormValid = 
    formData.email && 
    formData.password && 
    !emailError && 
    !passwordError;

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try{
    if (!isFormValid) return;

    console.log("Logging in with:", formData);
    // TODO: Integrate your actual API Authentication call here
    let res = await axios.post(" http://localhost:4500/auth/login",formData);

    console.log("res data :",res.data)
    
    let token = res.data.token;
    console.log("token :",token);
    localStorage.setItem("token",res.data.token);
    const decoded = jwtDecode(token);
    console.log("decoded :",decoded)  
    // Dynamic reset after an API handshake (or keep for convenience)
    setFormData({ email: "", password: "" });

    if(decoded.role == "customer"){
      navigate("/home")
    }
    else if(decoded.role == "admin"){
      navigate("/home")
    }
    

  }
  catch(err){
    if(err.response.data.message == "Please verify your email"){
      alert(err.response.data.message);
      navigate(`/verifyOtp/${err.response.data.user._id}`);
    }
    else if(err.response.data.message == "user not found"){
      alert(err.response.data.message);
      navigate("/");
    }
    else{
      alert(err.response.data.message); 
    }
    console.log(err); 
    
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
              width: "100%",
              height: "100%", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              p: 4,
              // bgcolor: 'rgba(255, 192, 203, 0.15)', 
               color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight="bold">PowerBites</Typography>
            <Typography variant="h6">Welcome Back!</Typography>
          </Box>
        } 
        rightContent={
          <AuthCard 
            title="Login" 
            sx={{
              width: '100%',
              boxShadow: 'none',
              bgcolor: 'transparent'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!emailError}
                helperText={emailError}
                autoComplete="email"
                margin="normal"
              />
              <PasswordField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!passwordError}
                helperText={passwordError}
                autoComplete="current-password"
                margin="normal"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid}
                sx={{ mt: 3, py: 1.2, fontWeight: 'bold' }}
              >
                Sign In
              </Button>
            </Box>
            
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //gap: "8px",
                mt: 3,
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
                onClick={() => navigate("/forget")} // Assuming forget route name
              >
                Forget Password
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#4A1BF1",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/")} // Assuming register route name
              >
                Sign Up
              </Typography>
            </Box>
          </AuthCard>
        } 
      />
    </Box>
  );
}

export default Login;