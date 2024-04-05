import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/Footer/Footer'

export default function ProductDetailPage() {
  return (
    <div><Navbar Children={<ProductDetails></ProductDetails>}></Navbar>
    <Footer></Footer>
    </div>
  )
}
