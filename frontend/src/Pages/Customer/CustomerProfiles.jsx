import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CustomerCard from "./CustomerCard";
import api from "../../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { getEditProfile } from "../../Redux/Slices/CM_ProfileSlice";
import { useNavigate } from "react-router-dom";

function CustomerProfile({ onBack }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");

  // 1. Read individual profile and address payloads from Redux
  const editProfile =
    useSelector((state) => state.editprofile.editprofile) || {};
  const editAddress =
    useSelector((state) => state.editprofile.editaddress) || {};

  // Debugging: Check the structure of the incoming data
  console.log("Loaded Profile Data:", editProfile);
  console.log("Loaded Address Data:", editAddress);

  // 2. Extract profile fields from editProfile
  const { name, email, phone } = editProfile;

//   console.log("city :", editAddress[0].city);
//   console.log("state :", editAddress.state);
//   console.log("phone :", editProfile.phone);

  // 3. Extract address fields from editAddress (with fallback to editProfile if fields live there)
  const { label, street, city, state, country, pincode } = editAddress;

  const firstletterName = name ? name.charAt(0).toUpperCase() : "U";

  const handleEditPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      let id = "6a2a987342fbcdfda0a5c5b0"; // Fallback ID

      if (token) {
        const decoded = jwtDecode(token);
        id = decoded.id || id;
      }

      const response = await api.post(
        `/updateCustomerProfile/uploadPhoto/${id}`,
        uploadData,
      );

      const imagePath =
        response.data?.photo?.url ||
        response.data?.url ||
        response.data?.photo ||
        response.data?.path ||
        response.data?.photo?.path;

      if (imagePath) {
        const cleanPath = imagePath
          ? imagePath.replace(/\\/g, "/").replace(/^\/+/, "")
          : "";
        const finalImageUrl = cleanPath
          ? `http://localhost:4500/${cleanPath}`
          : "";
        setImage(finalImageUrl);

        // Update Redux store with the new photo URL alongside existing data
        // dispatch(getEditProfile({ ...editProfile, image: finalImageUrl }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  async function geteditProfile() {
    try {
      let response = await api.get("/updateCustomerProfile/getProfile");
      console.log(response.data);
      dispatch(getEditProfile(response.data.user));
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async function getCustomerAddress() {
    try {
      let response = await api.get();
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async function HandleDelete(id) {
    try {
      let response = await api.delete(`/updateCustomerProfile/deleteAddress/${id}`);
        console.log("response :",response.data)
        
    }
    catch(err){
        console.log(err.response.data.message)
    }
  }

  useEffect(() => {
    geteditProfile();
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <CustomerCard>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 720,
            width: "100%",
            p: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Header & Photo Handling */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ position: "relative", width: 80, height: 80 }}>
              <Avatar
                alt={name}
                src={image}
                sx={{
                  width: 80,
                  height: 80,
                  border: "2px solid #fff",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  fontSize: "1.8rem",
                  backgroundColor: "#673ab7",
                }}
              >
                {firstletterName}
              </Avatar>
              <IconButton
                onClick={handleEditPhotoClick}
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  backgroundColor: "#673ab7",
                  color: "white",
                  p: 0.5,
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  "&:hover": { backgroundColor: "#5e35b1" },
                }}
                size="small"
              >
                <EditIcon sx={{ fontSize: 14 }} />
              </IconButton>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}
              >
                {name || "User Profile"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 0.5 }}
              >
                Review your active dashboard profile records.
              </Typography>
            </Box>
          </Box>

          {/* Section 1: Personal Details */}
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
          >
            Personal Details
          </Typography>

          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Full Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {name || "—"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Email Address
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {email}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Phone Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {phone || "—"}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            
            <Button
              variant="contained"
              onClick={() => navigate("/editprofile")}
              startIcon={<EditIcon sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: 2,
                py: 0.5,
                px: 3,
                textTransform: "none",
                backgroundColor: "#673ab7",
                fontSize: "0.875rem",
                "&:hover": { backgroundColor: "#5e35b1" },
              }}
            >
              Edit Profile
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Section 2: Address Information */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mb: 1.5,
              fontWeight: 700,
              color: "#673ab7",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Address Details {label && `(${label})`}
          </Typography>

          {editAddress.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    Locality / Street
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.street || "—"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    City
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.city || "—"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    State
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.state || "—"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    Country
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.country || "—"}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    Pincode / ZIP
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.pincode || "—"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

            {/* Core Navigation Actions */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={()=>HandleDelete(item._id)}
                  startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 2,
                    py: 0.5,
                    px: 2,
                    textTransform: "none",
                    color: "#4a5568",
                    borderColor: "#cbd5e1",
                    fontSize: "0.875rem",
                  }}
                >
                  Delete
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/editprofile")}
                  startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 2,
                    py: 0.5,
                    px: 3,
                    textTransform: "none",
                    backgroundColor: "#673ab7",
                    fontSize: "0.875rem",
                    "&:hover": { backgroundColor: "#5e35b1" },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
              
            </Box>
          ))}

          {/* Core Navigation Actions */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onBack}
                  startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 2,
                    py: 0.5,
                    px: 2,
                    textTransform: "none",
                    color: "#4a5568",
                    borderColor: "#cbd5e1",
                    fontSize: "0.875rem",
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/editprofile")}
                  startIcon={<AddIcon  sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 2,
                    py: 0.5,
                    px: 3,
                    textTransform: "none",
                    backgroundColor: "#673ab7",
                    fontSize: "0.875rem",
                    "&:hover": { backgroundColor: "#5e35b1" },
                  }}
                >
                  Add Address
                </Button>
              </Box>

        </Paper>
      </CustomerCard>
    </Box>
  );
}

export default CustomerProfile;
