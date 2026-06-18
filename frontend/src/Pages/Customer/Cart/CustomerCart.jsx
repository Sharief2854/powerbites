import {
  Box,
  Card,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
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
import {
  addToCart,
  addValue,
  getItems,
} from "../../../Redux/Slices/CM_CartSlice";
import PaymentButton from "../Payments/PaymentButton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
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
  ],}

function AddressModal() {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //   const [addressForm, setAddressForm] = useState({
  //     label: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     pincode: "",
  //     _id: "",
  //     isDefault: false,
  //   });
  // const handleAddressChange = (e) => {
  //   const { name, value } = e.target;
    
  //   setAddressForm((prev) => ({ ...prev, [name]: value }));

  //   // Reset state when country changes
  //   if (name === "country") {
  //     setAddressForm((prev) => ({ ...prev, state: "" }));
  //   }
  // };
  const [message, setMessage] = useState(null);
  const editProfile = useSelector((state) => state.editprofile.editprofile);
  
    const editAddress = useSelector((state) => state.editprofile.editaddress);
  
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [otherLabel ,setOtherLabel] = useState("")

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


  // Sync initial Address data based on URL parameter
  useEffect(() => {
    if (editaddressId && Array.isArray(editAddress)) {
      const currentAddr = editAddress.find(
        (addr) => addr._id === editaddressId,
      );
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
      // Clear form when in "Add Mode" (no ID in params)
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
    }
  }, [editaddressId, editAddress]);

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

  const handleDefaultChange = (e) => {
    setAddressForm((prev) => ({ ...prev, isDefault: e.target.checked }));
    console.log("addressfrom :", addressForm);
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

      const finalLabel = addressForm.label === "OTHER" ? otherLabel : addressForm.label;
      const payload = { ...addressForm, label: finalLabel, userId };
      if (!payload._id) delete payload._id; // Prevents MongoDB CastError on empty string
      let response;

      if (editaddressId) {
        response = await api.put(
          `/updateCustomerProfile/updateAddress/${editaddressId}`,
          payload,
        );
        dispatch(
          updateeditaddress({
            id: addressForm._id,
            data: response.data.address,
          }),
        );
      } else {
        response = await api.post(
          `/updateCustomerProfile/addAddress/${userId}`,
          payload,
        );
        dispatch(posteditaddress(response.data.address));
      }

      setMessage({
        text: "Address added!",
        type: "success",
      });
      setTimeout(() => navigate("/customer/cart"), 1400);
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
               <IconButton  onClick={handleOpen}>
                  <PrimaryButton sx={{width:200, m:0}}>Add New Address</PrimaryButton>
                </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <form onSubmit={handleSaveAddress}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              { "Add New Address"}
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
                      onChange={(e)=>setOtherLabel(e.target.value)}
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
                    {/* <MenuItem value="">Select State</MenuItem> */}
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
          <Button onClick={handleClose}>Back</Button>
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
  const [totalPrice, setTotalPrice] = useState(300);
  const [open, setOpen] = React.useState(false);
  const [updateAddress, setUpdateAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);
  const [coupon,setCoupon] = useState("")

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const subtotal =
    cartItems.reduce((total, item) => {
      const priceInPaise = Math.round(Number(item.price) * 100);

      return total + priceInPaise * item.quantity;
    }, 0) || 0;
  console.log(subtotal);

  const shipping = subtotal > 50000 ? 0 : 999; // ₹49.99

  const grandTotal = subtotal + shipping;

  const formatPrice = (amountInPaise) => (amountInPaise / 100).toFixed(2);
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
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  //update quantity
  async function handleChange(cartId, quantity) {
    try {
      const res = await api.post(`/cart/setQuantity/${cartId}`, { quantity });
      dispatch(addToCart(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }
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
      const res = await api.delete(`/cart/${cartId}`);

      dispatch(addToCart(res.data.data));

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

      console.log(defaultAddress);
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
      : [addresses] || [];

  useEffect(() => {
    getCart();
    getAddress();
    if (cartItems?.length <= 0) {
      return (
        <Box sx={{ width: "screen", p: 3 }}>
          <Typography
            align="center"
            variant="h4"
            color="text.primary"
            sx={{ mb: 3, fontWeight: 600 }}
          >
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
  }, []);

  useEffect(() => {
    if (addresses.length && !updateAddress) {
      const defaultAddress =
        addresses.find((item) => item.isDefault) || addresses[0];

      setUpdateAddress(defaultAddress);
    }
  }, [addresses]);
  console.log(cartItems);
  if (loading) {
    Skeleton.count = 4;
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

      <Grid container spacing={17}>
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
          <Stack spacing={2}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  Saved Address
                </Typography>

                <Stack
                  direction="row"
                  sx={{justifyContent:'space-between'}}
                >{address ? (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        key={address._id}
                      >
                        {updateAddress &&
                          `${updateAddress.street}, ${updateAddress.city}, ${updateAddress.state}, ${updateAddress.country}, ${updateAddress.pincode}`}
                      </Typography>
                    ) : (
                      ""
                    )}
                  <IconButton onClick={handleClickOpen}>
                    
                    <EditIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
               <AddressModal/>
                <Typography variant="body1" color="initial">
                  or select from below
                </Typography>
              </DialogTitle>
              <DialogContent>
                {addresses.map((item) => {
                  console.log(openAddress);

                  return (
                    <Box key={item._id}>
                      <Checkbox
                        checked={updateAddress?._id === item._id}
                        onChange={() => setUpdateAddress(item)}
                      />
                      <DialogContentText>
                        {item.street}, {item.city}, {item.state}, {item.pincode}
                      </DialogContentText>
                    </Box>
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            {cartItems?.map((item) => (
              <Card key={item._id} elevation={1}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                      <CardMedia
                        component="img"
                        image={
                          item?.product?.image?.[0]
                            ? `http://localhost:4500/${item.product.image[0].replace(/\\/g, "/").replace(/^\/+/, "")}`
                            : "/no-image.png"
                        }
                        alt={item?.product?.productName}
                        sx={{
                          height: 120,
                          borderRadius: 1,
                          bgcolor: "background.default",
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1">
                          {item?.product?.productName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {item?.product?.description}
                        </Typography>
                        </Stack>
                        </Grid>

                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <Stack spacing={1}>
                          <Typography variant="body1" align="center" color="initial">Quantity</Typography>
                        <Select
                          size="small"
                          value={item.quantity}
                          onChange={(e) =>
                            handleChange(item._id, e.target.value)
                          }
                          // sx={{ width: 100 }}
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <MenuItem key={qty} value={qty}>
                              {qty}
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                      <Typography variant="h6">₹{item.price}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteCart(item._id)}
                        >
                          Delete
                        </Button>

                        <Button
                          size="small"
                          color="primary"
                          onClick={() => saveForLater(item._id)}
                        >
                          Save for Later
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                Price Details
              </Typography>

              <Stack spacing={1.5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">
                    Subtotal ({quantity || 0})
                  </Typography>
                  <Typography color="text.primary">
                    ₹{formatPrice(subtotal)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography color="text.primary">
                    ₹{formatPrice(shipping)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 1,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    ₹{formatPrice(grandTotal)}
                  </Typography>
                </Box>
              </Stack>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Coupon Code"
                  name="coupon"
                  // value={addressForm.pincode}
                  onChange={()=>setCoupon(e.target.value)}
                />
              </Grid>


              <PaymentButton addressId={address?._id} amount={totalPrice} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
