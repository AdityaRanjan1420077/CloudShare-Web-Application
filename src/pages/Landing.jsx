import React, { useEffect } from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASections from '../components/landing/CTASections'
import FooterSection from '../components/landing/FooterSection'
import {features, pricingPlans, testimonials} from "../assets/data"
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const { openSignIn, openSignUp } = useClerk();
  const{isSignedIn} = useUser();
  const navigate = useNavigate();
  useEffect(()=>{
    if(isSignedIn) {
      navigate("/dashboard");
    }

  },[isSignedIn ,navigate])
  return (
    <div className='landing-page bg-gradient-to-b from-gray-50 to-gray-100'>
      {/* Hero Section */}
      <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>

      {/* Features Section */}
      <FeaturesSection features={features}/>
      {/* Pricing Sections */}
      <PricingSection pricingPlans={pricingPlans} openSignUp={openSignUp}/>
      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials}/>
      {/* CTA Sections */}
      <CTASections openSignUp={openSignUp}/>
      {/* Footer Section */}
      <FooterSection/>
    </div>
  )
}

export default Landing
