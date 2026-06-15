import React from 'react'
<<<<<<< HEAD
import { Outlet } from 'react-router-dom'
=======
import { Link, Outlet } from 'react-router-dom'
>>>>>>> 7e4f853f106b0662a32b1183722c859c81c31b33

export default function CustomerDashboard() {
  return (
    <div>
<<<<<<< HEAD
      CustomerDashboard
      <Outlet/>
=======
    <div>CustomerDashboard</div>
    <Link to="/customer/profile">CustomerProfile</Link><br></br>
    <Link to="/customer/editprofile">CustomerEditProfile</Link>
    <Outlet/>
>>>>>>> 7e4f853f106b0662a32b1183722c859c81c31b33
    </div>
  )
}
