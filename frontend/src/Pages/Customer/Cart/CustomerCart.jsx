import { Box, CardMedia, Grid, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import api from '../../../api/axiosConfig'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { EditNotificationsSharp } from '@mui/icons-material'

export default function CustomerCart() {


  let token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let decodeId = jwtDecode(token).id
  const [qty, setQty] = useState(1)

  //get Cart Details
  async function getCart(params) {
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

  useEffect(() => {
    getAddress()
    getCart()
  
  }, [])
  
  return (
    <Box>
        <Typography variant="h5" color="initial">Cart</Typography>
        <Grid Container spacing={2}>
            <Grid item xs={12} md={7}>
              <Stack>
                <Typography variant="h5" color="initial">From Saved Addresses</Typography>
                <Card>
                  <CardContent>
                    <Grid>
                      <Grid item xs={10} md={11}></Grid>
                      <Grid item xs={2} md={1}>
                        <IconButton onClick={changeAddress}>
                          <EditNotificationsSharp />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
              <Stack>
                <Grid Container spacing={2}>
                  <Grid item xs={12} md={11}>
                    <CardMedia component="img" height="140" image="" alt="No Image Found" />
                    <Select onChange={handleChange} label="Qty" value={qty}>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Typography variant="h6" color="initial">{}</Typography>
                    <Typography variant="h6" color="initial">{}</Typography>
                  </Grid>
                </Grid>
                <Grid Container spacing={2}>
                  <Grid item xs={12} md={4}><Iconbutton>Save for later</Iconbutton></Grid>
                  <Grid item xs={12} md={4}><Iconbutton>Delete</Iconbutton></Grid>
                  <Grid item xs={12} md={4}><IconButton></IconButton></Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack>
                <Typography variant="h6" color="initial">Price Details</Typography>
                <Grid Container spacing={2}>
                  <Grid item xs={11} md={6}>
                    <Typography variant="h6" color="initial">Subtotal{`${quantity}`}</Typography>
                    <Typography variant="h6" color="initial">Shipping</Typography>
                    <Typography variant="h6" color="initial">Total</Typography>
                   </Grid>
                  <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" color="initial">{}</Typography>
                   </Grid>
                </Grid>
                <Stack>
                  <PrimaryButton onClick={pay}>Check Out</PrimaryButton>
                </Stack>
                </Stack>
            </Grid>
        </Grid>
            <Stack>

            </Stack>
    </Box>
  )
}
