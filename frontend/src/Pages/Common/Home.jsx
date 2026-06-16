import React from 'react'
import HomeNavbar from "../../Themes/HomeNavbar";
import Banner from "../../Themes/Banner";
import Footer from "../../Themes/Footer";
import ProductsHome from "../../Pages/Customer/Products/ProductsHome";

function Home() {
  return (
    <div>
      <HomeNavbar/>
       <Banner/>
      <ProductsHome/>
      <Footer/>
    </div>
  )
}

export default Home