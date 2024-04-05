import React from 'react'
import UserOrder from '../features/user/components/userOrder'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/Footer/Footer'

export default function UserOrderPage() {
  return (
    <>
    <Navbar Children={<UserOrder></UserOrder>}></Navbar>
    <Footer></Footer>
    </>
  )
}
