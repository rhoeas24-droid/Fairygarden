import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay before showing banner
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const scrollToPrivacy = () => {
    const element = document.getElementById('privacy-policy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          data-testid="cookie-consent-banner"
        >
          <div className="max-w-4xl mx-auto bg-forest-dark/95 backdrop-blur-lg border border-gold/30 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-gold/20 items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-gold" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-cinzel font-bold text-gold mb-2">
                    {t('cookies.title')}
                  </h3>
                  <p className="text-cream/80 font-montserrat text-sm leading-relaxed mb-4">
                    {t('cookies.message')}{' '}
                    <button
                      onClick={scrollToPrivacy}
                      className="text-gold hover:text-gold-light underline"
                    >
                      {t('cookies.privacyLink')}
                    </button>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAccept}
                      className="px-6 py-2.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                        text-[#3e2b08] font-bold text-sm uppercase rounded-full
                        shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),0_4px_8px_rgba(0,0,0,0.3)]
                        hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),0_6px_12px_rgba(201,168,76,0.3)]
                        transition-all duration-200"
                      data-testid="cookie-accept-button"
                    >
                      {t('cookies.accept')}
                    </button>
                    
                    <button
                      onClick={handleDecline}
                      className="px-6 py-2.5 bg-transparent border border-gold/50 text-cream
                        font-montserrat font-semibold text-sm uppercase rounded-full
                        hover:bg-gold/10 hover:border-gold transition-all duration-200"
                      data-testid="cookie-decline-button"
                    >
                      {t('cookies.decline')}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleDecline}
                  className="text-cream/60 hover:text-gold transition-colors p-1"
                  aria-label="Close"
                  data-testid="cookie-close-button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
