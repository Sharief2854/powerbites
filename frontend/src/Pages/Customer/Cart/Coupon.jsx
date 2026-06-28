import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useRef, useState } from "react";
import api from "../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getItems } from "../../../Redux/Slices/CM_CartSlice";

export default function Coupon({ setOpen, applyCoupon }) {
  const [couponData, setCouponList] = useState([]);

  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  const couponInputRef = useRef(null);

  const handleCouponSelect = (coupon) => {
  setCouponCode(coupon.code);

  couponInputRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  setTimeout(() => {
    couponInputRef.current?.focus();
  }, 300);
};

const couponList = couponData?.filter((c) => {
  return c.status=="Active"? true :false
});

  async function getAllCoupon() {
    try {
      let res = await api.get("/coupon/getCoupons");      
      setCouponList(res.data.coupons);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function applyCouponCode() {
    try {
      let res = await api.post("/cart/applyCoupon", { couponCode: couponCode });
      navigate("/customer/cart");
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    }
  }
  useEffect(() => {
    getAllCoupon();
  }, []);

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 3, width: "100%" }}
      >
        <SnackbarProvider/>
        <TextField
  placeholder="Enter Coupon Code"
  value={couponCode}
  ref={couponInputRef}
  onChange={(e) => setCouponCode(e.target.value)}
  sx={{
    width: 340,
    mt: 2,

    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      background: "#FFFFFF",
      color: "#3E1A89",
      fontWeight: 700,
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(62,26,137,.12)",

      "& fieldset": {
        borderColor: "#3E1A89",
        borderWidth: "2px",
      },

      "&:hover fieldset": {
        borderColor: "#3E1A89",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3E1A89",
        borderWidth: "2px",
      },
    },

    "& input": {
      py: 1.8,
      px: 1,
      fontWeight: 800,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "#3E1A89",
    },

    "& input::placeholder": {
      color: "#3E1A89",
      opacity: 0.55,
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: 0,
    },
  }}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <Button
            variant="contained"
            disabled={!couponList?.length}
            onClick={applyCouponCode}
            sx={{
              bgcolor: "#3E1A89",
              color: "#FFFFFF",
              borderRadius: "12px",
              px: 3,
              py: 1,
              mr: 0.5,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              boxShadow: "none",
              transition: "all .25s ease",

              "&:hover": {
                bgcolor: "#3E1A89",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 18px rgba(62,26,137,.3)",
              },

              "&.Mui-disabled": {
                bgcolor: "#3E1A89",
                color: "#FFFFFF",
                opacity: 0.4,
              },
            }}
          >
            Apply
          </Button>
        </InputAdornment>
      ),
    },
  }}
/>
      </Box>
      {couponList?.length < 0 ? (
        <Box
  sx={{
    py: 8,
    px: 3,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  }}
>
  <Box
    sx={{
      width: 90,
      height: 90,
      borderRadius: "50%",
      bgcolor: "rgba(62,26,137,.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: "float 3s ease-in-out infinite",

      "@keyframes float": {
        "0%, 100%": {
          transform: "translateY(0px)",
        },
        "50%": {
          transform: "translateY(-8px)",
        },
      },
    }}
  >
    <Typography
      sx={{
        fontSize: 42,
      }}
    >
      🎟️
    </Typography>
  </Box>

  <Typography
    sx={{
      color: "#3E1A89",
      fontWeight: 800,
      fontSize: "1.5rem",
    }}
  >
    No Offers Right Now
  </Typography>

  <Typography
    sx={{
      maxWidth: 320,
      color: "text.secondary",
      lineHeight: 1.7,
    }}
  >
    Check back soon for exciting discounts and exclusive deals.
  </Typography>

  <Typography
    sx={{
      mt: 1,
      color: "#3E1A89",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}
  >
    New offers coming soon ✨
  </Typography>
</Box>) : (
        <Stack spacing={2}><Typography
  sx={{
    color: "#3E1A89",
    fontWeight: 800,
    mb: 1,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 12,
  }}
>
  Have a Coupon?
</Typography>
        <Grid container spacing={2}>
          {couponList?.map((coupon) => (
          <Grid size={{ xs: 12, md: 4 }}>
        
            <Box
  key={coupon._id}
  onClick={() => handleCouponSelect(coupon)}
  sx={{
    position: "relative",
    overflow: "hidden",
    height:300,
    cursor: "pointer",
    p: 2.5,
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #b7a3e2 0%, #3e3d3f 100%)",
    color: "#fff",
    transition: "all .3s ease",
    boxShadow: "0 10px 30px rgba(62,26,137,.25)",

    "&:hover": {
      transform: "translateY(-5px)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: "-30px",
      right: "-30px",
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(255,255,255,.08)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "40px",
      left: "-40px",
      width: 140,
      height: 140,
      borderRadius: "50%",
      background: "rgba(255,255,255,.06)",
    },
  }}
>
  <Grid container spacing={1}
  sx={{justifyContent:'space-between'}}
  >
    <Grid size={{ xs: 12, md: 3 }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
          opacity: 0.8,
        }}
      >
        COUPON CODE
      </Typography>

      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 28,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {coupon.code}
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          mt: 0.5,
          fontSize: 18,
        }}
      >
        {coupon.title}
      </Typography>

      <Typography
        sx={{
          opacity: 0.85,
          fontSize: 13,
          mt: 0.5,
        }}
      >
        {coupon.description}
      </Typography>
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}
      sx={{
        bgcolor: "#fff",
        color: "#3E1A89",
        px: 2,
        py: 1,
        borderRadius: "16px",
        minWidth: 100,
        maxHeight:100
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {coupon.discount}%
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        OFF
      </Typography>
    </Grid>
  </Grid>

  <Divider
    sx={{
      my: 2,
      borderColor: "rgba(255,255,255,.15)",
    }}
  />

  <Stack
    direction="row"
    spacing={1}
    useFlexGap
  >
    <Chip
      label={`Min Order ₹${coupon.min_order_value}`}
      size="small"
      sx={{
        bgcolor: "rgba(255,255,255,.12)",
        color: "#fff",
      }}
    />

    <Chip
      label={`Max ₹${coupon.max_discount} Off`}
      size="small"
      sx={{
        bgcolor: "rgba(255,255,255,.12)",
        color: "#fff",
      }}
    />
  </Stack>

  <Typography
    sx={{
      mt: 2,
      fontSize: 12,
      fontWeight: 600,
      opacity: 0.8,
      textAlign: "right",
    }}
  >
    Tap to apply →
  </Typography>
</Box>
        </Grid>))
}
        </Grid>
        </Stack>

      )}
    </Box>
  );
}
