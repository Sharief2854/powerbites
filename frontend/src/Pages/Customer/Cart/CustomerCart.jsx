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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  addToCart,
  addValue,
  getItems,
  removeCartItem,
  updateCart,
} from "../../../Redux/Slices/CM_CartSlice";
import PaymentButton from "../Payments/PaymentButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Coupon from "./Coupon";

const pulseAnimation = {
  "@keyframes pulse": {
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
      if (addresses.label == "HOME" && addressForm.label == "HOME") {
        enqueueSnackbar(`${"HOME"} already exists  please try new`, {
          variant: "error",
        });
        setSavingAddress(false);
        return;
      }
      let response;

      response = await api.post(
        `/updateCustomerProfile/addAddress/${userId}`,
        payload,
      );
      setUpdateAddress(response.data.address);
      if (setAddress) {
        setAddress((prevAddresses) => [
          ...prevAddresses,
          response.data.address,
        ]);
      }
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
      onClose();
    } catch (err) {
      console.error("Address save error:", err.response?.data || err.message);
      setMessage({ text: "Failed to save address", type: "error" });
    } finally {
      setSavingAddress(false);
    }
  };

  const availableStates = countriesData[addressForm.country] || [];

  return (
    <React.Fragment>
      <SnackbarProvider />
      {open ? (
        ""
      ) : (
        <PrimaryButton onClick={handleOpen} sx={{ m: 0 }}>
          Add New
        </PrimaryButton>
      )}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style1, width: 400 }}>
          <form onSubmit={handleSaveAddress}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              {"Add New Address"}
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <Select
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Address Type</MenuItem>
                    <MenuItem value="HOME">Home</MenuItem>
                    <MenuItem value="OFFICE">Office</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                  {addressForm.label === "OTHER" && (
                    <TextField
                      name="customLabel"
                      label="Specify Address Type"
                      value={otherLabel}
                      onChange={(e) => setOtherLabel(e.target.value)}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Street / Locality"
                  name="street"
                  value={addressForm.street}
                  onChange={handleAddressChange}
                />
              </Grid>

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
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
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
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={addressForm.pincode}
                  onChange={handleAddressChange}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              {/* <Button
                variant="outlined"
                // startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/customer/profile")}
              >
                Cancel
              </Button> */}
              <PrimaryButton
                type="submit"
                variant="contained"
                disabled={savingAddress}
              >
                {"Add Address"}
              </PrimaryButton>
              <Button onClick={onClose}>Back</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function CustomerCart() {
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = useSelector((state) => state.cart.cartValue);

  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let decodeId = jwtDecode(token).id;
  const [qty, setQty] = useState(1);
  const [addresses, setAddress] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [open, setOpen] = React.useState(false);
  const [updateAddress, setUpdateAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);
  const [coupon, setCoupon] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openCoupon, setOpenCoupon] = useState(false);

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

  const subtotal = cartItems.reduce((total, item) => {
    const priceInPaise = Math.round(Number(item?.product?.price) * 100);
    return total + priceInPaise * item?.quantity;
  }, 0);

  const shipping = subtotal < 1000 ? "Free" : 0;

  const grandTotal = subtotal + shipping;
  const formatPrice = (amountInPaise) => (amountInPaise / 100).toFixed(2);
  const confirmDelete = async () => {
    await deleteCart(selectedCartId);

    setOpenDeleteDialog(false);
    setSelectedCartId(null);
  };

  async function getCoupons() {
    try {
      let res = await api.get("coupon/getCoupons");
      setCouponList(res.data.coupons);
      console.log(res.data.coupons);
    } catch (error) {
      console.log(error.message);
    }
  }
  //   const round2 = (num) => Math.round(num * 100) / 100;

  // function calculateCart(cartItems, shipping = 49.99, discount = 0) {

  //   const itemsWithTotal = cartItems.map((item) => {
  //     const price = Number(item.price);
  //     const quantity = Number(item.quantity);

  //     const lineTotal = round2(price * quantity);

  //     return {
  //       ...item,
  //       lineTotal,
  //     };
  //   });

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
  //get Cart Details

  async function getCart() {
    setLoading(true);
    try {
      let res = await api.get(`/cart/getCart`);
      dispatch(addValue(res.data.quantity));
      dispatch(getItems(res.data.cart));
      console.log(res.data.cart);
    } catch (error) {
      // enqueueSnackbar('')
    } finally {
      setLoading(false);
    }
  }

  //update quantity
  async function handleChange(cartId, quantity) {
    try {
      if (quantity === 0) {
        await deleteCart(cartId);
        return;
      }

      const res = await api.post(`/cart/setQuantity/${cartId}`, { quantity });

      dispatch(updateCart({ _id: cartId, quantity }));

      console.log(res.data.product);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(cartItems);

  async function saveForLater(cartId) {
    try {
      const res = await api.post(`/cart/save-for-later/${cartId}`);

      dispatch(addToCart(res.data.cart));

      enqueueSnackbar("Saved for later", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to save item", {
        variant: "error",
      });
    }
  }

  async function deleteCart(cartId) {
    try {
      const res = await api.delete(`/cart/deleteItem/${cartId}`);
      dispatch(removeCartItem(cartId));

      enqueueSnackbar("Item removed", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to delete item", {
        variant: "error",
      });
    }
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
    } catch (error) {}
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
    getCart();
    getCoupons();
    getAddress();
  }, []);
  console.log(coupon);

  useEffect(() => {
    if (addresses.length && !updateAddress) {
      const defaultAddress =
        addresses.find((item) => item.isDefault) || addresses[0];
      setUpdateAddress(defaultAddress);
    }
  }, [addresses]);
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={120} />
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

          <Button color="error" variant="contained" onClick={confirmDelete}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
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

            {addressModalOpen && (
              <AddressModal
                addresses={addresses}
                setAddress={setAddress}
                setUpdateAddress={setUpdateAddress}
                open={addressModalOpen}
                onClose={() => setAddressModalOpen(false)}
              />
            )}

            <Dialog
              fullScreen={fullScreen}
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
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item?.product?.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "#6B7280",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {item?.product?.description}
                  </Typography>

                  <Chip
                    size="small"
                    label="In Cart"
                    sx={{
                      mt: 1,
                      bgcolor: "rgba(62,26,137,0.08)",
                      color: "#3E1A89",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: "center" }}>
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
                </Box>

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
                      fontWeight: 800,
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
                    onClick={() => deleteCart(item._id)}
                  >
                    Remove
                  </Button>

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
              ...pulseAnimation,
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
                    Subtotal
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography color="text.secondary" variant="body2">
                      Shipping
                    </Typography>
                  </Box>
                  <Chip
                    icon={
                      <LocalShippingIcon
                        style={{ fontSize: "14px", color: "#1b5e20" }}
                      />
                    }
                    label={formatPrice(subtotal) < 1000 ? "FREE" : 9}
                    size="small"
                    sx={{
                      backgroundColor: "#e8f5e9",
                      color: "#1b5e20",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #c8e6c9",
                      animation: "pulse 2s infinite ease-in-out",
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    pt: 1.5,
                    borderTop: "1px dashed",
                    borderColor: "divider",
                  }}
                />

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
                    color="success.main"
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
                    py: 1.5,
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
                      height: "35%",
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
