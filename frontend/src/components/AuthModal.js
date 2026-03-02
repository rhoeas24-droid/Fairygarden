import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import GoldButton from './GoldButton';
import { toast } from 'sonner';

const AuthModal = ({ isOpen, onClose, onLoginSuccess, defaultMode }) => {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const [mode, setMode] = useState(defaultMode || 'login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '', password: '', password2: '', firstName: '', lastName: '',
  });

  useEffect(() => {
    if (isOpen) setMode(defaultMode || 'login');
  }, [isOpen, defaultMode]);

  const update = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success(t('auth.loginSuccess', 'Welcome back!'));
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.loginError', 'Invalid email or password.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      toast.error(t('auth.passwordMismatch', 'Passwords do not match.'));
      return;
    }
    if (form.password.length < 8) {
      toast.error(t('auth.passwordTooShort', 'Password must be at least 8 characters.'));
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.password, form.firstName, form.lastName);
      toast.success(t('auth.registerSuccess', 'Account created! You can now log in.'));
      setMode('login');
      setForm(prev => ({ ...prev, password: '', password2: '' }));
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.registerError', 'Registration failed.'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setForm({ email: '', password: '', password2: '', firstName: '', lastName: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md
              bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
            data-testid="auth-modal">
            <div className="p-5 border-b border-gold/20 flex justify-between items-center">
              <h2 className="text-xl font-cinzel font-bold text-gold" data-testid="auth-title">
                {mode === 'login' ? t('auth.login', 'Sign In') : t('auth.register', 'Create Account')}
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="p-5 space-y-4">
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('checkout.firstName', 'First Name')} *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input data-testid="auth-first-name" value={form.firstName} onChange={update('firstName')} required
                        className="w-full pl-10 pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                          focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('checkout.lastName', 'Last Name')} *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                      <input data-testid="auth-last-name" value={form.lastName} onChange={update('lastName')} required
                        className="w-full pl-10 pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                          focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-cream/70 font-montserrat text-xs mb-1.5">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input data-testid="auth-email" type="email" value={form.email} onChange={update('email')} required
                    className="w-full pl-10 pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                      focus:outline-none focus:border-gold/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('auth.password', 'Password')} *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input data-testid="auth-password" type={showPassword ? 'text' : 'password'}
                    value={form.password} onChange={update('password')} required
                    className="w-full pl-10 pr-10 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                      focus:outline-none focus:border-gold/50 transition-colors" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {mode === 'register' && (
                <div>
                  <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('auth.confirmPassword', 'Confirm Password')} *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                    <input data-testid="auth-password2" type={showPassword ? 'text' : 'password'}
                      value={form.password2} onChange={update('password2')} required
                      className="w-full pl-10 pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                        focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                </div>
              )}
              <GoldButton className="w-full" dataTestId="auth-submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /></span>
                ) : (
                  mode === 'login' ? t('auth.login', 'Sign In') : t('auth.register', 'Create Account')
                )}
              </GoldButton>
              <p className="text-center text-cream/50 font-montserrat text-xs">
                {mode === 'login' ? t('auth.noAccount', "Don't have an account?") : t('auth.haveAccount', 'Already have an account?')}{' '}
                <button type="button" onClick={switchMode} className="text-gold underline hover:text-gold-light" data-testid="auth-switch">
                  {mode === 'login' ? t('auth.register', 'Create Account') : t('auth.login', 'Sign In')}
                </button>
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
