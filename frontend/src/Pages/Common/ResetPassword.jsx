// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";

// function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const rules = {
//     length: newPassword.length >= 6,
//     upper: /[A-Z]/.test(newPassword),
//     number: /[0-9]/.test(newPassword),
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!rules.length || !rules.upper || !rules.number) {
//       setError("Password does not meet requirements");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     alert("Password updated successfully");
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
//       <Paper sx={{ width: "100%", maxWidth: 420, p: 4 }}>
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Typography variant="h5" textAlign="center">
//             Reset Password
//           </Typography>

//           <TextField
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => {
//               setNewPassword(e.target.value);
//               setError("");
//             }}
//             fullWidth
//           />

//           <Typography color={rules.length ? "success.main" : "text.secondary"} variant="body2">
//             At least 6 characters
//           </Typography>
//           <Typography color={rules.upper ? "success.main" : "text.secondary"} variant="body2">
//             At least 1 uppercase letter
//           </Typography>
//           <Typography color={rules.number ? "success.main" : "text.secondary"} variant="body2">
//             At least 1 number
//           </Typography>

//           <TextField
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.target.value);
//               setError("");
//             }}
//             fullWidth
//           />

//           {error && <Typography color="error">{error}</Typography>}

//           <Button type="submit" variant="contained" fullWidth>
//             Save Password
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default ResetPassword;


import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  validatePassword,
  validateConfirmPassword,
  PasswordField,
} from "../utils/Validation";
import AuthCard from "./AuthCard";
import { useNavigate } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";
import axios from "axios";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation Checks using your centralized utility functions
  const passwordError = formData.password ? validatePassword(formData.password) : "";
  const confirmPasswordError = formData.confirmPassword 
    ? validateConfirmPassword(formData.confirmPassword, formData.password) 
    : "";

  // Evaluates to true only if both fields are filled AND contain zero validation errors
  const isFormValid =
    formData.password &&
    formData.confirmPassword &&
    !passwordError &&
    !confirmPasswordError;

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
    if (formData.password !== formData.confirmPassword) {
      return alert("Confirm password must match the password.");
    }
    let password = formData.password;
    let res = await axios.post(`http://localhost:4500/resetPass/resetpassword/${localStorage.getItem("userId")}`,{password});

    console.log("res data :",res.data)

    console.log("Password Update Request Payload:", formData);
    alert("Password updated successfully!");

    // Clear form fields
    setFormData({
      password: "",
      confirmPassword: "",
    });

    // Automatically route them back to login page upon success
    navigate("/login");
  }
  catch(err){
    console.log(err);
  }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Complete dynamic viewport coverage
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
              height: "50%", // Inherits matched layout scale from parent component
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              p: 4,
              bgcolor: 'rgba(255, 192, 203, 0.15)', // Uniform transparent tint style accent
              color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight="bold">PowerBites</Typography>
            <Typography variant="h6">Welcome to PowerBites</Typography>
          </Box>
        } 
        rightContent={
          <AuthCard 
            title="Reset Password" 
            sx={{
              width: '100%',
              boxShadow: 'none',
              bgcolor: 'transparent'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate>
              
              <PasswordField
                fullWidth
                label="New Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!passwordError}
                helperText={passwordError}
                autoComplete="new-password"
                margin="normal"
              />

              <PasswordField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                autoComplete="new-password"
                margin="normal"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid} // Safe button lockout if checks fail
                sx={{ mt: 3, py: 1.2, fontWeight: 'bold' }}
              >
                Save Password
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
                Remember your credentials?
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

export default ResetPassword;
