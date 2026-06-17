import { Box, Card, CardContent,IconButton, CardMedia, Grid, MenuItem, Select, Stack, Typography, Button, Checkbox, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../../api/axiosConfig'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { EditNotificationsSharp } from '@mui/icons-material'
import { PrimaryButton } from '../../../Components/Common/Buttons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { addToCart, getItems } from '../../../Redux/Slices/CM_CartSlice';
import PaymentButton from '../Payments/PaymentButton'

export default function CustomerCart() {


  const cartItems = useSelector((state) => state.cart.cart);
  const quantity = useSelector((state) => state.cart.quantity);

  let token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let decodeId = jwtDecode(token).id
  const [qty, setQty] = useState(1)
  const [addresses,setAddress] = useState([])
  const [totalPrice,setTotalPrice]= useState(300)
  const [open, setOpen] = React.useState(false);
  const [updateAddress,setUpdateAddress] = useState(null)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  //get Cart Details
  async function getCart(params) {
    try {
      let res = await api.get(`/cart/getCart`)
        dispatch(getItems(res.data.cart))
        console.log(res.data.cart);
        
        
    } catch (error) {
      
    }
  }

  
  //update quantity
  async function handleChange(cartId, quantity) {
  try {
    const res = await api.post(
      `/cart/setQuantity/${cartId}`,
      { quantity }
    );

    dispatch(addToCart(res.data.data));
  } catch (error) {
    console.log(error);
  }
}


  async function deleteCart(params) {
    try {
      let res = await api.get(`/cart/getAddress/${decodeId}`)
        dispatch(getCart(res.data.address))
    } catch (error) {
      enqueueSnackbar('failed to delete item',{variant:'error'})
    }
  }
  //get Customer Address
  
  async function getAddress() {
  try {
    const res = await api.get("/updateCustomerProfile/getAddresses");

    const addressList = res.data.addresses;

    setAddress(addressList);

    const defaultAddress =
      addressList.find(item => item.isDefault) || addressList[0];

    setUpdateAddress(defaultAddress);
  } catch (error) {}
}
async function addAddresses(params) {
  response = await api.post(
          `/updateCustomerProfile/addAddress/${userId}`,
          {
            
          },
        );
}

  async function changeAddress(params) {
    try {
      let res = await api.put(`/customer/cart/getAddress/${decodeId}`)
        dispatch(address(res.data.address))
    } catch (error) {
      enqueueSnackbar('failed to update address',{variant:'error'})
    }
  }
  async function orderPayment(params) {
    
  }
  let address=  updateAddress && Object.keys(updateAddress).length? updateAddress
    : addresses?.[0];

  console.log(address);

useEffect(() => {
  getAddress();
  getCart();
}, []);

useEffect(() => {
  if (addresses.length && !updateAddress) {
    const defaultAddress =
      addresses.find(item => item.isDefault) || addresses[0];

    setUpdateAddress(defaultAddress);
    console.log(address);
    
  }
}, [addresses]);
if (loading) {
  Skeleton.count = 4
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
      <Grid item size={8}>
        <Stack spacing={2}>
          <Card elevation={1}>
            <CardContent>
                <Typography
                  variant="h6"
                  color="text.primary"
                >
                  Saved Address
                </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton onClick={handleClickOpen}>
                  {address? (
                       <Typography variant="body2" color="text.secondary" key={address._id}>
  {updateAddress &&
    `${updateAddress.street}, ${updateAddress.city}, ${updateAddress.state}, ${updateAddress.country}, ${updateAddress.pincode}`}
</Typography> 
                  ) : ('')}
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
        </DialogTitle>
        <DialogContent>
          {addresses?.map((item) => (
  <Box key={item._id}>
    <Checkbox
      checked={updateAddress?._id === item._id}
      onChange={() => setUpdateAddress(item)}
    />

    <DialogContentText>
      {item.street}, {item.city}, {item.state}, {item.pincode}
    </DialogContentText>
  </Box>
))}
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.productName}
            sx={{
              height: 120,
              borderRadius: 1,
              bgcolor: "background.default",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">
              {item.productName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>

            <Select
              size="small"
              value={item.quantity}
              onChange={(e) =>
                handleChange(item._id, e.target.value)
              }
              sx={{ width: 100 }}
            >
              {[1, 2, 3, 4, 5].map((qty) => (
                <MenuItem key={qty} value={qty}>
                  {qty}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant="h6">
            ₹{item.price}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
))}</Stack>
      </Grid>

      <Grid item size={4}>
        <Card elevation={1}>
          <CardContent>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ mb: 2 }}
            >
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
                  ₹
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="text.secondary">
                  Shipping
                </Typography>
                <Typography color="text.primary">
                  ₹
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
                  ₹{totalPrice}
                </Typography>
              </Box>
            </Stack>

              <PaymentButton addressId={address} amount={totalPrice}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)
}
