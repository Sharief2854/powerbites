import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

function PasswordChange({ email }) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleToggle = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // try {
    //   await axios.put("http://localhost:5000/password/reset", {
    //     email,
    //     newPassword,
    //   });

      setSuccess("Password updated successfully");
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    // } catch (err) {
    //   setError("Failed to update password");
    //   console.log(err);
    // }
  };

  const passwordField = (label, name, value, visible) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      value={value}
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleToggle(name)} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 450, md: 500 },
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
            gap: 2.5,
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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            Enter your new password
          </Typography>

          {passwordField(
            "New Password",
            "newPassword",
            formData.newPassword,
            show.newPassword
          )}

          {passwordField(
            "Confirm Password",
            "confirmPassword",
            formData.confirmPassword,
            show.confirmPassword
          )}

          {error && (
            <Typography color="error" sx={{ textAlign: "center", fontSize: "0.95rem" }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              sx={{
                textAlign: "center",
                color: "success.main",
                fontSize: "0.95rem",
              }}
            >
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.2,
              textTransform: "none",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              mt: 1,
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PasswordChange;