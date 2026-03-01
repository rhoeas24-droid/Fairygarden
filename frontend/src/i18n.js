import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import huTranslations from './locales/hu.json';
import elTranslations from './locales/el.json';
import itTranslations from './locales/it.json';

// Get saved language preference from localStorage
const getSavedLanguage = () => {
  try {
    return localStorage.getItem('fairygarden_language');
  } catch {
    return null;
  }
};

// Default language: Hungarian
const DEFAULT_LANGUAGE = 'hu';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hu: { translation: huTranslations },
      el: { translation: elTranslations },
      it: { translation: itTranslations }
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
