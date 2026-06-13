import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { deleteProducts } from '../../../Redux/Slices/ProductSlice';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import axios from 'axios';
import { PrimaryButton } from '../../../Components/StyledComponents/Buttons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function ProductCard({product}) {

    let token = localStorage.getItem("token")
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let toggleUpdate = ()=>{
      navigate(`updateProduct/${product._id}`)
    }
    let handleDelete = async(params) => {
            try {
                let response = await axios.delete(`http://localhost:4500/admin/product/deleteProduct/${product._id}`,{headers:header})
                dispatch(deleteProducts(response.data.products))
                enqueueSnackbar("Product deleted successfully", { variant: "success" });
              } catch (error) {
                enqueueSnackbar("Failed to delete ", { variant: "error" });
              }  
    }
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
    <Card sx={{ maxWidth: 345 }}>
      <SnackbarProvider/>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.photo}
          alt="No Image Found"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <PrimaryButton onClick={()=>(toggleUpdate(product._id))} size="small" color="primary">
          Update
        </PrimaryButton>
        <PrimaryButton onClick={()=>(handleDelete(product._id))} size="small" color="primary">
          Delete
        </PrimaryButton>
      </CardActions>
    </Card>
    </Grid>
  );
}