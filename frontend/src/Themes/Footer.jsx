import React, { useEffect } from "react";
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
  Chip,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../Redux/Slices/AdminSlice/CompanyInfoSlice";
import api from "../api/axiosConfig";

export default function AboutAndFooter({company}) {
  console.log("hertc",company);
  
  return (
    <>
      <Box
        sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}
      >
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
                onClick={() => navigate("/company/about")}
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
                {company?.companyName}
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
                is made fresh to bring you authentic taste and comfort in every
                bite.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: "1rem",
                }}
              >
                From laddoos and granola bars to festive sweet packs, our goal
                is to deliver healthy, tasty, and beautifully packed homemade
                food for your family and special occasions.
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/company/products")}
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

      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          pt: 6,
          pb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 2, color: "primary.contrastText" }}
              >
                {company?.companyName}
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

            <Grid size={{ xs: 12, md: 2.5 }}>
              <Typography
                sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1}>                
                <Link
                  href="/customer/about"
                  underline="none"
                  color="secondary.main"
                >
                  About
                </Link>
                <Link
                  href="/customer/products"
                  underline="none"
                  color="secondary.main"
                >
                  Products
                </Link>
                <Link href="#" underline="none" color="secondary.main">
                  Contact
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 2.5 }}>
              <Typography
                sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}
              >
                Categories
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="/customer/products"
                  underline="none"
                  color="secondary.main"
                >
                  Snacks
                </Link>
                <Link
                  href="/customer/products"
                  underline="none"
                  color="secondary.main"
                >
                  Sweets
                </Link>
                <Link
                  href="/customer/products"
                  underline="none"
                  color="secondary.main"
                >
                  Healthy Bars
                </Link>
                <Link
                  href="/customer/products"
                  underline="none"
                  color="secondary.main"
                >
                  Gift Packs
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                sx={{ fontWeight: 700, mb: 2, color: "primary.contrastText" }}
              >
                Contact
              </Typography>
              <Stack spacing={1}>
                <Typography
                  sx={{ color: "secondary.main", fontSize: "0.95rem" }}
                >
                  {company?.phone}
                </Typography>
                <Typography
                  component="a"
                  href={`mailto:${company?.email}?subject=Inquiry&body=Hello, I would like to know more about your services.`}
                  sx={{
                    color: "secondary.main",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Email: {company?.email}
                </Typography>
                <Typography
                  sx={{ color: "secondary.main", fontSize: "0.95rem" }}
                >
                  Address: Hyderabad, India
                </Typography>
                {company?.licence && (
                  <Typography
                    sx={{ color: "secondary.main", fontSize: "0.95rem" }}
                  >
                    License: {company?.licence}
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                {/* {company?.socialMedia?.map((social) => {
                  const Icon = scoial.includes("facebook")
                    ? FaIcons.FaFacebook
                    : social.includes("instagram")
                    ? FaIcons.FaInstagram
                    : social.includes("youtube")
                    ? FaIcons.FaYoutube
                    : social.includes("twitter")
                    ? FaIcons.FaTwitter
                    : social.includes("linkedin")
                    ? FaIcons.FaLinkedinIn : FaIcons.FaGlobe
                  return(
  <IconButton
    component="a"
    href={`${social}`}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
  >
    <Icon />
  </IconButton>
                  )
                  })
                } */}
                <IconButton
                  component="a"
                  href={`${company?.socialMedia?.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "secondary.main",'& :hover': {
                      color: 'secondary.main',
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  <FacebookIcon />
                </IconButton>

                <IconButton
                  component="a"
                  href={company?.socialMedia?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "secondary.main",'& :hover': {
                      color: 'secondary.main',
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  <InstagramIcon />
                </IconButton>

                <IconButton
                  component="a"
                  href={company?.socialMedia?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "secondary.main",'& :hover': {
                      color: 'secondary.main',
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href={company?.socialMedia?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "secondary.main",
                    '& :hover': {
                      color: 'secondary.main',
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  <TwitterIcon sx={{borderRadius:999}} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              {company?.certification?.length > 0 && (
                <>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Typography
                    
                sx={{ fontWeight: 700, color: "primary.contrastText" }}
                  >
                    Certifications
                  </Typography>

                    {company.certification.map((cert) => (
                      <Chip
                        key={cert}
                        label={cert}
                        size="small"
                        sx={{
                          bgcolor: "secondary.main",
                          color: "primary.main",
                        }}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.20)", my: 4 }} />

          <Typography
            sx={{
              color: "secondary.main",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            © 2026 Homemade Foods. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
