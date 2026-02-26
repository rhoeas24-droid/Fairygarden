import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-cream hover:text-gold transition-colors p-2"
        data-testid="language-switcher-button"
      >
        <Globe className="w-5 h-5" />
        <span className="text-2xl">{currentLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-52 bg-forest/95 backdrop-blur-md border border-gold/30 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left font-montserrat text-sm transition-colors
                    ${i18n.language === language.code ? 'bg-gold/20 text-gold' : 'text-cream hover:bg-gold/10 hover:text-gold'}`}
                  data-testid={`language-option-${language.code}`}
                >
                  <span className="text-3xl">{language.flag}</span>
                  <span className="text-base">{language.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
