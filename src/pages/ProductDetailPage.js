import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'

export default function ProductDetailPage() {
  return (
    <div><Navbar Children={<ProductDetails></ProductDetails>}></Navbar></div>
  )
}
