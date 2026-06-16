import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function CustomerDashboard() {
  return (
    <div>
    <div>CustomerDashboard</div>
    <Link to="/customer/profile">CustomerProfile</Link><br></br>
    <Link to="/customer/editprofile">CustomerEditProfile</Link>
    <Link to="/customer/orderlist">CustomerOrderList</Link><br></br>
    <Outlet/>
    </div>
  )
}
