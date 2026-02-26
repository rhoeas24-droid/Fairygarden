import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-MBM9181SNV';

const GoogleAnalytics = () => {
  useEffect(() => {
    // Check if analytical cookies are accepted
    const checkAndLoadAnalytics = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) return;
        
        const parsed = JSON.parse(consent);
        
        // Only load if analytical cookies are accepted
        if (parsed.preferences?.analytical) {
          loadGoogleAnalytics();
        }
      } catch (e) {
        console.log('Cookie consent not found or invalid');
      }
    };

    const loadGoogleAnalytics = () => {
      // Check if already loaded
      if (window.gtag) return;

      // Load gtag.js script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true, // GDPR compliance
        cookie_flags: 'SameSite=None;Secure'
      });

      console.log('Google Analytics loaded');
    };

    // Check on mount
    checkAndLoadAnalytics();

    // Listen for cookie consent changes
    const handleStorageChange = (e) => {
      if (e.key === 'cookieConsent') {
        checkAndLoadAnalytics();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event (for same-tab updates)
    const handleConsentChange = () => {
      checkAndLoadAnalytics();
    };
    window.addEventListener('cookieConsentChanged', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
