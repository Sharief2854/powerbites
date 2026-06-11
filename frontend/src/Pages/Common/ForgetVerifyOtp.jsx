import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
//import PasswordChange from "./PasswordChange";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ForgotVerifyOtp() {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const userId = useParams().id;

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setEnteredOtp(value);
    setError("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    if (enteredOtp.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }
    let otp = enteredOtp;
    let res = await axios.post(`http://localhost:4500/resetPass/verifyOtp/${userId}`,{otp});

    console.log("res data :",res.data)

    if (res.status !== 200) {
      setError("Invalid OTP");
      return;
    }

    setVerified(true);
    navigate(`/resetpassword/${userId}`);
  }
  catch(err){
    console.log(err);
  }
  };



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 420 },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: { xs: "1.4rem", sm: "1.8rem" },
            }}
          >
            Verify OTP
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Enter your 4-digit OTP
          </Typography>

          <TextField
            fullWidth
            value={enteredOtp}
            onChange={handleChange}
            label="Enter OTP"
            inputProps={{
              maxLength: 4,
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: {
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "10px",
              },
            }}
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.2,
              textTransform: "none",
            }}
          >
            Verify OTP
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotVerifyOtp;