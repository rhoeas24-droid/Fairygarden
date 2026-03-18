import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import elTranslations from './locales/el.json';

// Get saved language preference from localStorage
const getSavedLanguage = () => {
  try {
    return localStorage.getItem('fairygarden_language');
  } catch {
    return null;
  }
};

// Default language: English
const DEFAULT_LANGUAGE = 'en';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      el: { translation: elTranslations }
    },
    lng: getSavedLanguage() || DEFAULT_LANGUAGE,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Export function to save language when user manually changes it
export const setUserLanguage = (lang) => {
  try {
    localStorage.setItem('fairygarden_language', lang);
  } catch {
    // localStorage not available
  }
  i18n.changeLanguage(lang);
};

export default i18n;
