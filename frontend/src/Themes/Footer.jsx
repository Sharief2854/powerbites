import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function AboutAndFooter() {
  return (
    <>
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid xs={12} md={6}>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  mb: 1,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                }}
              >
                About Us
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 2,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                }}
              >
                Fresh Homemade Food Made With Love
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 2,
                  fontSize: "1rem",
                }}
              >
                We prepare delicious homemade snacks and sweets using quality
                ingredients, traditional recipes, and a lot of care. Every item
                is made fresh to bring you authentic taste and comfort in every bite.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: "1rem",
                }}
              >
                From laddoos and granola bars to festive sweet packs, our goal is
                to deliver healthy, tasty, and beautifully packed homemade food
                for your family and special occasions.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                  borderRadius: 2.5,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "text.primary",
                    boxShadow: "none",
                  },
                }}
              >
                Explore Products
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "primary.main", color: "primary.contrastText", pt: 6, pb: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 2, color: "primary.contrastText" }}
              >
                Homemade Foods
              </Typography>

              <Typography
                sx={{
                  color: "secondary.main",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                Freshly prepared homemade snacks and sweets crafted with care,
                quality ingredients, and traditional flavor for every home.
              </Typography>
            </Grid>

            <Grid xs={12} sm={6} md={2.5}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="none" color="secondary.main">
                  Home
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  About
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Products
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Contact
                </Link>
              </Stack>
            </Grid>

            <Grid xs={12} sm={6} md={2.5}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}>
                Categories
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="none" color="secondary.main">
                  Snacks
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Sweets
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Healthy Bars
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Gift Packs
                </Link>
              </Stack>
            </Grid>

            <Grid xs={12} md={3}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}>
                Contact
              </Typography>
              <Stack spacing={1}>
                <Typography sx={{ color: "secondary.main", fontSize: "0.95rem" }}>
                  Phone: +91 98765 43210
                </Typography>
                <Typography sx={{ color: "secondary.main", fontSize: "0.95rem" }}>
                  Email: homemadefoods@gmail.com
                </Typography>
                <Typography sx={{ color: "secondary.main", fontSize: "0.95rem" }}>
                  Address: Hyderabad, India
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                <IconButton sx={{ color: "primary.main", backgroundColor: "secondary.main" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: "primary.main", backgroundColor: "secondary.main" }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: "primary.main", backgroundColor: "secondary.main" }}>
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.20)", my: 4 }} />

          <Typography
            sx={{ color: "secondary.main", fontSize: "0.9rem", textAlign: "center" }}
          >
            © 2026 Homemade Foods. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}