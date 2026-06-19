import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getOffer } from "../../../Redux/Slices/OffserSlice";
import api from "../../../api/axiosConfig";
import axios from "axios";
import token from "../../../api/axiosConfig";


const backgroundOptions = [
  {
    id: 1,
    name: "Purple Night",
    bg: "linear-gradient(135deg, #4b1d95 0%, #7b2cbf 50%, #c77dff 100%)",
    textColor: "#ffffff",
    subTextColor: "#f3e8ff",
    offerBg: "#ffffff",
    offerText: "#4b1d95",
    chipBg: "rgba(255,255,255,0.15)",
    chipColor: "#ffffff",
    borderColor: "#c77dff",
  },
  {
    id: 2,
    name: "Ocean Blue",
    bg: "linear-gradient(135deg, #003566 0%, #00509d 50%, #4cc9f0 100%)",
    textColor: "#ffffff",
    subTextColor: "#dff6ff",
    offerBg: "#ffffff",
    offerText: "#003566",
    chipBg: "rgba(255,255,255,0.15)",
    chipColor: "#ffffff",
    borderColor: "#4cc9f0",
  },
  {
    id: 3,
    name: "Sunset Orange",
    bg: "linear-gradient(135deg, #9a031e 0%, #fb8b24 55%, #ffb703 100%)",
    textColor: "#ffffff",
    subTextColor: "#fff1d6",
    offerBg: "#fff8e8",
    offerText: "#9a031e",
    chipBg: "rgba(255,255,255,0.18)",
    chipColor: "#ffffff",
    borderColor: "#ffb703",
  },
  {
    id: 4,
    name: "Emerald Green",
    bg: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #95d5b2 100%)",
    textColor: "#ffffff",
    subTextColor: "#eafff3",
    offerBg: "#f3fff8",
    offerText: "#1b4332",
    chipBg: "rgba(255,255,255,0.18)",
    chipColor: "#ffffff",
    borderColor: "#95d5b2",
  },
  {
    id: 5,
    name: "Dark Premium",
    bg: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)",
    textColor: "#ffffff",
    subTextColor: "#e5e7eb",
    offerBg: "#ffffff",
    offerText: "#111827",
    chipBg: "rgba(255,255,255,0.14)",
    chipColor: "#ffffff",
    borderColor: "#9ca3af",
  },
];

function Offers() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.Offer?.offers) || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("inActive");
  const [images, setImages] = useState([]);
  const [selectedBg, setSelectedBg] = useState(backgroundOptions[0]);
  const [loading, setLoading] = useState(false);

  const previewUrls = useMemo(() => {
    return images.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [images]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewUrls]);

  const fetchOffers = async () => {
    try {
      const response = await api.get("/offer/getOffer");
      dispatch(getOffer(response.data.offers || []));
    } catch (error) {
      console.error("GET ERROR:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    const merged = [...images, ...files].slice(0, 5);
    setImages(merged);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setStatus("inActive");
    setImages([]);
    setSelectedBg(backgroundOptions[0]);
  };

  const handleSubmit = async () => {
  if (!title || !code || !description) {
    alert("Please fill all required fields (title, code, description).");
    return;
  }

  if (images.length === 0) {
    alert("Please upload at least one image.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("background", selectedBg.name);

    images.forEach((img) => {
      formData.append("image", img);
    });

    const authToken = localStorage.getItem("token");

    const res = await api.post("/offer/setOffer", formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(res.data);
    resetForm();
    fetchOffers();
  } catch (error) {
    console.error("POST ERROR:", error?.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async (id) => {
    try {
      await api.delete(`/offer/deleteOffer/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("DELETE ERROR:", error?.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          Offer Banner Creator
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Create and manage responsive offer banners with up to 5 images.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                border: "1px solid #e6e8ef",
                bgcolor: "#fff",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                  Select Background
                </Typography>

                {backgroundOptions.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedBg(item)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 3,
                      background: item.bg,
                      color: item.textColor,
                      border:
                        selectedBg.id === item.id
                          ? `3px solid ${item.borderColor}`
                          : "2px solid transparent",
                      transform: selectedBg.id === item.id ? "scale(1.02)" : "scale(1)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Typography fontWeight={700}>{item.name}</Typography>
                    </CardContent>
                  </Card>
                ))}

                <Divider sx={{ my: 1 }} />

                <TextField
                  label="Offer Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />

                <TextField
                  label="Offer Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  fullWidth
                />

                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="inActive">InActive</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    py: 1.2,
                    width: "fit-content",
                  }}
                >
                  Upload Images
                  <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                <Typography variant="body2" color="text.secondary">
                  {images.length > 0
                    ? `${images.length} image(s) selected`
                    : "No image selected"}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    borderRadius: 3,
                    py: 1.3,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {loading ? "Saving..." : "Save Offer"}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                overflow: "hidden",
                background: selectedBg.bg,
                boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: { xs: "auto", md: 380 },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    px: { xs: 3, sm: 5, md: 7 },
                    py: { xs: 4, sm: 5, md: 4 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Chip
                    icon={<LocalOfferIcon sx={{ color: selectedBg.chipColor }} />}
                    label={status}
                    sx={{
                      mb: 2,
                      bgcolor: selectedBg.chipBg,
                      color: selectedBg.chipColor,
                      fontWeight: 700,
                      "& .MuiChip-icon": {
                        color: selectedBg.chipColor,
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", sm: "2.6rem", md: "3.4rem" },
                      fontWeight: 800,
                      color: selectedBg.textColor,
                      lineHeight: 1.1,
                      mb: 1,
                    }}
                  >
                    {title || "Exclusive Offer"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                      fontWeight: 500,
                      color: selectedBg.subTextColor,
                      mb: 3,
                      maxWidth: 520,
                    }}
                  >
                    {description || "Add your description here to preview the banner design."}
                  </Typography>

                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: selectedBg.offerBg,
                      color: selectedBg.offerText,
                      px: { xs: 2.5, sm: 3.5, md: 4 },
                      py: { xs: 1.5, sm: 2, md: 2.2 },
                      borderRadius: 3,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                        fontWeight: 800,
                        lineHeight: 1.1,
                      }}
                    >
                      Use Code
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem" },
                        fontWeight: 800,
                        mt: 0.5,
                      }}
                    >
                      {code || "OFF2026"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    px: { xs: 2, sm: 3, md: 4 },
                    pb: { xs: 4, md: 0 },
                  }}
                >
                  <Grid container spacing={2}>
                    {previewUrls.length > 0 ? (
                      previewUrls.map((item, index) => (
                        <Grid size={{ xs: 6, sm: 4, md: 6 }} key={index}>
                          <Box
                            sx={{
                              position: "relative",
                              height: { xs: 130, sm: 150, md: 160 },
                              borderRadius: 3,
                              overflow: "hidden",
                              bgcolor: "#fff",
                              boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
                            }}
                          >
                            <Box
                              component="img"
                              src={item.url}
                              alt={`preview-${index}`}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            <IconButton
                              onClick={() => removeImage(index)}
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: "rgba(255,255,255,0.95)",
                                "&:hover": {
                                  bgcolor: "#fff",
                                },
                              }}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Grid size={{ xs: 12 }}>
                        <Box
                          sx={{
                            minHeight: 260,
                            borderRadius: 4,
                            bgcolor: "rgba(255,255,255,0.92)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 3,
                            textAlign: "center",
                          }}
                        >
                          <Typography color="text.secondary" fontWeight={600}>
                            Upload up to 5 images to preview here
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
          Saved Offers
        </Typography>

        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={offer._id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid #e6e8ef",
                  bgcolor: "#fff",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    background:
                      backgroundOptions.find((bg) => bg.name === offer.background)?.bg ||
                      "linear-gradient(135deg, #1f3c88 0%, #7b4397 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h6" fontWeight={800}>
                    {offer.title}
                  </Typography>
                  <Typography variant="body2">
                    {offer.description}
                  </Typography>
                </Box>

                <Box sx={{ p: 2 }}>
                  {Array.isArray(offer.image) && offer.image.length > 0 && (
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      {offer.image.slice(0, 5).map((img, index) => (
                        <Grid size={{ xs: 6 }} key={index}>
                          <Box
                            component="img"
                            src={img}
                            alt={`${offer.title}-${index}`}
                            sx={{
                              width: "100%",
                              height: 120,
                              objectFit: "cover",
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <Typography fontWeight={700}>Code: {offer.code}</Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Status: {offer.status}
                  </Typography>

                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => handleDelete(offer._id)}
                    sx={{
                      mt: 2,
                      borderRadius: 2.5,
                      textTransform: "none",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Offers;