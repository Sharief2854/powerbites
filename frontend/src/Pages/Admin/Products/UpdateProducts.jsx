import { Box, Button, Chip, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SnackbarContent, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../Components/StyledComponents/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { updateProduct } from "../../../Redux/Slices/ProductSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
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

export function removeFile(index) {
  setSelectedFile((prev) =>
    prev.filter((_, i) => i !== index)
  );
}


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

export default function UpdateProducts() {
  let allProducts = useSelector((state) => state?.product?.products);
  let {id} = useParams()
  let product = allProducts?.find((e)=>{return e.id == id})
  const [productData, setProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    isAvailable: product.isAvailable,
  });
  
const [selectedFile, setSelectedFile] = useState([]);
const [existingPhotos, setExistingPhotos] = useState([]);
  const [photos, setPhotos] = useState([])
  let token = localStorage.getItem("token");
  let header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  let dispatch = useDispatch();
  function handleChange(e) {
  const { name, value, files } = e.target;

  if (name === "photo") {
  const files = Array.from(e.target.files);

  setSelectedFile((prev) =>
    [...prev, ...files]
  );
} else {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
}
function removeExisting(index) {
  setExistingPhotos((prev) =>
    prev.filter((_, i) => i !== index)
  );
}
  async function updateProducts(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("stock", productData.stock);
  formData.append("isAvailable", productData.isAvailable);

  formData.append(
    "existingPhotos",
    JSON.stringify(existingPhotos)
  );

  selectedFile.forEach((file) => {
    formData.append("photo", file);
  });

  try {
    // let response = await axios.put(
    //   `http://localhost:4500/product/updateProduct/${product._id}`,
    //   formData,
    //   header
    // );

    dispatch(updateProduct(productData
      // response.data.products
    ));
    enqueueSnackbar("Product updated successfully", { variant: "success" ,anchorOrigin:{vertical:'top',horizontal:'right'}});
  } catch (error) {
    enqueueSnackbar("Failed to update", { variant: "error" });
  }
}


  useEffect(() => {
  if (product) {
    setProductData(product);
    setExistingPhotos(product.photo || []);
  }
}, [product]);
console.log(product,existingPhotos);

  return (
    <Box>
      <Box sx={{ width: "80%", margin: "auto", padding: "20px" }}>
        <SnackbarContent />
        <Typography align="center" variant="h4" gutterBottom>
          Update Product Details
        </Typography>
        <Stack component="form" onSubmit={updateProducts}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="name">Product Name</InputLabel>
            <OutlinedInput
              id="name"
              label="Product Name"
              type="text"
              value={productData.name}
              onChange={handleChange}
              name="name"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              id="description"
              type="text"
              value={productData.description}
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
               key="photo-input"
              name="photo"
              onChange={handleChange}
              multiple
            />
          </Button>
          {
            <Stack direction={'row'}>{existingPhotos.map((img, index) => (
  <Chip
    key={index}
    label={img.split("/").pop()}
    sx={{fontSize:"9px"}}
    onDelete={() => removeExisting(index)}
  />
))}
          {selectedFile.map((file, index) => (
  <Chip
    key={index}
    label={file.name}
    sx={{fontSize:"9px"}}
    onDelete={() => removeFile(index)}
  />
))}</Stack>}
          <Grid container spacing={2}>
            <Grid  xs={6} >
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="price">Price</InputLabel>
                <OutlinedInput
                  id="price"
                  type="number"
                  onChange={handleChange}
                  value={productData.price}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                  name="price"
                  label="Price"
                />
              </FormControl>
            </Grid>
            <Grid  xs={6}>
              {/* <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  id="category"
                  label="Category"
                  onChange={handleChange}
                  value={productData.category}
                  name="category"
                >
                  <MenuItem value="organic">Organic</MenuItem>
                  <MenuItem value="non-Perishable">Non-Perishable</MenuItem>
                  <MenuItem value="perishable">Perishable</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <FormControlLabel
              label="Stock Available"
              control={
                <Android12Switch
                  checked={productData.isAvailable}
                  onChange={() =>
                    setProductData({
                      ...productData,
                      isAvailable: !productData.isAvailable,
                    })
                  }
                  name="isAvailable"
                />
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="stock">Stock</InputLabel>
            <OutlinedInput
              id="stock"
              type="number"
              label="Stock"
              value={productData.stock}
              onChange={handleChange}
              name="stock"
            />
          </FormControl>
          <PrimaryButton type="submit">Update</PrimaryButton>
        </Stack>
      </Box>
    </Box>
  );
}
