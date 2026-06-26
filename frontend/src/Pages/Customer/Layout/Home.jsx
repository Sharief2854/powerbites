import React, { useEffect } from 'react'
import Banner from "../../../Themes/Banner";
import Footer from "../../../Themes/Footer";
import ProductsHome from "../Products/ProductsHome";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { getInfo } from '../../../Redux/Slices/AdminSlice/CompanyInfoSlice';

function Home() {
  
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
    <div>
       <Banner company={company}/>
      <ProductsHome company={company}/>
      <Footer company={company}/>
    </div>
  )
}

export default Home