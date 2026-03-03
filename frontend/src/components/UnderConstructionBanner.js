import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Clock, ChevronDown } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const messages = {
  en: {
    title: 'Under Construction',
    text: 'This website is still being built and updated. Please visit us again later or subscribe to our newsletter to be notified!',
    subscribe: 'Subscribe',
    placeholder: 'Your email address',
    success: 'Subscribed! We\'ll keep you updated.',
    error: 'Already subscribed or invalid email.',
    dismiss: 'Got it',
  },
  el: {
    title: '\u03A5\u03C0\u03CC \u039A\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE',
    text: '\u0391\u03C5\u03C4\u03AE \u03B7 \u03B9\u03C3\u03C4\u03BF\u03C3\u03B5\u03BB\u03AF\u03B4\u03B1 \u03B2\u03C1\u03AF\u03C3\u03BA\u03B5\u03C4\u03B1\u03B9 \u03B1\u03BA\u03CC\u03BC\u03B1 \u03C5\u03C0\u03CC \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE. \u0395\u03C0\u03B9\u03C3\u03BA\u03B5\u03C6\u03B8\u03B5\u03AF\u03C4\u03B5 \u03BC\u03B1\u03C2 \u03BE\u03B1\u03BD\u03AC \u03B1\u03C1\u03B3\u03CC\u03C4\u03B5\u03C1\u03B1 \u03AE \u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03B5\u03AF\u03C4\u03B5 \u03C3\u03C4\u03BF newsletter \u03BC\u03B1\u03C2!',
    subscribe: '\u0395\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE',
    placeholder: '\u0395\u03BC\u03B1\u03B9\u03BB',
    success: '\u0395\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03AE\u03C2!',
    error: '\u0397\u03B4\u03B7 \u03B5\u03B3\u03B3\u03B5\u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03BD\u03BF\u03C2.',
    dismiss: '\u0395\u03BD\u03C4\u03AC\u03BE\u03B5\u03B9',
  },
  it: {
    title: 'In Costruzione',
    text: 'Questo sito \u00E8 ancora in fase di costruzione e aggiornamento. Torna a trovarci pi\u00F9 tardi o iscriviti alla nostra newsletter!',
    subscribe: 'Iscriviti',
    placeholder: 'La tua email',
    success: 'Iscritto! Ti terremo aggiornato.',
    error: 'Gi\u00E0 iscritto o email non valida.',
    dismiss: 'OK',
  },
};

const UnderConstructionBanner = () => {
  const [phase, setPhase] = useState('countdown'); // countdown | popup | bar | hidden
  const [countdown, setCountdown] = useState(10);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // success | error
  const [lang, setLang] = useState('en');

  const t = messages[lang] || messages.en;

  // Check if already dismissed
  useEffect(() => {
    const dismissed = sessionStorage.getItem('constructionDismissed');
    if (dismissed) {
      setPhase('hidden');
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown <= 0) {
      setPhase('popup');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, phase]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
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
    if (phase === 'popup') {
      setPhase('bar');
    } else {
      setPhase('hidden');
      sessionStorage.setItem('constructionDismissed', '1');
    }
  };

  if (phase === 'hidden') return null;

  // Language selector pills
  const LangPills = ({ small }) => (
    <div className={`flex gap-1 ${small ? '' : 'justify-center mb-4'}`}>
      {['en', 'el', 'it'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 rounded text-xs font-montserrat font-semibold uppercase transition-all ${
            lang === l ? 'bg-gold text-forest' : 'bg-white/10 text-cream/60 hover:text-cream'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {/* Countdown overlay */}
      {phase === 'countdown' && (
        <motion.div
          key="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-forest/95 backdrop-blur-md flex items-center justify-center"
        >
          <div className="text-center px-6">
            <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold mb-3">
              {t.title}
            </h2>
            <p className="text-cream/80 font-montserrat text-sm sm:text-base max-w-md mx-auto mb-8">
              {t.text}
            </p>
            <LangPills />
            <div className="relative w-20 h-20 mx-auto mt-6">
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
            <button
              onClick={() => setPhase('popup')}
              className="mt-6 text-cream/40 text-xs font-montserrat hover:text-cream/60 transition-colors"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}

      {/* Popup modal */}
      {phase === 'popup' && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-forest border border-gold/40 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
            data-testid="construction-popup"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-cinzel font-bold text-gold">{t.title}</h2>
                <button onClick={dismiss} className="text-cream/40 hover:text-cream transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <LangPills />
              <p className="text-cream/80 font-montserrat text-sm leading-relaxed">{t.text}</p>

              {status === 'success' ? (
                <p className="text-gold font-montserrat text-sm font-semibold">{t.success}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 px-3 py-2.5 bg-black/30 border border-gold/30 rounded-lg text-cream font-montserrat text-sm
                      placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    data-testid="construction-email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gold text-forest font-montserrat font-bold text-sm rounded-lg hover:bg-gold-light transition-colors"
                    data-testid="construction-subscribe"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 font-montserrat text-xs">{t.error}</p>
              )}

              <button
                onClick={dismiss}
                className="w-full py-2 text-cream/50 font-montserrat text-xs hover:text-cream/70 transition-colors"
              >
                {t.dismiss} <ChevronDown className="w-3 h-3 inline" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom floating bar */}
      {phase === 'bar' && (
        <motion.div
          key="bar"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[90] bg-forest/95 backdrop-blur-lg border-t border-gold/30 shadow-2xl"
          data-testid="construction-bar"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <p className="text-cream/80 font-montserrat text-xs sm:text-sm">
                {t.text}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LangPills small />
              {status === 'success' ? (
                <span className="text-gold font-montserrat text-xs font-semibold">{t.success}</span>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.placeholder}
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
