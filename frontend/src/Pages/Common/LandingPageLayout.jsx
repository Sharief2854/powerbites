import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from '../../Themes/Navbar'

export default function LandingPageLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}
