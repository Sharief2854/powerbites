import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SnackbarContent,
  Stack,
  Switch,
  Typography, IconButton,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { updateProduct } from "../../../Redux/Slices/ProductSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import api from "../../../api/axiosConfig";
import { getProducts } from "../../../Redux/Slices/ProductSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

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

export default function UpdateProducts() {
  let allProducts = useSelector((state) => state?.product?.products);
  let { id } = useParams();
  let product = allProducts
  console.log(allProducts);

  const [productData, setProductData] = useState({
    name: product?.name,
    description: product?.description,
    price: product?.price,
    stock: product?.stock,
    discount: product?.discount,
    isAvailable: product?.isAvailable,
    sendUpdates: product?.sendUpdates,
    category: product?.category?._id,
  });

  const [filteredFile, setFilteredFile] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  let token = localStorage.getItem("token");

  let dispatch = useDispatch();

  function handleChange(e) {
  const { name, value, files } = e.target;

  if (name === "photo") {
    const imgFile = Array.from(files);
    setPhotos((prev) => {
    const newFiles = imgFile.filter(
      (file) =>
        !prev.some(
          (p) =>
            p.file.name === file.name &&
            p.file.size === file.size
        )
    );
    return [
      ...prev,
      ...newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ];
  });
  } else {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
}


  function removeFile(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }
  function removeExisting(index) {
  setExistingPhotos((prev) =>
    prev.filter((_, i) => i !== index)
  );
}
    

  async function updateProducts(e) {
    e.preventDefault();

  const formData = new FormData();
  formData.forEach((photo) => {
    console.log(photo.value);
  });

    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("discount", productData.discount);
    formData.append("isAvailable", productData.isAvailable);
    formData.append("category", productData.category);
    formData.append("sendUpdates", productData.sendUpdates);
    formData.append("existingPhotos", JSON.stringify(existingPhotos))

    photos.forEach((photo) => {
      formData.append("file", photo.photo);
    });

    try {
      let response = await api.put(
        `products/updateProduct/${product._id}`,
        formData,
      );

      if(response.status === 200){
      dispatch(updateProduct(response.data.product));
      enqueueSnackbar("Product updated successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });}
    } catch (error) {
      enqueueSnackbar("Failed to update", { variant: "error" });
    }
  }
async function getById(params) {
      try {
        let response = await api.get(`product/getprd/${id}`);
        console.log(response.data);
        
        dispatch(getProducts(response.data.data));
      } catch (error) {console.log(error.message);
      }
    }
    useEffect(() => {
      getById()
    
    }, [])
    
  useEffect(() => {
    if (product) {
      setProductData(product);
      setExistingPhotos(product?.image?.map((e) => e) || []);
      getById();
    }
  }, []);
  console.log(product, existingPhotos);

  return (
    <Box>
      <Box sx={{ width: "80%", margin: "auto", padding: "20px" }}>
        <SnackbarProvider />
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
          { (
                        <Box
                          sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              py: 1,
                          }}
                        >
                          <Stack
                            direction="row"
                            flexwrap="nowrap"
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
           {existingPhotos.map((img, index) => {
                // img = img.replace(/\\/g, "/").replace(/^\/+/, "")
                      return (
                        <ImageListItem
                          key={`new-${index}`}
                          sx={{
                            minWidth: "120px",
                            maxWidth: "120px",
                            width: "120px",
                            border: "1px solid #2196f3",
                            borderRadius: "8px",
                            overflow: "hidden", 
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={img}
                            alt="Upload"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onLoad={() => URL.revokeObjectURL(img)}
                          />
                          <ImageListItemBar
                            position="top"
                            actionIcon={
                              <IconButton
                                sx={{
                                  color: "#fff",
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                  m: 0.5,
                                }}
                                size="small"
                                onClick={() => removeExisting(index)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      )})}
                            {photos.length > 0 && (
                              photos.map((file, index) => {
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
                                    overflow: "hidden",
                                    flexShrink: 0,
                                  }}
                                >
                                  <img
                  src={file.preview}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                                  <ImageListItemBar
                                    position="top"
                                    actionIcon={
                                      <IconButton
                                        sx={{
                                          color: "#fff",
                                          backgroundColor: "rgba(0,0,0,0.5)",
                                          m: 0.5,
                                        }}
                                        size="small"
                                        onClick={() => removeFile(index)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    }
                                  />
                                </ImageListItem>
                              );
                            })
                          )}
                          </Stack>
                        </Box>
                      )}
          
          <Grid container spacing={2}>
            <Grid xs={6}>
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
                  inputProps={{ min: 0 }}
                   
                  name="price"
                  label="Price"
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Discount</InputLabel>
                <OutlinedInput
                  type="number"
                  name="discount"
                  value={productData.discount}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                   
                  endAdornment={
                    <InputAdornment position="end">
                      <span style={{ color: "#3E1A89" }}>%</span>
                    </InputAdornment>
                  }
                  label="Discount"
                  sx={{ borderRadius: "10px" }}
                />
              </FormControl>
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
              inputProps={{ min: 0 }} 
              onWheel={(e)=>e.target.value}                  
              value={productData.stock}
              onChange={handleChange}
              name="stock"
            />
          </FormControl>
          <FormControlLabel
                control={
                  <Checkbox
                    checked={productData.sendUpdates}
                    name="sendUpdates"
                    onChange={handleChange} />
                }
                label="Send updates to Customers"
              />
          <PrimaryButton type="submit">Update</PrimaryButton>
        </Stack>
      </Box>
    </Box>
  );
}
