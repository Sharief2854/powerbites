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
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarContent } from "notistack";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../Redux/Slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import {PrimaryButton} from "../../../Components/StyledComponents/Buttons";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { InputText } from "../../../Components/StyledComponents/FormFields";
// import {
//   DataGridPremium,
//   GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
//   useGridApiRef,
//   useKeepGroupedColumnsHidden,
// } from '@mui/x-data-grid-premium';
// import { useDemoData } from '@mui/x-data-grid-generator';

const visibleFields = [
  'commodity',
  'quantity',
  'filledQuantity',
  'status',
  'isFilled',
  'unitPrice',
  'unitPriceCurrency',
  'subTotal',
  'feeRate',
  'feeAmount',
  'incoTerm',
];

  const { data, loading } = {
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
    visibleFields,
  };


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
// let getData = useSelector((state)=>state.product.products)
// console.log(getData)
// let displayProducts = getData?.map((product) => {
//     return (
      
//     <Box sx={{ height: 520, width: '100%' }}>
      
//     </Box>
//         )
//       });

export default function Products() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: Number,
    category: "",
    stock: "",
    image: "",
    isAvailable: true,
  });
  let header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  let dispatch = useDispatch();
  // let navigate = useNavigate();
  let getData = useSelector((state)=>state.product.products)

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prevData) =>
      name === "image"
        ? { ...prevData, image: e.target.files[5] }
        : {
            ...prevData,
            [name]: value
          }
    );
  }
  let formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("category", productData.category);
  formData.append("image", productData.image);
  formData.append("isAvailable", productData.isAvailable);
  formData.append("stock", productData.stock);

  const postProducts = async (e) => {
    e.preventDefault();
    let obj = {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      image: productData.file,
      isAvailable: productData.isAvailable,
      stock: productData.stock,
    };
  formData.forEach((value, key) => {
    console.log(key, value);
  });


    try {
      // let response = await axios.post(
      //   "http://localhost:4500/product/AddProduct",
      //   formData,
      //   header
      // );
      dispatch(setProducts(formData
        // response.data.products
      ));
      enqueueSnackbar("Product added successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Failed to add ", { variant: "error" });
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", padding: "20px" }}>
      <SnackbarContent />
      <Typography align="center" variant="h4" gutterBottom>
        Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} size={6}>
          <Card>
            <Box
            sx={{backgroundImage:`url( foods)`,h:29,w:80
              
            }}
            >

              
              </Box>
          </Card>
        </Grid>
        <Grid item xs={6} size={6}>

        </Grid>
        </Grid>
      <Stack component="form" onSubmit={postProducts}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Product Name</InputLabel>
          <OutlinedInput id="name" label="Product Name" type="text" onChange={handleChange} name="name" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput
            id="description"
            type="text"
            onChange={handleChange}
            name="description"
            label="Description"
            multiline
            rows={4}
          />
        </FormControl>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Images
          <VisuallyHiddenInput
            type="file"
            name="image"
            onChange={handleChange}
            multiple
          />
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={6} size={5}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="price">Price</InputLabel>
              <OutlinedInput
                id="price"
                type="number"
                onChange={handleChange}
                
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}            
                name="price"
                label="Price"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} size={7}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select id="category" label="Category" onChange={handleChange} name="category">
                <MenuItem value="Organic">Organic</MenuItem>
                <MenuItem value="Non-Perishable">Non-Perishable</MenuItem>
                <MenuItem value="Perishable">Perishable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth margin="normal">
          <FormControlLabel
        label="Stock Available"
        control={<Android12Switch checked={productData.isAvailable} onChange={()=>setProductData({...productData,isAvailable:!productData.isAvailable})} name="isAvailable" />}
      />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="stock">Stock</InputLabel>
          <OutlinedInput
            id="stock"
            type="number"
            label="Stock"
            onChange={handleChange}
            name="stock"
          />
        </FormControl>
        <PrimaryButton type="submit">Add Product</PrimaryButton>
      </Stack>
    </Box>
  );
}
