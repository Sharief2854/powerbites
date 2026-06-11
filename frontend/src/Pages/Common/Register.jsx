import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  FormControl,
  Paper,
} from "@mui/material";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateConfirmPassword,
  PasswordField,
} from "../utils/Validation";
import AuthCard from "./AuthCard";
import VerifyOtp from "./VerifyOtp";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailError = formData.email ? validateEmail(formData.email) : "";
  const passwordError = formData.password
    ? validatePassword(formData.password)
    : "";
  const confirmPasswordError = formData.confirmPassword
    ? validateConfirmPassword(formData.confirmPassword)
    : "";
  const phoneError = formData.phone ? validatePhone(formData.phoneNo) : "";
  const nameError = formData.name ? validateName(formData.name) : "";

  const hasError =
    formData.name &&
    formData.email &&
    formData.phoneNo &&
    formData.password &&
    formData.confirmPassword &&
    !nameError &&
    !emailError &&
    !phoneError &&
    !passwordError &&
    !confirmPasswordError;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword)
      return alert("Confirm password must match the password.");

    console.log("formData :", formData);

    let otpvalue = Math.floor(Math.random() * 10000);
    setOtp(otpvalue);
    console.log("otp :", otpvalue);
    setShowOtp(true);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNo: "",
    });
  };
  console.log("showOtp :", showOtp);
  console.log("otp :", otp);

  if (showOtp) {
    return <VerifyOtp verOtp={otp} />;
  }

  return (
    <Box
      sx={{
       minHeight:'100vh',
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       bgcolor:'#e0e0e0',
       p:2,
      }}
    >
      <MainAuthCard 
      leftContent={
        <Box sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Typography variant="h4">PowerBites</Typography>
          <Typography variant="h6"> welcome to PowerBites</Typography>

        </Box>
      } 
      rightContent={
        <Box>
          <AuthCard title="Sign-Up">
            <Box component="form" onSubmit={handleSubmit}>
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
              <PasswordField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
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
                type="password"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                autoComplete="new-password"
                margin="normal"
              />
              <TextField
                fullWidth
                label="PhoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                type="tel"
                error={!!phoneError}
                helperText={phoneError}
                autoComplete="tel"
                margin="normal"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!hasError}
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                mt: 2,
              }}
            >
              <Typography>Already have an account?</Typography>
              <Typography
                variant="text"
                sx={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Typography>
            </Box>
          </AuthCard>
          </Box>
      } />
    </Box>
  );
}

export default Register;
