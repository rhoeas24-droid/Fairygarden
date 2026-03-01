import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import huTranslations from './locales/hu.json';
import elTranslations from './locales/el.json';
import itTranslations from './locales/it.json';

// Country code to language mapping
const countryToLanguage = {
  // Greek
  'GR': 'el', // Greece
  'CY': 'el', // Cyprus
  
  // Hungarian
  'HU': 'hu', // Hungary
  
  // Italian
  'IT': 'it', // Italy
  'MT': 'it', // Malta
  'VA': 'it', // Vatican
  'SM': 'it', // San Marino
};

// Get saved language preference from localStorage
const getSavedLanguage = () => {
  try {
    return localStorage.getItem('fairygarden_language');
  } catch {
    return null;
  }
};

// Save language preference to localStorage
const saveLanguage = (lang) => {
  try {
    localStorage.setItem('fairygarden_language', lang);
  } catch {
    // localStorage not available
  }
};

// Detect language based on IP geolocation
const detectLanguageByIP = async () => {
  // Check if user has manually selected a language
  const savedLang = getSavedLanguage();
  if (savedLang) {
    return savedLang;
  }
  
  try {
    // Use ip-api.com for free geolocation (no API key needed)
    const response = await fetch('http://ip-api.com/json/?fields=countryCode', {
      timeout: 3000
    });
    
    if (response.ok) {
      const data = await response.json();
      const countryCode = data.countryCode;
      const detectedLang = countryToLanguage[countryCode] || 'en';
      
      console.log(`Detected country: ${countryCode}, setting language: ${detectedLang}`);
      return detectedLang;
    }
  } catch (error) {
    console.log('IP geolocation failed, using default language');
  }
  
  return 'en'; // Default to English
};

// Initialize i18n with default language
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hu: { translation: huTranslations },
      el: { translation: elTranslations },
      it: { translation: itTranslations }
    },
    lng: getSavedLanguage() || 'en', // Use saved language or default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Detect and set language based on IP (async, runs after init)
detectLanguageByIP().then((detectedLang) => {
  const savedLang = getSavedLanguage();
  
  // Only change language if user hasn't manually selected one
  if (!savedLang && detectedLang !== i18n.language) {
    i18n.changeLanguage(detectedLang);
  }
});

// Export function to save language when user manually changes it
export const setUserLanguage = (lang) => {
  saveLanguage(lang);
  i18n.changeLanguage(lang);
};

export default i18n;
