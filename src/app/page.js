"use client"

import ContentSection from "./components/ContentSection";
import FooterBlock from "./components/FooterBlock";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar"; // ✅ adjust path if needed
import Features from "./components/Feature";
import OngoingEvent from "./components/OngoingEvent";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import { useState,useEffect } from "react";


export default function Home() {
 const [showLoginModal, setShowLoginModal] = useState(false);
 const [user, setUser] = useState(null);

   useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="font-sans min-h-screen relative">
      {/* ✅ Navbar at the top */}
      <Navbar showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      
      {/* ✅ Hero Section */}
      <HeroSection user={user} setShowLoginModal={setShowLoginModal}  />
    
      <OngoingEvent setShowLoginModal={setShowLoginModal} /> 
      <ContentSection id="about-us" />
      <Features id="initiatives"/>
      <TestimonialSection id="blogs" />
      <FooterBlock id="contact" />
      <Footer />
      

      {/* ✅ Placeholder for future sections */}
      {/* <main className="flex flex-col items-center justify-center min-h-screen"> */}
        {/* Add your sections here later */}

      
    </div>
  );
}
