// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Container,
//   Grid,
//   FormControl,
//   Paper,
// } from "@mui/material";
// import {
//   validateEmail,
//   validatePassword,
//   validatePhone,
//   validateName,
//   validateConfirmPassword,
//   PasswordField,
// } from "../utils/Validation";
// import AuthCard from "./AuthCard";
// import VerifyOtp from "./VerifyOtp";
// import Login from "./Login";
// import { useNavigate } from "react-router-dom";
// import MainAuthCard from "./MainAuthCard";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNo: "",
//   });
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const emailError = formData.email ? validateEmail(formData.email) : "";
//   const passwordError = formData.password
//     ? validatePassword(formData.password)
//     : "";
//   const confirmPasswordError = formData.confirmPassword
//     ? validateConfirmPassword(formData.confirmPassword)
//     : "";
//   const phoneError = formData.phoneNo ? validatePhone(formData.phoneNo) : "";
//   const nameError = formData.name ? validateName(formData.name) : "";

//   const hasError =
//     formData.name &&
//     formData.email &&
//     formData.phoneNo &&
//     formData.password &&
//     formData.confirmPassword &&
//     !nameError &&
//     !emailError &&
//     !phoneError &&
//     !passwordError &&
//     !confirmPasswordError;

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formData.password !== formData.confirmPassword)
//       return alert("Confirm password must match the password.");

//     console.log("formData :", formData);

//     let otpvalue = Math.floor(Math.random() * 10000);
//     setOtp(otpvalue);
//     console.log("otp :", otpvalue);
//     setShowOtp(true);

//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phoneNo: "",
//     });
//   };
//   console.log("showOtp :", showOtp);
//   console.log("otp :", otp);

//   if (showOtp) {
//     return <VerifyOtp verOtp={otp} />;
//   }

//   return (
//     <Box
//       sx={{
      
//        display:'flex',
//        justifyContent:'center',
//        alignItems:'center',
//        p:2,
//        background: 'linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)',
//   boxShadow: 'inset 0px 4px 20px rgba(74, 27, 241, 0.3)',
 
//       }}
//     >
      
//       <MainAuthCard 
//       leftContent={
//         <Box sx={{
//           width: "100%",
//       maxWidth: 400,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: 1.5,
      
      
//         }}>

//           <Typography variant="h4">PowerBites</Typography>
//           <Typography variant="h6"> welcome to PowerBites</Typography>

//         </Box>
//       } 
//       rightContent={
       
//           <AuthCard title="Sign-Up" sx={{
//           width:'100%',
//           maxWidth:450,
          
//         }}>
//             <Box component="form" onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 error={!!nameError}
//                 helperText={nameError}
//                 autoComplete="name"
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!emailError}
//                 helperText={emailError}
//                 autoComplete="email"
//                 margin="normal"
//               />
//               <PasswordField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type="password"
//                 error={!!passwordError}
//                 helperText={passwordError}
//                 autoComplete="current-password"
//                 margin="normal"
//               />
//               <PasswordField
//                 fullWidth
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 type="password"
//                 error={!!confirmPasswordError}
//                 helperText={confirmPasswordError}
//                 autoComplete="new-password"
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="PhoneNo"
//                 name="phoneNo"
//                 value={formData.phoneNo}
//                 onChange={handleChange}
//                 type="tel"
//                 error={!!phoneError}
//                 helperText={phoneError}
//                 autoComplete="tel"
//                 margin="normal"
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={!hasError}
//                 sx={{ mt: 2 }}
//               >
//                 Register
//               </Button>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "10px",
//                 mt: 2,
//               }}
//             >
//               <Typography>Already have an account?</Typography>
//               <Typography
//                 variant="text"
//                 sx={{
//                   color: "blue",
//                   cursor: "pointer",
//                   textDecoration: "underline",
//                 }}
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </Typography>
//             </Box>
//           </AuthCard>
          
//       } />
//     </Box>
//   );
// }

// export default Register;

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
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

  // Validation Checks
  const nameError = formData.name ? validateName(formData.name) : "";
  const emailError = formData.email ? validateEmail(formData.email) : "";
  const passwordError = formData.password ? validatePassword(formData.password) : "";
  const confirmPasswordError = formData.confirmPassword 
    ? validateConfirmPassword(formData.confirmPassword) 
    : "";
  
  // FIX: Changed formData.phone to formData.phoneNo to match initial state
  const phoneError = formData.phoneNo ? validatePhone(formData.phoneNo) : "";

  // Evaluates to true only if all fields are filled AND contain zero errors
  const isFormValid =
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

    if (formData.password !== formData.confirmPassword) {
      return alert("Confirm password must match the password.");
    }

    console.log("formData :", formData);

    let otpvalue = Math.floor(1000 + Math.random() * 9000); // Generates reliable 4-digit code
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

  if (showOtp) {
    return <VerifyOtp verOtp={otp} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensures complete viewport coverage dynamically
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
              height: "100%", // Inherit matched height from parent Grid layout wrapper
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              p: 4,
              bgcolor: 'rgba(255, 192, 203, 0.15)', // Transparent tint style accent
              color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight="bold">PowerBites</Typography>
            <Typography variant="h6">Welcome to PowerBites schbshdghd</Typography>
          </Box>
        } 
        rightContent={
          <AuthCard 
            title="Sign-Up" 
            sx={{
              width: '100%',
              boxShadow: 'none',
              bgcolor: 'transparent'
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
                disabled={!isFormValid} // Button is safely disabled if forms contain invalid data
                sx={{ mt: 3, py: 1.2, fontWeight: 'bold' }}
              >
                Register
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