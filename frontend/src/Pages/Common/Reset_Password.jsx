import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Reset_Password() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const rules = {
    length: newPassword.length >= 6,
    upper: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rules.length || !rules.upper || !rules.number) {
      setError("Password does not meet requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    alert("Password updated successfully");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Paper sx={{ width: "100%", maxWidth: 420, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" textAlign="center">
            Reset Password
          </Typography>

          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            fullWidth
          />

          <Typography color={rules.length ? "success.main" : "text.secondary"} variant="body2">
            At least 6 characters
          </Typography>
          <Typography color={rules.upper ? "success.main" : "text.secondary"} variant="body2">
            At least 1 uppercase letter
          </Typography>
          <Typography color={rules.number ? "success.main" : "text.secondary"} variant="body2">
            At least 1 number
          </Typography>

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            fullWidth
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" variant="contained" fullWidth>
            Save Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Reset_Password;