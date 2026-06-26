

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from 'react'
import api from "../../../api/axiosConfig";

export default function AllCoupon() {

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoupons = async () => {
  try {
    setLoading(true);

    const res = await api.get("/coupon/getCoupons");
    setCoupons(res?.data?.coupons || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getCoupons();
}, []);
  return (
    <Box>
        <Grid container spacing={2}>
  {coupons.map((coupon) => (
    <Grid item xs={12} sm={6} lg={4} key={coupon._id}>
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={700}>
              {coupon.title}
            </Typography>

            <Chip
              label={coupon.status}
              color={
                coupon.status === "Active"
                  ? "success"
                  : "default"
              }
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            {coupon.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <b>Code:</b> {coupon.code}
          </Typography>

          <Typography>
            <b>Discount:</b> {coupon.discount}%
          </Typography>

          <Typography>
            <b>Max Discount:</b> ₹{coupon.max_discount}
          </Typography>

          <Typography>
            <b>Min Order:</b> ₹{coupon.min_order_value}
          </Typography>

          <Typography mt={1}>
            <b>Start:</b>{" "}
            {new Date(
              coupon.starts_At
            ).toLocaleDateString()}
          </Typography>

          <Typography>
            <b>End:</b>{" "}
            {new Date(
              coupon.ends_At
            ).toLocaleDateString()}
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1}
            mt={3}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                handleStatus(coupon._id)
              }
            >
              {coupon.status === "Active"
                ? "Deactivate"
                : "Activate"}
            </Button>

            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={() =>
                deleteCoupon(coupon._id)
              }
            >
              Delete
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => openEdit(coupon)}
            >
              Edit
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={1}
  mt={2}
>
  <Button
    fullWidth
    variant="outlined"
    onClick={() => handleEdit(coupon)}
  >
    Edit
  </Button>

  <Button
    fullWidth
    color="error"
    variant="outlined"
    onClick={() => deleteCoupon(coupon._id)}
  >
    Delete
  </Button>

  <Button
    fullWidth
    variant={
      coupon.status === "Active"
        ? "contained"
        : "outlined"
    }
    color={
      coupon.status === "Active"
        ? "success"
        : "warning"
    }
    onClick={() =>
      handleStatus(coupon._id)
    }
  >
    {coupon.status === "Active"
      ? "Deactivate"
      : "Activate"}
  </Button>
</Stack>
    </Grid>
  ))}
</Grid>
    </Box>
  )
}
