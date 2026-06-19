
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

// function EmailVerify() {
//   const navigate = useNavigate();
  
//   // App States
//   const [formData, setFormData] = useState({
//     email: "",
//   });
  
//   const [verifyLoading, setVerifyLoading] = useState(false);
//   //const [registerLoading, setRegisterLoading] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
  
//   // OTP Verification Popup States
//   const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//   const [otpCode, setOtpCode] = useState("");
//   const [otpLoading, setOtpLoading] = useState(false);
  
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
//   const emailError = formData.email ? validateEmail(formData.email) : "";

//   // Dynamic Validation Conditions
//   const isEmailInputValid = formData.email && !emailError;
  
//   const isFormValid = isEmailVerified;
   

//   // 1. Step One: Trigger Email Verification OTP Request
//   const handleEmailVerifyTrigger = async () => {
//     if (!isEmailInputValid) return;
//     setVerifyLoading(true);
//     try {
//       console.log("email verify")
//       // Adjusted body payload context to dynamically pass the targeted email address
//       let response = await api.post("/auth/verifyEmail", { email: formData.email });
//       console.log("verify email",response.data)
//       showToast("Verification code dispatched to your inbox!", "success");
//       setOtpDialogOpen(true);
//     } catch (err) {
//       console.error(err);
//       showToast(err.response?.data?.message || "Failed sending verification OTP code.", "error");
//     } finally {
//       setVerifyLoading(false);
//     }
//   };

//   // 2. Step Two: Validate dispatched OTP Token
//   const handleConfirmOtpSubmit = async () => {
//     if (!otpCode) return;
//     setOtpLoading(true);
//     try {
//       // Assuming route confirmation maps payload containing destination email address + verification code
//      let response = await api.post("/auth/verifyOtp", {otp: otpCode });
//      console.log("verify otp",response.data)
//       localStorage.setItem("emailtoken",response.data.token)
//       setIsEmailVerified(true);
//       setOtpDialogOpen(false);
//       setOtpCode("");
//       showToast("Email address identity verified successfully!", "success");
//       navigate("/register")
//     } catch (err) {
//       console.error(err);
//       showToast(err.response?.data?.message || "Invalid OTP code entered. Please try again.", "error");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // 3. Final Step: Profile Details Creation Submission
//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   if (!isEmailVerified) {
//   //     return showToast("Please verify your email address configuration first.", "error");
//   //   }
//   //   if (formData.password !== formData.confirmPassword) {
//   //     return showToast("Passwords do not match. Please cross-reference field inputs.", "error");
//   //   }

//   //   setRegisterLoading(true);
//   //   try {
//   //     const registrationPayload = {
//   //       name: formData.name,
//   //       email: formData.email,
//   //       phone: formData.phone,
//   //       password: formData.password,
//   //     };

//   //     let res = await api.post("/auth/register", registrationPayload,{
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("emailtoken")}`,
//   //       },
//   //     });
//   //     //localStorage.setItem("userId", res.data.result?._id);

//   //     setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
//   //     setIsEmailVerified(false);
      
//   //     showToast(res.data.message || "Account created successfully!", "success");
//   //     setTimeout(() => navigate("/login"), 1500);
//   //   } catch (err) {
//   //     console.error(err.response?.data);
//   //     showToast(err.response?.data?.message || "Registration task failed.", "error");
//   //     if (err.response?.data?.existingUser) {
//   //       setTimeout(() => navigate("/login"), 1500);
//   //     }
//   //   } finally {
//   //     setRegisterLoading(false);
//   //   }
//   // };

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
//             <Box component="form" onSubmit={handleEmailVerifyTrigger} noValidate>
              
//               {/* Dynamic Email Section with Interactive Verification Button */}
//               <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1 }}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   error={!!emailError}
//                   helperText={emailError || (isEmailVerified ? "Email secured and locked." : "")}
//                   autoComplete="email"
//                   disabled={isEmailVerified}
//                   margin="dense"
//                 />
//                 {!isEmailVerified && (
//                   <Button 
//                   type="submit"
//                     //onClick={handleEmailVerifyTrigger} 
//                     variant="contained" 
//                     disabled={!isEmailInputValid || verifyLoading}
//                     sx={{ mt: 1.5, py: 1.2, bgcolor: '#4A1BF1', textTransform: 'none' }}
//                   >
//                     {verifyLoading ? <CircularProgress size={20} color="inherit" /> : "Verify"}
//                   </Button>
//                 )}
//               </Box>
// {/* 
//               <PrimaryButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={!isFormValid || registerLoading}
//                 sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
//               >
//                 {registerLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
//               </PrimaryButton> */}
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
//       <Dialog 
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
//       </Dialog>

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

// export default EmailVerify;


import React, { useState } from "react";
import { 
  Box, Typography, TextField, CircularProgress, Snackbar, Alert, Button, Stack
} from "@mui/material";
import { validateEmail } from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import MainAuthCard from "./MainAuthCard";
import AuthCard from "./AuthCard";
import api from "../../api/axiosConfig";

function EmailVerify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const emailError = email ? validateEmail(email) : "";
  const isFormValid = email && !emailError;

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      await api.post("/auth/verifyEmail", { email });
      showToast("Verification code dispatched to your inbox!", "success");
      
      // Clear naming pattern to avoid collisions
      localStorage.setItem("powerbites_verified_email", email);
      
      setTimeout(() => navigate("/verify-otp"), 1200);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed sending verification OTP code.", "error");
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
          <Stack sx={{ maxWidth: 360, width: "100%", textAlign: "center", color: "#fff", px: 2 }} spacing={2}>
            <Typography variant="h3" fontWeight={800} letterSpacing={-0.5}>PowerBites</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#facc15' }}>
              Let's Secure Your Account
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
              Discover premium dry fruits and healthy snacks, delivered fresh to your door. Enter your email address to get started.
            </Typography>
          </Stack>
        }
        rightContent={
          <AuthCard title="Verify Email" sx={{ width: "100%", boxShadow: "none", bgcolor: "transparent" }}>
            <Box component="form" onSubmit={handleEmailSubmit} noValidate sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please share your email address to receive your 6-digit dynamic authentication pass.
              </Typography>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                autoComplete="email"
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid || loading}
                sx={{ mt: 3, py: 1.3, fontWeight: 700, bgcolor: '#4A1BF1', textTransform: 'none', borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send Verification Pass"}
              </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 4 }}>
              <Typography variant="body2" color="text.secondary">Already have an account?</Typography>
              <Typography
                variant="body2"
                sx={{ color: "#4A1BF1", fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
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

export default EmailVerify;
