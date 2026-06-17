import React from 'react'
import HomeNavbar from "../../../Themes/HomeNavbar"
import { Outlet } from 'react-router-dom';

function CustomerDashboard() {
  return (
    <div>
      <HomeNavbar/>
      <Outlet/>
    </div>
  )
}

export default CustomerDashboard