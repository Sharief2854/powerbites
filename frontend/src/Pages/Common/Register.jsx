import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
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

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        return alert("Confirm password must match the password.");
      }

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
      alert(res.data.message);
      navigate(`/verifyOtp/${localStorage.getItem("userId")}`);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
      if (err.response.data.existingUser) {
        navigate(`/login`)
      }
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
                disabled={!isFormValid} // Button is safely disabled if forms contain invalid data
                sx={{ mt: 1.5, py: 1.2, fontWeight: "bold" }}
              >
                Register
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
     
    </Box>
  );
}

export default Register;
