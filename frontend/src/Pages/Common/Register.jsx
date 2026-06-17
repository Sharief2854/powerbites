import React, { useState } from "react";
import { Box, Button, Typography, TextField, CircularProgress, Snackbar, Alert } from "@mui/material";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateConfirmPassword,
  PasswordField,
} from "../utils/Validation";
import AuthCard from "./AuthCard";
import axios from "axios";
import VerifyOtp from "./VerifyOtp";
import { useNavigate } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";
import { PrimaryButton } from "../../Components/Common/Buttons";
import api from "../../api/axiosConfig";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation Checks
  const nameError = formData.name ? validateName(formData.name) : "";
  const emailError = formData.email ? validateEmail(formData.email) : "";
  const passwordError = formData.password
    ? validatePassword(formData.password)
    : "";
  const confirmPasswordError = formData.confirmPassword
    ? validateConfirmPassword(formData.confirmPassword)
    : "";

  // FIX: Changed formData.phone to formData.phone to match initial state
  const phoneError = formData.phone ? validatePhone(formData.phone) : "";

  // Evaluates to true only if all fields are filled AND contain zero errors
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    !nameError &&
    !emailError &&
    !phoneError &&
    !passwordError &&
    !confirmPasswordError;

  const HandleEmailVerify =async()=>{

    try {

      let rresponse = await api.post("/auth/verifyEmail")
      console.log("response register :",response.data)
      

    }
    catch(err){
      console.log(err.response.data)
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setSnackbar({ open: true, message: "Passwords do not match. Please try again.", severity: "error" });
    }

    setLoading(true);
    try {
      let obj = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      console.log("formData :", obj);

      let res = await api.post("/auth/register", obj);

      console.log("res data :", res.data);

      localStorage.setItem("userId", res.data.result._id);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
      setSnackbar({ open: true, message: res.data.message || "Account created successfully! Please verify your email.", severity: "success" });
      setTimeout(() => navigate(`/verifyOtp/${localStorage.getItem("userId")}`), 1500);
    } catch (err) {
      console.log(err.response?.data);
      setSnackbar({ open: true, message: err.response?.data?.message || "Registration failed. Please try again.", severity: "error" });
  
      setTimeout(() => {
        if (err.response?.data?.existingUser) {
          navigate(`/login`);
        }
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100%', 
        background: 'linear-gradient(180deg, #3519B3 0%, #1E1154 100%)', // Matches the outer display mockup fill
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3
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
            <Typography variant="h4" fontWeight="bold">
              PowerBites
            </Typography>
            <Typography variant="h6">Welcome to PowerBites </Typography>
          </Box>
        }
        rightContent={
          <AuthCard
            title="Sign-Up"
            sx={{
              width: "100%",
              boxShadow: "none",
              bgcolor: "transparent",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!nameError}
                helperText={nameError}
                autoComplete="name"
                margin="normal"
              />
              <Box>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!emailError}
                helperText={emailError}
                autoComplete="email"
                margin="normal"
              />
              <Button onClick={HandleEmailVerify} variant="contained">Verify</Button>
              </Box>
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
              <PasswordField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                autoComplete="new-password"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone No"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                error={!!phoneError}
                helperText={phoneError}
                autoComplete="tel"
                margin="normal"
              />

              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid || loading} // Button is safely disabled if forms contain invalid data or is loading
                sx={{ mt: 1.5, py: 1.2, fontWeight: "bold" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </PrimaryButton>
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
                Already have an account?
              </Typography>
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
                Login
              </Typography>
            </Box>
          </AuthCard>
        }
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
