import {
  Box,
  FormControl,
  InputLabel,
  RadioGroup,
  Select,
  Grid,
  OutlinedInput,
  MenuItem,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  Card,
  FormLabel,
  FormHelperText,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarContent, SnackbarProvider } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, postProducts } from "../../../Redux/Slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ProductCard from "./productCard";
import { v4 as uuidv4 } from "uuid";
import { Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../api/axiosConfig";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function AdminProducts() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    isAvailable: true,
    discount: 0,
  });
  const [range, setRange] = useState("");
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [add,setAdd]=useState(false)


  let getData = useSelector((state) => state.product.products);
  function removeFile(index) {
    setPhoto((prev) => prev.filter((_, i) => i !== index));
  }

  async function getCategoryItems(params) {
    setLoading(true)
    try {
      let res = await api.get(`products/category`)
      setMenuItem(res.data.data)
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }

  console.log(getData);
  
  let displayProducts = getData
    ?.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchProduct.toLowerCase());
      let matchesPrice = true;
      
      if (range !== "" && range !== 0) {
        matchesPrice =
          product.price >= Number(range) - 1000 &&
          product.price < Number(range);
      } 
      let matchesAvailability = true;
      if (isAvailableOnly) {
        matchesAvailability =
          product.isAvailable === true ||
          product.isAvailable === "true" ||
          Number(product.stock) > 0;
      }

      return matchesSearch && matchesPrice && matchesAvailability;
    })
    .sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });
    if(isAvailableOnly){
    let filteredProducts= displayProducts.filter((i,ind)=>{
      if(i.isAvailable){
        return true
      }
      return false
    })
    displayProducts= filteredProducts
  }

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPhoto((prev) => [...prev, ...Array.from(e.target.files)]);
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  function removeFile(index) {
  setPhoto((prev) =>
    prev.filter((_, i) => i !== index)
  );
}

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("name", productData.name);
    submissionData.append("discount", productData.discount);
    submissionData.append("price", productData.price);
    submissionData.append("description", productData.description);
    submissionData.append("isAvailable", productData.isAvailable);
    submissionData.append("stock", productData.stock);

    photo.forEach((file) => {
      submissionData.append("image", file);
    });
    submissionData.forEach((value, key) => {
      console.log(key, value);
    });
    if (!submissionData) {
      enqueueSnackbar("Field should not be empty", { variant: "error" });
    }

    try {
      let response = await api.post(
        "/products/addProduct",
        submissionData
      );
      console.log(response.data);
      
      dispatch(postProducts(productData));
      enqueueSnackbar("Product added successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Failed to add product", { variant: "error" });
    }
    finally{
      setLoading(false)
    }
  };

  console.log(getData);
  async function allData() {
    try {
      let response = await api.get("/products/all");
      console.log(response.data);
      dispatch(getProducts(response.data.data));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    allData();
    getCategoryItems();
  }, []);
  if (loading) {
    return <CircularProgress color="primary" />;
  }

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 25px rgba(62,26,137,0.08)",
      }}
    >
      <SnackbarProvider />

      <Typography
        align="center"
        variant="h4"
        gutterBottom
        sx={{
          color: "#3E1A89",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Product
      </Typography>
      <Box
      sx={{position:'absolute', top:0,right:0}}>
        <PrimaryButton onClick={setAdd(true)}>Add Product</PrimaryButton>
      </Box>

      <Grid
        container
        sx={{ transition: "0.4s" ,minWidth:0}}
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={4}
      >
        <Grid item size={{ sm: 12, md: 7 }}>
          <div>
            <Grid container spacing={3}>
              <Grid item size={12}>
                <div>
                  <Grid container spacing={2}>
                    <Grid item size={5}>
                      <FormControl fullWidth>
                        <OutlinedInput
                          id="search"
                          placeholder="Search product"
                          onChange={(e) => setSearchProduct(e.target.value)}
                          sx={{
                            borderRadius: "12px",
                            backgroundColor: "white",
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item size={4}>
                      <FormControl fullWidth>
                        <Select
                          value={range}
                          defaultValue=""
                          displayEmpty
                          placeholder="Sort by price"
                          onChange={(e) => setRange(Number(e.target.value))}
                          sx={{
                            borderRadius: "12px",
                            backgroundColor: "white",
                          }}
                        >
                          <MenuItem value="">--Price--</MenuItem>
                          <MenuItem value={1000}>0-1000</MenuItem>
                          <MenuItem value={2000}>1000-2000</MenuItem>
                          <MenuItem value={3000}>2000-3000</MenuItem>
                          <MenuItem value={4000}>3000-4000</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item size={3}>
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
                        label="In-Stock"
                        labelPlacement="bottom"
                        sx={{ color: "#3E1A89", ml: 1, whiteSpace: "nowrap" }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item size={12}>
                <Grid container spacing={2}>
                  {displayProducts && displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                        <ProductCard product={product} />
                    ))
                  ) : (
                    <Typography variant="body1" color="initial" align="center" sx={{ mt: 2,fontWeight:'20px',width:'100%', textAlign:'center' }}>
                      Empty data
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {
add?(<Grid item size={{ sm: 12, md: 5 }} sx={{ minWidth: 0, maxWidth: { md: "41.66%" }, width: "100%" }}>
  
  <Stack
    component="form"
    onSubmit={handlePost}
    spacing={2.5}
    sx={{
      backgroundColor: "white",
      padding: "25px",
      width: "100%",          
      maxWidth: "100%",       
      boxSizing: "border-box",
      borderRadius: "16px",
      border: "1px solid #3E1A89",
    }}
  >
    <Typography variant="h6" sx={{ color: "#3E1A89", fontWeight: 600 }}>
      Add Product
    </Typography>

    <FormControl fullWidth>
      <InputLabel>Product Name</InputLabel>
      <OutlinedInput
        name="name"
        label="Product Name"
        onChange={handleChange}
        sx={{ borderRadius: "10px" }}
      />
    </FormControl>

    <FormControl fullWidth>
      <InputLabel>Description</InputLabel>
      <OutlinedInput
        multiline
        rows={4}
        name="description"
        label="Description"
        onChange={handleChange}
        sx={{ borderRadius: "10px" }}
      />
    </FormControl>

    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{
        backgroundColor: "#3E1A89",
        color: "white",
        borderRadius: "10px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#3E1A89",
          opacity: 0.9,
        },
      }}
    >
      Upload Images
      <VisuallyHiddenInput
        type="file"
        name="photo"
        onChange={handleChange}
        multiple
      />
    </Button>

    <Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%", display: "block", overflow: "hidden" }}>
      <Stack
        direction="row"
        flexWrap="nowrap"    
        gap={1}
        sx={{
          width: "80%",
          height: "115px",   
          maxHeight: "145px",
          overflowX: "scroll", 
          overflowY: "hidden", 
          py: 0.5,

          "&::-webkit-scrollbar": {
            height: "8px",
            display: "block !important",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#3E1A89",
            borderRadius: "4px",
          },
          scrollbarWidth: "thin",
        }}
      >
        {photo.map((file, index) => {
          const previewUrl = URL.createObjectURL(file);

          return (
            <ImageListItem
              key={`new-${index}`} 
              sx={{ 
                minWidth: "120px",   
                maxWidth: "120px", 
                width: "120px",
                height: "120px", 
                border: "1px solid #2196f3", 
                borderRadius: "8px", 
                overflow: "hidden", // Crucial: Replaced inner overflowX with hidden
                flexShrink: 0       // Essential to prevent flexbox from crushing images flat
              }}
            >
              <img
                src={previewUrl}
                alt="New Upload"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onLoad={() => URL.revokeObjectURL(previewUrl)}
              />
              <ImageListItemBar
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "#fff", backgroundColor: "rgba(0,0,0,0.5)", m: 0.5 }}
                    size="small"
                    onClick={() => removeFile(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </Stack>
    </Box>

            <Grid container spacing={2} >
              <Grid item xs={6} size={5}>
                <FormControl fullWidth>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    type="number"
                    name="price"
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <span style={{ color: "#3E1A89" }}>₹</span>
                      </InputAdornment>
                    }
                    label="Price"
                    sx={{ borderRadius: "10px" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} size={5}>
                <FormControl fullWidth>
                  <InputLabel>Discount</InputLabel>
                  <OutlinedInput
                    type="number"
                    name="discount"
                    
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="end">
                        <span style={{ color: "#3E1A89" }}>%</span>
                      </InputAdornment>
                    }
                    label="Discount"
                    sx={{ borderRadius: "10px" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} size={7}>
                <FormControlLabel
                  label="Stock Available"
                  sx={{ color: "#3E1A89", mt: 1 }}
                  control={
                    <Android12Switch
                      checked={productData.isAvailable}
                      onChange={() =>
                        setProductData({
                          ...productData,
                          isAvailable: !productData.isAvailable,
                        })
                      }
                    />
                  }
                />
              </Grid>
            </Grid>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                onChange={handleChange}
                sx={{ borderRadius: "10px" }}
              >
                {menuItem.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>            
          <FormControl fullWidth>
              <InputLabel>Stock</InputLabel>
              <OutlinedInput
                type="number"
                name="stock"
                onChange={handleChange}
                label="Stock"
                sx={{ borderRadius: "10px" }}
              />
            </FormControl>

            <PrimaryButton
              type="submit"
              sx={{
                backgroundColor: "#3E1A89",
                color: "white",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#3E1A89",
                  opacity: 0.9,
                },
              }}
            >
              Add Product
            </PrimaryButton>
          </Stack>
        </Grid>):
        null}
        </Grid>
    </Box>
  );
}
