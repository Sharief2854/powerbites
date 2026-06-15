// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Avatar,
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CustomerCard from "./CustomerCard";
// import api from "../../api/axiosConfig";
// import { jwtDecode } from "jwt-decode";
// import { deleteeditaddress, geteditaddress, getEditProfile } from "../../Redux/Slices/CM_ProfileSlice";
// import { useNavigate } from "react-router-dom";

// function CustomerProfile({onBack}) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const [image, setImage] = useState("");

//   // 1. Read individual profile and address payloads from Redux
//   const editProfile =
//     useSelector((state) => state.editprofile.editprofile) || {};
//   const editAddress = useSelector((state) => state.editprofile.editaddress);
//   // Ensure editAddress is always an array so .map() works
//  // const editAddress = Array.isArray(editAddressRaw) ? editAddressRaw : [];

//   // Debugging: Check the structure of the incoming data
//   console.log("Loaded Profile Data:", editProfile);
//   console.log("Loaded Address Data:", editAddress);

//   // 2. Extract profile fields from editProfile
//   const { name, email, phone } = editProfile;

// //   console.log("city :", editAddress[0].city);
// //   console.log("state :", editAddress.state);
// //   console.log("phone :", editProfile.phone);


//   const firstletterName = name ? name.charAt(0).toUpperCase() : "U";

//   const handleEditPhotoClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const uploadData = new FormData();
//     uploadData.append("file", file);

//     try {
//       const token = localStorage.getItem("token");
//       let id = "6a2a987342fbcdfda0a5c5b0"; // Fallback ID

//       if (token) {
//         const decoded = jwtDecode(token);
//         id = decoded.id || id;
//       }

//       const response = await api.post(
//         `/updateCustomerProfile/uploadPhoto/${id}`,
//         uploadData,
//       );

//       const imagePath =
//         response.data?.photo?.url ||
//         response.data?.url ||
//         response.data?.photo ||
//         response.data?.path ||
//         response.data?.photo?.path;

//       if (imagePath) {
//         const cleanPath = imagePath
//           ? imagePath.replace(/\\/g, "/").replace(/^\/+/, "")
//           : "";
//         const finalImageUrl = cleanPath
//           ? `http://localhost:4500/${cleanPath}`
//           : "";
//         setImage(finalImageUrl);

//         // Update Redux store with the new photo URL alongside existing data
//         // dispatch(getEditProfile({ ...editProfile, image: finalImageUrl }));
//       }
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   async function geteditProfile() {
//     try {
//       let response = await api.get("/updateCustomerProfile/getProfile");
//       console.log(response.data);
//       dispatch(getEditProfile(response.data.user));
//     } catch (err) {
//       console.log(err.response.data.message);
//     }
//   }

//   async function getCustomerAddress() {
//     try {
//       let response = await api.get('/updateCustomerProfile/getAddresses');
//       console.log("res get address",response.data);
      
//       // Ensure we pass an array to Redux. Adjust based on your API response structure.
//       const addresses = Array.isArray(response.data.user) ? response.data.user : (response.data.user?.addresses || []);
//       dispatch(geteditaddress(response.data.addresses));

//     } catch (err) {
//       console.log(err.response.data.message);
//     }
//   }

//   async function HandleDelete(id) {
//     try {
//       let response = await api.delete(`/updateCustomerProfile/deleteAddress/${id}`);
//         console.log("response :",response.data)
//         dispatch(deleteeditaddress(id));
//         getCustomerAddress();
        
//     }
//     catch(err){
//         console.log(err.response.data.message)
//     }
//   }

//   useEffect(() => {
//     geteditProfile();
//     getCustomerAddress();
//   }, []);

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
//           {/* Header & Photo Handling */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//             <Box sx={{ position: "relative", width: 80, height: 80 }}>
//               <Avatar
//                 alt={name}
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
//                 onClick={handleEditPhotoClick}
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
//                 {name || "User Profile"}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 color="textSecondary"
//                 sx={{ mt: 0.5 }}
//               >
//                 Review your active dashboard profile records.
//               </Typography>
//             </Box>
//           </Box>

//           {/* Section 1: Personal Details */}
//           <Typography
//             variant="subtitle2"
//             sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
//           >
//             Personal Details
//           </Typography>

//           <Grid container spacing={2} sx={{ mb: 1 }}>
//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="caption"
//                 color="textSecondary"
//                 display="block"
//               >
//                 Full Name
//               </Typography>
//               <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                 {name || "—"}
//               </Typography>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="caption"
//                 color="textSecondary"
//                 display="block"
//               >
//                 Email Address
//               </Typography>
//               <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                 {email}
//               </Typography>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="caption"
//                 color="textSecondary"
//                 display="block"
//               >
//                 Phone Number
//               </Typography>
//               <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                 {phone || "—"}
//               </Typography>
//             </Grid>
//           </Grid>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            
//             <Button
//               variant="contained"
//               onClick={() => navigate("/editprofile")}
//               startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//               sx={{
//                 borderRadius: 2,
//                 py: 0.5,
//                 px: 3,
//                 textTransform: "none",
//                 backgroundColor: "#673ab7",
//                 fontSize: "0.875rem",
//                 "&:hover": { backgroundColor: "#5e35b1" },
//               }}
//             >
//               Edit Profile
//             </Button>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           {/* Section 2: Address Information */}
//           <Typography
//             variant="caption"
//             sx={{
//               display: "block",
//               mb: 1.5,
//               fontWeight: 700,
//               color: "#673ab7",
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//             }}
//           >
//             Address Details
//           </Typography>

//           {editAddress?.map((item, index) => (
//             <Box key={index} sx={{ mb: 3 }}>
//               {item.label && (
//                 <Typography variant="subtitle2" sx={{ mb: 1, color: "primary.main", textTransform: "capitalize" }}>
//                   {item.label} Address
//                 </Typography>
//               )}
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     display="block"
//                   >
//                     Locality / Street
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {item.street || "—"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     display="block"
//                   >
//                     City
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {item.city || "—"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     display="block"
//                   >
//                     State
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {item.state || "—"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     display="block"
//                   >
//                     Country
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {item.country || "—"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     display="block"
//                   >
//                     Pincode / ZIP
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                     {item.pincode || "—"}
//                   </Typography>
//                 </Grid>
//               </Grid>

            

//             {/* Core Navigation Actions */}
//               <Box
//                 sx={{ display: "flex", justifyContent: "flex-end", mt: 3 ,gap:2}}
//               >
//                 <Button
//                   variant="outlined"
//                   color="inherit"
//                   onClick={()=>HandleDelete(item._id)}
//                   startIcon={<DeleteIcon  sx={{ fontSize: 16 }} />}
//                   sx={{
//                     borderRadius: 2,
//                     py: 0.5,
//                     px: 2,
//                     textTransform: "none",
//                     color: "#4a5568",
//                     borderColor: "#cbd5e1",
//                     fontSize: "0.875rem",
//                   }}
//                 >
//                   Delete
//                 </Button>

//                 <Button
//                   variant="contained"
//                   onClick={() => navigate("/editprofile")}
//                   startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//                   sx={{
//                     borderRadius: 2,
//                     py: 0.5,
//                     px: 3,
//                     textTransform: "none",
//                     backgroundColor: "#673ab7",
//                     fontSize: "0.875rem",
//                     "&:hover": { backgroundColor: "#5e35b1" },
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//               </Box>

//                 <Divider sx={{ my: 2 }} />
              
//             </Box>
//           ))}

//           {/* Core Navigation Actions */}
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
//               >
//                 <Button
//                   variant="outlined"
//                   color="inherit"
//                   onClick={onBack}
//                   startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
//                   sx={{
//                     borderRadius: 2,
//                     py: 0.5,
//                     px: 2,
//                     textTransform: "none",
//                     color: "#4a5568",
//                     borderColor: "#cbd5e1",
//                     fontSize: "0.875rem",
//                   }}
//                 >
//                   Back
//                 </Button>

//                 <Button
//                   variant="contained"
//                   onClick={() => navigate("/editprofile")}
//                   startIcon={<AddIcon  sx={{ fontSize: 16 }} />}
//                   sx={{
//                     borderRadius: 2,
//                     py: 0.5,
//                     px: 3,
//                     textTransform: "none",
//                     backgroundColor: "#673ab7",
//                     fontSize: "0.875rem",
//                     "&:hover": { backgroundColor: "#5e35b1" },
//                   }}
//                 >
//                   Add Address
//                 </Button>
//               </Box>

//         </Paper>
//       </CustomerCard>
//     </Box>
//   );
// }

// export default CustomerProfile;


import React, { useEffect, useRef, useState } from "react";
import {
  Avatar, Box, Button, Typography, Paper, Grid, Divider, IconButton, Alert,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { deleteeditaddress, geteditaddress, getEditProfile } from "../../Redux/Slices/CM_ProfileSlice";
import CustomerCard from "./CustomerCard";

function CustomerProfile({ onBack }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const editProfile = useSelector((state) => state.editprofile.editprofile || {});
  const editAddress = useSelector((state) => state.editprofile.editaddress || []);

  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
const [confirmDelete, setConfirmDelete] = useState({
  open: false,
  id: null,
});

  const { name, email, phone } = editProfile;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, addressRes] = await Promise.all([
        api.get("/updateCustomerProfile/getProfile"),
        api.get("/updateCustomerProfile/getAddresses")
      ]);
      dispatch(getEditProfile(profileRes.data.user));
      dispatch(geteditaddress(Array.isArray(addressRes.data.addresses) ? addressRes.data.addresses : []));
    } catch (err) {
      setMessage({ text: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const setAsDefault = async (id) => {
    try {
      console.log("Setting default address for ID:", id);
      await api.get(`/updateCustomerProfile/setDefaultAddress/${id}`);
      console.log("Default address updated!");
      fetchData();
      setMessage({ text: "Default address updated!", type: "success" });
    } catch (err) {
      setMessage({ text: "Failed to set default address", type: "error" });
    }
  };

  const handleDeleteClick = (id) => setConfirmDelete({ open: true, id });

  const handleConfirmDelete = async () => {
    if (!confirmDelete.id) return;
    setDeletingId(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    try {
      await api.delete(`/updateCustomerProfile/deleteAddress/${confirmDelete.id}`);
      dispatch(deleteeditaddress(confirmDelete.id));
      setMessage({ text: "Address deleted successfully", type: "success" });
    } catch (err) {
      setMessage({ text: "Failed to delete address", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomerCard>
        <Paper elevation={0} sx={{ maxWidth: 760, mx: "auto", p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
          {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 5 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar src={image} sx={{ width: 90, height: 90, bgcolor: "#673ab7", fontSize: "2.2rem", border: "4px solid white" }}>
                {name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <IconButton onClick={() => fileInputRef.current?.click()} sx={{ position: "absolute", bottom: -4, right: -4, bgcolor: "#673ab7", color: "white" }} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={() => { /* upload logic */ }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>{name}</Typography>
              <Typography color="text.secondary">{email}</Typography>
            </Box>
          </Box>

          {/* Personal Details */}
          <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>Personal Details</Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Name</Typography><Typography fontWeight={500}>{name}</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Email</Typography><Typography fontWeight={500}>{email}</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Phone</Typography><Typography fontWeight={500}>{phone || "—"}</Typography></Grid>
          </Grid>

          <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate("/customer/editprofile")}>Edit Profile</Button>

          <Divider sx={{ my: 5 }} />

          {/* Addresses */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} color="primary">Saved Addresses</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/customer/editprofile")}>Add Address</Button>
          </Box>

          {editAddress.length === 0 ? (
            <Typography color="text.secondary" align="center" py={6}>No addresses yet. Add your first one!</Typography>
          ) : (
            editAddress.map((addr) => (
              <Paper key={addr._id} variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3, position: 'relative' }}>
                {addr.isDefault && (
                  <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 0.5, color: '#facc15' }}>
                    <StarIcon fontSize="small" /> <Typography variant="caption" fontWeight={600}>Default</Typography>
                  </Box>
                )}
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  {addr.label} Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><strong>Street:</strong> {addr.street}</Grid>
                  <Grid size={{ xs: 12, md: 4 }}><strong>City:</strong> {addr.city}</Grid>
                  <Grid size={{ xs: 12, md: 4 }}><strong>State:</strong> {addr.state}</Grid>
                  <Grid size={{ xs: 12, md: 4 }}><strong>Pincode:</strong> {addr.pincode}</Grid>
                  <Grid size={{ xs: 12 }}><strong>Country:</strong> {addr.country}</Grid>
                </Grid>
                <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: 'wrap' }}>
                  {!addr.isDefault && (
                    <Button variant="outlined" onClick={() => setAsDefault(addr._id)}>Set as Default</Button>
                  )}
                  <Button variant="outlined" color="error" startIcon={deletingId === addr._id ? <CircularProgress size={18} /> : <DeleteIcon />} onClick={() => handleDeleteClick(addr._id)} disabled={deletingId === addr._id}>
                    Delete
                  </Button>
                  <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/customer/editprofile/${addr._id}`)}>Edit</Button>
                </Box>
              </Paper>
            ))
          )}

          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack || (() => navigate(-1))}>Back</Button>
          </Box>
        </Paper>
      </CustomerCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Delete Address?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerProfile;