import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
];

function HomemadeFoodBanner() {

    const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            overflow: "hidden",
            background: "linear-gradient(90deg, #ffd86b 0%, #ffb347 100%)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: { xs: "auto", md: 360 },
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: "100%",
                px: { xs: 3, sm: 5, md: 7 },
                py: { xs: 4, sm: 5, md: 4 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2rem", sm: "2.6rem", md: "3.4rem" },
                  fontWeight: 800,
                  color: "#0d47a1",
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                Exclusive
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.7rem", md: "2.2rem" },
                  fontWeight: 700,
                  color: "#0d47a1",
                  mb: 3,
                }}
              >
                Homemade food offer for you!
              </Typography>

              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  px: { xs: 2.5, sm: 3.5, md: 4 },
                  py: { xs: 1.5, sm: 2, md: 2.2 },
                  borderRadius: 3,
                  boxShadow: "0 10px 25px rgba(13,71,161,0.25)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.4rem", sm: "1.9rem", md: "2.4rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  Flat 10% Off
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" },
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Up to ₹100
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: "inline-block",
                    backgroundColor: "#fff",
                    color: "#111",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                    }}
                  >
                    Already Applied
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#111",
                    color: "#fff",
                    textTransform: "none",
                    px: 3,
                    py: 1.2,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#000",
                      boxShadow: "none",
                    },
                  }}
                  onClick={()=>navigate("/login")}
                >
                  Order Now
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: { xs: 2, sm: 3, md: 4 },
                pb: { xs: 4, md: 0 },
              }}
            >
              <Box
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setCurrentIndex(0);
                }}
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 420, md: 500 },
                  height: { xs: 240, sm: 300, md: 320 },
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "#fff3e0",
                  boxShadow: "0 14px 35px rgba(0,0,0,0.18)",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={images[currentIndex]}
                  alt={`homemade food ${currentIndex + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "0.4s ease",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomemadeFoodBanner;