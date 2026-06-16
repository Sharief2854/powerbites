import { Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addToCart } from '../../../Redux/Slices/CM_CartSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../../../Components/Common/Buttons'
import { jwtDecode } from 'jwt-decode'

export default function CustomerProducts() {


  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  let token = localStorage.getItem("token")
  let decodeId = jwtDecode(token).id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function addItem(params) {
    setLoading(true)
    try {
      let res = await api.post(`/cart/setQuantity/${decodeId}`, {
        productId: params
      })
    } catch (error) {
    }
    finally {
      setLoading(false)
    }
  }

  async function getProducts(params) {
    setLoading(true)
    try {
      let res = await api.get(`/products/all`)
      setProducts(res.data.data)
      console.log(res.data.data);
      
    } catch (error) {
      // enqueueSnackbar('')
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getProducts()
  }, [])
  if(loading){
    return <CircularProgress color="primary"/>
  }
  return (
    <Box>
      <Grid>
          {products.map((item) => (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      key={item.id}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 320,
          mx: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          backgroundColor: "#fff",
          border: "1px solid #ececec",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 16px 30px rgba(0,0,0,0.10)",
          },
        }}
        
            onClick={() => navigate(`/customer/productpage/${item._id}`)}
      >
        <Box sx={{ position: "relative", px: 2, pt: 2 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#f8f8f8",
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <Chip
            // label="10% OFF"
            size="small"
            sx={{
              position: "absolute",
              top: 28,
              left: 28,
              backgroundColor: "#ffffff",
              color: "#111827",
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            px: 2.5,
            pt: 2.5,
            pb: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.4,
              minHeight: 48,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.name}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6b7280",
              fontSize: "0.92rem",
              lineHeight: 1.6,
              minHeight: 66,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.description}
          </Typography>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#9ca3af",
                fontSize: "0.9rem",
              }}
            >
              ₹{item.price}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#111827",
                mt: 0.5,
              }}
            >
              ₹{item.offerPrice}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
          <PrimaryButton
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#111827",
              color: "#fff",
              borderRadius: 3,
              py: 1.1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#000",
                boxShadow: "none",
              },
            }}
            onClick={() => addItem(item._id),dispatch(addToCart(item._id))}
          >
            View Product
          </PrimaryButton>
          <PrimaryButton
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#111827",
              color: "#fff",
              borderRadius: 3,
              py: 1.1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#000",
                boxShadow: "none",
              },
            }}
            onClick={() => navigate(`/customer/productpage/${item._id}`)}
          >
            View Product
          </PrimaryButton>
        </CardActions>
      </Card>
    </Grid>
  ))}
      </Grid>
        
    </Box>
  )
}
