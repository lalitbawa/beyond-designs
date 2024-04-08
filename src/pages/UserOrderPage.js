//necessary imports
import React from 'react'
import UserOrder from '../features/user/components/userOrder'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/Footer/Footer'

//display the user order and footer components on the user order page
export default function UserOrderPage() {
  return (
    <>
    <Navbar Children={<UserOrder></UserOrder>}></Navbar>
    <Footer></Footer>
    </>
  )
}
