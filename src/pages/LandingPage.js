//necessary imports
import React from 'react'
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import HeroSection from '../features/HeroSection/HeroSection';

//landing page with navbar,herosection and footer components
export default function LandingPage() {
  return (
    <div>
    <Navbar Children={<HeroSection></HeroSection>}></Navbar>
    <Footer></Footer>
    </div>
  )
}
