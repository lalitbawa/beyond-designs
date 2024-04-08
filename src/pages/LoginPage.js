//necessary imports
import React from 'react'
import Login from '../features/auth/components/Login'

//display the login component
//does not display the footer component as it is not needed on the login page
export default function LoginPage() {
  return (
    <div><Login></Login></div>
  )
}
