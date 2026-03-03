import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import SparkleBackground from './components/SparkleBackground';
import FloatingFairy from './components/FloatingFairy';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import Hero from './components/sections/Hero';
import MagicalDivider from './components/sections/MagicalDivider';
import OurShop from './components/sections/OurShop';
import TerrariumGallery from './components/sections/TerrariumGallery';
import DIYKits from './components/sections/DIYKits';
import ForBusiness from './components/sections/ForBusiness';
import Workshops from './components/sections/Workshops';
import About from './components/sections/About';
import BlogPreview from './components/sections/BlogPreview';
import TermsConditions, { TermsModal } from './components/sections/TermsConditions';
import PrivacyPolicy, { PrivacyModal } from './components/sections/PrivacyPolicy';
import Footer from './components/sections/Footer';
import UnderConstructionBanner from './components/UnderConstructionBanner';
import './App.css';

function App() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  useEffect(() => {
    // Listen for modal open events
    const handleOpenTerms = () => setIsTermsOpen(true);
    const handleOpenPrivacy = () => setIsPrivacyOpen(true);
    
    window.addEventListener('openTermsModal', handleOpenTerms);
    window.addEventListener('openPrivacyModal', handleOpenPrivacy);
    
    return () => {
      window.removeEventListener('openTermsModal', handleOpenTerms);
      window.removeEventListener('openPrivacyModal', handleOpenPrivacy);
    };
  }, []);
  
  // Handle hash links on page load (after construction banner dismissed)
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove the # character
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500); // Small delay to allow page to settle
      }
    };
    
    // Listen for construction banner dismissal
    const checkAndScroll = () => {
      const dismissed = sessionStorage.getItem('constructionDismissed');
      if (dismissed) {
        handleHashScroll();
      }
    };
    
    // Check on mount
    checkAndScroll();
    
    // Also listen for hash changes during session
    window.addEventListener('hashchange', handleHashScroll);
    
    // Custom event when construction banner is dismissed
    const handleConstructionDismissed = () => handleHashScroll();
    window.addEventListener('constructionDismissed', handleConstructionDismissed);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
      window.removeEventListener('constructionDismissed', handleConstructionDismissed);
    };
  }, []);
  
  return (
    <AuthProvider>
    <CartProvider>
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
          <TerrariumGallery />
          <DIYKits />
          <ForBusiness />
          <Workshops />
          <About />
          <BlogPreview />
          <TermsConditions />
          <PrivacyPolicy />
        </main>
        
        <Footer />
        
        <ScrollToTop />
        <CookieConsent />
        <Toaster position="top-right" richColors />
        
        {/* Global Modals */}
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;