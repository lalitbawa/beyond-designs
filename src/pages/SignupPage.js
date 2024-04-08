//necessary imports
import React from 'react'
import Signup from '../features/auth/components/Signup'

//display the signup component. does not display the footer component as it is not needed on the signup page
export default function SignupPage() {
  return (
    <div><Signup></Signup>
    </div>
  )
}
