// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   FormControl,
//   Select,
//   MenuItem,
//   Grid,
//   Paper,
//   Alert,
//   CircularProgress,
//   InputLabel
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SaveIcon from "@mui/icons-material/Save";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../../api/axiosConfig";
// import { posteditaddress, updateeditaddress } from "../../../Redux/Slices/CM_ProfileSlice";
// import { jwtDecode } from "jwt-decode";
// import CustomerCardAuth from "./CustomerCardAuth";

// const countriesData = {
//   India: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
//   "United States": ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
//   "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
//   Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia"],
//   Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
//   Germany: ["Bavaria", "Berlin", "Hamburg", "North Rhine-Westphalia", "Baden-Württemberg"],
//   France: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Occitanie"],
//   Japan: ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Aichi"],
//   Brazil: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"],
//   "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
//   Nigeria: ["Lagos", "Abuja", "Kano", "Rivers", "Oyo"],
//   Mexico: ["Mexico City", "Jalisco", "Nuevo León", "Yucatán"],
//   Italy: ["Lazio", "Lombardy", "Veneto", "Campania", "Sicily"],
//   Spain: ["Andalusia", "Catalonia", "Madrid", "Valencia"],
//   Netherlands: ["North Holland", "South Holland", "Utrecht", "North Brabant"],
// };

// function CustomerEditAddress() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id: editaddressId } = useParams();

//   const editAddress = useSelector((state) => state.editprofile.editaddress);
//   const [savingAddress, setSavingAddress] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [otherLabel, setOtherLabel] = useState("");

//   const [addressForm, setAddressForm] = useState({
//     label: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",
//     _id: "",
//     isDefault: false,
//   });

//   useEffect(() => {
//     if (editaddressId && Array.isArray(editAddress)) {
//       const currentAddr = editAddress.find((addr) => addr._id === editaddressId);
//       if (currentAddr) {
//         const isPredefined = ["", "HOME", "OFFICE"].includes(currentAddr.label);
//         setAddressForm({
//           label: isPredefined ? (currentAddr.label || "") : "OTHER",
//           street: currentAddr.street || "",
//           city: currentAddr.city || "",
//           state: currentAddr.state || "",
//           country: currentAddr.country || "",
//           pincode: currentAddr.pincode || "",
//           _id: currentAddr._id || "",
//           isDefault: currentAddr.isDefault || false,
//         });
//         setOtherLabel(isPredefined ? "" : currentAddr.label);
//       }
//     } else {
//       setAddressForm({
//         label: "",
//         street: "",
//         city: "",
//         state: "",
//         country: "India",
//         pincode: "",
//         _id: "",
//         isDefault: false,
//       });
//     }
//   }, [editaddressId, editAddress]);

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setAddressForm((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === "country") updated.state = ""; 
//       return updated;
//     });
//   };

//   const handleSaveAddress = async (e) => {
//     e.preventDefault();
//     setSavingAddress(true);
//     setMessage(null);
//     try {
//       const token = localStorage.getItem("token");
//       const decoded = jwtDecode(token);
//       const userId = decoded.id;

//       const finalLabel = addressForm.label === "OTHER" ? otherLabel : addressForm.label;
//       const payload = { ...addressForm, label: finalLabel, userId };
//       if (!payload._id) delete payload._id;

//       let response;
//       if (editaddressId) {
//         response = await api.put(`/updateCustomerProfile/updateAddress/${editaddressId}`, payload);
//         dispatch(updateeditaddress({ id: addressForm._id, data: response.data.address }));
//       } else {
//         response = await api.post(`/updateCustomerProfile/addAddress/${userId}`, payload);
//         dispatch(posteditaddress(response.data.address));
//       }

//       navigate("/customer/profile", { 
//         state: { message: { text: editaddressId ? "Address updated!" : "New address added!", type: "success" } }
//       });
//     } catch (err) {
//       console.error("Address save error:", err.response?.data || err.message);
//       setMessage({ text: "Failed to save address", type: "error" });
//     } finally {
//       setSavingAddress(false);
//     }
//   };

//   const availableStates = countriesData[addressForm.country] || [];

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
//       <CustomerCardAuth>
//         <Paper
//           elevation={0}
//           sx={{
//             maxWidth: 760,
//             mx: "auto",
//             p: { xs: 3, sm: 4 },
//             borderRadius: 4,
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           <Typography variant="h5" fontWeight={700} gutterBottom>
//             {editaddressId ? "Edit Address" : "Add Address"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
//             Manage your delivery and shipping layouts
//           </Typography>

//           {message && (
//             <Alert severity={message.type} sx={{ mb: 3 }}>
//               {message.text}
//             </Alert>
//           )}

//           <form onSubmit={handleSaveAddress}>
//             <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
//               {editaddressId ? "Update Address Details" : "New Address Details"}
//             </Typography>

//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="address-type-label">Address Type</InputLabel>
//                   <Select
//                     labelId="address-type-label"
//                     name="label"
//                     value={addressForm.label}
//                     onChange={handleAddressChange}
//                     label="Address Type"
//                   >
//                     <MenuItem value="">Select Address Type</MenuItem>
//                     <MenuItem value="HOME">Home</MenuItem>
//                     <MenuItem value="OFFICE">Office</MenuItem>
//                     <MenuItem value="OTHER">Other</MenuItem>
//                   </Select>
//                   {addressForm.label === "OTHER" && (
//                     <TextField
//                       name="customLabel"
//                       label="Specify Address Type"
//                       value={otherLabel}
//                       onChange={(e) => setOtherLabel(e.target.value)}
//                       variant="outlined"
//                       fullWidth
//                       margin="normal"
//                     />
//                   )}
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Street / Locality"
//                   name="street"
//                   value={addressForm.street}
//                   onChange={handleAddressChange}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel id="country-label">Country</InputLabel>
//                   <Select
//                     labelId="country-label"
//                     name="country"
//                     value={addressForm.country}
//                     onChange={handleAddressChange}
//                     label="Country"
//                   >
//                     <MenuItem value="">Select Country</MenuItem>
//                     {Object.keys(countriesData).map((country) => (
//                       <MenuItem key={country} value={country}>
//                         {country}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth disabled={!addressForm.country}>
//                   <InputLabel id="state-label">State</InputLabel>
//                   <Select
//                     labelId="state-label"
//                     name="state"
//                     value={addressForm.state}
//                     onChange={handleAddressChange}
//                     label="State"
//                   >
//                     <MenuItem value="">Select State</MenuItem>
//                     {availableStates.map((state) => (
//                       <MenuItem key={state} value={state}>
//                         {state}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   value={addressForm.city}
//                   onChange={handleAddressChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Pincode"
//                   name="pincode"
//                   value={addressForm.pincode}
//                   onChange={handleAddressChange}
//                 />
//               </Grid>
//             </Grid>

//             <Box
//               sx={{
//                 mt: 4,
//                 display: "flex",
//                 flexDirection: { xs: "column-reverse", sm: "row" },
//                 gap: 2,
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={() => navigate("/customer/profile")}
//                 fullWidth={{ xs: true, sm: false }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 startIcon={savingAddress ? <CircularProgress size={20} /> : <SaveIcon />}
//                 disabled={savingAddress}
//                 fullWidth={{ xs: true, sm: false }}
//               >
//                 {savingAddress ? "Saving..." : editaddressId ? "Update Address" : "Add Address"}
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </CustomerCardAuth>
//     </Box>
//   );
// }

// export default CustomerEditAddress;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Alert,
  CircularProgress,
  InputLabel,
  Stack
} from "@mui/material";
import Grid2 from "@mui/material/Grid"; // Uses updated MUI Grid2 layout system
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosConfig";
import { posteditaddress, updateeditaddress } from "../../../Redux/Slices/CM_ProfileSlice";
import { jwtDecode } from "jwt-decode";
import CustomerCardAuth from "./CustomerCardAuth";

const countriesData = {
  India: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
  "United States": ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
  Germany: ["Bavaria", "Berlin", "Hamburg", "North Rhine-Westphalia", "Baden-Württemberg"],
  France: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Occitanie"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Aichi"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
  Nigeria: ["Lagos", "Abuja", "Kano", "Rivers", "Oyo"],
  Mexico: ["Mexico City", "Jalisco", "Nuevo León", "Yucatán"],
  Italy: ["Lazio", "Lombardy", "Veneto", "Campania", "Sicily"],
  Spain: ["Andalusia", "Catalonia", "Madrid", "Valencia"],
  Netherlands: ["North Holland", "South Holland", "Utrecht", "North Brabant"],
};

function CustomerEditAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: editaddressId } = useParams();

  const editAddress = useSelector((state) => state.editprofile.editaddress);
  const [savingAddress, setSavingAddress] = useState(false);
  const [message, setMessage] = useState(null);
  const [otherLabel, setOtherLabel] = useState("");

  const [addressForm, setAddressForm] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    _id: "",
    isDefault: false,
  });

  useEffect(() => {
    if (editaddressId && Array.isArray(editAddress)) {
      const currentAddr = editAddress.find((addr) => addr._id === editaddressId);
      if (currentAddr) {
        const isPredefined = ["", "HOME", "OFFICE"].includes(currentAddr.label);
        setAddressForm({
          label: isPredefined ? (currentAddr.label || "") : "OTHER",
          street: currentAddr.street || "",
          city: currentAddr.city || "",
          state: currentAddr.state || "",
          country: currentAddr.country || "",
          pincode: currentAddr.pincode || "",
          _id: currentAddr._id || "",
          isDefault: currentAddr.isDefault || false,
        });
        setOtherLabel(isPredefined ? "" : currentAddr.label);
      }
    } else {
      setAddressForm({
        label: "",
        street: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        _id: "",
        isDefault: false,
      });
    }
  }, [editaddressId, editAddress]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "country") updated.state = ""; 
      return updated;
    });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const finalLabel = addressForm.label === "OTHER" ? otherLabel : addressForm.label;
      const payload = { ...addressForm, label: finalLabel, userId };
      if (!payload._id) delete payload._id;

      let response;
      if (editaddressId) {
        response = await api.put(`/updateCustomerProfile/updateAddress/${editaddressId}`, payload);
        dispatch(updateeditaddress({ id: addressForm._id, data: response.data.address }));
      } else {
        response = await api.post(`/updateCustomerProfile/addAddress/${userId}`, payload);
        dispatch(posteditaddress(response.data.address));
      }

      navigate("/customer/profile", { 
        state: { message: { text: editaddressId ? "Address updated!" : "New address added!", type: "success" } }
      });
    } catch (err) {
      console.error("Address save error:", err.response?.data || err.message);
      setMessage({ text: "Failed to save address. Please try again.", type: "error" });
    } finally {
      setSavingAddress(false);
    }
  };

  const availableStates = countriesData[addressForm.country] || [];

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#fdfefe", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <CustomerCardAuth>
        <Paper
          elevation={0}
          sx={{
            maxWidth: '100%',
            mx: "auto",
            p: { xs: 2.5, sm: 5 },
            borderRadius: 4,
            border: "1px solid #eaecf0",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)"
          }}
        >
          {/* Header Area */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Box sx={{ p: 1, bgcolor: "primary.light", borderRadius: 2, display: "flex", color: "primary.main" }}>
              <LocationOnOutlinedIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#101828" }}>
                {editaddressId ? "Edit Address" : "Add New Address"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure your accurate location configuration details below.
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Alert severity={message.type} variant="standard" sx={{ mt: 3, mb: 1, borderRadius: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSaveAddress} sx={{ mt: 4 }}>
            <Grid2 container spacing={2.5}>
              
              {/* Type Select Field */}
              <Grid2 size={{ xs: 12, sm: addressForm.label === "OTHER" ? 6 : 12 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="address-type-label">Address Type</InputLabel>
                  <Select
                    labelId="address-type-label"
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressChange}
                    label="Address Type"
                    required
                  >
                    <MenuItem value="" disabled>Select Type</MenuItem>
                    <MenuItem value="HOME">🏠 Home</MenuItem>
                    <MenuItem value="OFFICE">🏢 Office</MenuItem>
                    <MenuItem value="OTHER">📍 Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>

              {/* Dynamic Type Field Option */}
              {addressForm.label === "OTHER" && (
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="customLabel"
                    label="Specify Address Type"
                    value={otherLabel}
                    onChange={(e) => setOtherLabel(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid2>
              )}

              {/* Street Address */}
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Street Address / Locality / Apartment"
                  name="street"
                  value={addressForm.street}
                  onChange={handleAddressChange}
                  required
                />
              </Grid2>

              {/* Country Picker */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    label="Country"
                    required
                  >
                    <MenuItem value="" disabled>Select Country</MenuItem>
                    {Object.keys(countriesData).map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {/* State Picker */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth disabled={!addressForm.country || availableStates.length === 0}>
                  <InputLabel id="state-label">State / Province</InputLabel>
                  <Select
                    labelId="state-label"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    label="State / Province"
                    required
                  >
                    <MenuItem value="" disabled>Select State</MenuItem>
                    {availableStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {/* City */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  required
                />
              </Grid2>

              {/* Postal Pincode Code */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Pincode / ZIP Code"
                  name="pincode"
                  value={addressForm.pincode}
                  onChange={handleAddressChange}
                  required
                />
              </Grid2>
            </Grid2>

            {/* Form Actions Footbar */}
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 5 }}
            >
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/customer/profile")}
                sx={{ color: "text.secondary", px: 3, py: 1.2 }}
                fullWidth={{ xs: true, sm: false }}
              >
                Back to Profile
              </Button>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                startIcon={savingAddress ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                disabled={savingAddress}
                sx={{ px: 4, py: 1.2, fontWeight: 600, borderRadius: 2 }}
                fullWidth={{ xs: true, sm: false }}
              >
                {savingAddress ? "Saving Details..." : editaddressId ? "Update Address" : "Save Location"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </CustomerCardAuth>
    </Box>
  );
}

export default CustomerEditAddress;