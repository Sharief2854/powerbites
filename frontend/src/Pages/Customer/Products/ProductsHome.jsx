import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Redux/Slices/ProductSlice";
import api from "../../../api/axiosConfig";

export default function CustomerProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [search, setSearch] = useState("");
  console.log(products)

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/all");
      dispatch(getProducts(response.data.data));
    } catch (error) {
      console.err("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = products.filter((item) =>
    item.name?.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8f5ff 0%, #ffffff 35%, #f7f7fb 100%)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#2D1457",
              mb: 1,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Explore Products
          </Typography>

          <Typography
            sx={{
              color: "#6B6280",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            Fresh and homemade products for you
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <OutlinedInput
            fullWidth
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">🔍</InputAdornment>
            }
            sx={{
              backgroundColor: "#fff",
              borderRadius: "14px",
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 16px 30px rgba(62,26,137,0.16)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={`http://localhost:4500/${product.image[0]
  .replace(/\\/g, "/")
  .replace(/\/{2,}/g, "/")
  .replace(/^\/+/, "")}`}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#2D1457",
                          fontSize: "1rem",
                        }}
                      >
                        {product.name}
                      </Typography>

                      {(product.isAvailable === true ||
                        product.isAvailable === "true" ||
                        Number(product.stock) > 0) && (
                        <Chip
                          label="In Stock"
                          size="small"
                          sx={{
                            backgroundColor: "#e8f7ec",
                            color: "#1b7a38",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Stack>

                    <Typography
                      sx={{
                        color: "#6c6480",
                        fontSize: "0.92rem",
                        mt: 1,
                        minHeight: 44,
                      }}
                    >
                      {product.description}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 2,
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "#3E1A89",
                      }}
                    >
                      ₹{product.price}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        borderRadius: "12px",
                        textTransform: "none",
                        backgroundColor: "#3E1A89",
                        fontWeight: 700,
                        py: 1.1,
                        "&:hover": {
                          backgroundColor: "#2f1368",
                        },
                      }}
                    >
                      View Product
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  borderRadius: "18px",
                  backgroundColor: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h6" sx={{ color: "#3E1A89", mb: 1 }}>
                  No products found
                </Typography>
                <Typography sx={{ color: "#7a738f" }}>
                  Try a different search value
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}