// import { Avatar, Box, Button, Typography, IconButton, TextField, FormControl,Select, FormLabel, Paper, MenuItem } from "@mui/material";
// // import {
// //   Box,
// //   Button,
// //   FormControl,
// //   MenuItem,
// //   Select,
// //   TextField,
// //   Typography,
// //   Paper,
// // } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import React, { useEffect, useRef, useState } from "react";
// import CustomerCard from "./CustomerCard";
// import api from "../../api/axiosConfig";

// function CustomerProfile() {
//   const [user, setUser] = useState({
//     name: "suresh",
//     phone: "78965412369",
//     password: "********",
//   });

//   const [formData,setFormData] = useState({
//     label: "",
//     address: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   const [image, setImage] = useState("");

//   const firstletterName = user.name.charAt(0).toUpperCase();

//   const fileInputRef = useRef(null);

//   const handleEditClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     // Instantly preview the image while it uploads
//     // if (file) {
//     //       setImage(URL.createObjectURL(file));
//     //     }
//     try {
//       let id = "6a2a987342fbcdfda0a5c5b0";
//       const response = await api.post(
//         `/updateCustomerProfile/uploadPhoto/${id}`,
//         formData,
//       );

//       console.log(response.data);

//       // Robustly extract the path from the Multer file object
//       const imagePath =
//         response.data?.photo?.url ||
//         response.data?.url ||
//         response.data?.photo ||
//         response.data?.path ||
//         response.data?.photo?.path;
//       if (imagePath) {
//         const cleanPath = imagePath.replace(/\\/g, "/").replace(/^\/+/, ""); // Handle Windows backslashes
//         setImage(`http://localhost:4500/${cleanPath}`);

//     }
//     setImage(URL.createObjectURL(file));
// } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleText =(e)=>{
//       const {name,value} = e.target
//       setFormData((prev) =>
//           ({...prev,[name]:value})
//       )
//   }

// const handleSubmitform =(e)=>{
//       e.preventDefault();
//       console.log("object")
//   }


//   return (
//     <Box>
//       <CustomerCard>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Box>
//             {/* Profile Image */}
//             <Box sx={{ position: "relative", width: 120, height: 120 }}>
//               {/* Profile Image */}
//               <Avatar
//                 alt={firstletterName}
//                 src={image}
//                 sx={{ width: 120, height: 120, border: "2px solid #ddd" }}
//               >
//                 {firstletterName}
//               </Avatar>
//               {/* Pencil Button */}
//               <IconButton
//                 color="primary"
//                 onClick={handleEditClick}
//                 sx={{
//                   position: "absolute",
//                   bottom: 5,
//                   right: 5,
//                   backgroundColor: "#673ab7",
//                   color: "white",
//                   "&:hover": { backgroundColor: "#5e35b1" },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 hidden
//                 onChange={handleFileChange}
//               />
//             </Box>
//           </Box>
//         <Box sx={{ textAlign: "center" }}>
//                 <Paper
//   sx={{
//     maxWidth: 700,
//     mx: "auto",
//     p: 4,
//     borderRadius: 3,
//   }}
// >
//   <Typography
//     variant="h5"
//     sx={{
//       mb: 3,
//       fontWeight: 600,
//       textAlign: "center",
//     }}
//   >
//     Address Details
//   </Typography>

//   <Box
//     component="form"
//     onSubmit={handleSubmitform}
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       gap: 2,
//     }}
//   >
//     {/* Address Type */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         Address Type
//       </Typography>

//       <FormControl fullWidth>
//         <Select
//           name="label"
//           value={formData.label}
//           onChange={handleText}
//           displayEmpty
//         >
//           <MenuItem value="">
//             Select Address Type
//           </MenuItem>
//           <MenuItem value="HOME">
//             Home
//           </MenuItem>
//           <MenuItem value="OFFICE">
//             Office
//           </MenuItem>
//         </Select>
//       </FormControl>
//     </Box>

//     {/* Address */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         Address
//       </Typography>

//       <TextField
//         fullWidth
//         name="address"
//         onChange={handleText}
//       />
//     </Box>

//     {/* Street */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         Street
//       </Typography>

//       <TextField
//         fullWidth
//         name="street"
//         onChange={handleText}
//       />
//     </Box>

//     {/* City */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         City
//       </Typography>

//       <TextField
//         fullWidth
//         name="city"
//         onChange={handleText}
//       />
//     </Box>

//     {/* State */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         State
//       </Typography>

//       <TextField
//         fullWidth
//         name="state"
//         onChange={handleText}
//       />
//     </Box>

//     {/* Pincode */}
//     <Box>
//       <Typography sx={{ mb: 1, fontWeight: 500 }}>
//         Pincode
//       </Typography>

//       <TextField
//         fullWidth
//         name="pincode"
//         onChange={handleText}
//       />
//     </Box>

//     {/* Buttons */}
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         mt: 3,
//       }}
//     >
//       <Button
//         variant="outlined"
//         color="secondary"
//       >
//         Back
//       </Button>

//       <Button
//         type="submit"
//         variant="contained"
//       >
//         Save
//       </Button>
//     </Box>
//   </Box>
// </Paper>
//           </Box>
//         </Box>
//       </CustomerCard>
//     </Box>
//   );
// }

// export default CustomerProfile;


import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Select,
  Paper,
  MenuItem,
  Grid,
  Divider,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomerCard from "./CustomerCard";
import api from "../../api/axiosConfig";

function CustomerProfile() {
  const [formData, setFormData] = useState({
    name: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    phone: "7896541236",
    password: "securepassword123",
    label: "",
    address: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const firstletterName = formData.name ? formData.name.charAt(0).toUpperCase() : "U";
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      let id = "6a2a987342fbcdfda0a5c5b0";
      const response = await api.post(
        `/updateCustomerProfile/uploadPhoto/${id}`,
        uploadData
      );

      const imagePath =
        response.data?.photo?.url ||
        response.data?.url ||
        response.data?.photo ||
        response.data?.path ||
        response.data?.photo?.path;

      if (imagePath) {
        const cleanPath = imagePath.replace(/\\/g, "/").replace(/^\/+/, "");
        setImage(`http://localhost:4500/${cleanPath}`);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleText = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitform = async(e) => {
    e.preventDefault();
    console.log("Saving profile payload: ", formData);

    try {

        let response = await api.post()
        
    } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
        
    }

  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa" }}>
     
        <Paper
          elevation={0}
          sx={{
            maxWidth: 720, // Medium container width
            width: "100%",
            p: 3, // Reduced card padding for dense layout
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Dense Header & Avatar Setup */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Low gap side-by-side header
              mb: 2.5,
            }}
          >
            <Box sx={{ position: "relative", width: 80, height: 80 }}>
              <Avatar
                alt={formData.name}
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
                onClick={handleEditClick}
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
              <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileChange} />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}>
                {formData.name || "User Profile"}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Update your account info and addresses.
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmitform}>
            
            {/* Section 1: Account Information */}
            <Typography variant="caption" sx={{ display: "block", mb: 1.5, fontWeight: 700, color: "#673ab7", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Personal Details
            </Typography>
            
            <Grid container spacing={1.5} sx={{ mb: 2.5 }}> {/* Reduced layout gap */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  size="small"
                  name="phone"
                  value={formData.phone}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  label="Email Address"
                  size="small"
                  name="email"
                  value={formData.email}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#f1f5f9" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Password"
                  size="small"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Section 2: Address Information */}
            <Typography variant="caption" sx={{ display: "block", mb: 1.5, fontWeight: 700, color: "#673ab7", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Address Details
            </Typography>

            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <Select
                    name="label"
                    value={formData.label}
                    onChange={handleText}
                    displayEmpty
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">Select Address Type</MenuItem>
                    <MenuItem value="HOME">Home</MenuItem>
                    <MenuItem value="OFFICE">Office</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address / Flat / Building"
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Locality / Street"
                  size="small"
                  name="street"
                  value={formData.street}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  size="small"
                  name="city"
                  value={formData.city}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  size="small"
                  name="state"
                  value={formData.state}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode / ZIP Code"
                  size="small"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleText}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>
            </Grid>

            {/* Clean Action Group */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: 2, py: 0.5, px: 2, textTransform: "none", color: "#4a5568", borderColor: "#cbd5e1", fontSize: "0.875rem" }}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
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
                Save Profile
              </Button>
            </Box>
          </Box>
        </Paper>
    </Box>
  );
}

export default CustomerProfile;
