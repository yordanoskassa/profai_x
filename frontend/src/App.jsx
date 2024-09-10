import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import SigninForm from './components/SigninForm/SigninForm.jsx';
import Navbar from './components/NavBar/NavBar.jsx';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import CaseStudySection from './components/CaseStudySection/CaseStudySection.jsx';
import PricingSection from './components/PricingSection/PricingSection.jsx';
import FAQsSection from './components/FAQsSection/FAQsSection.jsx';
import Footer from './components/Footer/Footer.jsx';
import FeaturesSection from './components/FeaturesSection/FeaturesSection.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection.jsx'


import './App.css';

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CaseStudySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQsSection />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home page with multiple sections */}
          <Route path="/" element={<HomePage />} />
          
          {/* Other individual pages */}
          <Route path="/studio" element={<Dashboard />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<SigninForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
