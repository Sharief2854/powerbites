import { Box } from '@mui/material'
import React from 'react'
import Navbar from "../../Themes/Navbar"
import Banner from "../../Themes/Banner"
import Products from "../../Themes/Products"
import Footer from "../../Themes/Footer"


function LandingPage() {


  return (
    <Box>
        <Navbar/>
        <Banner/>
        <Products/>
        <Footer/>
    </Box>
  )
}

export default LandingPage