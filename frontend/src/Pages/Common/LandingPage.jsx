import { Box } from '@mui/material'
import React from 'react'
import Navbar from "../../Themes/Navbar"
import Banner from "../../Themes/Banner"
import Footer from "../../Themes/Footer"
import Products from "../../Themes/Products"



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