import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import api from '../../../api/axiosConfig'

export default function ProductPage() {

    async function getProduct(params) {
        try {
            let res = await api(`/products/`)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
  return (
    <Grid Container spacing={2}>
        <Grid item xs={12} md={7}>
            
        </Grid>
        <Grid item xs={12} md={7}>
            
        </Grid>
        
    </Grid>
  )
}
