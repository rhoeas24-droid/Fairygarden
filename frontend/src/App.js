import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import SparkleBackground from './components/SparkleBackground';
import FloatingFairy from './components/FloatingFairy';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import RouteScrollToTop from './components/RouteScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import Hero from './components/sections/Hero';
import MagicalDivider from './components/sections/MagicalDivider';
import OurShop from './components/sections/OurShop';
import DIYKits from './components/sections/DIYKits';
import ForBusiness from './components/sections/ForBusiness';
import Workshops from './components/sections/Workshops';
import About from './components/sections/About';
import BlogPreview from './components/sections/BlogPreview';
import TermsConditions, { TermsModal } from './components/sections/TermsConditions';
import PrivacyPolicy, { PrivacyModal } from './components/sections/PrivacyPolicy';
import Footer from './components/sections/Footer';
import UnderConstructionBanner from './components/UnderConstructionBanner';

// Pages
import Webshop from './pages/Webshop';

// Corporate Pages
import CorporateLayout from './pages/corporate/CorporateLayout';
import CorporateHome from './pages/corporate/CorporateHome';
import ExperiencesIndex from './pages/corporate/experiences/ExperiencesIndex';
import TeamRetreat from './pages/corporate/experiences/TeamRetreat';
import TeamBuilding from './pages/corporate/experiences/TeamBuilding';
import SolutionsIndex from './pages/corporate/solutions/SolutionsIndex';
import BrandedFlorariums from './pages/corporate/solutions/BrandedFlorariums';
import OfficeDecor from './pages/corporate/solutions/OfficeDecor';
import EventDecor from './pages/corporate/solutions/EventDecor';
import PartnerGifts from './pages/corporate/solutions/PartnerGifts';

import './App.css';

// Home Page Component
const HomePage = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  useEffect(() => {
    const handleOpenTerms = () => setIsTermsOpen(true);
    const handleOpenPrivacy = () => setIsPrivacyOpen(true);
    
    window.addEventListener('openTermsModal', handleOpenTerms);
    window.addEventListener('openPrivacyModal', handleOpenPrivacy);
    
    return () => {
      window.removeEventListener('openTermsModal', handleOpenTerms);
      window.removeEventListener('openPrivacyModal', handleOpenPrivacy);
    };
  }, []);
  
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    };
    
    const checkAndScroll = () => {
      const dismissed = sessionStorage.getItem('constructionDismissed');
      if (dismissed) {
        handleHashScroll();
      }
    };
    
    checkAndScroll();
    window.addEventListener('hashchange', handleHashScroll);
    
    const handleConstructionDismissed = () => handleHashScroll();
    window.addEventListener('constructionDismissed', handleConstructionDismissed);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
      window.removeEventListener('constructionDismissed', handleConstructionDismissed);
    };
  }, []);
  
  return (
    <div className="App relative">
      <SparkleBackground />
      
      <FloatingFairy delay={0} duration={12} />
      <FloatingFairy delay={5} duration={15} />
      <FloatingFairy delay={10} duration={10} />
      
      <Navigation />
      <CartDrawer />
      <UnderConstructionBanner />
      <GoogleAnalytics />
      
      <main>
        <Hero />
        <MagicalDivider />
        <OurShop />
        <DIYKits />
        <ForBusiness />
        <Workshops />
        <About />
        <BlogPreview />
        <TermsConditions />
        <PrivacyPolicy />
      </main>
      
      <Footer />
      
      <CookieConsent />
      <Toaster position="top-right" richColors />
      
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <RouteScrollToTop />
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Webshop */}
            <Route path="/webshop" element={<Webshop />} />
            
            {/* Corporate Pages */}
            <Route path="/corporate" element={<CorporateLayout />}>
              <Route index element={<CorporateHome />} />
              <Route path="experiences" element={<ExperiencesIndex />} />
              <Route path="experiences/retreat" element={<TeamRetreat />} />
              <Route path="experiences/team-building" element={<TeamBuilding />} />
              <Route path="solutions" element={<SolutionsIndex />} />
              <Route path="solutions/branded-florariums" element={<BrandedFlorariums />} />
              <Route path="solutions/office-decor" element={<OfficeDecor />} />
              <Route path="solutions/event-decor" element={<EventDecor />} />
              <Route path="solutions/partner-gifts" element={<PartnerGifts />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
