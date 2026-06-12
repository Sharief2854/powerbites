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
  Card, FormLabel, FormHelperText,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarContent } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,postProducts } from "../../../Redux/Slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import {PrimaryButton} from "../../../Components/StyledComponents/Buttons";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { InputText } from "../../../Components/StyledComponents/FormFields";
import ProductCard from "./productCard";
import { v4 as uuidv4 } from 'uuid';
import {Chip} from '@mui/material'
import { removeFile } from "./UpdateProducts";


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
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function Products() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    isAvailable: true,
  });
  const [range, setRange] = useState('price');
  const [photo, setPhoto] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');

  let header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    }
  };
  let getData = useSelector((state)=>state.product.products)

  let displayProducts = getData?.filter((product) =>{
    const matchesSearch = product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    product.description.toLowerCase().includes(searchProduct.toLowerCase()) ||
    (range !== "price" &&
        product.price >= range - 1000 &&
        product.price < range);

    return matchesSearch;
  })
  .sort((a, b) => {
    if (range === "price") {
      const nameSort = a.name.localeCompare(b.name);

      if (nameSort !== 0) {
        return nameSort;
      }

      return a.price - b.price;
    }

    return 0;
  });


  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPhoto(prev => [...prev, ...Array.from(e.target.files)]);
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  const handlePost = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("name", productData.name);
    submissionData.append("price", productData.price);
    submissionData.append("description", productData.description);
    submissionData.append("isAvailable", productData.isAvailable);
    submissionData.append("stock", productData.stock);

    photo.forEach((file) => {
      submissionData.append("photo", file);
    });
    submissionData.forEach((value, key) => {
      console.log(key, value);
    });
    if (!submissionData) {
      enqueueSnackbar("Field should not be empty", { variant: "error" });
    }

    try {
      let response = await axios.post(
        "http://localhost:4500/admin/product/addProduct",
        submissionData,
        header
      );
      dispatch(postProducts(response.data.products));
      enqueueSnackbar("Product added successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Failed to add product", { variant: "error" });
    }
  };


  async function allData() {
    try {
      let response = await axios.get("http://localhost:4500/admin/product/all", header);
      dispatch(getProducts(response.data.products));
    } catch (error) {      
      console.error("Fetch error:", error);
    }
    }

  useEffect(() => {
    allData()

    if(!getData){
      "Loading..."
      return
    }
  }, [])
  

  return (<Box
  sx={{
    width: "80%",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(62,26,137,0.08)",
  }}
>
  <SnackbarContent />

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

  <Grid
    container
    sx={{ transition: "0.4s" }}
    direction={{ xs: "column-reverse", md: "row" }}
    spacing={4}
  >
    <Grid item size={{ sm: 12, md: 7 }}>
      <Grid container spacing={3}>
        <Grid item size={12}>
          <Grid container spacing={2}>
            <Grid item size={7}>
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

            <Grid item size={5}>
              <FormControl fullWidth>
                <Select
                  value={range}
                  onChange={(e) => setRange(Number(e.target.value))}
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value={"price"}>--price--</MenuItem>
                  <MenuItem value={1000}>0-1000</MenuItem>
                  <MenuItem value={2000}>1000-2000</MenuItem>
                  <MenuItem value={1500}>2000-3000</MenuItem>
                  <MenuItem value={2000}>3000-4000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={12}>
          <Grid container spacing={3}>
            {displayProducts?.map((product) => (
              <ProductCard key={uuidv4()} product={product} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid item size={{ sm: 12, md: 5 }}>
      <Stack
        component="form"
        onSubmit={handlePost}
        spacing={2.5}
        sx={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #3E1A89",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#3E1A89", fontWeight: 600 }}
        >
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

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {photo.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              onDelete={() => removeFile(index)}
              sx={{
                backgroundColor: "#3E1A89",
                color: "white",
                fontSize: "11px",
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={2}>
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
    </Grid>
  </Grid>
</Box>
);
}
