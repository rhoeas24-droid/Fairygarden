import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast.error('Please accept the Privacy Policy to continue.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email: formData.email });
      toast.success(t('footer.subscribing'));
      setFormData({ email: '', privacyAccepted: false });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Email already subscribed!');
      } else {
        toast.error('Subscription failed. Please try again.');
      }
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrivacy = () => {
    scrollToSection('privacy-policy');
  };

  return (
    <footer className="relative bg-forest-dark text-cream">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/BG_TILE_FINAL.jpg)' }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <img
              src="/FullLogo_NoBuffer.png"
              alt="Fairygarden For You"
              className="w-32 h-32"
              data-testid="footer-logo"
            />
            <p className="font-playfair italic text-gold-light text-lg">
              {t('footer.tagline')}
            </p>
            <p className="font-montserrat text-cream/70 text-sm">
              Creating enchanted miniature worlds since 2020
            </p>
          </div>

          <div>
            <h3 className="font-cinzel font-bold text-gold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 font-montserrat text-sm">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-gold transition-colors" data-testid="footer-link-home">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-gold transition-colors" data-testid="footer-link-shop">
                  {t('nav.shop')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('diy-kits')} className="hover:text-gold transition-colors" data-testid="footer-link-diy">
                  {t('nav.diyKits')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('workshops')} className="hover:text-gold transition-colors" data-testid="footer-link-workshops">
                  {t('nav.workshops')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="hover:text-gold transition-colors" data-testid="footer-link-blog">
                  {t('nav.blog')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cinzel font-bold text-gold text-lg mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 font-montserrat text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>123 Enchanted Lane<br />Garden City, GC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span>contact@fairygarden4u.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cinzel font-bold text-gold text-lg mb-4">{t('footer.newsletter')}</h3>
            <p className="font-montserrat text-cream/70 text-sm mb-4">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full px-4 py-2 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm"
                data-testid="newsletter-email-input"
              />
              
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="footer-privacy"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-gold/40 bg-black/20 text-gold
                    focus:ring-gold focus:ring-offset-0"
                  data-testid="footer-privacy-checkbox"
                />
                <label htmlFor="footer-privacy" className="text-cream/90 font-montserrat text-xs">
                  I accept the{' '}
                  <button
                    type="button"
                    onClick={scrollToPrivacy}
                    className="text-gold hover:text-gold-light underline"
                  >
                    Privacy Policy
                  </button>{' '}
                  *
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                  text-[#3e2b08] font-bold text-sm uppercase rounded-full
                  shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),0_4px_8px_rgba(0,0,0,0.3)]
                  hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),0_6px_12px_rgba(201,168,76,0.3)]
                  transition-all duration-200"
                data-testid="newsletter-submit-button"
              >
                {isSubmitting ? t('footer.subscribing') : t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-montserrat text-cream/60 text-sm">
              © 2024 Fairygarden For You. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-gold transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="font-montserrat text-cream/50 text-xs">
              Newsletter: newsletter@fairygarden4u.com | Website: https://fairygarden4u.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;