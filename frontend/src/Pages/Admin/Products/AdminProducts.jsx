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
  CircularProgress,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Modal,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarContent, SnackbarProvider } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";

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
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);

  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sendUpdates: false,
    category: "",
    discount: "",
    isAvailable: true,
  });

  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const openAddProductModal = () => {
    setOpenModal(true);
  };

  const closeAddProductModal = () => {
    setOpenModal(false);

    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
      sendUpdates: false,
      category: "",
      discount: 0,
      isAvailable: true,
    });

    setPhotos([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setPhotos((prev) => {
    const newFiles = files.filter(
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
};
  

  const removeFile = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    setInStockOnly(false);
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/category/allCategories");

      setCategories(response.data.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsData = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products/all");
      dispatch(getProducts(response.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      setLoading(true);

      formData.append("name", productData.name);

      formData.append("description", productData.description);

      formData.append("price", productData.price);

      formData.append("stock", productData.stock);

      formData.append("discount", productData.discount);

      formData.append("category", productData.category);

      formData.append("isAvailable", productData.isAvailable);

      photos.forEach((photo) => {
        formData.append("file", photo.file);
      });
      formData.append("sendUpdates", productData.sendUpdates);

      const response = await api.post("/products/addProduct", formData);

      console.log(response.data);

      dispatch(postProducts(response.data.Product));
      closeAddProductModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(product);
  
  const displayProducts = useMemo(() => {
    let filtered = product;
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
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
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
    product,
    search,
    selectedCategory,
    inStockOnly,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  useEffect(() => {
    getProductsData();
    getCategories()
  }, []);
  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "20px",
        position: "relative",
        width: "100%",
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
          mb: 4
        }}
      >
        Product
      </Typography>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <PrimaryButton onClick={openAddProductModal} sx={{ margin: "20px" }}>
          Add Product
        </PrimaryButton>
      </Box>

      <Grid
        container
        sx={{ transition: "0.4s", minWidth: 0 }}
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={4}
      >
        <Grid size={{ sm: 12, md: 12 }}>
          <div>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <OutlinedInput
                      fullWidth
                      placeholder="Search Product"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>

                      <Select
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <MenuItem value="">All Categories</MenuItem>

                        {categories.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Sort</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <MenuItem value="">Default</MenuItem>

                        <MenuItem value="newest">Newest</MenuItem>

                        <MenuItem value="price-low">Price Low → High</MenuItem>

                        <MenuItem value="price-high">Price High → Low</MenuItem>

                        <MenuItem value="stock">Stock</MenuItem>

                        <MenuItem value="name">Name</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                        />
                      }
                      label="Stock"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 2 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <Grid size={12}>
            <Grid container spacing={2}>
              {displayProducts?.length > 0 ? (
                displayProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <Typography
                  align="center"
                  sx={{
                    width: "100%",
                    mt: 4,
                  }}
                >
                  No Products Found
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

<Modal open={openModal} onClose={closeAddProductModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "95%", md: "800px" },
      maxHeight: "90vh",
      bgcolor: "background.paper",
      borderRadius: 3,
      boxShadow: 24,
      overflow: "hidden",
    }}
  >
    
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#3E1A89", fontWeight: 600 }}
      >
        Add Product
      </Typography>

      <IconButton onClick={closeAddProductModal}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>

    <Stack
      component="form"
      onSubmit={handlePost}
      spacing={2}
      sx={{
        p: 3,
        maxHeight: "calc(90vh - 80px)",
        overflowY: "auto",
      }}
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="name">Product Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Product Name"
          type="text"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          name="name"
          sx={{ borderRadius: "10px" }}
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
                onChange={handleImageChange}
                multiple
              />
            </Button>


{photos.length > 0 && (
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
                  {photos.map((file, index) => {
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
                  })}
                </Stack>
              </Box>
            )}


            {/* <Box
  sx={{
    display: "flex",
    overflowX: "scroll",
    width: "100%",
    height: "82px",
    py: 1,
  }}
>
  {photos.map((file, index) => (
    <Box
      key={index}
      sx={{
        // flex: "0 0 auto",
        width: 120,
        height: "120px",
        border: "1px solid #ccc",
        borderRadius: 2,
        overflow: "hidden",
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
    </Box>
  ))}
</Box> */}

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={productData.category}
          label="Category"
          onChange={handleChange}
          sx={{ borderRadius: "10px" }}
        >
          {categories.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Price</InputLabel>
            <OutlinedInput
              label="Price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <span style={{ color: "#3E1A89" }}>₹</span>
                </InputAdornment>
              }
              sx={{ borderRadius: "10px" }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Discount</InputLabel>
            <OutlinedInput
              type="number"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
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

      <FormControl fullWidth>
        <InputLabel>Stock</InputLabel>
        <OutlinedInput
          label="Stock"
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          sx={{ borderRadius: "10px" }}
        />
      </FormControl>

      <FormControlLabel
        label="Available"
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

      <Box
        sx={{
          pt: 2,
          mt: 1,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="sendUpdates"
              onChange={handleChange}
            />
          }
          label="Send updates to Customers"
        />

        <PrimaryButton
          type="submit"
          sx={{
            backgroundColor: "#3E1A89",
            color: "white",
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
      </Box>
    </Stack>
  </Box>
</Modal>
      {/* <Modal
        open={openModal}
        onClose={closeAddProductModal}
        // maxWidth="md"
        // fullWidth
      >
        <Box sx={{ color: "#3E1A89", fontWeight: 600 }}>
          Add Product
        </Box>

        <Box >
          <Stack
            component={"form"}
            onSubmit={handlePost}
            spacing={2}
            sx={{ p: 2, height: "60%", overflowY: "auto" }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="name">Product Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Product Name"
                type="text"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleChange}
                name="name"
                sx={{ borderRadius: "10px" }}
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
                sx={{ borderRadius: "10px" }}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                label="Category"
                onChange={handleChange}
                sx={{ borderRadius: "10px" }}
              >
                {categories.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    fullWidth
                    label="Price"
                    type="number"
                    name="price"
                    value={productData.price}
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

              <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Discount</InputLabel>
                  <OutlinedInput
                    type="number"
                    name="discount"
                    value={productData.discount}
                    onChange={handleChange}
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

            <FormControl >
              <FormLabel>Stock</FormLabel>
            <OutlinedInput
              fullWidth
              label="Stock"
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              sx={{ borderRadius: "10px" }}
            />
            </FormControl>


            <FormControlLabel
              label="Available"
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

              </Box>
            )}
            <DialogActions>
              <FormControlLabel
                control={
                  <Checkbox name="sendUpdates" onChange={handleChange} />
                }
                label="Send updates to Customers"
              />
            </DialogActions>
              <PrimaryButton
                type="submit"
                sx={{
                  backgroundColor: "#3E1A89",
                  color: "white",
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
        </Box>
      </Modal> */}
    </Box>
  );
}
