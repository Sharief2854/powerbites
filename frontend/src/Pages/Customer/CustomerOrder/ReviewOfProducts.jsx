import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  TextField,
  Button,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../Redux/Slices/ReviewSlice";
import api from "../../../api/axiosConfig";

function ReviewCard({ review }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        height: "100%",
        border: "1px solid #eee8fa",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Rating value={Number(review?.rating) || 0} readOnly size="small" />
          <Typography
            variant="body2"
            sx={{ color: "#7a738f", fontSize: "0.85rem" }}
          >
            {review?.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#5b5470", fontWeight: 600 }}
        >
          {review?.userId?.name || "Customer"}
        </Typography>

        {review?.review ? (
          <Typography sx={{ mt: 1.2, color: "#4b5563", lineHeight: 1.7 }}>
            {review.review}
          </Typography>
        ) : (
          <Typography sx={{ mt: 1.2, color: "#9aa1ad", fontStyle: "italic" }}>
            No written comment provided.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function ReviewOfProducts() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state?.Review?.reviews) || [];

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeoutRef = useRef(null);

  const deliveredProduct = useMemo(() => {
    return reviews?.[0]?.productId || null;
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/review/getreviews");
      dispatch(getReviews(response?.data?.data || []));
    } catch (error) {
      console.log("GET REVIEWS ERROR:", error?.response?.data || error.message);
      dispatch(getReviews([]));
    }
  };

  const handleSubmitReview = async () => {
    if (loading) return;

    try {
      if (!deliveredProduct?._id) {
        alert("Product not found");
        return;
      }

      if (!rating) {
        alert("Please select rating");
        return;
      }

      setLoading(true);

      const payload = {
        productId: deliveredProduct._id,
        rating,
        review: reviewText.trim(),
      };

      await api.post("/review/addreview", payload);

      setRating(0);
      setReviewText("");
      setSubmitted(true);

      await fetchReviews();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    } catch (error) {
      console.log("ADD REVIEW ERROR:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
        {deliveredProduct ? (
          <Card
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              mb: 4,
            }}
          >
            <Grid container>
              <Grid size={{ xs: 12, md: 5 }}>
                <CardMedia
                  component="img"
                  image={
                    Array.isArray(deliveredProduct?.image)
                      ? deliveredProduct.image[0]
                      : deliveredProduct?.image || "/no-image.png"
                  }
                  alt={deliveredProduct?.name || "Product"}
                  sx={{
                    width: "100%",
                    height: { xs: 280, md: "100%" },
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#2D1457",
                      mb: 1,
                     }}
                  >
                    {deliveredProduct?.name || "Product"}
                  </Typography>

                  <Typography sx={{ color: "#7a738f", mb: 3, lineHeight: 1.7 }}>
                    Share your experience with this product by giving a rating
                    and writing a short review.
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "#3E1A89" }}
                  >
                    Previous Reviews
                  </Typography>

                  <Stack spacing={2}>
                    {reviews.length > 0 ? (
                      reviews.slice(0, 3).map((item) => (
                        <Box
                          key={item._id}
                          sx={{
                            p: 2,
                            border: "1px solid #ece7f5",
                            borderRadius: 3,
                            backgroundColor: "#faf8ff",
                          }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            spacing={1}
                          >
                            <Rating
                              value={Number(item?.rating) || 0}
                              readOnly
                              size="small"
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#7a738f", fontSize: "0.85rem" }}
                            >
                              {item?.createdAt
                                ? new Date(item.createdAt).toLocaleDateString()
                                : ""}
                            </Typography>
                          </Stack>

                          <Typography
                            variant="body2"
                            sx={{ mt: 1, color: "#5b5470", fontWeight: 600 }}
                          >
                            {item?.userId?.name || "Customer"}
                          </Typography>

                          {item?.review ? (
                            <Typography sx={{ mt: 1.2, color: "#4b5563" }}>
                              {item.review}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                mt: 1.2,
                                color: "#9aa1ad",
                                fontStyle: "italic",
                              }}
                            >
                              No written comment provided.
                            </Typography>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Typography sx={{ color: "#7a738f" }}>
                        No reviews yet. Be the first to rate this product.
                      </Typography>
                    )}
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "#3E1A89" }}
                  >
                    Add Your Review
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography sx={{ mb: 1, fontWeight: 500 }}>
                        Your Rating *
                      </Typography>
                      <Rating
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue || 0);
                        }}
                      />
                    </Box>

                    <TextField
                      label="Write a review (optional)"
                      multiline
                      rows={4}
                      fullWidth
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />

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
                        alignSelf: "flex-start",
                        "&:hover": {
                          backgroundColor: "#2f1368",
                        },
                      }}
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                  </Stack>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              mb: 4,
              borderRadius: "18px",
              backgroundColor: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#3E1A89", mb: 1 }}>
              Product not available
            </Typography>
            <Typography sx={{ color: "#7a738f" }}>
              Reviews could not load a product preview.
            </Typography>
          </Box>
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
              <Grid size={{ xs: 12, md: 6 }} key={review._id}>
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