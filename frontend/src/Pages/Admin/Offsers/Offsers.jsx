import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import EditIcon from "@mui/icons-material/Edit";
import api from "../../../api/axiosConfig";

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

function AutoCarousel({
  images = [],
  editable = false,
  existingImages = [],
  onRemoveExistingImage,
  onRemoveNewImage,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) {
      setCurrent(0);
      return;
    }

    if (current >= images.length) {
      setCurrent(0);
    }
  }, [images.length, current]);

  if (!images.length) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: 240, sm: 300, md: 340 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography color="text.secondary" fontWeight={700}>
          Upload images to preview the moving banner here
        </Typography>
      </Box>
    );
  }

  const isExisting = current < existingImages.length;
  const newIndex = current - existingImages.length;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 240, sm: 300, md: 340 },
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
      }}
    >
      <Box
        component="img"
        src={images[current]}
        alt={`slide-${current}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {editable && isExisting && (
        <IconButton
          onClick={() => onRemoveExistingImage(current)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.95)",
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}

      {editable && !isExisting && newIndex >= 0 && (
        <IconButton
          onClick={() => onRemoveNewImage(newIndex)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.95)",
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}

      {images.length > 1 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "rgba(0,0,0,0.25)",
            px: 1.2,
            py: 0.7,
            borderRadius: 10,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrent(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor:
                  current === index ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function OfferPreviewBanner({
  offer,
  backgroundOptions,
  actions,
  editable = false,
  existingImages = [],
  onRemoveExistingImage = () => {},
  onRemoveNewImage = () => {},
}) {
  const selectedBg =
    backgroundOptions.find((item) => item.name === offer.background) ||
    backgroundOptions[0];

  const images = Array.isArray(offer?.images) ? offer.images : [];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        background: selectedBg.bg,
        color: selectedBg.textColor,
        p: { xs: 2, sm: 3, md: 4 },
        border: `1px solid ${selectedBg.borderColor}`,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                icon={
                  <LocalOfferIcon
                    sx={{ color: `${selectedBg.chipColor} !important` }}
                  />
                }
                label={offer?.status || "inactive"}
                sx={{
                  bgcolor: selectedBg.chipBg,
                  color: selectedBg.chipColor,
                  fontWeight: 700,
                }}
              />
              <Chip
                label={offer?.background || selectedBg.name}
                sx={{
                  bgcolor: selectedBg.chipBg,
                  color: selectedBg.chipColor,
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
                lineHeight: 1.1,
              }}
            >
              {offer?.title || "Special Offer Title"}
            </Typography>

            <Typography
              sx={{
                color: selectedBg.subTextColor,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: "60ch",
              }}
            >
              {offer?.description || "Offer description will appear here."}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",
                px: 2.2,
                py: 1.2,
                borderRadius: 3,
                bgcolor: selectedBg.offerBg,
                color: selectedBg.offerText,
                fontWeight: 900,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Use Code: {offer?.code || "SAVE20"}
            </Box>

            {actions && (
              <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ pt: 1 }}>
                {actions}
              </Stack>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <AutoCarousel
            images={images}
            editable={editable}
            existingImages={existingImages}
            onRemoveExistingImage={onRemoveExistingImage}
            onRemoveNewImage={onRemoveNewImage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("inactive");
  const [selectedBg, setSelectedBg] = useState(backgroundOptions[0]);
  const [images, setImages] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const previewUrls = useMemo(() => {
    return images.map((file) => URL.createObjectURL(file));
  }, [images]);

  const editPreviewUrls = useMemo(() => {
    return newImages.map((file) => URL.createObjectURL(file));
  }, [newImages]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  useEffect(() => {
    return () => {
      editPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [editPreviewUrls]);

  const fetchOffers = async () => {
    try {
      const res = await api.get("/offer/getOffers");
      setOffers(res?.data?.data || []);
    } catch (error) {
      console.error("GET ERROR:", error?.response?.data || error.message);
      setOffers([]);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const resetCreateForm = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setStatus("inactive");
    setImages([]);
    setSelectedBg(backgroundOptions[0]);
  };

  const resetEditForm = () => {
    setOpenEdit(false);
    setEditId(null);
    setExistingImages([]);
    setNewImages([]);
    setTitle("");
    setDescription("");
    setCode("");
    setStatus("inactive");
    setSelectedBg(backgroundOptions[0]);
  };

  const handleCreateImages = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    const merged = [...images, ...files].slice(0, 5);
    setImages(merged);
  };

  const removeCreateImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description || !code) {
      alert("Please fill title, description and code");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("code", code);
      formData.append("status", status);
      formData.append("background", selectedBg.name);

      images.forEach((file) => {
        formData.append("file", file);
      });

      await api.post("/offer/setOffer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resetCreateForm();
      fetchOffers();
    } catch (error) {
      console.error("CREATE ERROR:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await api.delete(`/offer/deleteOffer/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("DELETE ERROR:", error?.response?.data || error.message);
    }
  };

  const handleOpenEdit = (offer) => {
    setEditId(offer._id);
    setTitle(offer.title || "");
    setDescription(offer.description || "");
    setCode(offer.code || "");
    setStatus((offer.status || "inactive").toLowerCase());
    setSelectedBg(
      backgroundOptions.find((bg) => bg.name === offer.background) ||
        backgroundOptions[0]
    );
    setExistingImages(Array.isArray(offer.image) ? offer.image : []);
    setNewImages([]);
    setOpenEdit(true);
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    const total = existingImages.length + newImages.length + files.length;

    if (total > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEditNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateOffer = async () => {
    if (!title || !description || !code) {
      alert("Please fill title, description and code");
      return;
    }

    if (existingImages.length + newImages.length === 0) {
      alert("At least one image is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("code", code);
      formData.append("status", status);
      formData.append("background", selectedBg.name);
      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((file) => {
        formData.append("file", file);
      });

      await api.put(`/offer/updateOffer/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resetEditForm();
      fetchOffers();
    } catch (error) {
      console.error("UPDATE ERROR:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const createPreviewOffer = {
    title,
    description,
    code,
    status,
    background: selectedBg.name,
    images: previewUrls,
  };

  const editPreviewOffer = {
    title,
    description,
    code,
    status,
    background: selectedBg.name,
    images: [...existingImages, ...editPreviewUrls],
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          Offer Banner Management
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Create, preview, edit and display offers in the same banner UI.
        </Typography>

       <Grid container spacing={3} alignItems="flex-start">
  <Grid item xs={12} md={4}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: "1px solid #e7e9f0",
        bgcolor: "#fff",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          Create Offer
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
              transition: "0.25s ease",
              transform:
                selectedBg.id === item.id ? "scale(1.02)" : "scale(1)",
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Typography fontWeight={700}>{item.name}</Typography>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 1 }} />

        <TextField
          fullWidth
          label="Offer Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          fullWidth
          label="Offer Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ borderRadius: 3, textTransform: "none", py: 1.2 }}
        >
          Upload Images
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={handleCreateImages}
          />
        </Button>

        <Typography variant="body2" color="text.secondary">
          {images.length
            ? `${images.length} image(s) selected`
            : "No images selected"}
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ borderRadius: 3, py: 1.3, textTransform: "none" }}
        >
          {loading ? "Saving..." : "Save Offer"}
        </Button>
      </Stack>
    </Paper>
  </Grid>

  <Grid
  item
  xs={12}
  md={8}
  sx={{
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }}
>
    <Box
      sx={{
        width: "100%",
        alignSelf: "flex-start",
        mt: 0,
      }}
    >
      <OfferPreviewBanner
        offer={createPreviewOffer}
        backgroundOptions={backgroundOptions}
        editable
        existingImages={[]}
        onRemoveExistingImage={() => {}}
        onRemoveNewImage={removeCreateImage}
      />
    </Box>
  </Grid>
</Grid>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
          Saved Offers
        </Typography>

        <Stack spacing={4}>
          {offers.map((offer) => (
            <OfferPreviewBanner
              key={offer._id}
              offer={{
                title: offer.title,
                description: offer.description,
                code: offer.code,
                status: offer.status,
                background: offer.background,
                images: Array.isArray(offer.image) ? offer.image : [],
              }}
              backgroundOptions={backgroundOptions}
              actions={
                <>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(offer)}
                    sx={{ borderRadius: 2.5, textTransform: "none" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => handleDeleteOffer(offer._id)}
                    sx={{ borderRadius: 2.5, textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </>
              }
            />
          ))}
        </Stack>

        <Dialog open={openEdit} onClose={resetEditForm} fullWidth maxWidth="lg">
          <DialogTitle>Edit Offer</DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Offer Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="Offer Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      label="Status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Background</InputLabel>
                    <Select
                      value={selectedBg.name}
                      label="Background"
                      onChange={(e) => {
                        const found = backgroundOptions.find(
                          (item) => item.name === e.target.value
                        );
                        setSelectedBg(found || backgroundOptions[0]);
                      }}
                    >
                      {backgroundOptions.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ borderRadius: 3, textTransform: "none" }}
                  >
                    Add More Images
                    <input
                      hidden
                      multiple
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                    />
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    Old images stay, new images are added. Maximum 5 images total.
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <OfferPreviewBanner
                  offer={editPreviewOffer}
                  backgroundOptions={backgroundOptions}
                  editable
                  existingImages={existingImages}
                  onRemoveExistingImage={removeExistingImage}
                  onRemoveNewImage={removeEditNewImage}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={resetEditForm}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleUpdateOffer}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Offer"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}