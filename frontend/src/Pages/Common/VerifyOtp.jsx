// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Typography,
// //   TextField,
// //   CircularProgress,
// //   Snackbar,
// //   Alert
// // } from "@mui/material";
// // import { validateOtp } from "../utils/Validation";
// // import AuthCard from "./AuthCard";
// // import { useNavigate, useParams } from "react-router-dom";
// // import MainAuthCard from "./MainAuthCard";
// // import axios from "axios";
// // import api from "../../api/axiosConfig";

// // function VerifyOtp() {
// //   const [otp, setOtp] = useState("");
// //    const [loading, setLoading] = useState(false);
// //    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
   
// //   const navigate = useNavigate();
// //   let userId = useParams().id
// //   // Validation Checks using your centralized utility functions
// //   const otpError = otp ? validateOtp(otp) : "";
// //   const handleCloseSnackbar = (event, reason) => {
// //     if (reason === 'clickaway') return;
// //     setSnackbar((prev) => ({ ...prev, open: false }));
// //   };


// //   // Evaluates to true only if OTP is typed and contains zero validation errors
// //   const isFormValid = otp && !otpError;

// //   const handleSubmit = async(event) => {
// //     event.preventDefault();
// //     setLoading(true);
// //     try {
// //     // console.log("Entered otp:", otp, "type:", typeof otp);
// //     // console.log("Expected verOtp:", verOtp, "type:", typeof verOtp);

// //     let res = await api.post(`http://localhost:4500/auth/verifyOtp/${userId}`,{otp});
    
// //     console.log("res data :",res.data)
// //     if (res.data.message !== "OTP verified successfully") {
// //       setSnackbar({ open: true, message: "Invalid OTP. Please check the code and try again.", severity: "error" });
// //       return;
// //     }
// //     console.log("OTP verification successful!");
// //     setSnackbar({ open: true, message: "Account verified successfully! Redirecting to login...", severity: "success" });
    
// //     // Clear form field
// //     setOtp("");

// //     // Route them smoothly back to the login page upon success
// //     setTimeout(() => navigate("/register"), 1500);
// //     } catch(err) {
// //       console.log(err.response?.data?.message);
// //       setSnackbar({ open: true, message: err.response?.data?.message || "Verification failed. Please try again.", severity: "error" });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(()=>{
// //     userId = localStorage.getItem("userId");
// //     console.log("userId :",userId);

// //   },[])

// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         minHeight: "100vh", // Complete dynamic viewport coverage
// //         p: 2,
// //         background: "linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)",
// //         boxShadow: "inset 0px 4px 20px rgba(74, 27, 241, 0.3)",
// //       }}
// //     >
// //       <MainAuthCard
// //         leftContent={
// //           <Box
// //             sx={{
// //                maxWidth: 350,
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
// //             <Typography variant="h4" fontWeight="bold">PowerBites</Typography>
// //             <Typography variant="h6">Welcome to PowerBites</Typography>
// //           </Box>
// //         }
// //         rightContent={
// //           <AuthCard
// //             title="Verify OTP"
// //             sx={{
// //               width: "100%",
// //               boxShadow: "none",
// //               bgcolor: "transparent",
// //             }}
// //           >
// //             <Box component="form" onSubmit={handleSubmit} noValidate>
// //               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                 A verification code has been generated. Please enter it below to verify your account.
// //               </Typography>

// //               <TextField
// //                 fullWidth
// //                 label="Enter OTP"
// //                 name="otp"
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value)}
// //                 error={!!otpError} // FIX: Changed from !!otp so it doesn't stay red continuously
// //                 helperText={otpError} // Displays your custom validation message
// //                 autoComplete="one-time-code"
// //                 margin="normal"
// //                 slotProps={{ htmlInput: { maxLength: 6 } }} // Limits standard input length if needed
// //               />

// //               <Button
// //                 type="submit"
// //                 fullWidth
// //                 variant="contained"
// //                 disabled={!isFormValid || loading} // Safe button lockout if checks fail
// //                 sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
// //               >
// //                 {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
// //               </Button>
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
// //                 Back to sign up?
// //               </Typography>
// //               <Typography
// //                 variant="body2"
// //                 sx={{
// //                   color: "#4A1BF1",
// //                   fontWeight: "bold",
// //                   cursor: "pointer",
// //                   "&:hover": { textDecoration: "underline" },
// //                 }}
// //                 onClick={() => navigate("/register")} // Safely fall back if they want to escape
// //               >
// //                 Register
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

// // export default VerifyOtp;

// import React, { useEffect, useState, useRef } from "react";
// import { Box, Button, Typography, CircularProgress, Snackbar, Alert, Paper, Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
// import api from "../../api/axiosConfig";

// function VerifyOtp() {
//   const navigate = useNavigate();
//   const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [targetEmail, setTargetEmail] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
//   // Create refs array to control pointer focus shifting programmatically
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("powerbites_verified_email");
//     if (!savedEmail) {
//       navigate("/verify-email");
//     } else {
//       setTargetEmail(savedEmail);
//     }
//   }, [navigate]);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   // Handle single key inputs, character insertions, and pointer direction shifts
//   const handleOtpChange = (element, index) => {
//     const value = element.value.replace(/[^0-9]/g, ""); // Allow numeric entries only
//     if (!value) return;

//     const updatedOtp = [...otpArray];
//     // Always map the last typed item context if a double tap occurs
//     updatedOtp[index] = value.substring(value.length - 1);
//     setOtpArray(updatedOtp);

//     // Dynamic focus forward shift
//     if (index < 5 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Gracefully clear backward elements on Backspace click
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const updatedOtp = [...otpArray];
      
//       if (otpArray[index] === "") {
//         // If block is already blank, shift back and wipe out the preceding value
//         if (index > 0 && inputRefs.current[index - 1]) {
//           updatedOtp[index - 1] = "";
//           setOtpArray(updatedOtp);
//           inputRefs.current[index - 1].focus();
//         }
//       } else {
//         // Wipe local index value first
//         updatedOtp[index] = "";
//         setOtpArray(updatedOtp);
//       }
//     }
//   };

//   // Support clean copy-pasting across all desktop/mobile form entries
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");
    
//     if (pasteData.length === 6) {
//       const pasteArray = pasteData.split("").slice(0, 6);
//       setOtpArray(pasteArray);
//       inputRefs.current[5].focus(); // Drop active pointer index focus straight to the end block
//     }
//   };

//   const fullOtpString = otpArray.join("");
//   const isFormValid = fullOtpString.length === 6;

//   const handleOtpSubmit = async (event) => {
//     event.preventDefault();
//     if (!isFormValid) return;

//     setLoading(true);
//     try {
//       const response = await api.post("/auth/verifyOtp", { otp: fullOtpString });
      
//       localStorage.setItem("powerbites_auth_handshake_token", response.data.token);
      
//       setOtpArray(new Array(6).fill(""));
//       setSnackbar({ open: true, message: "Security pass authenticated! Loading registration workspace...", severity: "success" });
      
//       setTimeout(() => navigate("/register"), 1500);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: err.response?.data?.message || "Invalid or expired code token.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         p: { xs: 2, sm: 3 },
//         background: "linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)",
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           maxWidth: 460,
//           width: "100%",
//           p: { xs: 3, sm: 5 },
//           borderRadius: 4,
//           border: "1px solid rgba(255, 255, 255, 0.12)",
//           bgcolor: "background.paper",
//           boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.25)",
//           textAlign: "center"
//         }}
//       >
//         <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
//           <Box sx={{ p: 2, bgcolor: "rgba(74, 27, 241, 0.08)", color: "#4A1BF1", borderRadius: "50%", display: "flex" }}>
//             <MarkEmailReadOutlinedIcon sx={{ fontSize: 32 }} />
//           </Box>
//           <Typography variant="h5" fontWeight={800} sx={{ color: "#101828" }}>
//             Verify Your Email
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ px: { sm: 2 }, lineHeight: 1.5 }}>
//             We sent a verification passcode code to <br />
//             <strong style={{ color: "#344054" }}>{targetEmail || "your inbox"}</strong>.
//           </Typography>
//         </Stack>

//         <Box component="form" onSubmit={handleOtpSubmit} noValidate>
          
//           {/* MuiOtpInput Emulated Segmented Box Container Grid */}
//           <Box 
//             onPaste={handlePaste}
//             sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               gap: { xs: 1, sm: 1.5 }, 
//               my: 4 
//             }}
//           >
//             {otpArray.map((digit, index) => (
//               <Box
//                 component="input"
//                 key={index}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 onChange={(e) => handleOtpChange(e.target, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 sx={{
//                   width: { xs: 42, sm: 50 },
//                   height: { xs: 46, sm: 54 },
//                   textAlign: "center",
//                   fontSize: "1.25rem",
//                   fontWeight: 700,
//                   color: "#101828",
//                   borderRadius: 2,
//                   border: digit ? "2px solid #4A1BF1" : "1px solid #d0d5dd",
//                   outline: "none",
//                   backgroundColor: "#fff",
//                   boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
//                   transition: "all 0.15s ease",
//                   "&:focus": {
//                     border: "2px solid #4A1BF1",
//                     boxShadow: "0px 0px 0px 4px rgba(74, 27, 241, 0.12)"
//                   }
//                 }}
//               />
//             ))}
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={!isFormValid || loading}
//             sx={{ mt: 2, py: 1.3, fontWeight: 700, borderRadius: 2, textTransform: "none", bgcolor: '#4A1BF1' }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Continue"}
//           </Button>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 4 }}>
//           <Typography variant="body2" color="text.secondary">Mistyped your email address?</Typography>
//           <Typography
//             variant="body2"
//             sx={{ color: "#4A1BF1", fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
//             onClick={() => navigate("/verify-email")}
//           >
//             Change Email
//           </Typography>
//         </Box>
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
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

// export default VerifyOtp;

import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress, Snackbar, Alert, Paper, Stack } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input"; // Imported native package hook
import { useNavigate } from "react-router-dom";
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import api from "../../api/axiosConfig";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const savedEmail = localStorage.getItem("powerbites_verified_email");
    if (!savedEmail) {
      navigate("/verify-email");
    } else {
      setTargetEmail(savedEmail);
    }
  }, [navigate]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleOtpChange = (newValue) => {
    // Basic regex validation check mapping numerical characters only
    const cleanValue = newValue.replace(/[^0-9]/g, "");
    setOtp(cleanValue);
  };

  const isFormValid = otp.length === 4;

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const response = await api.post("/auth/verifyOtp", { otp });
      
      localStorage.setItem("powerbites_auth_handshake_token", response.data.token);
      
      setOtp("");
      setSnackbar({ open: true, message: "Security pass authenticated! Loading registration workspace...", severity: "success" });
      
      setTimeout(() => navigate("/register"), 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: err.response?.data?.message || "Invalid or expired code token.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: { xs: 2, sm: 3 },
        background: "linear-gradient(135deg, #3654F4 0%, #4A1BF1 40%, #3C1A77 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 460,
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          bgcolor: "background.paper",
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.25)",
          textAlign: "center"
        }}
      >
        <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Box sx={{ p: 2, bgcolor: "rgba(74, 27, 241, 0.08)", color: "#4A1BF1", borderRadius: "50%", display: "flex",justifyContent:'center',gap:2 }}>
            <MarkEmailReadOutlinedIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={800} sx={{ color: "#101828"  }}>
            Verify Your Email
          </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ px: { sm: 2 }, lineHeight: 1.5 }}>
            We sent a verification passcode code to <br />
            <strong style={{ color: "#344054" }}>{targetEmail || "your inbox"}</strong>.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleOtpSubmit} noValidate>
          
          {/* Integrated Clean Package Implementation Component */}
          <MuiOtpInput
            value={otp}
            onChange={handleOtpChange}
            length={4}
            validateChar={(val) => !isNaN(Number(val))} // Block non-numeric data types directly
            sx={{
              gap: { xs: 1, sm: 1.5 },
              my: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: { xs: 46, sm: 54 },
                bgcolor: "#fff",
                transition: "all 0.15s ease",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4A1BF1",
                  borderWidth: "2px",
                  boxShadow: "0px 0px 0px 4px rgba(74, 27, 241, 0.12)"
                }
              },
              "& .MuiOutlinedInput-input": {
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#101828",
                p: 0
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid || loading}
            sx={{ mt: 2, py: 1.3, fontWeight: 700, borderRadius: 2, textTransform: "none", bgcolor: '#4A1BF1' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Continue"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 4 }}>
          <Typography variant="body2" color="text.secondary">Mistyped your email address?</Typography>
          <Typography
            variant="body2"
            sx={{ color: "#4A1BF1", fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            onClick={() => navigate("/verify-email")}
          >
            Change Email
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default VerifyOtp;
