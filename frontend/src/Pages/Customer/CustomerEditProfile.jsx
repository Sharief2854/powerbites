
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   TextField,
//   FormControl,
//   Select,
//   Paper,
//   MenuItem,
//   Grid,
//   Divider,
//   InputAdornment,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SaveIcon from "@mui/icons-material/Save";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import CustomerCard from "./CustomerCard";
// import api from "../../api/axiosConfig";
// import { jwtDecode } from "jwt-decode";
// import { PasswordField } from "../utils/Validation";
// import { useDispatch, useSelector } from "react-redux";
// import { getEditProfile } from "../../Redux/Slices/CM_ProfileSlice";

// function CustomerEditProfile() {
//   const [formData, setFormData] = useState({
//     name: "Suresh Kumar",
//     email: "suresh.kumar@example.com",
//     phone: "7896541236",
//     password: "securepassword123",
//     label: "",
//     address: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//   });
//   const dispatch = useDispatch();
// const editProfile = useSelector(
//   (state) => state.editprofile.editprofile
// );
  
//   const [image, setImage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [uiMessage, setUiMessage] = useState({ text: "", isError: false });
  
//   const firstletterName = formData.name
//   ? formData.name.charAt(0).toUpperCase()
//   : "U";
//   const fileInputRef = useRef(null);
  
//   const handleEditClick = () => {
//     fileInputRef.current.click();
//   };
  
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
  
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     //setImage(URL.createObjectURL(file));
//     const uploadData = new FormData();
//     uploadData.append("file", file);
    
//     try {
//       const token = localStorage.getItem("token");
//       let id = "6a2a987342fbcdfda0a5c5b0"; // fallback
      
//       if (token) {
//         const decoded = jwtDecode(token);
//         id = decoded.id || id;
//       }
      
//       const response = await api.post(
//         `/updateCustomerProfile/uploadPhoto/${id}`,
//         uploadData,
//       );
      
//       const imagePath =
//       response.data?.photo?.url ||
//       response.data?.url ||
//       response.data?.photo ||
//       response.data?.path ||
//       response.data?.photo?.path;
//       console.log("Image path:", imagePath);
      
//       if (imagePath) {
//         const cleanPath = imagePath.replace(/\\/g, "/").replace(/^\/+/, "");
//         console.log("Cleaned path:", cleanPath);
//         setImage(`http://localhost:4500/${imagePath}`);
//         //setImage(URL.createObjectURL(imagePath));
//         setUiMessage({
//           text: "Profile image updated successfully!",
//           isError: false,
//         });
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       setUiMessage({ text: "Failed to upload profile image.", isError: true });
//     }
//   };
  
//   const handleText = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
  
//   const handleSubmitform = async (e) => {
//     e.preventDefault();
//     setUiMessage({ text: "", isError: false }); // Reset state messages
    
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUiMessage({
//           text: "User identification session missing. Please log in again.",
//           isError: true,
//         });
//         return;
//       }
      
//       const decoded = jwtDecode(token);
//       const userId = decoded.id;
      
//       // Building clean JSON payload for unified updates
//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         password: formData.password,
//         label: formData.label,
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pincode: formData.pincode,
//       };
      
//       console.log("Payload:", payload);
//       console.log("userId ", userId);
      
//       // const response = await api.post(
//         //   `/updateCustomerProfile/addAddress/${userId}`,
//         //   payload,
//         // );
//         // console.log("Server response data:", response.data);
//         dispatch(getEditProfile(payload))
//         console.log("edit profile",editProfile)
//       setUiMessage({
//         text: "Profile records updated successfully!",
//         isError: false,
//       });
//     } catch (err) {
//       console.error(
//         "Submission trace error:",
//         err.response?.data || err.message,
//       );
//       const errorMsg =
//         err.response?.data?.message ||
//         "An unexpected error occurred while saving profile changes.";
//       setUiMessage({ text: errorMsg, isError: true });
//     }
//   };

//   useEffect(() => {
//   if (editProfile) {
//     setFormData(editProfile);
//   }
// }, [editProfile]);


//   return (
//     <Box
//       sx={{
//         p: 2,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       <CustomerCard>
//         <Paper
//           elevation={0}
//           sx={{
//             maxWidth: 720,
//             width: "100%",
//             p: 3,
//             borderRadius: 3,
//             border: "1px solid #e2e8f0",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
//           }}
//         >
//           {/* Header */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
//             <Box sx={{ position: "relative", width: 80, height: 80 }}>
//               <Avatar
//                 alt={formData.name}
//                 src={image}
//                 sx={{
//                   width: 80,
//                   height: 80,
//                   border: "2px solid #fff",
//                   boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
//                   fontSize: "1.8rem",
//                   backgroundColor: "#673ab7",
//                 }}
//               >
//                 {firstletterName}
//               </Avatar>
//               <IconButton
//                 onClick={handleEditClick}
//                 sx={{
//                   position: "absolute",
//                   bottom: -2,
//                   right: -2,
//                   backgroundColor: "#673ab7",
//                   color: "white",
//                   p: 0.5,
//                   boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
//                   "&:hover": { backgroundColor: "#5e35b1" },
//                 }}
//                 size="small"
//               >
//                 <EditIcon sx={{ fontSize: 14 }} />
//               </IconButton>
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 hidden
//                 onChange={handleFileChange}
//               />
//             </Box>

//             <Box>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}
//               >
//                 {formData.name || "User Profile"}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 color="textSecondary"
//                 sx={{ mt: 0.5 }}
//               >
//                 Update your account info and addresses.
//               </Typography>
//             </Box>
//           </Box>

//           {/* Toast / Dynamic inline notification bar */}
//           {uiMessage.text && (
//             <Box
//               sx={{
//                 p: 1.5,
//                 mb: 2.5,
//                 borderRadius: 2,
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 backgroundColor: uiMessage.isError ? "#fef2f2" : "#f0fdf4",
//                 color: uiMessage.isError ? "#dc2626" : "#16a34a",
//                 border: `1px solid ${uiMessage.isError ? "#fca5a5" : "#86efac"}`,
//               }}
//             >
//               {uiMessage.text}
//             </Box>
//           )}

//           <Box component="form" onSubmit={handleSubmitform}>
//             {/* Section 1: Account Information */}
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 mb: 2,
//                 fontWeight: 600,
//                 color: "primary.main",
//               }}
//             >
//               Personal Details
//             </Typography>

//             <Grid container spacing={2}>
//               {/* Full Name */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   size="small"
//                   value={formData.name}
//                   onChange={handleText}
//                 />
//               </Grid>

//               {/* Email */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   disabled
//                   label="Email Address"
//                   name="email"
//                   size="small"
//                   value={formData.email}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#f8fafc",
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Phone */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   size="small"
//                   value={formData.phone}
//                   onChange={handleText}
//                 />
//               </Grid>

//               {/* Password */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <PasswordField
//                   fullWidth
//                   label="Account Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleText}
//                   size="small"
//                   autoComplete="current-password"
//                 />
//               </Grid>
//             </Grid>
//             <Divider sx={{ my: 2 }} />

//             {/* Section 2: Address Information */}
//             <Typography
//               variant="caption"
//               sx={{
//                 display: "block",
//                 mb: 1.5,
//                 fontWeight: 700,
//                 color: "#673ab7",
//                 textTransform: "uppercase",
//                 letterSpacing: 0.5,
//               }}
//             >
//               Address Details
//             </Typography>

//             <Grid container spacing={2}>
//               {/* Address Type */}
//               <Grid size={{ xs: 12 }}>
//                 <FormControl fullWidth size="small">
//                   <Select
//                     name="label"
//                     value={formData.label}
//                     onChange={handleText}
//                     displayEmpty
//                   >
//                     <MenuItem value="">Select Address Type</MenuItem>
//                     <MenuItem value="HOME">Home</MenuItem>
//                     <MenuItem value="OFFICE">Office</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Full Address */}
//               <Grid size={{ xs: 12 }}>
//                 <TextField
//                   fullWidth
//                   label="Street Address / Flat / Building"
//                   name="address"
//                   size="small"
//                   value={formData.address}
//                   onChange={handleText}
//                 />
//               </Grid>

//               {/* Locality + City */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="Locality / Street"
//                   name="street"
//                   size="small"
//                   value={formData.street}
//                   onChange={handleText}
//                 />
//               </Grid>

//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   size="small"
//                   value={formData.city}
//                   onChange={handleText}
//                 />
//               </Grid>

//               {/* State + Country */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   name="state"
//                   size="small"
//                   value={formData.state}
//                   onChange={handleText}
//                 />
//               </Grid>

//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="Country"
//                   name="country"
//                   size="small"
//                   value={formData.country}
//                   onChange={handleText}
//                 />
//               </Grid>

//               {/* Pincode */}
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <TextField
//                   fullWidth
//                   label="Pincode / ZIP"
//                   name="pincode"
//                   size="small"
//                   value={formData.pincode}
//                   onChange={handleText}
//                 />
//               </Grid>
//             </Grid>
//             <Divider sx={{ my: 2 }} />

//             {/* Actions */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mt: 3,
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
//                 sx={{
//                   borderRadius: 2,
//                   py: 0.5,
//                   px: 2,
//                   textTransform: "none",
//                   color: "#4a5568",
//                   borderColor: "#cbd5e1",
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 Back
//               </Button>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
//                 sx={{
//                   borderRadius: 2,
//                   py: 0.5,
//                   px: 3,
//                   textTransform: "none",
//                   backgroundColor: "#673ab7",
//                   fontSize: "0.875rem",
//                   "&:hover": { backgroundColor: "#5e35b1" },
//                 }}
//               >
//                 Save Profile
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </CustomerCard>
//     </Box>
//   );
// }

// export default CustomerEditProfile;
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  Paper,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CustomerCard from "./CustomerCard";
import { jwtDecode } from "jwt-decode";
import { PasswordField } from "../utils/Validation";
import { useDispatch, useSelector } from "react-redux";
import { posteditaddress, postEditProfile } from "../../Redux/Slices/CM_ProfileSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig"; // FIX 1: Restored missing API import

function CustomerEditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const editProfile = useSelector((state) => state.editprofile.editprofile);
  const editAddress = useSelector((state) => state.editprofile.editaddress);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [addressForm, setAddressForm] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [uiMessage, setUiMessage] = useState({ text: "", isError: false });

  // Sync Personal Profile details from Redux
  // useEffect(() => {
  //   if (editProfile) {
  //     setFormData({
  //       name: editProfile.name || "",
  //       email: editProfile.email || "",
  //       phone: editProfile.phone || "",
  //       password: editProfile.password || "",
  //     });
  //   }
  // }, [editProfile]);

  // Sync Address Details from Redux (falls back to editProfile keys if combined)
 useEffect(() => {
    if (editAddress && Object.keys(editAddress).length > 0) {
      setAddressForm({
        label: editAddress.label || "",
        street: editAddress.street || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        country: editAddress.country || "",
        pincode: editAddress.pincode || "",
      });
    } else if (editProfile) {
      setFormData({
        name: editProfile.name || "",
        email: editProfile.email || "",
        phone: editProfile.phone || "",
        password: editProfile.password || "",
      });
    }
  }, [editAddress, editProfile]);

  const handleText = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressText = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Profile Details
  const handleSubmitform = async (e) => {
    e.preventDefault();
    setUiMessage({ text: "", isError: false });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUiMessage({
          text: "User identification session missing. Please log in again.",
          isError: true,
        });
        return;
      }

      const payload = {
        ...editProfile,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
      };

      dispatch(postEditProfile(payload));
      
      setUiMessage({
        text: "Profile records updated successfully!",
        isError: false,
      });
      
      setTimeout(() => navigate("/CustomerProfile"), 1000);
    } catch (err) {
      setUiMessage({
        text: "An unexpected error occurred while saving profile changes.",
        isError: true,
      });
    }
  };

  // Submit Address Details
  const handleSubmitformAddress = async (e) => {
    e.preventDefault();
    setUiMessage({ text: "", isError: false });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUiMessage({
          text: "User identification session missing. Please log in again.",
          isError: true,
        });
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const payload = {
        ...addressForm,
        userId: editProfile?._id || userId,
      };

      const response = await api.post(
        `/updateCustomerProfile/addAddress/${userId}`,
        payload
      );
      console.log("Server response data:", response.data);
      
      dispatch(posteditaddress(payload));

      setUiMessage({
        text: "Address records updated successfully!",
        isError: false,
      });
      
      setTimeout(() => navigate("/CustomerProfile"), 1000);
    } catch (err) {
      console.error("Submission trace error:", err.response?.data || err.message);
      setUiMessage({
        text: "Failed to sync address alterations to database layer.",
        isError: true,
      });
    }
  };

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
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a202c" }}>
              Modify Account Profile
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              Change your core details and updates will immediately reflect.
            </Typography>
          </Box>

          {uiMessage.text && (
            <Box
              sx={{
                p: 1.5,
                mb: 2.5,
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: uiMessage.isError ? "#fef2f2" : "#f0fdf4",
                color: uiMessage.isError ? "#dc2626" : "#16a34a",
                border: `1px solid ${uiMessage.isError ? "#fca5a5" : "#86efac"}`,
              }}
            >
              {uiMessage.text}
            </Box>
          )}

          {/* Form 1: Personal Profile Core Details */}
          <Box component="form" onSubmit={handleSubmitform}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              Personal Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  size="small"
                  value={formData.name}
                  onChange={handleText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Email Address"
                  name="email"
                  size="small"
                  value={formData.email}
                  autoComplete="username"
                  sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#f8fafc" } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  size="small"
                  value={formData.phone}
                  onChange={handleText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <PasswordField
                  fullWidth
                  label="Account Password"
                  name="password"
                  value={formData.password}
                  onChange={handleText}
                  size="small"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/CustomerProfile")}
                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, textTransform: "none", color: "#4a5568" }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, textTransform: "none", backgroundColor: "#673ab7" }}
              >
                Save Profile
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Form 2: Shipping/Billing Location Address Fields */}
          <Box component="form" onSubmit={handleSubmitformAddress}>
            <Typography variant="caption" sx={{ display: "block", mb: 1.5, fontWeight: 700, color: "#673ab7", textTransform: "uppercase" }}>
              Address Details
            </Typography>

            {/* FIX 2: Switched value targets to addressForm and handlers to handleAddressText */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <Select
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressText}
                    displayEmpty
                  >
                    <MenuItem value="">Select Address Type</MenuItem>
                    <MenuItem value="HOME">Home</MenuItem>
                    <MenuItem value="OFFICE">Office</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Locality / Street"
                  name="street"
                  size="small"
                  value={addressForm.street}
                  onChange={handleAddressText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  size="small"
                  value={addressForm.city}
                  onChange={handleAddressText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  size="small"
                  value={addressForm.state}
                  onChange={handleAddressText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  size="small"
                  value={addressForm.country}
                  onChange={handleAddressText}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pincode / ZIP"
                  name="pincode"
                  size="small"
                  value={addressForm.pincode}
                  onChange={handleAddressText}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/CustomerProfile")}
                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, textTransform: "none", color: "#4a5568" }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, textTransform: "none", backgroundColor: "#673ab7" }}
              >
                Save Address
              </Button>
            </Box>
          </Box>
        </Paper>
      </CustomerCard>
    </Box>
  );
}

export default CustomerEditProfile;