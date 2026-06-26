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
import api from '../../../api/axiosConfig';

export default function CouponForm() {


  const [coupon, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
const initialCoupon = {
  title: "",
  description: "",
  code: "",
  discount: "",
  max_discount: "",
  min_order_value: "",
  starts_At: "",
  ends_At: "",
};

const [couponForm, setCouponForm] =
  useState(initialCoupon);

const [editingCoupon, setEditingCoupon] =
  useState(null);



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

const handleStatus = async (id) => {
  try {
    await api.put(`/coupon/couponStatus/${id}`);

    getCoupons();
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
};

const handleEdit = (coupon) => {
  setEditingCoupon(coupon);

  setCouponForm({
    title: coupon.title,
    description: coupon.description,
    code: coupon.code,
    discount: coupon.discount,
    max_discount: coupon.max_discount || "",
    min_order_value: coupon.min_order_value,
    starts_At: coupon.starts_At?.slice(0, 16),
    ends_At: coupon.ends_At?.slice(0, 16),
  });
};

const cancelEdit = () => {
  setEditingCoupon(null);
  setCouponForm(initialCoupon);
};

const handleSubmit = async () => {
  try {
    if (editingCoupon) {
      await api.put(
        `/coupon/updateCoupon/${editingCoupon._id}`,
        couponForm
      );

      toast.success("Coupon updated");
    } else {
      await api.post(
        "/coupon/setCoupon",
        couponForm
      );

      toast.success("Coupon created");
    }

    setCouponForm(initialCoupon);
    setEditingCoupon(null);

    getCoupons();
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        "Something went wrong"
    );
  }
};

const deleteCoupon = async (id) => {
  try {
    await api.delete(`/coupon/deleteCoupon/${id}`);

    toast.success("Coupon deleted");

    getCoupons();
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
};


useEffect(() => {
  getCoupons();
}, []);
  return (<Card
  sx={{
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    mb: 4,
  }}
>
  <Typography
    variant="h6"
    fontWeight={700}
    mb={3}
  >
    {editingCoupon
      ? "Edit Coupon"
      : "Create Coupon"}
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Title"
        value={couponForm.title}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            title: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Coupon Code"
        value={couponForm.code}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            code: e.target.value.toUpperCase(),
          })
        }
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={couponForm.description}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            description: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="number"
        label="Discount (%)"
        value={couponForm.discount}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            discount: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="number"
        label="Maximum Discount"
        value={couponForm.max_discount}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            max_discount: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="number"
        label="Minimum Order Value"
        value={couponForm.min_order_value}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            min_order_value: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="datetime-local"
        label="Starts At"
        InputLabelProps={{ shrink: true }}
        value={couponForm.starts_At}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            starts_At: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="datetime-local"
        label="Ends At"
        InputLabelProps={{ shrink: true }}
        value={couponForm.ends_At}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            ends_At: e.target.value,
          })
        }
      />
    </Grid>

    <Grid item xs={12}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#3E1A89",
          }}
        >
          {editingCoupon
            ? "Update Coupon"
            : "Create Coupon"}
        </Button>

        {editingCoupon && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setEditingCoupon(null);
              setCouponForm(initialCoupon);
            }}
          >
            Cancel
          </Button>
        )}
      </Stack>
    </Grid>
  </Grid>
</Card>
)
}
