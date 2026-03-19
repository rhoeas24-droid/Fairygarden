import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// TEMPORARILY DISABLED - set to true to re-enable
const BANNER_ENABLED = false;

const messages = {
  en: {
    title: 'Under Construction',
    text: 'This website is still being built and updated. Please visit us again later or subscribe to our newsletter to be notified!',
    barText: 'This site is under construction. Subscribe to get notified!',
    subscribe: 'Subscribe',
    placeholder: 'Your email address',
    success: 'Subscribed! We\'ll keep you updated.',
    error: 'Already subscribed or invalid email.',
    dismiss: 'Close',
  },
  el: {
    title: 'Υπό Κατασκευή',
    text: 'Αυτή η ιστοσελίδα βρίσκεται ακόμα υπό κατασκευή. Επισκεφθείτε μας ξανά αργότερα ή εγγραφείτε στο newsletter μας!',
    barText: 'Η ιστοσελίδα είναι υπό κατασκευή. Εγγραφείτε για ενημέρωση!',
    subscribe: 'Εγγραφή',
    placeholder: 'Εμαιλ',
    success: 'Εγγραφή επιτυχής!',
    error: 'Ηδη εγγεγραμμένος.',
    dismiss: 'Κλείσιμο',
  },
};

const UnderConstructionBanner = () => {
  const [phase, setPhase] = useState('countdown');
  const [countdown, setCountdown] = useState(10);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const { i18n } = useTranslation();

  const barLang = messages[i18n.language] ? i18n.language : 'en';
  const barT = messages[barLang];

  // Check if banner is disabled or in preview environment
  const isPreview = typeof window !== 'undefined' && (
    window.location.hostname.includes('preview') ||
    window.location.hostname.includes('emergentagent.com') ||
    window.location.hostname === 'localhost'
  );

  useEffect(() => {
    // Skip banner if disabled or in preview environment
    if (!BANNER_ENABLED || isPreview) {
      setPhase('hidden');
      return;
    }
    const dismissed = sessionStorage.getItem('constructionDismissed');
    if (dismissed) setPhase('hidden');
  }, [isPreview]);

  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown <= 0) { setPhase('popup'); return; }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, phase]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://fairygarden4u.com/shop/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=mailpoet_subscribe&email=${encodeURIComponent(email)}`
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => {
        setPhase('hidden');
        sessionStorage.setItem('constructionDismissed', '1');
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  const dismiss = () => {
    if (phase === 'popup') setPhase('bar');
    else {
      setPhase('hidden');
      sessionStorage.setItem('constructionDismissed', '1');
      window.dispatchEvent(new CustomEvent('constructionDismissed'));
    }
  };

  if (phase === 'hidden') return null;

  return (
    <AnimatePresence mode="wait">
      {/* Countdown */}
      {phase === 'countdown' && (
        <motion.div
          key="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-forest/95 backdrop-blur-md flex items-center justify-center"
        >
          <div className="text-center px-6 max-w-lg">
            <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
            <div className="space-y-6 mb-8">
              {['en', 'el'].map(lang => (
                <div key={lang}>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-1">
                    {messages[lang].title}
                  </h2>
                  <p className="text-cream/75 font-montserrat text-xs sm:text-sm leading-relaxed">
                    {messages[lang].text}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle
                  cx="40" cy="40" r="36" fill="none" stroke="#C9A84C" strokeWidth="4"
                  strokeDasharray={226.2}
                  strokeDashoffset={226.2 * (1 - countdown / 10)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-cinzel font-bold text-gold">
                {countdown}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Popup */}
      {phase === 'popup' && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-forest border border-gold/40 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            data-testid="construction-popup"
          >
            <div className="p-5 sm:p-6 space-y-5">
              {/* 2 languages stacked - English and Greek only */}
              {['en', 'el'].map((lang, i) => (
                <div key={lang} className={i < 1 ? 'pb-4 border-b border-gold/15' : ''}>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-1">
                    {messages[lang].title}
                  </h3>
                  <p className="text-cream/75 font-montserrat text-xs sm:text-sm leading-relaxed">
                    {messages[lang].text}
                  </p>
                </div>
              ))}

              {/* Newsletter subscribe */}
              {status === 'success' ? (
                <p className="text-gold font-montserrat text-sm font-semibold text-center">{barT.success}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={barT.placeholder}
                    className="flex-1 px-3 py-2.5 bg-black/30 border border-gold/30 rounded-lg text-cream font-montserrat text-sm
                      placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    data-testid="construction-email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gold text-forest font-montserrat font-bold text-sm rounded-lg hover:bg-gold-light transition-colors flex items-center gap-1.5"
                    data-testid="construction-subscribe"
                  >
                    <Mail className="w-4 h-4" />
                    {barT.subscribe}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 font-montserrat text-xs">{barT.error}</p>
              )}

              {/* Close button */}
              <button
                onClick={dismiss}
                className="w-full py-2 text-cream/50 font-montserrat text-xs hover:text-cream/70 transition-colors flex items-center justify-center gap-1"
              >
                <X className="w-3 h-3" />
                {barT.dismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom bar */}
      {phase === 'bar' && (
        <motion.div
          key="bar"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[90] bg-forest/95 backdrop-blur-lg border-t-2 border-red-500/70 shadow-2xl"
          data-testid="construction-bar"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Clock className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-cream/80 font-montserrat text-xs sm:text-sm">
                {barT.barText}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {status === 'success' ? (
                <span className="text-gold font-montserrat text-xs font-semibold">{barT.success}</span>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={barT.placeholder}
                    className="w-36 sm:w-44 px-2.5 py-1.5 bg-black/30 border border-gold/30 rounded text-cream font-montserrat text-xs
                      placeholder:text-cream/30 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gold text-forest font-montserrat font-bold text-xs rounded hover:bg-gold-light transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <button onClick={dismiss} className="p-1 text-cream/40 hover:text-cream transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnderConstructionBanner;
