import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be changed
    functional: false,
    analytical: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        if (saved.preferences) {
          setPreferences(saved.preferences);
        }
      } catch (e) {
        // Legacy format - just accepted/declined
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytical: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'accepted',
      preferences: allAccepted,
      timestamp: new Date().toISOString()
    }));
    setPreferences(allAccepted);
    setIsVisible(false);
    // Dispatch event for Google Analytics
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'custom',
      preferences: preferences,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
    // Dispatch event for Google Analytics
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytical: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'declined',
      preferences: onlyNecessary,
      timestamp: new Date().toISOString()
    }));
    setPreferences(onlyNecessary);
    setIsVisible(false);
    // Dispatch event for Google Analytics
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
                  
                  {/* Cookie Preferences Details */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="space-y-3 py-4 border-t border-b border-gold/20">
                          {/* Necessary Cookies */}
                          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-montserrat font-semibold text-cream text-sm">
                                {t('cookies.necessary')}
                              </h4>
                              <p className="text-cream/60 text-xs mt-1">
                                {t('cookies.necessaryDesc')}
                              </p>
                            </div>
                            <div className="ml-4">
                              <div className="w-12 h-6 bg-gold/30 rounded-full flex items-center justify-end px-1 cursor-not-allowed">
                                <div className="w-4 h-4 bg-gold rounded-full" />
                              </div>
                              <span className="text-xs text-cream/50 mt-1 block text-center">
                                {t('cookies.required')}
                              </span>
                            </div>
                          </div>

                          {/* Functional Cookies */}
                          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-montserrat font-semibold text-cream text-sm">
                                {t('cookies.functional')}
                              </h4>
                              <p className="text-cream/60 text-xs mt-1">
                                {t('cookies.functionalDesc')}
                              </p>
                            </div>
                            <button
                              onClick={() => togglePreference('functional')}
                              className="ml-4"
                              data-testid="cookie-toggle-functional"
                            >
                              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${
                                preferences.functional ? 'bg-gold/50 justify-end' : 'bg-cream/20 justify-start'
                              }`}>
                                <div className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                                  preferences.functional ? 'bg-gold' : 'bg-cream/50'
                                }`} />
                              </div>
                            </button>
                          </div>

                          {/* Analytical Cookies */}
                          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-montserrat font-semibold text-cream text-sm">
                                {t('cookies.analytical')}
                              </h4>
                              <p className="text-cream/60 text-xs mt-1">
                                {t('cookies.analyticalDesc')}
                              </p>
                            </div>
                            <button
                              onClick={() => togglePreference('analytical')}
                              className="ml-4"
                              data-testid="cookie-toggle-analytical"
                            >
                              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${
                                preferences.analytical ? 'bg-gold/50 justify-end' : 'bg-cream/20 justify-start'
                              }`}>
                                <div className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                                  preferences.analytical ? 'bg-gold' : 'bg-cream/50'
                                }`} />
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                        text-[#3e2b08] font-bold text-sm uppercase rounded-full
                        shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),0_4px_8px_rgba(0,0,0,0.3)]
                        hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),0_6px_12px_rgba(201,168,76,0.3)]
                        transition-all duration-200"
                      data-testid="cookie-accept-button"
                    >
                      {t('cookies.acceptAll')}
                    </button>
                    
                    {showDetails ? (
                      <button
                        onClick={handleSavePreferences}
                        className="px-6 py-2.5 bg-gold/20 border border-gold/50 text-gold
                          font-montserrat font-semibold text-sm uppercase rounded-full
                          hover:bg-gold/30 transition-all duration-200"
                        data-testid="cookie-save-button"
                      >
                        {t('cookies.savePreferences')}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-6 py-2.5 bg-transparent border border-gold/50 text-cream
                          font-montserrat font-semibold text-sm uppercase rounded-full
                          hover:bg-gold/10 hover:border-gold transition-all duration-200
                          flex items-center justify-center gap-2"
                        data-testid="cookie-settings-button"
                      >
                        <Settings className="w-4 h-4" />
                        {t('cookies.customize')}
                      </button>
                    )}
                    
                    <button
                      onClick={handleDeclineAll}
                      className="px-6 py-2.5 bg-transparent border border-cream/30 text-cream/70
                        font-montserrat font-semibold text-sm uppercase rounded-full
                        hover:bg-cream/10 hover:text-cream transition-all duration-200"
                      data-testid="cookie-decline-button"
                    >
                      {t('cookies.declineOptional')}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleDeclineAll}
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
