import React, { useEffect } from 'react'
import HomeNavbar from "../../../Themes/HomeNavbar"
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api/axiosConfig';
import { getInfo } from '../../../Redux/Slices/AdminSlice/CompanyInfoSlice';

function CustomerDashboard() {
  
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
      <HomeNavbar company={company} />
      <Outlet company={company}/>
    </div>
  )
}

export default CustomerDashboard