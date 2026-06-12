import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    name: "Honey Granola Bars",
    description: "Crunchy homemade bars made with oats, nuts, seeds and honey.",
    price: 350,
    offerPrice: 299,
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2025/01/Honey-Oatmeal-Granola-Bars_EXPS_TOHD24_38126_SoniaBozzo_social.jpg",
  },
  {
    id: 2,
    name: "Date Nut Bars",
    description: "Healthy snack bars with dates, almonds and cashews.",
    price: 420,
    offerPrice: 349,
    image:
      "https://ourstate.s3.amazonaws.com/assets/2020/11/Dec20-date-nut-bars-recipe-matthulsman.jpg",
  },
  {
    id: 3,
    name: "Snack Jar Mix",
    description: "A crispy colorful homemade snack jar for tea-time.",
    price: 250,
    offerPrice: 199,
    image:
      "https://somethingnutritiousblog.com/wp-content/uploads/2022/12/22E23C99-8A67-4CD2-9F7D-0C27EFFCFBDD-scaled-1.jpeg",
  },
  {
    id: 4,
    name: "Coconut Ladoo",
    description: "Soft coconut and jaggery ladoos with homemade taste.",
    price: 300,
    offerPrice: 259,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/cf586bb5728f6bdeaf9e8a0ad46574c53f2c4cc1.jpg",
  },
  {
    id: 5,
    name: "Peanut Ladoo",
    description: "Nutritious homemade peanut sweets with rich flavor.",
    price: 280,
    offerPrice: 229,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8c771372be545afb39db28e4e0c2b072b9576042.jpg",
  },
  {
    id: 6,
    name: "Motichoor Ladoo",
    description: "Classic homemade festive ladoos made fresh.",
    price: 320,
    offerPrice: 279,
    image:
      "https://somethingnutritiousblog.com/wp-content/uploads/2022/12/22E23C99-8A67-4CD2-9F7D-0C27EFFCFBDD-scaled-1.jpeg",
  },
  {
    id: 7,
    name: "Healthy Bar Bites",
    description: "Mini homemade energy bites with nuts and dry fruits.",
    price: 260,
    offerPrice: 219,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/524c98ba5c028c5d966cbad1866fdd015ee35571.jpg",
  },
  {
    id: 8,
    name: "Festive Sweet Pack",
    description: "Premium homemade sweets pack for gifting and family.",
    price: 500,
    offerPrice: 449,
    image:
      "https://rukminim2.flixcart.com/image/480/480/xif0q/sweet-mithai/l/r/n/1-9-saugaat-1-diwali-gift-hamper-sweets-gift-pack-10-assorted-original-imagghe8ynhqzxwh.jpeg?q=90",
  },
  {
    id: 9,
    name: "Dry Fruit Sweet Pack",
    description: "Homemade rich sweet pack with premium dry fruits.",
    price: 450,
    offerPrice: 399,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8c771372be545afb39db28e4e0c2b072b9576042.jpg",
  },
  {
    id: 10,
    name: "Premium Granola Pack",
    description: "Wholesome granola pack for breakfast and snacking.",
    price: 390,
    offerPrice: 329,
    image:
      "https://m.media-amazon.com/images/I/61xZ6a4EqxL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 11,
    name: "Classic Energy Squares",
    description: "Soft chewy squares filled with nuts and seeds.",
    price: 340,
    offerPrice: 289,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMxfLLweavQcrDecJxYf84k85_W2lT_O-b1wQ-kGJFJsrUZZnWaoyotQ&s=10",
  },
  {
    id: 12,
    name: "Traditional Sweet Box",
    description: "Beautiful assorted homemade sweets for occasions.",
    price: 520,
    offerPrice: 469,
    image:
      "https://www.gurchini.com/cdn/shop/files/LuxuaryAssortedBrownFlowerBoxof10Pcs_acb4c3bf-b6e7-4fbf-a782-88b9ffb918a8.jpg?v=1727290658&width=2048",
  },
];



export default function HomemadeFoodGrid() {
const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: 6, w:"100%",mx:"auto",  }}>
      <Container maxWidth="xl"
      sx={{
        mx:"auto"
      }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            color: "#111827",
            mb: 1,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          Homemade Food Products
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#6b7280",
            mb: 5,
            fontSize: "1rem",
          }}
        >
          Fresh homemade snacks and sweets with special prices
        </Typography>
<Grid
  container
  rowSpacing={5}
  columnSpacing={3}
  alignItems="stretch"

  sx={{
    mx:"auto",
    justifyContent:"center",
    pt:1
  }}
>
  {products.map((item) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
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
            label="10% OFF"
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
          <Button
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
            onClick={()=>navigate("/login")}
          >
            View Product
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
      </Container>
    </Box>
  );
}