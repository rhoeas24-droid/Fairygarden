import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Leaf, Building2, Gift, Calendar, Users, Sparkles } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/sections/Footer';
import SparkleBackground from '../../components/SparkleBackground';

const CorporateLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/corporate';

  return (
    <div className="min-h-screen bg-forest-dark">
      <SparkleBackground />
      <Navigation />
      
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
    </div>
  );
};

export default CorporateLayout;
