import { Box, Card, CardContent,IconButton, CardMedia, Grid, MenuItem, Select, Stack, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../../api/axiosConfig'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { EditNotificationsSharp } from '@mui/icons-material'
import { PrimaryButton } from '../../../Components/Common/Buttons'

export default function CustomerCart() {


  let token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let decodeId = jwtDecode(token).id
  const [qty, setQty] = useState(1)
  const [quantity,setQuantity] = useState()

  //get Cart Details
  async function getCart(params) {
    try {
      let res = await api.get(`/customer/cart/getAddress/${decodeId}`)
        dispatch(getCart(res.data.address))
    } catch (error) {
      // enqueueSnackbar('')
    }
  }
  
  //update quantity
  async function handleChange(params) {
    try {
      let res = await api.get(`/customer/cart/getAddress/${decodeId}`)
        dispatch(getCart(res.data.address))
    } catch (error) {
      // enqueueSnackbar('')
    }
  }
  //get Customer Address
  async function getAddress(params) {
    try {
      let res = await api.get(`/customer/cart/getAddress/${decodeId}`)
        dispatch(address(res.data.address))
    } catch (error) {
      // enqueueSnackbar('')
    }
  }
  async function changeAddress(params) {
    try {
      let res = await api.put(`/customer/cart/getAddress/${decodeId}`)
        dispatch(address(res.data.address))
    } catch (error) {
      // enqueueSnackbar('')
    }
  }

  useEffect(() => {
    getAddress()
    getCart()
  
  }, [])
  
  return (
  <Box sx={{ p: 3 }}>
    <Typography
      variant="h5"
      color="text.primary"
      sx={{ mb: 3, fontWeight: 600 }}
    >
      Cart
    </Typography>

    <Grid container spacing={17}>
      <Grid item xs={12} md={9}>
        <Stack spacing={2}>
          <Card elevation={1}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                >
                  Saved Address
                </Typography>

                <IconButton onClick={changeAddress}>
                  <EditNotificationsSharp />
                </IconButton>
              </Stack>

            </CardContent>
          </Card>

          <Card elevation={1}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <CardMedia
                    component="img"
                    image=""
                    alt="No Image Found"
                    sx={{
                      height: 120,
                      borderRadius: 1,
                      bgcolor: "background.default",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                    >
                      Product Name
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Product details
                    </Typography>

                    <Select
                      size="small"
                      value={qty}
                      onChange={handleChange}
                      sx={{ width: 100 }}
                    >
                      {[1, 2, 3, 4, 5].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    textAlign={{ xs: "left", sm: "right" }}
                  >
                    ₹
                  </Typography>
                </Grid>
              </Grid>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 2,
                  pt: 2,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <PrimaryButton variant='contained' color="primary">Save for Later</PrimaryButton>
                <PrimaryButton variant='contained' color="error">Delete</PrimaryButton>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={12} md={3}>
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
                  ₹
                </Typography>
              </Box>
            </Stack>

            <PrimaryButton
              fullWidth
              sx={{ mt: 3 }}
            >
              Check Out
            </PrimaryButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)
}
