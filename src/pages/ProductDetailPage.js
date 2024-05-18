//necessary imports
//please note that many of tailwind css components above are taken from the tailwind css "https://tailwindui.com/components"

import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/Footer/Footer'

//product details page with navbar and footer components
export default function ProductDetailPage() {
  return (
    <div><Navbar Children={<ProductDetails></ProductDetails>}></Navbar>
    <Footer></Footer>
    </div>
  )
}
