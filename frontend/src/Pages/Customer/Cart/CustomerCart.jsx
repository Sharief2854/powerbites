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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  async function addAddresses(params) {
    response = await api.post(
      `/updateCustomerProfile/addAddress/${userId}`,
      {},

      updateAddress(response),
    );
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
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton onClick={handleClickOpen}>
                    {address ? (
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
               
               <IconButton sx={{}} onClick={()=>setOpenAddress(p=>!openAddress)}>
                  <PrimaryButton >Add New Address</PrimaryButton>
                </IconButton>
                <Typography variant="body1" color="initial">
                  or select from below
                </Typography>
              </DialogTitle>
              <DialogContent>
                {openAddress && <>Options</>}
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
                        image={item?.product?.image}
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

              <PaymentButton addressId={address?._id} amount={totalPrice} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
