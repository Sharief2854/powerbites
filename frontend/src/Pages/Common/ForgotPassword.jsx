import axios from "axios";
import React, { useState } from "react";
import { Box, Button, TextField, FormLabel, Typography, Paper } from "@mui/material";
import VeriftyOtp from "./VeriftyOtp";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      // const user = await axios.post("http://localhost:5000/email/forgot", { email });
      // alert("done");
      // console.log(user);

      const generatedOtp = Math.floor(1000 + Math.random() * 9000);
      setOtp(generatedOtp);
      setLoading(true);
      console.log(generatedOtp);
    } catch (err) {
      console.log(err);
    }
  }

  if (loading === true) {
    return <VeriftyOtp otp={otp} />;
  }

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
          maxWidth: { xs: "100%", sm: 420, md: 450 },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={submit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.4rem", sm: "1.8rem" },
              fontWeight: 600,
              mb: 1,
            }}
          >
            Forgot Password
          </Typography>

          <FormLabel htmlFor="email" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Mail ID
          </FormLabel>

          <TextField
            id="email"
            type="email"
            required
            fullWidth
            label="Enter Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="medium"
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              py: 1.2,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              textTransform: "none",
            }}
          >
            {loading === true ? "Loading..." : "OK"}
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            }}
          >
            Enter your registered email to continue
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;