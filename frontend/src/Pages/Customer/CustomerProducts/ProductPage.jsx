import React, { useEffect, useState } from "react";
import api from "../../../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../Components/Common/Buttons";
import { useDispatch } from "react-redux";
import { addToCart, addValue } from "../../../Redux/Slices/CM_CartSlice";
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
import { Add, DeleteOutlineRounded, Remove } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { jwtDecode } from "jwt-decode";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomerReview from "./CustomerReview";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  let token = localStorage.getItem("token");
  let decodeId = jwtDecode(token).id;

  const { id } = useParams();
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const res = await api.get(`/admin/getprd/${id}`);
      setProduct(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const dispatch = useDispatch();

  const discountedPrice =
    product?.price - (product?.price * product?.discount) / 100;

  async function addItem() {
  setLoading(true);

  try {
    const res = await api.post("/cart/setCart", {
      product,
      quantity: 1,
    });

    dispatch(addToCart(res.data.data));
    setQuantity(1);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
const handleAddToCart = async () => {
  await addItem();
};

const handleIncrease = () => {
  setCartQuantity(quantity + 1);
};

const handleDecrease = () => {
  if (quantity === 1) {
    setCartQuantity(0);
  } else {
    setCartQuantity(quantity - 1);
  }
};
  async function setCartQuantity(newQty) {
    try {
      setLoading(true);

      const res = await api.post(`/cart/setQuantity/${decodeId}`, {
        productId: product?._id,
        quantity: newQty,
      });

      dispatch(addToCart(res.data.data));
      setQuantity(newQty);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getQuantity(params) {
    setLoading(true);
    try {
      let res = await api.post(`/cart/setQuantity/${decodeId}`, {});
      dispatch(addToCart(res.data.data));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function checkOutPage() {
    navigate(`/customer/cart`);
  }

  useEffect(() => {
    getProduct();
  }, [id]);
  useEffect(() => {
    setImageLoading(true);
  }, [selectedImage]);

  const images = product?.image?.map(
    (img) =>
      `${img.replace(/\\/g, "/").replace(/^\/+/, "")}`,
  ) || [];

  if (loading && !product?._id) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" height={500} />
        <Skeleton height={40} sx={{ mt: 2 }} />
        <Skeleton width="60%" />
        <Skeleton height={80} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>
        <Grid size={{xs:12,sm:6,md:6,lg:6}}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {imageLoading && (
              <Skeleton variant="rectangular" height={{ xs: 320, md: 550 }} />
            )}

            <Box
              component="img"
              src={images[selectedImage] || "/no-image.png"}
              alt={product?.name}
              onLoad={() => setImageLoading(false)}
              sx={{
                width: "100%",
                height: { xs: 320, md: 550 },
                objectFit: "contain",
                p: 2,
                display: imageLoading ? "none" : "block",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Card>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 2,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {images.slice(0, 4).map((img, index) => {
              const remaining = images.length - 4;
              return (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: 2,
                    flexShrink: 0,
                    borderColor:
                      selectedImage === index ? "primary.main" : "divider",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    sx={{
                      borderColor:
                        selectedImage === index ? "primary.main" : "divider",
                      transition: "all 0.2s ease",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {index === 3 && remaining > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      +{remaining}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              {product?.name}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              {/* <Rating value={4.5} precision={0.5} readOnly /> */}
              <Typography>(N/A Reviews)</Typography>
            </Stack>

            <Stack spacing={2}>
              <Chip
                label={
                  product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"
                }
                color={product?.stock > 0 ? "success" : "error"}
                sx={{
                  width: "fit-content",
                }}
              />

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                }}
              >
                {product?.description}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" fontWeight={700} color="primary.main">
                ₹{discountedPrice}
              </Typography>

              {product?.discount > 0 && (
                <>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    ₹{product.price}
                  </Typography>

                  <Chip
                    label={`${product.discount}% OFF`}
                    color="secondary"
                    size="small"
                  />
                </>
              )}
            </Stack>

            <Divider />

            

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              
              {quantity === 0 ? (
  <PrimaryButton
    fullWidth
    variant="contained"
    sx={{
      backgroundColor: "primary",
      color: "#fff",
      py: 1.1,
      textTransform: "none",
      fontWeight: 700,
      fontSize: "0.95rem",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#10003c",
        boxShadow: "none",
      },
    }}
    onClick={handleAddToCart}
  >
    Add to Cart
  </PrimaryButton>
) : (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #e5e7eb",
      borderRadius: 3,
      px: 1,
      py: 0.5,
      width: "100%",
    }}
  >
    <IconButton onClick={handleDecrease}>
      {quantity === 1 ? (
        <DeleteOutlineRounded color="error" />
      ) : (
        <RemoveIcon />
      )}
    </IconButton>

    <Typography fontWeight={600}>{quantity}</Typography>

    <IconButton onClick={handleIncrease}>
      <AddIcon />
    </IconButton>
  </Box>
)}

              <PrimaryButton size="large" fullWidth onClick={checkOutPage}>
                Buy Now
              </PrimaryButton>
            </Stack>
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
        <Typography variant="h5" fontWeight={700} mb={3}>
          Product Specifications
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Category</Typography>
            <Typography color="text.secondary">
              {product?.category || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Weight</Typography>
            <Typography color="text.secondary">
              {product?.weight || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Material</Typography>
            <Typography color="text.secondary">
              {product?.material || "N/A"}
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
        <Typography variant="h5" fontWeight={700} mb={2}>
          Key Features
        </Typography>

        {product?.features?.length > 0 ? (
          <ul>
            {product.features.map((item, index) => (
              <li key={index}>
                <Typography>{item}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">No features available</Typography>
        )}
      </Paper>
      <CustomerReview/>
    </Box>
  );
}
