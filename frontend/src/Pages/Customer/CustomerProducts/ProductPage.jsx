
import React, { useEffect, useState } from 'react'
import api from '../../../api/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../../Components/Common/Buttons'
import { useDispatch } from 'react-redux'
import { addToCart, addValue } from '../../../Redux/Slices/CM_CartSlice'
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Chip,
  Rating,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";


export default function ProductPage() {

    const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const res = await api.get(`/products/getprd/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const dispatch = useDispatch();

  async function addItem() {
    setLoading(true);

    try {
      await api.post(`/cart/setCart`, {
        product,
        quantity
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getQuantity(params) {
      setLoading(true)
      try {
        let res = await api.post(`/cart/setQuantity/${decodeId}`, {})
        dispatch(addToCart(res.data.data))
      } catch (error) {
      }
      finally {
        setLoading(false)
      }
    }

  function checkOutPage() {
    navigate(`/customer/cart/${id}`);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  const image =
    product?.image?.[0]
      ? `http://localhost:4500/${product.image[0]
          .replace(/\\/g, "/")
          .replace(/^\/+/, "")}`
      : "/no-image.png";

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} size={6}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              image={image}
              alt={product?.name}
              sx={{
                width: "100%",
                height: {
                  xs: 300,
                  sm: 450,
                  md: 550,
                },
                objectFit: "contain",
                p: 2,
              }}
            />
          </Card>
        </Grid>


        <Grid item xs={12} size={6}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              {product?.name}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              {/* <Rating value={4.5} precision={0.5} readOnly /> */}
              <Typography>(N/A Reviews)</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Chip
                label={
                  product?.stock > 0 ? "In Stock" : "Out Of Stock"
                }
                color={product?.stock > 0 ? "success" : "error"}
              />

              {/* <Chip
                label={product?.category}
                color="primary"
                variant="outlined"
              /> */}
            </Stack>

            <Typography
              variant="h4"
              color="error"
              fontWeight={700}
            >
              ₹{product?.price}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              {product?.description}
            </Typography>

            <Divider />

            <Box>
              <Typography mb={1} fontWeight={600}>
                Quantity
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <IconButton
                  onClick={() =>{
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                    getQuantity()}
                  }
                >
                  <Remove />
                </IconButton>

                <Typography variant="h6">
                  {quantity}
                </Typography>

                <IconButton
                  onClick={() =>{
                    getQuantity()
                    setQuantity(quantity + 1)}
                  }
                >
                  <Add />
                </IconButton>
              </Stack>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SecondaryButton
                  fullWidth
                  loading={loading}
                  onClick={addItem}
                >
                  Add To Cart
                </SecondaryButton>
              </Grid>

              <Grid item xs={12} sm={6}>
                <PrimaryButton
                  fullWidth
                  onClick={checkOutPage}
                >
                  Buy Now
                </PrimaryButton>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Paper
        elevation={2}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Product Specifications
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>
              Category
            </Typography>
            <Typography color="text.secondary">
              {product?.category || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>
              Weight
            </Typography>
            <Typography color="text.secondary">
              {product?.weight || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>
              Material
            </Typography>
            <Typography color="text.secondary">
              {product?.material || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>
              Color
            </Typography>
            <Typography color="text.secondary">
              {product?.color || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>
              Warranty
            </Typography>
            <Typography color="text.secondary">
              {product?.warranty || "1 Year"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Key Features
        </Typography>

        <ul>
          {product?.features?.map((item, index) => (
            <li key={index}>
              <Typography>{item}</Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );

}
