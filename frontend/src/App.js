import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from './components/ui/sonner';
import SparkleBackground from './components/SparkleBackground';
import FloatingFairy from './components/FloatingFairy';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import Hero from './components/sections/Hero';
import MagicalDivider from './components/sections/MagicalDivider';
import TerrariumGallery from './components/sections/TerrariumGallery';
import DIYKits from './components/sections/DIYKits';
import ForBusiness from './components/sections/ForBusiness';
import Workshops from './components/sections/Workshops';
import BlogPreview from './components/sections/BlogPreview';
import PrivacyPolicy from './components/sections/PrivacyPolicy';
import Footer from './components/sections/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App relative">
        <SparkleBackground />
        
        <FloatingFairy delay={0} duration={12} />
        <FloatingFairy delay={5} duration={15} />
        <FloatingFairy delay={10} duration={10} />
        
        <Navigation />
        <CartDrawer />
        
        <main>
          <Hero />
          <MagicalDivider />
          <TerrariumGallery />
          <DIYKits />
          <ForBusiness />
          <Workshops />
          <BlogPreview />
          <PrivacyPolicy />
        </main>
        
        <Footer />
        
        <Toaster position="top-right" richColors />
      </div>
    </CartProvider>
  );
}

export default App;