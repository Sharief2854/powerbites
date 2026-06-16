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
import { getEditProfile, posteditaddress, updateeditaddress } from "../../Redux/Slices/CM_ProfileSlice";
import { PasswordField, validatePassword } from "../utils/Validation";
import CustomerCard from "./CustomerCard";
import { jwtDecode } from "jwt-decode";

// Country & State Data (15 Countries)
const countriesData = {
  "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
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
    console.log("addressfrom :",addressForm)
  };

  // Validation Check for Password (only validate if they actually typed a new one)
  const isPasswordChanged = profileForm.password !== editProfile?.password;
  const passwordError = isPasswordChanged && profileForm.password ? validatePassword(profileForm.password) : "";

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (passwordError) return; // Prevent API call if the typed password doesn't meet rules

    setSavingProfile(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Construct a clean payload with only the fields that can be changed.
      const payload = {
        name: profileForm.name,
        phone: profileForm.phone,
      };
      if (isPasswordChanged && profileForm.password && profileForm.password.trim() !== "") {
        payload.password = profileForm.password; // Only send password if user typed a new one
      }
      console.log("payload :",payload)
      const res = await api.put(`/updateCustomerProfile/updateProfile/${userId}`, payload);
      console.log("Server response data:", res.data);
      dispatch(getEditProfile(res.data.user));
      console.log("Profile updated successfully!")
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setTimeout(() => navigate("/customer/profile"), 1500);
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message); // FIX: Added for better debugging.
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
      setTimeout(() => navigate("/customer/profile"), 1400);
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
                <PasswordField fullWidth label="Password" name="password" value={profileForm.password} onChange={handleProfileChange} error={!!passwordError} helperText={passwordError} autoComplete="new-password" />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/customer/profile")}>Cancel</Button>
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

              {/* <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Checkbox checked={addressForm.isDefault} onChange={handleDefaultChange} color="primary" />}
                  label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><StarIcon sx={{ color: '#facc15' }} /> Set as Default Address</Box>}
                />
              </Grid> */}
            </Grid>

            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/customer/profile")}>Cancel</Button>
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
