import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { deleteProducts } from "../../../Redux/Slices/ProductSlice";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { PrimaryButton } from "../../../Components/Common/Buttons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import api from "../../../api/axiosConfig";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ProductCard({ product }) {
  const [open, setOpen] = React.useState(false);
  const [deleteState, setDeleteState] = React.useState("");

  const handleClickOpen = (params) => {
    setOpen(true);
    setDeleteState(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let toggleUpdate = () => {
    navigate(`updateProduct/${product?._id}`);
  };

  let handleDelete = async (params) => {
    try {
      let response = await api.delete(`/products/deleteProduct/${params}`);
      dispatch(deleteProducts(params));
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);

      enqueueSnackbar("Failed to delete ", { variant: "error" });
    }
  };
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Card sx={{ maxWidth: "100%", maxHeight: 390 }}>
        <SnackbarProvider />
        <CardActionArea
        onClick={()=>navigate(`/admin/productlist/${product?._id}`,{state:product})}
        >
          <CardMedia
            component="img"
            height="140"
            image={
              product
                ? product?.image[0].replace(/\\/g, "/").replace(/^\/+/, "")
                : ""
            }
            alt="No Image Found"
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product?.description}
            </Typography>
            <Stack direction={"row"}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ₹{product?.price}
              </Typography>
              <Typography variant="body2" sx={{ml:1,p:'2px',borderRadius:1, color: "secondary.main",backgroundColor:'primary.main' }}>
                {product.discount}% off
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <PrimaryButton
            onClick={() => toggleUpdate(product?._id)}
            size="small"
            color="primary"
          >
            Update
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              handleClickOpen(product?._id);
            }}
            size="small"
            color="primary"
          >
            Delete
          </PrimaryButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-adminProductDelete"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(deleteState)} autoFocus>
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
