import React, { useEffect, useRef } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, addReview } from "../../../Redux/Slices/ReviewSlice";
import api from "../../../api/axiosConfig";

function ReviewOfProducts() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.Review.reviews);

  const ratingRef = useRef(0);
  const reviewRef = useRef();

  const fetchReviews = async () => {
    try {
      const response = await api.get("/review/getreviews");
      dispatch(getReviews(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = async () => {
    try {
      const payload = {
        productId: reviews[0]?.productId?._id,
        rating: ratingRef.current,
        review: reviewRef.current.value,
      };
      
      if (!payload.rating) {
        alert("Please select rating");
        return;
      }

      const response = await api.post("/review/addreview", payload);
      dispatch(addReview(response.data.data));

      ratingRef.current = 0;
      reviewRef.current.value = "";
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 700,
        mt:3,
        mx: "auto",
        borderRadius: 4,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        image={reviews[0]?.productId?.image || ""}
        alt={reviews[0]?.productId?.name || "product image"}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 320 },
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2D1457",
            mb: 2,
            fontSize: { xs: "1.3rem", sm: "1.7rem" },
          }}
        >
          {reviews[0]?.productId?.name || "Product Reviews"}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#3E1A89" }}
        >
          Previous Reviews
        </Typography>

        <Stack spacing={2}>
          {reviews.length > 0 ? (
            reviews.map((item) => (
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
                  <Rating value={item.rating || 0} readOnly size="small" />
                  <Typography
                    variant="body2"
                    sx={{ color: "#7a738f", fontSize: "0.85rem" }}
                  >
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </Typography>
                </Stack>

                {item.review && (
                  <Typography sx={{ mt: 1.2, color: "#4b5563" }}>
                    {item.review}
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
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Your Rating *</Typography>
            <Rating
              onChange={(event, newValue) => {
                ratingRef.current = newValue;
              }}
            />
          </Box>

          <TextField
            label="Write a review (optional)"
            multiline
            rows={4}
            fullWidth
            inputRef={reviewRef}
          />

          <Button
            variant="contained"
            onClick={handleAddReview}
            sx={{
              alignSelf: "flex-start",
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#3E1A89",
              "&:hover": {
                backgroundColor: "#2f1368",
              },
            }}
          >
            Submit Rating
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ReviewOfProducts;