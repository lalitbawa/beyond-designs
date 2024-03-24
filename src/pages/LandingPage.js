import React from 'react'
import Navbar from '../features/Navbar/Navbar';
import Footer from '../features/Footer/Footer';
import LandingPageFeatures from '../features/LandingPageFeatures/LandingPageFeatures';
import HeroSection from '../features/HeroSection/HeroSection';

export default function LandingPage() {
  return (
    <div>
    <Navbar Children={<HeroSection></HeroSection>}></Navbar>
    <LandingPageFeatures></LandingPageFeatures>
    <Footer></Footer>
    </div>
  )
}