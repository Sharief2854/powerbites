import { Box } from '@mui/material'
import React from 'react'
import { PrimaryButton } from '../../../Components/StyledComponents/Buttons'
import { useSelector } from 'react-redux';

export default function UpdateProducts() {

  let product = useSelector((state)=>state?.product?.products)
  const [productData, setProductData] = useState({
      name:product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      isAvailable: product.isAvailable,
    });
let token=localStorage.getItem("token")
  let header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
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


  function updateProducts(params) {
    
  }
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
          <OutlinedInput id="name" label="Product Name" type="text" value={productData.name} onChange={handleChange} name="name" />
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
            name="image"
          value={productData.image}
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
                value={productData.price}            
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}            
                name="price"
                label="Price"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} size={7}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select id="category" label="Category" onChange={handleChange} value={productData.category} name="category">
                <MenuItem value="organic">Organic</MenuItem>
                <MenuItem value="non-Perishable">Non-Perishable</MenuItem>
                <MenuItem value="perishable">Perishable</MenuItem>
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
            value={productData.stock}
            onChange={handleChange}
            name="stock"
          />
        </FormControl>
        <PrimaryButton type="submit">Update Product</PrimaryButton>
      </Stack>
    </Box>
    </Box>
  )
}
