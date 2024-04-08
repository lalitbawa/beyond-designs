//necessary imports
import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'
import Footer from '../features/Footer/Footer'

//product list page with navbar and footer components
export default function Home() {
  return (
    <div>
        <Navbar Children={<ProductList></ProductList>}></Navbar>
        <Footer></Footer>
    </div>
  )
}
