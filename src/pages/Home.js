import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product-list/ProductList'
import Footer from '../features/Footer/Footer'

export default function Home() {
  return (
    <div>
        <Navbar Children={<ProductList></ProductList>}></Navbar>
        <Footer></Footer>
    </div>
  )
}
