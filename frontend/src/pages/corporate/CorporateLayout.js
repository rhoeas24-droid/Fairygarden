import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/sections/Footer';
import SparkleBackground from '../../components/SparkleBackground';
import FloatingFairy from '../../components/FloatingFairy';
import CartDrawer from '../../components/CartDrawer';
import CookieConsent from '../../components/CookieConsent';
import ScrollToTop from '../../components/ScrollToTop';
import { Toaster } from '../../components/ui/sonner';

const CorporateLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/corporate';

  return (
    <div className="App relative min-h-screen">
      <SparkleBackground />
      
      <FloatingFairy delay={0} duration={12} />
      <FloatingFairy delay={5} duration={15} />
      <FloatingFairy delay={10} duration={10} />
      
      <Navigation />
      <CartDrawer />
      
      {/* Breadcrumb */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-forest/90 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-sm font-montserrat">
          <Link to="/" className="text-cream/60 hover:text-gold transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span className="text-cream/40">/</span>
          <Link to="/corporate" className={`transition-colors ${isMainPage ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}>
            For Business
          </Link>
          {!isMainPage && (
            <>
              <span className="text-cream/40">/</span>
              <span className="text-gold capitalize">
                {location.pathname.split('/').pop().replace(/-/g, ' ')}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32">
        <Outlet />
      </main>

      <Footer />
      
      <ScrollToTop />
      <CookieConsent />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default CorporateLayout;
