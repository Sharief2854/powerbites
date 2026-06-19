// // import React, { useState } from "react";
// // import { Box, Button, Typography, TextField, CircularProgress, Snackbar, Alert } from "@mui/material";
// // import {
// //   validateEmail,
// //   validatePassword,
// //   validatePhone,
// //   validateName,
// //   validateConfirmPassword,
// //   PasswordField,
// // } from "../utils/Validation";
// // import AuthCard from "./AuthCard";
// // import axios from "axios";
// // import VerifyOtp from "./VerifyOtp";
// // import { useNavigate } from "react-router-dom";
// // import MainAuthCard from "./MainAuthCard";
// // import { PrimaryButton } from "../../Components/Common/Buttons";
// // import api from "../../api/axiosConfig";


// // function Register() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// //   const navigate = useNavigate();

// //   const handleCloseSnackbar = (event, reason) => {
// //     if (reason === 'clickaway') return;
// //     setSnackbar((prev) => ({ ...prev, open: false }));
// //   };

// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   // Validation Checks
// //   const nameError = formData.name ? validateName(formData.name) : "";
// //   const emailError = formData.email ? validateEmail(formData.email) : "";
// //   const passwordError = formData.password
// //     ? validatePassword(formData.password)
// //     : "";
// //   const confirmPasswordError = formData.confirmPassword
// //     ? validateConfirmPassword(formData.confirmPassword)
// //     : "";

// //   // FIX: Changed formData.phone to formData.phone to match initial state
// //   const phoneError = formData.phone ? validatePhone(formData.phone) : "";

// //   // Evaluates to true only if all fields are filled AND contain zero errors
// //   const isFormValid =
// //     formData.name &&
// //     formData.email &&
// //     formData.phone &&
// //     formData.password &&
// //     formData.confirmPassword &&
// //     !nameError &&
// //     !emailError &&
// //     !phoneError &&
// //     !passwordError &&
// //     !confirmPasswordError;

// //   const HandleEmailVerify =async()=>{

// //     try {

// //       let rresponse = await api.post("/auth/verifyEmail")
// //       console.log("response register :",response.data)


// //     }
// //     catch(err){
// //       console.log(err.response.data)
// //     }

// //   }

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     if (formData.password !== formData.confirmPassword) {
// //       return setSnackbar({ open: true, message: "Passwords do not match. Please try again.", severity: "error" });
// //     }

// //     setLoading(true);
// //     try {
// //       let obj = {
// //         name: formData.name,
// //         email: formData.email,
// //         phone: formData.phone,
// //         password: formData.password,
// //       };

// //       console.log("formData :", obj);

// //       let res = await api.post("/auth/register", obj);

// //       console.log("res data :", res.data);

// //       localStorage.setItem("userId", res.data.result._id);

// //       setFormData({
// //         name: "",
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //         phone: "",
// //       });
// //       setSnackbar({ open: true, message: res.data.message || "Account created successfully! Please verify your email.", severity: "success" });
// //       setTimeout(() => navigate(`/verifyOtp/${localStorage.getItem("userId")}`), 1500);
// //     } catch (err) {
// //       console.log(err.response?.data);
// //       setSnackbar({ open: true, message: err.response?.data?.message || "Registration failed. Please try again.", severity: "error" });
  
// //       setTimeout(() => {
// //         if (err.response?.data?.existingUser) {
// //           navigate(`/login`);
// //         }
// //       }, 1500);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box 
//       // sx={{ 
//       //   width: '100%', 
//       //   minHeight: '100%', 
//       //   background: 'linear-gradient(180deg, #3519B3 0%, #1E1154 100%)', // Matches the outer display mockup fill
//       //   display: 'flex', 
//       //   alignItems: 'center', 
//       //   justifyContent: 'center',
//       //   p: 3
//       // }}
// //     >
      
// //       <MainAuthCard 
      
// //         leftContent={
// //           <Box
// //             sx={{
// //               maxWidth: 350,
// //               width: "100%",
// //               height: "100%", 
// //               flex: 1, // Tells the box to grow and fill the parent flex container
// //               display: "flex",
// //               flexDirection: "column",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               gap: 1.5,
// //             }}
// //           >
// //             <Typography variant="h4" fontWeight="bold">
// //               PowerBites
// //             </Typography>
// //             <Typography variant="h6">Welcome to PowerBites </Typography>
// //           </Box>
// //         }
// //         rightContent={
// //           <AuthCard
// //             title="Sign-Up"
// //             sx={{
// //               width: "100%",
// //               boxShadow: "none",
// //               bgcolor: "transparent",
// //             }}
// //           >
// //             <Box component="form" onSubmit={handleSubmit} noValidate>
// //               <TextField
// //                 fullWidth
// //                 label="Name"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 error={!!nameError}
// //                 helperText={nameError}
// //                 autoComplete="name"
// //                 margin="normal"
// //               />
// //               <Box>
// //               <TextField
// //                 fullWidth
// //                 label="Email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 error={!!emailError}
// //                 helperText={emailError}
// //                 autoComplete="email"
// //                 margin="normal"
// //               />
// //               <Button onClick={HandleEmailVerify} variant="contained">Verify</Button>
// //               </Box>
// //               <PasswordField
// //                 fullWidth
// //                 label="Password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 error={!!passwordError}
// //                 helperText={passwordError}
// //                 autoComplete="current-password"
// //                 margin="normal"
// //               />
// //               <PasswordField
// //                 fullWidth
// //                 label="Confirm Password"
// //                 name="confirmPassword"
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 error={!!confirmPasswordError}
// //                 helperText={confirmPasswordError}
// //                 autoComplete="new-password"
// //                 margin="normal"
// //               />
// //               <TextField
// //                 fullWidth
// //                 label="Phone No"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 type="tel"
// //                 error={!!phoneError}
// //                 helperText={phoneError}
// //                 autoComplete="tel"
// //                 margin="normal"
// //               />

// //               <PrimaryButton
// //                 type="submit"
// //                 fullWidth
// //                 variant="contained"
// //                 disabled={!isFormValid || loading} // Button is safely disabled if forms contain invalid data or is loading
// //                 sx={{ mt: 1.5, py: 1.2, fontWeight: "bold" }}
// //               >
// //                 {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
// //               </PrimaryButton>
// //             </Box>

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 gap: "8px",
// //                 mt: 3,
// //               }}
// //             >
// //               <Typography variant="body2" color="text.secondary">
// //                 Already have an account?
// //               </Typography>
// //               <Typography
// //                 variant="body2"
// //                 sx={{
// //                   color: "#4A1BF1",
// //                   fontWeight: "bold",
// //                   cursor: "pointer",
// //                   "&:hover": { textDecoration: "underline" },
// //                 }}
// //                 onClick={() => navigate("/login")}
// //               >
// //                 Login
// //               </Typography>
// //             </Box>
// //           </AuthCard>
// //         }
// //       />
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // }

// // export default Register;



// import React, { useState } from "react";
// import { 
//   Box, Typography, TextField, CircularProgress, Snackbar, Alert, Button,
//   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
// } from "@mui/material";
// import {
//   validateEmail,
//   validatePassword,
//   validatePhone,
//   validateName,
//   validateConfirmPassword,
//   PasswordField,
// } from "../utils/Validation";
// import { useNavigate } from "react-router-dom";
// import MainAuthCard from "./MainAuthCard";
// import AuthCard from "./AuthCard";
// import { PrimaryButton } from "../../Components/Common/Buttons";
// import api from "../../api/axiosConfig";

// function Register() {
//   const navigate = useNavigate();
  
//   // App States
//   const [formData, setFormData] = useState({
//     name: "",
//    // email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//   });
  
//   const [verifyLoading, setVerifyLoading] = useState(false);
//   const [registerLoading, setRegisterLoading] = useState(false);
//   //const [isEmailVerified, setIsEmailVerified] = useState(false);
  
//   // OTP Verification Popup States
//   // const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//   // const [otpCode, setOtpCode] = useState("");
//   // const [otpLoading, setOtpLoading] = useState(false);
  
//   // Notification State
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const showToast = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Field Synchronous Validation Checks
//   const nameError = formData.name ? validateName(formData.name) : "";
//   //const emailError = formData.email ? validateEmail(formData.email) : "";
//   const passwordError = formData.password ? validatePassword(formData.password) : "";
//   const confirmPasswordError = formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword) : "";
//   const phoneError = formData.phone ? validatePhone(formData.phone) : "";

//   // Dynamic Validation Conditions
//   //const isEmailInputValid = formData.email && !emailError;
  
//   const isFormValid =
//     formData.name &&
//     formData.phone &&
//     formData.password &&
//     formData.confirmPassword &&
//     !nameError &&
//     !phoneError &&
//     !passwordError &&
//     !confirmPasswordError;

//   // 1. Step One: Trigger Email Verification OTP Request
//   // const handleEmailVerifyTrigger = async () => {
//   //   if (!isEmailInputValid) return;
//   //   setVerifyLoading(true);
//   //   try {
//   //     console.log("email verify")
//   //     // Adjusted body payload context to dynamically pass the targeted email address
//   //     let response = await api.post("/auth/verifyEmail", { email: formData.email });
//   //     console.log("verify email",response.data)
//   //     showToast("Verification code dispatched to your inbox!", "success");
//   //     setOtpDialogOpen(true);
//   //   } catch (err) {
//   //     console.error(err);
//   //     showToast(err.response?.data?.message || "Failed sending verification OTP code.", "error");
//   //   } finally {
//   //     setVerifyLoading(false);
//   //   }
//   // };

//   // // 2. Step Two: Validate dispatched OTP Token
//   // const handleConfirmOtpSubmit = async () => {
//   //   if (!otpCode) return;
//   //   setOtpLoading(true);
//   //   try {
//   //     // Assuming route confirmation maps payload containing destination email address + verification code
//   //    let response = await api.post("/auth/verifyOtp", {otp: otpCode });
//   //    console.log("verify otp",response.data)
//   //     localStorage.setItem("emailtoken",response.data.token)
//   //     setIsEmailVerified(true);
//   //     setOtpDialogOpen(false);
//   //     setOtpCode("");
//   //     showToast("Email address identity verified successfully!", "success");
//   //   } catch (err) {
//   //     console.error(err);
//   //     showToast(err.response?.data?.message || "Invalid OTP code entered. Please try again.", "error");
//   //   } finally {
//   //     setOtpLoading(false);
//   //   }
//   // };

//   // 3. Final Step: Profile Details Creation Submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // if (!isEmailVerified) {
//     //   return showToast("Please verify your email address configuration first.", "error");
//     // }
//     if (formData.password !== formData.confirmPassword) {
//       return showToast("Passwords do not match. Please cross-reference field inputs.", "error");
//     }

//     setRegisterLoading(true);
//     try {
//       const registrationPayload = {
//         name: formData.name,
//         email: email,
//         phone: formData.phone,
//         password: formData.password,
//       };

//       let res = await api.post("/auth/register", registrationPayload,{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("emailtoken")}`,
//         },
//       });
//       //localStorage.setItem("userId", res.data.result?._id);

//       setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
//       setIsEmailVerified(false);
      
//       showToast(res.data.message || "Account created successfully!", "success");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       console.error(err.response?.data);
//       showToast(err.response?.data?.message || "Registration task failed.", "error");
//       if (err.response?.data?.existingUser) {
//         setTimeout(() => navigate("/login"), 1500);
//       }
//     } finally {
//       setRegisterLoading(false);
//     }
//   };

//   return (
//     <Box 
//       sx={{ 
//         width: '100%', 
//         //height:'100vh',
//         minHeight: '100%', 
//         background: 'linear-gradient(180deg, #3519B3 0%, #1E1154 100%)', // Matches the outer display mockup fill
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center',
//         p: 3
//       }}
//     >
//       <MainAuthCard 
//         leftContent={
//           <Box sx={{ maxWidth: 350, width: "100%", textAlign: "center", color: "#fff" }}>
//             <Typography variant="h4" fontWeight="bold" gutterBottom>PowerBites</Typography>
//             <Typography
//               variant="h5" // Slightly larger than h6 for more impact
//               sx={{
//                 fontWeight: 600, // A bit bolder
//                 lineHeight: 1.3,
//                 mb: 1, // Add some margin bottom
//                 color: 'secondary.main', // Assuming secondary.main is a contrasting accent color (e.g., yellow/orange)
//                 textShadow: '0px 0px 8px rgba(255,255,255,0.3)' // Subtle glow effect
//               }}
//             >
//               Fuel Your Day with Nature's Best!
//             </Typography>
//             <Typography
//               variant="body1" // Standard body text
//               sx={{
//                 opacity: 0.9, // Slightly transparent white for a softer look
//                 lineHeight: 1.6,
//                 fontSize: '0.95rem', // Slightly smaller for descriptive text
//                 color: 'rgba(255,255,255,0.9)'
//               }}
//             >
//               Discover premium dry fruits and healthy snacks, delivered fresh to your door.
//             </Typography>
//           </Box>
//         }
//         rightContent={
//           <AuthCard title="Sign-Up" sx={{ width: "100%", boxShadow: "none", bgcolor: "transparent" }}>
//             <Box component="form" onSubmit={handleSubmit} noValidate>
              
//               {/* Dynamic Email Section with Interactive Verification Button */}
//               <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1 }}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={"formData.email"}
//                   //onChange={handleChange}
//                  // error={!!emailError}
//                   //helperText={emailError || (isEmailVerified ? "Email secured and locked." : "")}
//                   autoComplete="email"
//                   //disabled={isEmailVerified}
//                   margin="dense"
//                 />
//                 {/* {!isEmailVerified && (
//                   <Button 
//                     onClick={handleEmailVerifyTrigger} 
//                     variant="contained" 
//                     disabled={!isEmailInputValid || verifyLoading}
//                     sx={{ mt: 1.5, py: 1.2, bgcolor: '#4A1BF1', textTransform: 'none' }}
//                   >
//                     {verifyLoading ? <CircularProgress size={20} color="inherit" /> : "Verify"}
//                   </Button>
//                 )} */}
//               </Box>

//               {/* Dependent Profile Fields - Enabled Only After Email Verification passes */}
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
//                // disabled={!isEmailVerified}
//               />
              
//               <PasswordField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={!!passwordError}
//                 helperText={passwordError}
//                 autoComplete="current-password"
//                 margin="normal"
//                 //disabled={!isEmailVerified}
//               />
              
//               <PasswordField
//                 fullWidth
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 error={!!confirmPasswordError}
//                 helperText={confirmPasswordError}
//                 autoComplete="new-password"
//                 margin="normal"
//                 //disabled={!isEmailVerified}
//               />
              
//               <TextField
//                 fullWidth
//                 label="Phone No"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 type="tel"
//                 error={!!phoneError}
//                 helperText={phoneError}
//                 autoComplete="tel"
//                 margin="normal"
//                 //disabled={!isEmailVerified}
//               />

//               <PrimaryButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={!isFormValid || registerLoading}
//                 sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
//               >
//                 {registerLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
//               </PrimaryButton>
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", mt: 3 }}>
//               <Typography variant="body2" color="text.secondary">Already have an account?</Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ color: "#4A1BF1", fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </Typography>
//             </Box>
//           </AuthCard>
//         }
//       />

//       {/* Dynamic Pop-up OTP Overlay Box */}
//       {/* <Dialog 
//         open={otpDialogOpen} 
//         onClose={() => setOtpDialogOpen(false)}
//         PaperProps={{ sx: { borderRadius: 3, p: 1, maxWidth: 400 } }}
//       >
//         <DialogTitle fontWeight={700}>Verify Your Email</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ mb: 2 }}>
//             We sent a validation code to <strong>{formData.email}</strong>. Please enter the verification token code below to unlock registration.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             fullWidth
//             label="One-Time Password (OTP)"
//             value={otpCode}
//             onChange={(e) => setOtpCode(e.target.value)}
//             margin="dense"
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2 }}>
//           <Button onClick={() => setOtpDialogOpen(false)} disabled={otpLoading} sx={{ textTransform: 'none' }}>
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleConfirmOtpSubmit} 
//             color="primary" 
//             variant="contained" 
//             disabled={!otpCode || otpLoading}
//             sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#4A1BF1' }}
//           >
//             {otpLoading ? <CircularProgress size={20} color="inherit" /> : "Confirm Code"}
//           </Button>
//         </DialogActions>
//       </Dialog> */}

//       {/* Snackbar Alert */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default Register;

import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, CircularProgress, Snackbar, Alert, Stack, Button } from "@mui/material";
import {
  validatePassword, validatePhone, validateName, validateConfirmPassword, PasswordField
} from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";
import AuthCard from "./AuthCard";
import api from "../../api/axiosConfig";

function Register() {
  const navigate = useNavigate();
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  useEffect(() => {
    const activeEmail = localStorage.getItem("powerbites_verified_email");
    const securityToken = localStorage.getItem("powerbites_auth_handshake_token");
    
    if (!activeEmail || !securityToken) {
      setSnackbar({ open: true, message: "Session tracing timeline invalid. Re-routing to entry.", severity: "error" });
      setTimeout(() => navigate("/verify-email"), 2000);
    } else {
      setVerifiedEmail(activeEmail);
    }
  }, [navigate]);

  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nameError = formData.name ? validateName(formData.name) : "";
  const passwordError = formData.password ? validatePassword(formData.password) : "";
  const confirmPasswordError = formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword) : "";
  const phoneError = formData.phone ? validatePhone(formData.phone) : "";

  const isFormValid =
    formData.name &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    !nameError &&
    !phoneError &&
    !passwordError &&
    !confirmPasswordError;

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match.", "error");
    }

    setLoading(true);
    try {
      const registrationPayload = {
        name: formData.name,
        email: verifiedEmail,
        phone: formData.phone,
        password: formData.password,
      };

      await api.post("/auth/register", registrationPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("powerbites_auth_handshake_token")}`,
        },
      });

      showToast("Account created successfully!", "success");
      
      // Complete cleanup of temporary storage keys
      localStorage.removeItem("powerbites_verified_email");
      localStorage.removeItem("powerbites_auth_handshake_token");

      setFormData({ name: "", password: "", confirmPassword: "", phone: "" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Account creation failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        background: 'linear-gradient(180deg, #3519B3 0%, #1E1154 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: { xs: 2, sm: 3 }
      }}
    >
      <MainAuthCard 
        leftContent={
          <Stack sx={{ maxWidth: 350, width: "100%", textAlign: "center", color: "#fff", px: 2 }} spacing={2}>
            <Typography variant="h3" fontWeight={800}>PowerBites</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#4ade80' }}>
              Finalize Your Profile
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
              Your communication email channel has been successfully confirmed. Wrap up your basic profile data parameters below.
            </Typography>
          </Stack>
        }
        rightContent={
          <AuthCard title="Create Profile" sx={{ width: "100%", boxShadow: "none", bgcolor: "transparent" }}>
            <Box component="form" onSubmit={handleProfileSubmit} noValidate sx={{ mt: 1 }}>
              
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={verifiedEmail}
                disabled
                margin="normal"
              />

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!nameError}
                helperText={nameError}
                autoComplete="name"
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                error={!!phoneError}
                helperText={phoneError}
                autoComplete="tel"
                margin="normal"
                required
              />

              <PasswordField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!passwordError}
                helperText={passwordError}
                autoComplete="new-password"
                margin="normal"
                required
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
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid || loading}
                sx={{ mt: 4, py: 1.3, fontWeight: "bold", borderRadius: 2, bgcolor: '#4A1BF1' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Complete Registration"}
              </Button>
            </Box>
          </AuthCard>
        }
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
