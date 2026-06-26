import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Navbar from "../../Themes/Navbar"
import Banner from "../../Themes/Banner"
import Footer from "../../Themes/Footer"
import Products from "../../Themes/Products"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInfo } from '../../Redux/Slices/AdminSlice/CompanyInfoSlice'
import api from '../../api/axiosConfig'



function LandingPage() {
  
  const company = useSelector((state) => state.companyInfo.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCompany = async () => {
    try {
      let res = await api.get("/company/get");
      dispatch(getInfo(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);



  return (
    <Box>
      <Navbar company={company}/>
        <Banner/>
        <Products/>
        <Footer company={company}/>
    </Box>
  )
}

export default LandingPage