import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  addToCart,
  addValue,
  getItems,
} from "../../../Redux/Slices/CM_CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import { jwtDecode } from "jwt-decode";
import api from "../../../api/axiosConfig";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import { enqueueSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const names = ["item1"];

export default function CustomerProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [range, setRange] = useState("");
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = React.useState([]);
  const [currentImage, setCurrentImage] = useState({});
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    
    const clearFilters = () => {
      setSearch("");
      setSelectedCategory("");
      setMinPrice("");
      setMaxPrice("");
      setSortBy("");
      setInStockOnly(false);
    };
    

  const theme = useTheme();
  function getStyles(name, category, theme) {
    return {
      fontWeight: "medium",
    };
  }

  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  let token = localStorage.getItem("token");
  let decodeId = jwtDecode(token).id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function addItem(params) {
    setLoading(true);
    try {
      let res = await api.post(`/cart/setCart`, {
        customer: decodeId,
        product: params,
        quantity: 1,
      });
      console.log(res.data);

      dispatch(addToCart(res.data.cartItem));
      if (res.status === 200) {
        enqueueSnackbar("Item added to cart", { variant: "success" });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function getProducts(params) {
    setLoading(true);
    try {
      let res = await api.get(`/products/all`);
      setProducts(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      // enqueueSnackbar('')
    } finally {
      setLoading(false);
    }
  }
  const getCategory = async () => {
    try {
      setLoading(true);

      const response = await api.get("/category/allCategories");

      setCategory(response.data.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function getCartItems(params) {
    setLoading(true);
    try {
      let res = await api.get(`/cart/getCart`);
      dispatch(addValue(res.data.quantity));
      dispatch(getItems(res.data.cart));
      console.log(res.data.data);
    } catch (error) {
      // enqueueSnackbar('')
    } finally {
      setLoading(false);
    }
  }
  let displayProducts=useMemo(() => {
      let filtered = products;
      if (search.trim()) {
        filtered = filtered.filter((product) =>
          product?.name?.toLowerCase().includes(search.toLowerCase()),
        );
      }
  
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category?._id === selectedCategory,
        );
      }
  
      if (inStockOnly) {
        filtered = filtered.filter((product) => Number(product.stock) > 0);
      }
  
      if (minPrice !== "") {
        filtered = filtered.filter(
          (product) => Number(product.price) >= Number(minPrice),
        );
      }
  
      if (maxPrice !== "") {
        filtered = filtered.filter(
          (product) => Number(product.price) <= Number(maxPrice),
        );
      }
  
      switch (sortBy) {
        case "low":
          filtered.sort((a, b) => a.price - b.price);
          break;
  
        case "high":
          filtered.sort((a, b) => b.price - a.price);
          break;
  
        case "stock":
          filtered.sort((a, b) => b.stock - a.stock);
          break;
  
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
  
        case "oldest":
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
  
        case "name":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
  
        default:
          break;
      }
  
      return filtered;
    }, [
      products,
      search,
      selectedCategory,
      inStockOnly,
      minPrice,
      maxPrice,
      sortBy,
    ]);
  


  useEffect(() => {
    getProducts();
    getCartItems();
    getCategory();
  }, []);
  console.log(category);

  if (loading) {
    <Backdrop
      sx={{
        height: "100%",
        width: "100%",
        color: "#fff",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>;
    return;
  }
  return (
    <Box>
<Grid
  container
  alignItems="center"
  justifyContent="space-between"
  spacing={3}
  sx={{
    mb: 3,
    p: 2,
    bgcolor: "#fff",
    borderRadius: 3,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  }}
>

  <Grid size={{ xs: 12, md: 4 }}>
    <Box
      display="flex"
      gap={2}
      justifyContent={{ xs: "center", md: "flex-start" }}
    >
      
                    <FormControl  sx={{ minWidth: 180,mr:1}}>
                      <InputLabel>Category</InputLabel>

                      <Select
                       sx={{ minWidth: 160,borderRadius:'16px' }}
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <MenuItem value="">All Categories</MenuItem>

                        {category.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
      <FormControl sx={{ minWidth: 160,borderRadius:'16px' }}>
        <Select
          value={range}
           sx={{ minWidth: 160,borderRadius:'16px' }}
          displayEmpty
          onChange={(e) => sortBy(e.target.value)}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="low">Low → High</MenuItem>
          <MenuItem value="high">High → Low</MenuItem>
          <MenuItem value="stock">Stock</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </Grid>

  <Grid size={{ xs: 12, md: 4 }}>
    <FormControl fullWidth>
      <OutlinedInput
        placeholder="Search products..."
        onChange={(e) => setSearchProduct(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        }
        sx={{
          height: 50,
          borderRadius: 99,
          bgcolor: "#fafafa",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7C4DFF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7C4DFF",
            borderWidth: 2,
          },
        }}
      />
    </FormControl>
  </Grid>


  <Grid size={{ xs: 12, md: 4 }}>
    <Box
      display="flex"
      gap={2}
      justifyContent={{ xs: "center", md: "flex-end" }}
      alignItems="center"
    >
      <FormControlLabel
        control={
          <Switch
            checked={isAvailableOnly}
            onChange={(e) =>
              setIsAvailableOnly(e.target.checked)
            }
            color="secondary"
          />
        }
        label="In Stock"
      />

      <Button
        variant="outlined"
        color="secondary"
        onClick={clearFilters}
        sx={{
          borderRadius: 99,
          px: 3,
          height: 42,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Clear Filters
      </Button>
    </Box>
  </Grid>
</Grid>

      <Grid container spacing={2}>
        {displayProducts.map((item) => {
          const cartBtn = cartItems?.some((i) => i?.product === item._id);
          const imagePath = item.image[0]
            .replace(/\\/g, "/")
            .replace(/^\/+/, "");
          return (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={item._id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
  sx={{
    width: "100%",
    maxWidth: 340,
    mx: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    overflow: "hidden",
    background:
      "linear-gradient(180deg,#ffffff 0%,#fafbff 100%)",
    border: "1px solid #E5E7EB",
    transition: "all .3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    },
  }}
>
  {/* IMAGE SECTION */}
  <Box
    sx={{
      position: "relative",
      p: 2,
      pb: 1,
    }}
  >
    {/* Badge */}
    <Chip
      label={item.stock > 0 ? "In Stock" : "Out of Stock"}
      size="small"
      color={item.stock > 0 ? "success" : "error"}
      sx={{
        position: "absolute",
        zIndex: 2,
        top: 20,
        left: 20,
        fontWeight: 700,
      }}
    />

    {/* IMAGE SLIDER */}
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        gap: 1,
        borderRadius: 4,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      onScroll={(e) => {
        const index = Math.round(
          e.target.scrollLeft / e.target.clientWidth
        );

        setCurrentImage((prev) => ({
          ...prev,
          [item._id]: index,
        }));
      }}
    >
      {item.images?.map((img, index) => (
        <Box
          key={index}
          sx={{
            minWidth: "100%",
            scrollSnapAlign: "center",
            height: 240,
            borderRadius: 4,
            overflow: "hidden",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/customer/productpage/${item._id}`)
          }
        >
          <Box
            component="img"
            src={`${BASE_URL}/${img}`}
            alt={item.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}
    </Box>

    {/* DOT INDICATORS */}
    <Box
      sx={{
        mt: 1.5,
        display: "flex",
        justifyContent: "center",
        gap: 0.75,
      }}
    >
      {item.images?.map((_, index) => (
        <Box
          key={index}
          sx={{
            width:
              currentImage[item._id] === index
                ? 20
                : 8,
            height: 8,
            borderRadius: 999,
            transition: ".3s",
            backgroundColor:
              currentImage[item._id] === index
                ? "#3E1A89"
                : "#D1D5DB",
          }}
        />
      ))}
    </Box>
  </Box>

  {/* CONTENT */}
  <CardContent
    sx={{
      flexGrow: 1,
      px: 3,
      pt: 1,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: "#111827",
        textAlign: "center",
        mb: 1,
      }}
    >
      {item.name}
    </Typography>

    <Typography
      sx={{
        color: "#6B7280",
        fontSize: "0.9rem",
        textAlign: "center",
        minHeight: 60,
      }}
    >
      {item.description}
    </Typography>

    <Box
      sx={{
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "#3E1A89",
        }}
      >
        ₹{item.price}
      </Typography>

      <Typography
        sx={{
          color: "#9CA3AF",
          fontSize: ".85rem",
        }}
      >
        Available: {item.stock}
      </Typography>
    </Box>
  </CardContent>

  {/* ACTIONS */}
  <CardActions
    sx={{
      p: 2,
      gap: 1,
      flexDirection: "column",
    }}
  >
    <PrimaryButton
      fullWidth
      onClick={() =>
        cartBtn
          ? navigate("/customer/cart")
          : addItem(item._id)
      }
      sx={{
        py: 1.2,
        borderRadius: 3,
        background:
          "linear-gradient(135deg,#3E1A89,#5A2DC7)",
      }}
    >
      {cartBtn ? "Go To Cart" : "Add To Cart"}
    </PrimaryButton>

    <Button
      fullWidth
      variant="outlined"
      onClick={() =>
        navigate(`/customer/productpage/${item._id}`)
      }
      sx={{
        borderRadius: 3,
        py: 1.2,
        borderColor: "#3E1A89",
        color: "#3E1A89",
        fontWeight: 700,
      }}
    >
      View Product
    </Button>
  </CardActions>
</Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
