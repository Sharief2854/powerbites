import { Alert } from "@mui/material";
import Grid2 from "@mui/material/Grid"; // Uses updated MUI Grid2 layout system
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  posteditaddress,
  updateeditaddress,
} from "../../../Redux/Slices/CM_ProfileSlice";

import {
  Box,
  Card,
  Chip,
  CardContent,
  IconButton,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Stack,
  Paper,
  Typography,
  Button,
  Checkbox,
  Skeleton,
  Modal,
  FormControl,
  TextField,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { EditNotificationsSharp } from "@mui/icons-material";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../Components/Common/Buttons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  addToCart,
  addValue,
  getItems,
  removeCartItem,
  updateCartQuantity,
  removeCouponFromCart,
} from "../../../Redux/Slices/CM_CartSlice";
import PaymentButton from "../Payments/PaymentButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomerCardAuth from "../Profile/CustomerCardAuth";

const cartCardAnimation = {
  "@keyframes cartCard": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.03)" },
    "100%": { transform: "scale(1)" },
  },
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 9,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 9,
  pt: 2,
  px: 4,
  pb: 3,
};
const countriesData = {
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
};

function AddressModal({
  open,
  onClose,
  setAddress,
  addresses,
  setUpdateAddress,
}) {
  const [message, setMessage] = useState(null);
  const editProfile = useSelector((state) => state.editprofile.editprofile);

  const editAddress = useSelector((state) => state.editprofile.editaddress);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [otherLabel, setOtherLabel] = useState("");

  const [profileForm, setProfileForm] = useState({
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
    _id: "",
    isDefault: false,
  });

  const editaddressId = useParams().id || "";

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({ ...prev, [name]: value }));

    if (name === "country") {
      setAddressForm((prev) => ({ ...prev, state: "" }));
    }
  };

  const dispatch = useDispatch();
  const handleDefaultChange = (e) => {
    setAddressForm((prev) => ({ ...prev, isDefault: e.target.checked }));
    console.log("addressfrom :", addressForm);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const finalLabel =
        addressForm.label === "OTHER" ? otherLabel : addressForm.label;
      const payload = { ...addressForm, label: finalLabel, userId };
      if (!payload._id) delete payload._id;
      if (["HOME"].includes(finalLabel)) {
        const existingLabel = addresses.find(
          (addr) => addr.label === finalLabel,
        );
        if (existingLabel) {
          enqueueSnackbar(
            `An address with the Address type "${finalLabel}" already exists.`,
            {
              variant: "warning",
            },
          );
          setSavingAddress(false);
          return;
        }
      }
      let response;

      response = await api.post(
        `/updateCustomerProfile/addAddress/${userId}`,
        payload,
      );
      console.log(response.data);

      setUpdateAddress(response.data.address);
      if (setAddress) {
        setAddress((prevAddresses) => [
          ...prevAddresses,
          response.data.address,
        ]);
      }
      onClose();
      enqueueSnackbar("Address added successfully!", {
        variant: "success",
      });

      setAddressForm({
        label: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        _id: "",
        isDefault: false,
      });
      setOtherLabel("");

      setMessage({
        text: "Address added!",
        type: "success",
      });
    } catch (err) {
      console.error("Address save error:", err.response?.data || err.message);
      enqueueSnackbar(`${err.response?.data || err.message}`, {
        variant: "error",
      });
      setMessage({ text: "Failed to save address", type: "error" });
    } finally {
      setSavingAddress(false);
    }
  };

  const availableStates = countriesData[addressForm.country] || [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            bgcolor: "#fdfefe",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CustomerCardAuth>
            <Paper
              elevation={0}
              sx={{
                maxWidth: "100%",
                mx: "auto",
                p: { xs: 2.5, sm: 5 },
                borderRadius: 4,
                border: "1px solid #eaecf0",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "primary.light",
                    borderRadius: 2,
                    display: "flex",
                    color: "primary.main",
                  }}
                >
                  <LocationOnOutlinedIcon fontSize="medium" />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: "#101828" }}
                  >
                    {editaddressId ? "Edit Address" : "Add New Address"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure your accurate location configuration details
                    below.
                  </Typography>
                </Box>
              </Stack>

              {message && (
                <Alert
                  severity={message.type}
                  variant="standard"
                  sx={{ mt: 3, mb: 1, borderRadius: 2 }}
                >
                  {message.text}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSaveAddress} sx={{ mt: 4 }}>
                <Grid2 container spacing={2.5}>
                  <Grid2
                    size={{
                      xs: 12,
                      sm: addressForm.label === "OTHER" ? 6 : 12,
                    }}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="address-type-label">
                        Address Type
                      </InputLabel>
                      <Select
                        labelId="address-type-label"
                        name="label"
                        value={addressForm.label}
                        onChange={handleAddressChange}
                        label="Address Type"
                        required
                      >
                        <MenuItem value="" disabled>
                          Select Type
                        </MenuItem>
                        <MenuItem value="HOME">🏠 Home</MenuItem>
                        <MenuItem value="OFFICE">🏢 Office</MenuItem>
                        <MenuItem value="OTHER">📍 Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>

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
                        <MenuItem value="" disabled>
                          Select Country
                        </MenuItem>
                        {Object.keys(countriesData).map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControl
                      fullWidth
                      disabled={
                        !addressForm.country || availableStates.length === 0
                      }
                    >
                      <InputLabel id="state-label">State / Province</InputLabel>
                      <Select
                        labelId="state-label"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        label="State / Province"
                        required
                      >
                        <MenuItem value="" disabled>
                          Select State
                        </MenuItem>
                        {availableStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

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

                <Stack
                  direction={{ xs: "column-reverse", sm: "row" }}
                  spacing={2}
                  justifyContent="flex-end"
                  sx={{ mt: 5 }}
                >
                  <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    onClick={onClose}
                    sx={{ color: "text.secondary", px: 3, py: 1.2 }}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    Back to Profile
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    startIcon={
                      savingAddress ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <SaveIcon />
                      )
                    }
                    disabled={savingAddress}
                    sx={{ px: 4, py: 1.2, fontWeight: 600, borderRadius: 2 }}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    {savingAddress
                      ? "Saving Details..."
                      : editaddressId
                        ? "Update Address"
                        : "Save Location"}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </CustomerCardAuth>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function CustomerCart() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const quantity = useSelector((state) => state.cart.cartValue);

  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let decodeId = jwtDecode(token).id;
  const [addresses, setAddress] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [open, setOpen] = React.useState(false);
  const [updateAddress, setUpdateAddress] = useState(null);
  const [openAddress, setOpenAddress] = useState(false);
  const [coupon, setCoupon] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeId, setRemoveId] = useState("");

  const handleAddress = () => {
    setIsModalOpen(true);
  };
  const handleAddressOpen = () => setAddressModalOpen(true);
  const handleAddressClose = () => setAddressModalOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(addresses);

  const handleClose = () => {
    setOpen(false);
  };

  // const discountedPrice =
  //   product?.price - (product?.price * product?.discount) / 100;

  const handleRemoveCoupon = async () => {
    // try {
    //   await api.post("/cart/remove-coupon");
    //   dispatch(getItems());
    // } catch (error) {
    //   console.error("Failed to remove coupon:", error);
    // }
    dispatch(removeCouponFromCart());
    enqueueSnackbar("Coupon removed!", { variant: "info" });
  };
  const subtotal = cartItems.reduce((total, item) => {
    const priceInPaise = Math.round(Number(item?.product?.price) * 100);
    return total + priceInPaise * item?.quantity;
  }, 0);
  console.log(cartItems);

  const couponDiscount =
    cartItems[0]?.coupon &&
    Math.floor(subtotal / 100) >= cartItems[0]?.coupon.min_order_value
      ? Math.min(
          (subtotal * cartItems[0]?.coupon.discount) / 100,
          cartItems[0]?.coupon.max_discount,
        )
      : 0;

  const shipping = subtotal >= 1000 ? 0 : 999;

  const formatPrice = (amountInPaise) => (amountInPaise / 100).toFixed(2);

  const grandTotal = subtotal + shipping - couponDiscount * 100;
  console.log(couponDiscount, formatPrice(subtotal), shipping, grandTotal);

  async function getCoupons() {
    try {
      // let res = await api.get("coupon/getCoupons");
      // setCouponList(res.data.coupons);
      // console.log(res.data.coupons);
    } catch (error) {
      console.log(error.message);
    }
  }

  //   // Subtotal
  //   const subtotal = round2(
  //     itemsWithTotal.reduce((sum, item) => sum + item.lineTotal, 0)
  //   );

  //   // Shipping (example rule)
  //   const shippingCost = subtotal > 500 ? 0 : round2(shipping);

  //   // Discount
  //   const discountAmount = round2(discount);

  //   // Final total
  //   const total = round2(subtotal + shippingCost - discountAmount);

  //   return {
  //     items: itemsWithTotal,
  //     subtotal: subtotal.toFixed(2),
  //     shipping: shippingCost.toFixed(2),
  //     discount: discountAmount.toFixed(2),
  //     total: total.toFixed(2),
  //   };
  // }

  //update quantity
  function handleChange(cartId, quantity) {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ cartId, quantity }));
    } else {
      dispatch(removeCartItem(cartId));
    }
  }
  console.log(cartItems);

  async function saveForLater(cartId) {
    try {
      const res = await api.post(`/cart/later/${cartId}`);
      enqueueSnackbar("Saved for later", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to save item", {
        variant: "error",
      });
    }
  }

  function deleteModal(params) {
    setOpenDeleteDialog(true);
    setRemoveId(params);
  }

  //delete cart
  function deleteCart() {
    dispatch(removeCartItem(removeId)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Item removed", {
          variant: "success",
        });
      }
    });
    setOpenDeleteDialog(false);
  }
  //get Customer Address
  async function getAddress() {
    try {
      const res = await api.get("/updateCustomerProfile/getAddresses");

      const addressList = res.data.addresses;

      setAddress(addressList);
      const defaultAddress =
        addressList.find((item) => item.isDefault) || addressList[0];

      console.log(defaultAddress, addressList);
      setUpdateAddress(defaultAddress);
    } catch (error) {
      console.error("Failed to get address:", error);
    }
  }

  //delete cart
  function deleteCart() {
    dispatch(removeCartItem(removeId)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        enqueueSnackbar("Item removed", {
          variant: "success",
        });
      }
    });
    setOpenDeleteDialog(false);
  }

  async function changeAddress(params) {
    try {
      let res = await api.put(`/customer/cart/getAddress/${decodeId}`);
      dispatch(address(res.data.address));
    } catch (error) {
      enqueueSnackbar("failed to update address", { variant: "error" });
    }
  }
  async function orderPayment(params) {}
  let address =
    updateAddress && Object.keys(updateAddress).length
      ? updateAddress
      : addresses || [];

  console.log(cartItems);

  useEffect(() => {
    if (cartStatus === "idle") dispatch(getItems());
    getCoupons();
    getAddress();
  }, [cartStatus, dispatch]);

  useEffect(() => {
    if (addresses.length && !updateAddress) {
      const defaultAddress =
        addresses.find((item) => item.isDefault) || addresses[0];
      setUpdateAddress(defaultAddress);
    }
  }, [addresses]);

console.log(cartStatus);

  if (cartStatus === "loading" ) {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Grid size={{ xs: 12, sm: 8, md: 8 }}>
            <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Skeleton variant="rectangular" height={200} sx={{ ml: 2 }}/>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (cartItems?.length <= 0) {
    return (
      <Box sx={{ width: "screen", p: 3 }}>
        <Typography
          align="center"
          variant="h4"
          color="text.primary"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#3E1A89",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 100,
              color: "#3E1A89",
              opacity: 0.2,
              mb: 2,
            }}
          />
          Your Cart is Empty
        </Typography>
        <Typography
          align="center"
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          <SecondaryButton onClick={() => navigate("/customer/products")}>
            Browse Items
          </SecondaryButton>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ mb: 3, fontWeight: 600 }}
      >
        My Cart
      </Typography>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#3E1A89",
          }}
        >
          Remove Item
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from your cart?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={deleteCart}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
          <Stack>

            <AddressModal
              addresses={addresses}
              setAddress={setAddress}
              setUpdateAddress={setUpdateAddress}
              open={addressModalOpen}
              onClose={() => setAddressModalOpen(false)}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              paperprops={{
                sx: {
                  width: "100%",
                  maxWidth: 600,
                  margin: "auto",
                  p: 2,
                },
              }}
            >
              <DialogTitle
                component="div"
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.8), rgba(240,244,248,0.5))",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                      color: "text.primary",
                    }}
                  >
                    Delivery Address
                  </Typography>

                  <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleClose();
                      setAddressModalOpen(true);
                    }}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2,
                    }}
                  >
                    + Add New Address
                  </Button>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 400 }}
                >
                  Select one from your saved profiles below, or click the button
                  above to add a new destination.
                </Typography>
              </DialogTitle>
              <DialogContent dividers>
                {addresses.length > 0 ? (
                  addresses.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1,
                      }}
                    >
                      <Checkbox
                        checked={updateAddress?._id === item._id}
                        onChange={() => setUpdateAddress(item)}
                      />
                      <DialogContentText sx={{ color: "text.primary" }}>
                        {item.street}, {item.city}, {item.state}, {item.pincode}
                      </DialogContentText>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    No Saved Addresses Found.
                  </Typography>
                )}
              </DialogContent>

              <DialogActions>
                <Button variant="contained" autoFocus onClick={handleClose}>
                  Done
                </Button>
              </DialogActions>
            </Dialog>
            {cartItems?.map((item) => (
              <Card
                key={item._id}
                sx={{
                  display: { xs: "flex", sm: "block" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  borderRadius: 4,
                  p: 1.5,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: 2,
                  background: "linear-gradient(135deg,#fff,#f8f9ff)",
                  border: "1px solid rgba(62,26,137,0.10)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 18px 40px rgba(62,26,137,0.12)",
                  },
                }}
              >
                <Stack>
                  <Box
                    component="img"
                    src={
                      item?.product?.image?.[0]
                        ? `${item.product.image[0]
                            .replace(/\\/g, "/")
                            .replace(/^\/+/, "")}`
                        : "/no-image.png"
                    }
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 3,
                      objectFit: "cover",
                      border: "2px solid rgba(62,26,137,0.08)",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1.5px solid rgba(62,26,137,.15)",
                      width: 90,
                      borderRadius: 3,
                      bgcolor: "#fff",
                      boxShadow: "0 4px 12px rgba(62,26,137,.08)",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        item.quantity > 1 &&
                        handleChange(item._id, item.quantity - 1)
                      }
                      sx={{
                        color: "#3E1A89",
                        borderRadius: 0,
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        minWidth: 22,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#3E1A89",
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleChange(item._id, item.quantity + 1)}
                      sx={{
                        color: "#3E1A89",
                        borderRadius: 0,
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Stack>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack>
                    <Chip
                      size="small"
                      color={item.product.isAvailable ? "success" : "error"}
                      label={
                        item.product.isAvailable ? "Available" : "Out of Stock"
                      }
                      sx={{
                        fontWeight: 600,
                        width: 80,
                      }}
                    />
                    <Typography variant="h6" fontWeight={700} color="#1f2937">
                      {item.product.name}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "#6B7280",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {item?.product?.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 1 }}
                  >
                    <Chip
                      size="small"
                      label="In Cart"
                      sx={{
                        bgcolor: "rgba(62,26,137,0.08)",
                        color: "#3E1A89",
                        fontWeight: 600,
                      }}
                    />

                    {item?.product?.rating > 0 && (
                      <Chip
                        size="small"
                        icon={
                          item?.product?.rating && (
                            <StarIcon sx={{ fontSize: 16 }} />
                          )
                        }
                        label={`${item?.product?.rating}`}
                        color="warning"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Qty
                  </Typography>

                  <Select
                    value={item?.quantity}
                    onChange={(e) => handleChange(item?._id, e.target.value)}
                    size="small"
                    sx={{
                      borderRadius: 3,
                      minWidth: 70,
                      fontSize: "0.85rem",
                      bgcolor: "#fff",
                    }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Box> */}

                <Box sx={{ textAlign: "center", minWidth: 90 }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      fontWeight: 600,
                    }}
                  >
                    Price
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      textDecoration: "line-through",
                      color: "#3E1A89",
                    }}
                  >
                    ₹{item?.product?.price * item?.quantity}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "#3E1A89",
                    }}
                  >
                    ₹
                    {(item?.product?.price -
                      (item?.product?.price * item?.product?.discount) / 100) *
                      item?.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                    gap: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{
                      borderRadius: 99,
                      textTransform: "none",
                      fontSize: "0.75rem",
                      px: 2,
                    }}
                    onClick={() => deleteModal(item?._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              background: "linear-gradient(to bottom, #ffffff, #fcfcfc)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 4,
                background: "linear-gradient(90deg, #4CAF50, #2E7D32)",
              }}
            />

            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                sx={{
                  mb: 2.5,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                }}
              >
                Price Details
              </Typography>

              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary" variant="body2">
                    Subtotal ({quantity} items)
                  </Typography>

                  <Typography
                    color="text.primary"
                    fontWeight={500}
                    variant="body2"
                  >
                    ₹{formatPrice(subtotal)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary" variant="body2">
                    Shipping
                  </Typography>

                  <Chip
                    icon={
                      formatPrice(subtotal) < 1000 ? (
                        <LocalShippingIcon
                          style={{ fontSize: "14px", color: "#1b5e20" }}
                        />
                      ) : null
                    }
                    label={
                      formatPrice(subtotal) < 1000
                        ? "FREE"
                        : `₹${formatPrice(shipping)}`
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#e8f5e9",
                      color: "#1b5e20",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #c8e6c9",
                    }}
                  />
                </Box>

                {cartItems[0].coupon && (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "#f1f8e9",
                      border: "1px solid #c5e1a5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="success.main"
                      >
                        Coupon Applied: {cartItems[0].coupon.code}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {cartItems[0].coupon.discount}% OFF
                      </Typography>

                      <Typography
                        variant="body2"
                        color="success.main"
                        fontWeight={600}
                      >
                        - ₹{couponDiscount}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="primary.main"
                  >
                    ₹{formatPrice(grandTotal)}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 3, mb: 2, display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    borderRadius: "9px",
                    position: "relative",
                    overflow: "hidden",
                    px: 1,
                    py: 0.5,
                    background: "linear-gradient(145deg, #2c22e3, #3726cf)",
                    boxShadow: `
      inset 0 2px 4px rgba(255,255,255,0.4),
      inset 0 -4px 8px rgba(0,0,0,0.2),
      0 6px 15px rgba(255,87,34,0.35)
    `,

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 4,
                      left: 8,
                      width: "40%",
                      height: "25%",
                      background: "rgba(255,255,255,0.45)",
                      borderRadius: "50%",
                      filter: "blur(6px)",
                      pointerEvents: "none",
                    },
                    "& :hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/customer/coupon`)}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    coupon
                  </Typography>
                </Box>
              </Box>
              <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  Saved Address
                </Typography>

                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  {updateAddress ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      key={updateAddress._id}
                    >
                      {`${updateAddress.street}, ${updateAddress.city}, ${updateAddress.state}, ${updateAddress.country}, ${updateAddress.pincode}`}
                    </Typography>
                  ) : (
                    "No Address Found"
                  )}

                  {updateAddress ? (
                    <IconButton onClick={() => handleClickOpen()}>
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <PrimaryButton onClick={() => setAddressModalOpen(true)}>
                      Add Address
                    </PrimaryButton>
                  )}
                </Stack>
              </CardContent>
            </Card>
            </Stack>

              <Box sx={{ mt: 1 }}>
                <PaymentButton
                  addressId={updateAddress?._id}
                  amount={formatPrice(grandTotal)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

{
  /* 
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: 99,
                      textTransform: "none",
                      fontSize: "0.75rem",
                      px: 2,
                      bgcolor: "#3E1A89",
                      "&:hover": { bgcolor: "#2C1265" },
                    }}
                    onClick={() => saveForLater(item._id)}
                  >
                    Save
                  </Button> */
}
/* {
              
           */
