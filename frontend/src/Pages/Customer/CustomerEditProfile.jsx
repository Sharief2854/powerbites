
// import React, { useEffect, useId, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   FormControl,
//   Select,
//   Paper,
//   MenuItem,
//   Grid,
//   Divider,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SaveIcon from "@mui/icons-material/Save";
// import CustomerCard from "./CustomerCard";
// import { jwtDecode } from "jwt-decode";
// import { PasswordField } from "../utils/Validation";
// import { useDispatch, useSelector } from "react-redux";
// import { posteditaddress, postEditProfile, updateeditaddress } from "../../Redux/Slices/CM_ProfileSlice";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosConfig"; // FIX 1: Restored missing API import

// function CustomerEditProfile() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const editProfile = useSelector((state) => state.editprofile.editprofile);
//   const editAddress = useSelector((state) => state.editprofile.editaddress);
//   console.log("editProfile", editProfile);
//   console.log("editAddress", editAddress);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [addressForm, setAddressForm] = useState({
//     label: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//   });

//   const [uiMessage, setUiMessage] = useState({ text: "", isError: false });

//   // Sync Personal Profile details from Redux
//   useEffect(() => {
//     if (editProfile) {
//       setFormData({
//         name: editProfile.name || "",
//         email: editProfile.email || "",
//         phone: editProfile.phone || "",
//         password: editProfile.password || "",
//       });
//     }
//   }, [editProfile]);

//  // Sync Address Details from Redux (falls back to editProfile keys if combined)
//  useEffect(() => {
//     // Safely extract the first address if editAddress is an array
//     const currentAddress = Array.isArray(editAddress) && editAddress.length > 0 
//       ? editAddress[0] 
//       : (!Array.isArray(editAddress) && editAddress ? editAddress : null);

//     if (currentAddress && Object.keys(currentAddress).length > 0) {
//       setAddressForm({
//         label: currentAddress.label || "",
//         street: currentAddress.street || "",
//         city: currentAddress.city || "",
//         state: currentAddress.state || "",
//         country: currentAddress.country || "",
//         pincode: currentAddress.pincode || "",
//       });
//     } else if (editProfile) {
//       setFormData({
//         name: editProfile.name || "",
//         email: editProfile.email || "",
//         phone: editProfile.phone || "",
//         password: editProfile.password || "",
//       });
//     }
//   }, [editAddress, editProfile]);

//   const handleText = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddressText = (e) => {
//     const { name, value } = e.target;
//     setAddressForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Profile Details
//   const handleSubmitform = async (e) => {
//     e.preventDefault();
//     setUiMessage({ text: "", isError: false });

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

//       const payload = {
//         ...editProfile,
//         name: formData.name,
//         phone: formData.phone,
//         password: formData.password,
//         userId: userId,
//       };

//       // Send incoming data to the backend controller
//       let response = await api.put(`/updateCustomerProfile/updateProfile`, payload);
//       console.log("Server response data:", response.data);
      
//       dispatch(postEditProfile(response.data.user));
      
//       setUiMessage({
//         text: "Profile records updated successfully!",
//         isError: false,
//       });
      
//       navigate("/CustomerProfile")
//     } catch (err) {
//       setUiMessage({
//         text: "An unexpected error occurred while saving profile changes.",
//         isError: true,
//       });
//     }
//   };

//   // Submit Address Details
//   const handleSubmitformAddress = async (e) => {
//     e.preventDefault();
//     setUiMessage({ text: "", isError: false });

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
//       console.log("decoded",decoded)
//       const userId = decoded.id;
//       console.log("user", userId)
//       const payload = {
//         ...addressForm,
//         userId: editProfile?._id || userId,
//       };

//       const response = await api.post(
//         `/updateCustomerProfile/addAddress/${userId}`,
//         payload
//       );
//       console.log("Server response data:", response.data);
//       console.log("Server response data:", response.data.address);
      
//       dispatch(posteditaddress(response.data.address));
// console.log("address")
//       setUiMessage({
//         text: "Address records updated successfully!",
//         isError: false,
//       });
      
//       setTimeout(() => navigate("/CustomerProfile"), 1000);
//     } catch (err) {
//       console.error("Submission trace error:", err.response?.data || err.message);
//       setUiMessage({
//         text: "Failed to sync address alterations to database layer.",
//         isError: true,
//       });
//     }
//   };


// //put address function
// //const response = await api.post(`/updateCustomerProfile/addAddress/${userId}`,payload);
// //dispatch(updateeditaddress({id,data}))

  

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
//           <Box sx={{ mb: 2.5 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a202c" }}>
//               Modify Account Profile
//             </Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
//               Change your core details and updates will immediately reflect.
//             </Typography>
//           </Box>

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

//           {/* Form 1: Personal Profile Core Details */}
//           <Box component="form" onSubmit={handleSubmitform}>
//             <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
//               Personal Details
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   size="small"
//                   value={formData.name}
//                   onChange={handleText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   disabled
//                   label="Email Address"
//                   name="email"
//                   size="small"
//                   value={formData.email}
//                   autoComplete="username"
//                   sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#f8fafc" } }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   size="small"
//                   value={formData.phone}
//                   onChange={handleText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
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
            
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 onClick={() => navigate("/CustomerProfile")}
//                 startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
//                 sx={{ borderRadius: 2, textTransform: "none", color: "#4a5568" }}
//               >
//                 Back
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
//                 sx={{ borderRadius: 2, textTransform: "none", backgroundColor: "#673ab7" }}
//               >
//                 Save Profile
//               </Button>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 4 }} />

//           {/* Form 2: Shipping/Billing Location Address Fields */}
//           <Box component="form" onSubmit={handleSubmitformAddress}>
//             <Typography variant="caption" sx={{ display: "block", mb: 1.5, fontWeight: 700, color: "#673ab7", textTransform: "uppercase" }}>
//               Address Details
//             </Typography>

//             {/* FIX 2: Switched value targets to addressForm and handlers to handleAddressText */}
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth size="small">
//                   <Select
//                     name="label"
//                     value={addressForm.label}
//                     onChange={handleAddressText}
//                     displayEmpty
//                   >
//                     <MenuItem value="">Select Address Type</MenuItem>
//                     <MenuItem value="HOME">Home</MenuItem>
//                     <MenuItem value="OFFICE">Office</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Locality / Street"
//                   name="street"
//                   size="small"
//                   value={addressForm.street}
//                   onChange={handleAddressText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   size="small"
//                   value={addressForm.city}
//                   onChange={handleAddressText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   name="state"
//                   size="small"
//                   value={addressForm.state}
//                   onChange={handleAddressText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Country"
//                   name="country"
//                   size="small"
//                   value={addressForm.country}
//                   onChange={handleAddressText}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Pincode / ZIP"
//                   name="pincode"
//                   size="small"
//                   value={addressForm.pincode}
//                   onChange={handleAddressText}
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 onClick={() => navigate("/CustomerProfile")}
//                 startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
//                 sx={{ borderRadius: 2, textTransform: "none", color: "#4a5568" }}
//               >
//                 Back
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
//                 sx={{ borderRadius: 2, textTransform: "none", backgroundColor: "#673ab7" }}
//               >
//                 Save Address
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
  Box, Button, Typography, TextField, FormControl, Select, MenuItem,
  Grid, Divider, Paper, Alert, CircularProgress, Checkbox, FormControlLabel
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { postEditProfile, posteditaddress, updateeditaddress } from "../../Redux/Slices/CM_ProfileSlice";
import { PasswordField } from "../utils/Validation";
import CustomerCard from "./CustomerCard";
import { jwtDecode } from "jwt-decode";

// Country & State Data (15 Countries)
const countriesData = {
  "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh","Hyderabad", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
  "United States": ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
  "Germany": ["Bavaria", "Berlin", "Hamburg", "North Rhine-Westphalia", "Baden-Württemberg"],
  "France": ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Occitanie"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Aichi"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
  "Nigeria": ["Lagos", "Abuja", "Kano", "Rivers", "Oyo"],
  "Mexico": ["Mexico City", "Jalisco", "Nuevo León", "Yucatán"],
  "Italy": ["Lazio", "Lombardy", "Veneto", "Campania", "Sicily"],
  "Spain": ["Andalusia", "Catalonia", "Madrid", "Valencia"],
  "Netherlands": ["North Holland", "South Holland", "Utrecht", "North Brabant"]
};

function CustomerEditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProfile = useSelector((state) => state.editprofile.editprofile);
  const editAddress = useSelector((state) => state.editprofile.editaddress);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [message, setMessage] = useState(null);

  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "", password: "" });

  const [addressForm, setAddressForm] = useState({
    label: "", street: "", city: "", state: "", country: "", pincode: "", _id: "", isDefault: false
  });

  const editaddressId = useParams().id || "";

  // Sync initial Profile data
  useEffect(() => {
    if (editProfile) {
      setProfileForm({
        name: editProfile.name || "",
        email: editProfile.email || "",
        phone: editProfile.phone || "",
        password: editProfile.password || "",
      });
    }
  }, [editProfile]);

  // Sync initial Address data based on URL parameter
  useEffect(() => {
    if (editaddressId && Array.isArray(editAddress)) {
      const currentAddr = editAddress.find((addr) => addr._id === editaddressId);
      if (currentAddr) {
      setAddressForm({
        label: currentAddr.label || "",
        street: currentAddr.street || "",
        city: currentAddr.city || "",
        state: currentAddr.state || "",
        country: currentAddr.country || "",
        pincode: currentAddr.pincode || "",
        _id: currentAddr._id || "",
        isDefault: currentAddr.isDefault || false,
      });
    }
    } else {
      // Clear form when in "Add Mode" (no ID in params)
      setAddressForm({ label: "", street: "", city: "", state: "", country: "", pincode: "", _id: "", isDefault: false });
    }
  }, [editaddressId, editAddress]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));

    // Reset state when country changes
    if (name === "country") {
      setAddressForm(prev => ({ ...prev, state: "" }));
    }
  };

  const handleDefaultChange = (e) => {
    setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }));
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const payload = { ...editProfile, name: profileForm.name, phone: profileForm.phone, password: profileForm.password, userId };
      const res = await api.put(`/updateCustomerProfile/updateProfile`, payload);

      dispatch(postEditProfile(res.data.user));
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => navigate("/CustomerProfile"), 1500);
    } catch (err) {
      setMessage({ text: "Failed to update profile", type: "error" });
    } finally {
      setSavingProfile(false);
    }
  };

  // Save / Update Address
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
     
      const payload = { ...addressForm, userId };
      if (!payload._id) delete payload._id; // Prevents MongoDB CastError on empty string
      let response;

      if (editaddressId) {
        response = await api.put(`/updateCustomerProfile/updateAddress/${editaddressId}`, payload);
        dispatch(updateeditaddress({ id: addressForm._id, data: response.data.address }));
      } else {
        response = await api.post(`/updateCustomerProfile/addAddress/${userId}`, payload);
        dispatch(posteditaddress(response.data.address));
      }

      setMessage({ text:editaddressId ? "Address updated!" : "New address added!", type: "success" });
      setTimeout(() => navigate("/CustomerProfile"), 1400);
    } catch (err) {
      console.error("Address save error:", err.response?.data || err.message);
      setMessage({ text: "Failed to save address", type: "error" });
    } finally {
      setSavingAddress(false);
    }
  };

  const availableStates = countriesData[addressForm.country] || [];

  return (
    <Box sx={{ p: 3, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomerCard>
        <Paper elevation={0} sx={{ maxWidth: 760, mx: "auto", p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Edit Profile</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage your account and delivery addresses</Typography>

          {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

          {/* Personal Details */}
          <form onSubmit={handleUpdateProfile}>
            <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>Personal Information</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Full Name" name="name" value={profileForm.name} onChange={handleProfileChange} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Email" name="email" value={profileForm.email} disabled /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Phone Number" name="phone" value={profileForm.phone} onChange={handleProfileChange} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PasswordField fullWidth label="New Password (Optional)" name="password" value={profileForm.password} onChange={handleProfileChange} autoComplete="new-password" />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/CustomerProfile")}>Cancel</Button>
              <Button type="submit" variant="contained" startIcon={savingProfile ? <CircularProgress size={20} /> : <SaveIcon />} disabled={savingProfile}>
                {savingProfile ? "Saving..." : "Save Profile"}
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 5 }} />

          {/* Address Form */}
          <form onSubmit={handleSaveAddress}>
            <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
              {addressForm._id ? "Update Address" : "Add New Address"}
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <Select name="label" value={addressForm.label} onChange={handleAddressChange} displayEmpty>
                    <MenuItem value="">Select Address Type</MenuItem>
                    <MenuItem value="HOME">Home</MenuItem>
                    <MenuItem value="OFFICE">Office</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}><TextField fullWidth label="Street / Locality" name="street" value={addressForm.street} onChange={handleAddressChange} /></Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <Select
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    {Object.keys(countriesData).map((country) => (
                      <MenuItem key={country} value={country}>{country}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <Select
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    displayEmpty
                    disabled={!addressForm.country}
                  >
                    <MenuItem value="">Select State</MenuItem>
                    {availableStates.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="City" name="city" value={addressForm.city} onChange={handleAddressChange} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Pincode" name="pincode" value={addressForm.pincode} onChange={handleAddressChange} /></Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Checkbox checked={addressForm.isDefault} onChange={handleDefaultChange} color="primary" />}
                  label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><StarIcon sx={{ color: '#facc15' }} /> Set as Default Address</Box>}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/CustomerProfile")}>Cancel</Button>
              <Button type="submit" variant="contained" startIcon={savingAddress ? <CircularProgress size={20} /> : <SaveIcon />} disabled={savingAddress}>
                {savingAddress ? "Saving..." : (editaddressId? "Update Address" : "Add Address")}
              </Button>
            </Box>
          </form>
        </Paper>
      </CustomerCard>
    </Box>
  );
}

export default CustomerEditProfile;
