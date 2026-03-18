import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn, customer } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    // Handle corporate page navigation
    if (id === 'for-business') {
      navigate('/corporate');
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/#' + id);
      setIsMobileMenuOpen(false);
      setIsShopDropdownOpen(false);
      setIsMobileShopOpen(false);
      return;
    }
    
    if (id.startsWith('shop-')) {
      window.dispatchEvent(new CustomEvent('expandWebshop', { detail: { targetId: id } }));
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
    setIsMobileShopOpen(false);
  };

  const shopCategories = [
    { label: 'Ready Florariums', id: 'gallery' },
    { label: 'DIY Kits', id: 'diy-kits' },
    { label: 'Plants', id: 'plants' },
    { label: 'Substrates & Bugs', id: 'substrates-bugs' },
    { label: 'Bottles, Jars & Tools', id: 'shop-bottles' },
    { label: 'Decorations & Terrascaping', id: 'shop-decorations' },
  ];

  const businessCategories = [
    { label: 'Team Retreat', path: '/corporate/experiences/retreat' },
    { label: 'Team Building', path: '/corporate/experiences/team-building' },
    { label: 'Branded Florariums', path: '/corporate/solutions/branded-florariums' },
    { label: 'Office Decor', path: '/corporate/solutions/office-decor' },
    { label: 'Event Rental', path: '/corporate/solutions/event-decor' },
    { label: 'Partner Gifts', path: '/corporate/solutions/partner-gifts' },
  ];

  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isMobileBusinessOpen, setIsMobileBusinessOpen] = useState(false);

  const navLinks = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.diyKits'), id: 'diy-kits' },
    { label: t('nav.forBusiness'), id: 'for-business', hasDropdown: true },
    { label: t('nav.workshops'), id: 'workshops' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.blog'), id: 'blog' }
  ];

  return (
    <>
      {/* Top Bar */}
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
            {/* Mobile: hamburger left */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-cream p-2 hover:text-gold transition-colors"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo center on mobile, left on desktop */}
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
                  onClick={() => scrollToSection('our-shop')}
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
              
              {/* DIY Kits */}
              <button
                onClick={() => scrollToSection('diy-kits')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                data-testid="nav-link-diy-kits"
              >
                {t('nav.diyKits')}
              </button>
              
              {/* For Business Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <button
                  onClick={() => navigate('/corporate')}
                  className="flex items-center gap-1 text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                  data-testid="nav-link-business"
                >
                  {t('nav.forBusiness')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isBusinessDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isBusinessDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-forest/95 backdrop-blur-lg border border-gold/30 rounded-lg shadow-xl overflow-hidden"
                    >
                      <Link
                        to="/corporate"
                        onClick={() => setIsBusinessDropdownOpen(false)}
                        className="block w-full text-left px-4 py-3 font-montserrat text-sm font-semibold transition-colors text-gold hover:bg-gold/10 border-b border-gold/20"
                      >
                        All Services
                      </Link>
                      {businessCategories.map((category, index) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          onClick={() => setIsBusinessDropdownOpen(false)}
                          className={`block w-full text-left px-4 py-3 font-montserrat text-sm transition-colors text-cream hover:text-gold hover:bg-gold/10 ${index !== businessCategories.length - 1 ? 'border-b border-gold/10' : ''}`}
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
                data-testid="nav-link-workshops"
              >
                {t('nav.workshops')}
              </button>
              
              {/* About */}
              <button
                onClick={() => scrollToSection('about')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                data-testid="nav-link-about"
              >
                {t('nav.about')}
              </button>
              
              {/* Blog */}
              <button
                onClick={() => scrollToSection('blog')}
                className="text-cream hover:text-gold transition-colors font-montserrat text-sm font-semibold uppercase tracking-wider px-2"
                data-testid="nav-link-blog"
              >
                {t('nav.blog')}
              </button>
              
              <LanguageSwitcher />
              <button
                onClick={() => isLoggedIn ? setIsAccountOpen(true) : setIsAuthOpen(true)}
                className="relative p-2 text-cream hover:text-gold transition-colors"
                data-testid="user-button"
                title={isLoggedIn ? customer?.first_name : t('auth.login', 'Sign In')}
              >
                <UserCircle className={`w-6 h-6 ${isLoggedIn ? 'text-gold' : ''}`} />
              </button>
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

            {/* Mobile: cart + user right */}
            <div className="lg:hidden flex items-center space-x-1">
              <button
                onClick={() => isLoggedIn ? setIsAccountOpen(true) : setIsAuthOpen(true)}
                className="relative p-2 text-cream"
                data-testid="mobile-user-button"
              >
                <UserCircle className={`w-5 h-5 ${isLoggedIn ? 'text-gold' : ''}`} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-cream"
                data-testid="mobile-cart-button"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-forest border-r border-gold/30 z-50 lg:hidden flex flex-col"
              data-testid="mobile-drawer"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20">
                <span className="font-cinzel font-bold text-gold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-cream/60 hover:text-gold transition-colors"
                  data-testid="mobile-drawer-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-2">
                {/* Home */}
                <button
                  onClick={() => scrollToSection('hero')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  data-testid="mobile-nav-home"
                >
                  {t('nav.home')}
                </button>

                {/* Shop with expandable sub */}
                <div>
                  <button
                    onClick={() => {
                      if (isMobileShopOpen) {
                        // If already open, navigate to Our Shop
                        scrollToSection('our-shop');
                      } else {
                        setIsMobileShopOpen(true);
                      }
                    }}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                    data-testid="mobile-nav-shop"
                  >
                    {t('nav.shop')}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isMobileShopOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileShopOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20"
                      >
                        {shopCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => scrollToSection(cat.id)}
                            className="w-full flex items-center px-8 py-2.5 text-cream/70 hover:text-gold text-sm font-montserrat transition-colors"
                          >
                            {cat.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* DIY Kits */}
                <button
                  onClick={() => scrollToSection('diy-kits')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  data-testid="mobile-nav-diy-kits"
                >
                  {t('nav.diyKits')}
                </button>

                {/* For Business with expandable sub */}
                <div>
                  <button
                    onClick={() => {
                      if (isMobileBusinessOpen) {
                        navigate('/corporate');
                        setIsMobileMenuOpen(false);
                      } else {
                        setIsMobileBusinessOpen(true);
                      }
                    }}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                    data-testid="mobile-nav-business"
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
                            className="w-full flex items-center px-8 py-2.5 text-cream/70 hover:text-gold text-sm font-montserrat transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Workshops */}
                <button
                  onClick={() => scrollToSection('workshops')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  data-testid="mobile-nav-workshops"
                >
                  {t('nav.workshops')}
                </button>

                {/* About */}
                <button
                  onClick={() => scrollToSection('about')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  data-testid="mobile-nav-about"
                >
                  {t('nav.about')}
                </button>

                {/* Blog */}
                <button
                  onClick={() => scrollToSection('blog')}
                  className="w-full flex items-center px-5 py-3.5 text-cream hover:text-gold hover:bg-gold/5 transition-all font-montserrat text-sm font-semibold uppercase tracking-wider"
                  data-testid="mobile-nav-blog"
                >
                  {t('nav.blog')}
                </button>
              </div>

              {/* Drawer footer */}
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
