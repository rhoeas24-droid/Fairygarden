import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    // For shop subcategories, we need to expand the webshop first
    if (id.startsWith('shop-')) {
      // Dispatch custom event to expand webshop
      window.dispatchEvent(new CustomEvent('expandWebshop', { detail: { targetId: id } }));
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  };

  const shopCategories = [
    { label: 'Ready Florariums', id: 'gallery' },
    { label: 'Bottles, Jars & Tools', id: 'shop-bottles' },
    { label: 'Plants & Substrate Mix', id: 'shop-plants' },
    { label: 'Decorations & Stones', id: 'shop-decorations' },
  ];

  const navLinks = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.diyKits'), id: 'diy-kits' },
    { label: t('nav.forBusiness'), id: 'for-business' },
    { label: t('nav.workshops'), id: 'workshops' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.blog'), id: 'blog' },
    { label: t('nav.terms'), id: 'terms-conditions' },
    { label: t('nav.privacy'), id: 'privacy-policy' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest/95 backdrop-blur-lg border-b border-gold/20 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="text-2xl font-cinzel font-bold text-gold cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            data-testid="nav-logo"
          >
            Fairygarden
          </motion.div>

          <div className="hidden lg:flex items-center space-x-2">
            {/* Home link */}
            <button
              onClick={() => scrollToSection('hero')}
              className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              data-testid="nav-link-hero"
            >
              {t('nav.home')}
            </button>
            
            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                data-testid="nav-link-shop"
              >
                {t('nav.shop')}
                <ChevronDown className={`w-4 h-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isShopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-forest/95 backdrop-blur-lg border border-gold/30 rounded-lg shadow-xl overflow-hidden"
                  >
                    {shopCategories.map((category, index) => (
                      <button
                        key={category.id}
                        onClick={() => scrollToSection(category.id)}
                        className={`w-full text-left px-4 py-3 font-montserrat text-sm transition-colors text-cream hover:text-gold hover:bg-gold/10 ${index !== shopCategories.length - 1 ? 'border-b border-gold/10' : ''}`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Other nav links */}
            {navLinks.slice(1).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                data-testid={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <LanguageSwitcher />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-cream hover:text-gold transition-colors"
              data-testid="cart-button"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-forest text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-cream"
              data-testid="mobile-cart-button"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-forest text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-cream p-2"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-forest/98 backdrop-blur-lg border-t border-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Home */}
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left text-cream hover:text-gold transition-colors font-montserrat text-base font-semibold uppercase tracking-wider py-2"
              >
                {t('nav.home')}
              </button>
              
              {/* Shop with subcategories */}
              <div className="space-y-2">
                <div className="text-cream font-montserrat text-base font-semibold uppercase tracking-wider py-2">
                  {t('nav.shop')}
                </div>
                <div className="pl-4 space-y-2 border-l-2 border-gold/30">
                  {shopCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToSection(category.id)}
                      className="block w-full text-left font-montserrat text-sm py-1 text-cream/80 hover:text-gold"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Other links */}
              {navLinks.slice(1).map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-cream hover:text-gold transition-colors font-montserrat text-base font-semibold uppercase tracking-wider py-2"
                  data-testid={`mobile-nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;