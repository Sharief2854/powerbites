import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Avatar,
  Rating,
  Divider,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import api from "../../../api/axiosConfig";

const deliveredProduct = {
  _id: "665reviewproduct01",
  name: "Organic Honey",
  description:
    "Pure homemade organic honey collected from natural farms with rich taste and healthy nutrients.",
  price: 450,
  stock: 12,
  isAvailable: true,
  deliveryStatus: "Delivered",
  image:
    "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=900&q=80",
};

const initialReviews = [
  {
    _id: 1,
    userName: "Rahul",
    rating: 4.5,
    comment: "Very good quality and taste. Packaging was also neat and clean.",
    createdAt: "2026-06-10",
  },
  {
    _id: 2,
    userName: "Sneha",
    rating: 5,
    comment: "Excellent product. I will definitely order again.",
    createdAt: "2026-06-11",
  },
];

const initialForm = {
  rating: 0,
  comment: "",
};

function ReviewCard({ review }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "18px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "#3E1A89" }}>
            {review.userName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 700, color: "#2D1457" }}>
              {review.userName}
            </Typography>

            <Typography sx={{ fontSize: "0.85rem", color: "#8b84a0" }}>
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Rating
          value={Number(review.rating || 0)}
          precision={0.5}
          readOnly
        />

        <Typography
          sx={{
            mt: 1.5,
            color: "#5f5870",
            lineHeight: 1.7,
          }}
        >
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ReviewOfProducts() {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    rating: false,
    comment: false,
  });

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0
    );
    return total / reviews.length;
  }, [reviews]);

  const handleRatingChange = (_, newValue) => {
    setForm((prev) => ({
      ...prev,
      rating: newValue || 0,
    }));

    setErrors((prev) => ({
      ...prev,
      rating: false,
    }));
  };

  const handleCommentChange = (e) => {
    setForm((prev) => ({
      ...prev,
      comment: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      comment: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      rating: !form.rating,
      comment: !form.comment.trim(),
    };

    setErrors(newErrors);

    return !newErrors.rating && !newErrors.comment;
  };

  const handleSubmitReview = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        productId: deliveredProduct._id,
        rating: form.rating,
        comment: form.comment.trim(),
      };

      // await api.post("/reviews/addReview", payload);

      const newReview = {
        _id: Date.now(),
        userName: "You",
        rating: form.rating,
        comment: form.comment.trim(),
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setForm(initialForm);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Review submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8f5ff 0%, #ffffff 35%, #f7f7fb 100%)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            mb: 4,
          }}
        >
          <Grid container>
            <Grid item xs={12} md={5}>
              <CardMedia
                component="img"
                image={deliveredProduct.image}
                alt={deliveredProduct.name}
                sx={{
                  width: "100%",
                  height: { xs: 280, md: "100%" },
                  objectFit: "cover",
                }}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#2D1457",
                    mb: 1,
                  }}
                >
                  {deliveredProduct.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#6B6280",
                    fontSize: "1rem",
                    mb: 2,
                  }}
                >
                  {deliveredProduct.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: "#3E1A89",
                    }}
                  >
                    ₹{deliveredProduct.price}
                  </Typography>

                  <Chip
                    label={deliveredProduct.deliveryStatus}
                    sx={{
                      backgroundColor: "#e8f7ec",
                      color: "#1b7a38",
                      fontWeight: 700,
                    }}
                  />

                  <Chip
                    label={`${averageRating.toFixed(1)} Rating`}
                    sx={{
                      backgroundColor: "#fff4df",
                      color: "#b26a00",
                      fontWeight: 700,
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={averageRating} precision={0.5} readOnly />
                  <Typography sx={{ color: "#6c6480", fontWeight: 600 }}>
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </Typography>
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {deliveredProduct.deliveryStatus === "Delivered" && (
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
              mb: 4,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#2D1457", mb: 1 }}
              >
                Give Your Review
              </Typography>

              <Typography sx={{ color: "#7a738f", mb: 3 }}>
                Rate this delivered product and share your experience
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, color: "#2D1457", fontWeight: 700 }}>
                  Your Rating
                </Typography>

                <Rating
                  name="customer-rating"
                  value={form.rating}
                  precision={0.5}
                  onChange={handleRatingChange}
                  sx={{ fontSize: "2rem" }}
                />

                {errors.rating && (
                  <Typography sx={{ color: "red", mt: 1, fontSize: "0.9rem" }}>
                    Please select a rating
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, color: "#2D1457", fontWeight: 700 }}>
                  Your Review
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Write your review here..."
                  value={form.comment}
                  onChange={handleCommentChange}
                  error={errors.comment}
                  helperText={errors.comment ? "Please enter your review" : ""}
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={loading}
                sx={{
                  backgroundColor: "#3E1A89",
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.2,
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#2f1368",
                  },
                }}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        )}

        {submitted && (
          <Box
            sx={{
              textAlign: "center",
              py: 3,
              mb: 4,
              borderRadius: "18px",
              backgroundColor: "#e8f7ec",
            }}
          >
            <Typography sx={{ color: "#1b7a38", fontWeight: 700 }}>
              Review submitted successfully
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#2D1457",
              mb: 1,
            }}
          >
            Customer Reviews
          </Typography>

          <Typography sx={{ color: "#7a738f" }}>
            See what customers are saying about this product
          </Typography>
        </Box>

        {reviews.length > 0 ? (
          <Grid container spacing={3}>
            {reviews.map((review) => (
              <Grid item xs={12} md={6} key={review._id}>
                <ReviewCard review={review} />
              </Grid>
            ))}
          </Grid>
        ) : (
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
              No reviews available
            </Typography>
            <Typography sx={{ color: "#7a738f" }}>
              This product has not received any reviews yet
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ReviewOfProducts;