import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight, UserCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import AuthModal from './AuthModal';
import AccountModal from './AccountModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isMobileBusinessOpen, setIsMobileBusinessOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn, customer } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      setIsMobileMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const businessCategories = [
    { label: 'Experiences', path: '/corporate/experiences', isHeader: true },
    { label: 'Retreat', path: '/corporate/experiences/retreat' },
    { label: 'Team-building', path: '/corporate/experiences/team-building' },
    { label: 'Solutions', path: '/corporate/solutions', isHeader: true },
    { label: 'Branded Florariums', path: '/corporate/solutions/branded-florariums' },
    { label: 'Office Decor', path: '/corporate/solutions/office-decor' },
    { label: 'Event Decor', path: '/corporate/solutions/event-decor' },
    { label: 'Partner Gifts', path: '/corporate/solutions/partner-gifts' },
  ];

  return (
    <>
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
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-cream p-2 hover:text-gold transition-colors"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            <motion.div
              className="text-xl lg:text-2xl font-cinzel font-bold text-gold cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
              data-testid="nav-logo"
            >
              Fairygarden
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                {t('nav.home')}
              </button>
              
              {/* Shop - Simple Link (no dropdown) */}
              <Link
                to="/webshop"
                onClick={() => window.scrollTo(0, 0)}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                {t('nav.shop')}
              </Link>
              
              {/* DIY Kits - Link to homepage section */}
              <button
                onClick={() => scrollToSection('diy-kits')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                DIY KITS
              </button>
              
              {/* For Business Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <Link
                  to="/corporate"
                  className="flex items-center gap-1 text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                >
                  {t('nav.forBusiness')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isBusinessDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
                
                <AnimatePresence>
                  {isBusinessDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-forest/95 backdrop-blur-lg border border-gold/30 rounded-lg shadow-xl overflow-hidden"
                    >
                      {businessCategories.map((category, index) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          onClick={() => setIsBusinessDropdownOpen(false)}
                          className={`block w-full text-left px-4 py-2.5 font-montserrat text-sm transition-colors 
                            ${category.isHeader ? 'text-gold font-semibold bg-gold/5 border-b border-gold/20' : 'text-cream hover:text-gold hover:bg-gold/10 pl-6'}
                            ${index !== businessCategories.length - 1 && !category.isHeader ? 'border-b border-gold/10' : ''}`}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Workshops */}
              <button
                onClick={() => scrollToSection('workshops')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                {t('nav.workshops')}
              </button>
              
              {/* About */}
              <button
                onClick={() => scrollToSection('about')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                {t('nav.about')}
              </button>
              
              {/* Blog */}
              <button
                onClick={() => scrollToSection('blog')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
              >
                {t('nav.blog')}
              </button>
              
              <LanguageSwitcher />
              <button
                onClick={() => isLoggedIn ? setIsAccountOpen(true) : setIsAuthOpen(true)}
                className="relative p-2 text-cream hover:text-gold transition-colors"
                title={isLoggedIn ? customer?.first_name : t('auth.login', 'Sign In')}
              >
                <UserCircle className={`w-6 h-6 ${isLoggedIn ? 'text-gold' : ''}`} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-cream hover:text-gold transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-forest text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: cart + user right */}
            <div className="lg:hidden flex items-center space-x-1">
              <button
                onClick={() => isLoggedIn ? setIsAccountOpen(true) : setIsAuthOpen(true)}
                className="relative p-2 text-cream"
              >
                <UserCircle className={`w-5 h-5 ${isLoggedIn ? 'text-gold' : ''}`} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-cream"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-forest text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-forest border-r border-gold/30 z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20">
                <span className="font-cinzel font-bold text-gold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-cream/60 hover:text-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  {t('nav.home')}
                </button>

                {/* Shop - Simple Link (no submenu) */}
                <Link
                  to="/webshop"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  {t('nav.shop')}
                </Link>

                {/* DIY Kits - Link to homepage section */}
                <button
                  onClick={() => scrollToSection('diy-kits')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  DIY KITS
                </button>

                {/* For Business with expandable sub */}
                <div>
                  <button
                    onClick={() => setIsMobileBusinessOpen(!isMobileBusinessOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  >
                    {t('nav.forBusiness')}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isMobileBusinessOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileBusinessOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20"
                      >
                        <Link
                          to="/corporate"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center px-8 py-2.5 text-gold text-sm font-montserrat font-semibold transition-colors"
                        >
                          All Services
                        </Link>
                        {businessCategories.map((cat) => (
                          <Link
                            key={cat.path}
                            to={cat.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`w-full flex items-center py-2.5 text-sm font-montserrat transition-colors
                              ${cat.isHeader ? 'px-8 text-gold font-semibold' : 'px-10 text-cream/70 hover:text-gold'}`}
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => scrollToSection('workshops')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  {t('nav.workshops')}
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  {t('nav.about')}
                </button>

                <button
                  onClick={() => scrollToSection('blog')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                >
                  {t('nav.blog')}
                </button>
              </div>

              <div className="border-t border-gold/20 px-5 py-4 space-y-3">
                <LanguageSwitcher />
                <div className="text-cream/40 text-xs font-montserrat text-center">
                  Fairygarden For You
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </>
  );
};

export default Navigation;
