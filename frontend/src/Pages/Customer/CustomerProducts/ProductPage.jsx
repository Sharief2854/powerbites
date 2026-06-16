import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../../api/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton } from '../../../Components/Common/Buttons'
import { useDispatch } from 'react-redux'
import { addToCart, addValue } from '../../../Redux/Slices/CM_CartSlice'

export default function ProductPage() {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const {id} = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function checkOutPage(params) {
        navigate(`/customer/cart/${id}`)
    }
    // let photo = product?.image[0].replace(/\\/g, '/').replace(/^\/+/, '')
    

    async function getProduct(params) {
        try {
            let res = await api.get(`/products/getprd/${id}`)
            setProduct(res.data.data)
            console.log(res.data.data);
            
        } catch (error) {
            
        }
    }

    async function addItem(params) {
        setLoading(true)
        try {
          let res = await api.post(`/cart/setCart`, {name:product.name,
            customer,
            product,
            quantity:quantity,
            price,
            image,
            total
          })
          dispatch(addToCart(res.data.data))
          dispatch(addValue(res.data.data.quantity))
        } catch (error) {
        }
        finally {
          setLoading(false)
        }
      }
    useEffect(() => {
        getProduct()
    }, [])
  return (
    <Grid container spacing={2}>
        <Grid xs={12} md={7}>
            <CardMedia component="img" height="140" image={`http://localhost:4500/${"bh"}`} alt="No Image Found" />
            <Typography variant="h5" color="initial">{}</Typography>
            <Typography variant="h5" color="initial">{}</Typography>
            <Typography variant="h5" color="initial">{}</Typography>
        </Grid>
        <Grid  xs={12} md={7}>
            <Stack>
                <Typography variant="h5" color="initial">{product?.description}</Typography>


        <Grid container spacing={2}>
            <Grid  xs={12} md={6}>
                  <PrimaryButton onClick={addItem}>`${'Add'}` to Cart</PrimaryButton></Grid>
            <Grid  xs={12} md={6}>
                <PrimaryButton onClick={checkOutPage}>Buy Now</PrimaryButton>
                </Grid>
                </Grid>
        </Stack>
        </Grid>
    </Grid>
  )
}
