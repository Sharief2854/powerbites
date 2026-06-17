
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Avatar, Box, Button, Typography, Paper, Grid, Divider, IconButton, Alert,
//   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import StarIcon from "@mui/icons-material/Star";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosConfig";
// import { deleteeditaddress, geteditaddress, getEditProfile, postCustomerPhoto, deleteCustomerPhoto } from "../../Redux/Slices/CM_ProfileSlice";
// import CustomerCard from "./CustomerCard";
// import { jwtDecode } from "jwt-decode";

// function CustomerProfile({ onBack }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const editProfile = useSelector((state) => state.editprofile.editprofile || {});
//   const editAddress = useSelector((state) => state.editprofile.editaddress || []);
//   const customerPhoto = useSelector((state) => state.editprofile.photo || []);

//   const [image, setImage] = useState("");
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
// const [confirmDelete, setConfirmDelete] = useState({
//   open: false,
//   id: null,
// });

//   const { name, email, phone } = editProfile;



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
//         response.data?.user.image ||
//         response.data?.photo ||
//         response.data?.path ||
//         response.data?.photo?.path;

//       // if (imagePath) {
//       //   const cleanPath = imagePath
//       //     ? imagePath.replace(/\\/g, "/").replace(/^\/+/, "")
//       //     : "";
//       //     const finalImageUrl = cleanPath
//       //     ? `http://localhost:4500/${cleanPath}`
//       //     : "";
//         dispatch(postCustomerPhoto(imagePath));
//         setImage(imagePath);

//         // Update Redux store with the new photo URL alongside existing data
//         // dispatch(getEditProfile({ ...editProfile, image: finalImageUrl }));
      
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   async function handleDeletePhoto(){
//     try {
//       const token = localStorage.getItem("token");
//       let id = "6a2a987342fbcdfda0a5c5b0"; // Fallback ID 

//       let response = await api.delete(`/updateCustomerProfile/deletePhoto/${id}`);
//       console.log(response.data)
      
//       dispatch(deleteCustomerPhoto(response.data))
//       setImage("");

//     }
//     catch(err){
//       console.log(err.response.data.message)  
//     }
//   }

//   async function fetchCustomerPhoto() {

//     try {

//        const token = localStorage.getItem("token");
//       let id = "6a2a987342fbcdfda0a5c5b0"; // Fallback ID

//       if (token) {
//         const decoded = jwtDecode(token);
//         id = decoded.id || id;
//       }

//       let response = await api.get(`/updateCustomerProfile/getProfile`);
//       console.log("getphoto",response.data);

//     const imagePath =
//         response.data?.photo?.url ||
//         response.data?.user.image ||
//         response.data?.photo ||
//         response.data?.path ||
//         response.data?.photo?.path;

//       // if (imagePath) {
//       //   const cleanPath = imagePath
//       //     ? imagePath.replace(/\\/g, "/").replace(/^\/+/, "")
//       //     : "";
//       //     const finalImageUrl = cleanPath
//       //     ? `http://localhost:4500/${cleanPath}`
//       //     : "";
//         dispatch(postCustomerPhoto(imagePath));
//         setImage(imagePath);
//       //}

      
//     } catch (err) {
//       console.log("error :",err.response.data.message);
      
//     }
    
//   }

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [profileRes, addressRes] = await Promise.all([
//         api.get("/updateCustomerProfile/getProfile"),
//         api.get("/updateCustomerProfile/getAddresses")
//       ]);
//       dispatch(getEditProfile(profileRes.data.user));
//       dispatch(geteditaddress(Array.isArray(addressRes.data.addresses) ? addressRes.data.addresses : []));
//     } catch (err) {
//       setMessage({ text: "Failed to load data", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setAsDefault = async (id) => {
//     try {
//       console.log("Setting default address for ID:", id);
//       await api.get(`/updateCustomerProfile/setDefaultAddress/${id}`);
//       console.log("Default address updated!");
//       fetchData();
//       setMessage({ text: "Default address updated!", type: "success" });
//     } catch (err) {
//       setMessage({ text: "Failed to set default address", type: "error" });
//     }
//   };

//   const handleDeleteClick = (id) => setConfirmDelete({ open: true, id });

//   const handleConfirmDelete = async () => {
//     if (!confirmDelete.id) return;
//     setDeletingId(confirmDelete.id);
//     setConfirmDelete({ open: false, id: null });
//     try {
//       await api.delete(`/updateCustomerProfile/deleteAddress/${confirmDelete.id}`);
//       dispatch(deleteeditaddress(confirmDelete.id));
//       setMessage({ text: "Address deleted successfully", type: "success" });
//     } catch (err) {
//       setMessage({ text: "Failed to delete address", type: "error" });
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//     fetchCustomerPhoto();
//   }, []);

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 3, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
//       <CustomerCard>
//         <Paper elevation={0} sx={{ maxWidth: 760, mx: "auto", p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
//           {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

//           {/* Header */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 5 }}>
//             <Box sx={{ position: "relative" }}>
//               <Avatar src={image||customerPhoto} sx={{ width: 90, height: 90, bgcolor: "#673ab7", fontSize: "2.2rem", border: "4px solid white" }}>
//                 {name?.charAt(0)?.toUpperCase() || "U"}
//               </Avatar>
//               <IconButton onClick={() => fileInputRef.current?.click()} sx={{ position: "absolute", bottom: 38, right: 55, bgcolor: "#673ab7", color: "white" }} size="small">
//                 <EditIcon fontSize="small" />
//               </IconButton>
//               <input type="file" ref={fileInputRef} hidden accept="image/*"  onChange={handleFileChange} />
//               <Button variant="outlined" onClick={handleDeletePhoto} startIcon={<DeleteIcon />} size="small">Delete Photo</Button> 
//             </Box>
//             <Box>
//               <Typography variant="h5" fontWeight={700}>{name}</Typography>
//               <Typography color="text.secondary">{email}</Typography>
//             </Box>
//           </Box>

//           {/* Personal Details */}
//           <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>Personal Details</Typography>
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Name</Typography><Typography fontWeight={500}>{name}</Typography></Grid>
//             <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Email</Typography><Typography fontWeight={500}>{email}</Typography></Grid>
//             <Grid size={{ xs: 12, md: 4 }}><Typography variant="caption" color="text.secondary">Phone</Typography><Typography fontWeight={500}>{phone || "—"}</Typography></Grid>
//           </Grid>

//           <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate("/customer/editprofile")}>Edit Profile</Button>

//           <Divider sx={{ my: 5 }} />

//           {/* Addresses */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="subtitle1" fontWeight={600} color="primary">Saved Addresses</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/customer/editprofile")}>Add Address</Button>
//           </Box>

//           {editAddress.length === 0 ? (
//             <Typography color="text.secondary" align="center" py={6}>No addresses yet. Add your first one!</Typography>
//           ) : (
//             editAddress.map((addr) => (
//               <Paper key={addr._id} variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3, position: 'relative' }}>
//                 {addr.isDefault && (
//                   <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 0.5, color: '#facc15' }}>
//                     <StarIcon fontSize="small" /> <Typography variant="caption" fontWeight={600}>Default</Typography>
//                   </Box>
//                 )}
//                 <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                   {addr.label} Address
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid size={{ xs: 12 }}><strong>Street:</strong> {addr.street}</Grid>
//                   <Grid size={{ xs: 12, md: 4 }}><strong>City:</strong> {addr.city}</Grid>
//                   <Grid size={{ xs: 12, md: 4 }}><strong>State:</strong> {addr.state}</Grid>
//                   <Grid size={{ xs: 12, md: 4 }}><strong>Pincode:</strong> {addr.pincode}</Grid>
//                   <Grid size={{ xs: 12 }}><strong>Country:</strong> {addr.country}</Grid>
//                 </Grid>
//                 <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: 'wrap' }}>
//                   {!addr.isDefault && (
//                     <Button variant="outlined" onClick={() => setAsDefault(addr._id)}>Set as Default</Button>
//                   )}
//                   <Button variant="outlined" color="error" startIcon={deletingId === addr._id ? <CircularProgress size={18} /> : <DeleteIcon />} onClick={() => handleDeleteClick(addr._id)} disabled={deletingId === addr._id}>
//                     Delete
//                   </Button>
//                   <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/customer/editprofile/${addr._id}`)}>Edit</Button>
//                 </Box>
//               </Paper>
//             ))
//           )}

//           <Box sx={{ mt: 4 }}>
//             <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack || (() => navigate(-1))}>Back</Button>
//           </Box>
//         </Paper>
//       </CustomerCard>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
//         <DialogTitle>Delete Address?</DialogTitle>
//         <DialogContent>
//           <DialogContentText>This action cannot be undone.</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
//           <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
//         </DialogActions>
//       </Dialog>
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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { deleteeditaddress, geteditaddress, getEditProfile, postCustomerPhoto, deleteCustomerPhoto } from "../../Redux/Slices/CM_ProfileSlice";
import CustomerCard from "./CustomerCard";
import { jwtDecode } from "jwt-decode";

function CustomerProfile({ onBack }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const editProfile = useSelector((state) => state.editprofile.editprofile || {});
  const editAddress = useSelector((state) => state.editprofile.editaddress || []);
  const customerPhoto = useSelector((state) => state.editprofile.photo || []);

  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const { name, email, phone } = editProfile;

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
        response.data?.user?.image ||
        response.data?.photo ||
        response.data?.path ||
        response.data?.photo?.path;

      dispatch(postCustomerPhoto(imagePath));
      setImage(imagePath);
      setMessage({ text: "Profile picture updated successfully!", type: "success" });
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage({ text: "Failed to upload image", type: "error" });
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      let id = "6a2a987342fbcdfda0a5c5b0"; 

      let response = await api.delete(`/updateCustomerProfile/deletePhoto/${id}`);
      dispatch(deleteCustomerPhoto(response.data));
      setImage("");
      setMessage({ text: "Profile picture removed.", type: "success" });
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to delete profile picture", type: "error" });
    }
  };

  const fetchCustomerPhoto = async () => {
    try {
      let response = await api.get(`/updateCustomerProfile/getProfile`);
      const imagePath =
        response.data?.photo?.url ||
        response.data?.user?.image ||
        response.data?.photo ||
        response.data?.path ||
        response.data?.photo?.path;

      dispatch(postCustomerPhoto(imagePath));
      setImage(imagePath);
    } catch (err) {
      console.log("Error loading photo:", err);
    }
  };

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
      await api.get(`/updateCustomerProfile/setDefaultAddress/${id}`);
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

  useEffect(() => { 
    fetchData(); 
    fetchCustomerPhoto();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomerCard>
        <Paper elevation={0} sx={{ maxWidth: 760, mx: "auto", p: { xs: 2.5, sm: 4 }, borderRadius: 4, border: "1px solid #e2e8f0" }}>
          {message && <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>{message.text}</Alert>}

          {/* Header Section with Beautiful & Responsive Photo Area */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            alignItems: { xs: "center", sm: "center" }, 
            textAlign: { xs: "center", sm: "left" },
            gap: 3, 
            mb: 5 
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar 
                  src={image || customerPhoto} 
                  sx={{ 
                    width: { xs: 100, sm: 110 }, 
                    height: { xs: 100, sm: 110 }, 
                    bgcolor: "#673ab7", 
                    fontSize: "2.5rem", 
                    border: "4px solid #fff",
                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
                
                {/* Upload Action overlay button */}
                <IconButton 
                  onClick={() => fileInputRef.current?.click()} 
                  sx={{ 
                    position: "absolute", 
                    bottom: 4, 
                    right: 4, 
                    bgcolor: "#673ab7", 
                    color: "white",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                    "&:hover": { bgcolor: "#5e35b1" }
                  }} 
                  size="small"
                >
                  <PhotoCameraIcon fontSize="small" />
                </IconButton>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
              </Box>

              {/* Show delete image option if photo exists */}
              {(image || customerPhoto) && (
                <Button 
                  variant="text" 
                  color="error" 
                  startIcon={<DeleteIcon />} 
                  size="small"
                  onClick={handleDeletePhoto}
                  sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                  Remove Photo
                </Button>
              )}
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#1a202c', mb: 0.5 }}>{name}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{email}</Typography>
              <Typography variant="caption" color="text.disabled" display="block">Customer Profile Management Account</Typography>
            </Box>
          </Box>

          {/* Personal Details Section */}
          <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>Personal Details</Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="text.secondary" display="block">Name</Typography>
              <Typography fontWeight={500}>{name || "—"}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
              <Typography fontWeight={500}>{email || "—"}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="caption" color="text.secondary" display="block">Phone Number</Typography>
              <Typography fontWeight={500}>{phone || "—"}</Typography>
            </Grid>
          </Grid>

          <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate("/customer/editprofile")} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: "#673ab7", "&:hover": { bgcolor: "#5e35b1" } }}>
            Edit Profile
          </Button>

          <Divider sx={{ my: 4 }} />

          {/* Addresses Section Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={600} color="primary">Saved Addresses</Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/customer/editprofile")} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Add Address
            </Button>
          </Box>

          {editAddress.length === 0 ? (
            <Typography color="text.secondary" align="center" py={4}>No addresses found. Add your primary shipping address!</Typography>
          ) : (
            editAddress.map((addr) => (
              <Paper key={addr._id} variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3, position: 'relative', bgcolor: '#fff' }}>
                {addr.isDefault && (
                  <Box sx={{ position: { xs: 'relative', sm: 'absolute' }, top: { sm: 16 }, right: { sm: 16 }, display: 'flex', alignItems: 'center', gap: 0.5, color: '#eab308', mb: { xs: 1.5, sm: 0 } }}>
                    <StarIcon fontSize="small" /> <Typography variant="caption" fontWeight={700}>Default Address</Typography>
                  </Box>
                )}
                <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: 'uppercase', color: '#4a5568', mb: 2, letterSpacing: 0.5 }}>
                  {addr.label || 'Home'} Address
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary" display="block">Street Address</Typography>
                    <Typography variant="body2" fontWeight={500}>{addr.street}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">City</Typography>
                    <Typography variant="body2" fontWeight={500}>{addr.city}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">State</Typography>
                    <Typography variant="body2" fontWeight={500}>{addr.state}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">Pincode</Typography>
                    <Typography variant="body2" fontWeight={500}>{addr.pincode}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary" display="block">Country</Typography>
                    <Typography variant="body2" fontWeight={500}>{addr.country}</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: "flex", gap: 1.5, justifyContent: "flex-end", flexWrap: 'wrap' }}>
                  {!addr.isDefault && (
                    <Button variant="text" size="small" onClick={() => setAsDefault(addr._id)} sx={{ textTransform: 'none' }}>Set as Default</Button>
                  )}
                  <Button variant="outlined" color="error" size="small" startIcon={deletingId === addr._id ? <CircularProgress size={16} /> : <DeleteIcon />} onClick={() => handleDeleteClick(addr._id)} disabled={deletingId === addr._id} sx={{ textTransform: 'none', borderRadius: 2 }}>
                    Delete
                  </Button>
                  <Button variant="contained" size="small" startIcon={<EditIcon />} onClick={() => navigate(`/customer/editprofile/${addr._id}`)} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: "#673ab7", "&:hover": { bgcolor: "#5e35b1" } }}>
                    Edit
                  </Button>
                </Box>
              </Paper>
            ))
          )}

          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #edf2f7' }}>
            <Button variant="outlined" color="inherit" startIcon={<ArrowBackIcon />} onClick={onBack || (() => navigate(-1))} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </CustomerCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle fontWeight={700}>Delete Saved Address?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to remove this address? This action cannot be reversed.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ textTransform: 'none', borderRadius: 2 }}>Delete Address</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerProfile;