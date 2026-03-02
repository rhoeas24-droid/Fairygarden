import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import GoldButton from './GoldButton';
import AuthModal from './AuthModal';
import { toast } from 'sonner';
import axios from 'axios';
import CheckoutComponents from './CheckoutParts';
const { StepIndicator, AuthPreStep, AddressStep, ShippingStep, SummaryStep, BankTransferResult } = CheckoutComponents;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { isLoggedIn, customer } = useAuth();
  const { t } = useTranslation();
  const [step, setStep] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [orderResult, setOrderResult] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [form, setForm] = useState({
    billing_first_name: '', billing_last_name: '', billing_email: '', billing_phone: '',
    billing_address_1: '', billing_city: '', billing_postcode: '', billing_country: '',
    same_as_billing: true,
    shipping_first_name: '', shipping_last_name: '',
    shipping_address_1: '', shipping_city: '', shipping_postcode: '', shipping_country: '',
    shipping_method: 'flat_rate', order_notes: '',
    accept_terms: false, accept_privacy: false, subscribe_newsletter: false,
    payment_method: 'online',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(isLoggedIn ? 0 : -1);
      setOrderResult(null);
      fetchShippingMethods();
      if (isLoggedIn && customer) {
        setForm(prev => ({
          ...prev,
          billing_first_name: customer.billing?.first_name || customer.first_name || '',
          billing_last_name: customer.billing?.last_name || customer.last_name || '',
          billing_email: customer.billing?.email || customer.email || '',
          billing_phone: customer.billing?.phone || '',
          billing_address_1: customer.billing?.address_1 || '',
          billing_city: customer.billing?.city || '',
          billing_postcode: customer.billing?.postcode || '',
          billing_country: customer.billing?.country || '',
        }));
      }
    }
  }, [isOpen, isLoggedIn, customer]);

  const fetchShippingMethods = async () => {
    try { const res = await axios.get(`${API}/wc/shipping-methods`); setShippingMethods(res.data); } catch {}
  };

  const update = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const selectedShipping = shippingMethods.find(m => m.id === form.shipping_method);
  const shippingCost = selectedShipping?.cost || 0;
  const grandTotal = cartTotal + shippingCost;
  const steps = [t('checkout.stepAddress', 'Address'), t('checkout.stepShipping', 'Shipping'), t('checkout.stepSummary', 'Summary')];
  const canProceedStep0 = form.billing_first_name && form.billing_last_name && form.billing_email && form.billing_address_1 && form.billing_city && form.billing_postcode && form.billing_country;
  const canSubmit = form.accept_terms && form.accept_privacy;

  const handleSubmit = async () => {
    if (!canSubmit) { toast.error(t('checkout.acceptRequired')); return; }
    setIsSubmitting(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.post(`${API}/wc/checkout`, {
        session_id: sessionId, customer_id: customer?.customer_id || null,
        billing_first_name: form.billing_first_name, billing_last_name: form.billing_last_name,
        billing_email: form.billing_email, billing_phone: form.billing_phone,
        billing_address_1: form.billing_address_1, billing_city: form.billing_city,
        billing_postcode: form.billing_postcode, billing_country: form.billing_country,
        same_as_billing: form.same_as_billing,
        shipping_first_name: form.same_as_billing ? '' : form.shipping_first_name,
        shipping_last_name: form.same_as_billing ? '' : form.shipping_last_name,
        shipping_address_1: form.same_as_billing ? '' : form.shipping_address_1,
        shipping_city: form.same_as_billing ? '' : form.shipping_city,
        shipping_postcode: form.same_as_billing ? '' : form.shipping_postcode,
        shipping_country: form.same_as_billing ? '' : form.shipping_country,
        shipping_method: form.shipping_method, order_notes: form.order_notes,
        subscribe_newsletter: form.subscribe_newsletter, payment_method: form.payment_method,
      });
      if (response.data.success) {
        setOrderResult(response.data);
        await clearCart();
        if (response.data.payment_method !== 'bacs' && response.data.checkout_url) {
          toast.success(t('checkout.orderCreated'));
          window.open(response.data.checkout_url, '_blank');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || t('checkout.error'));
    } finally { setIsSubmitting(false); }
  };

  const modalClass = "fixed inset-0 z-50 flex items-center justify-center pointer-events-none";
  const modalInner = "pointer-events-auto w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden";

  if (orderResult && orderResult.payment_method === 'bacs') {
    return (
      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className={modalClass} data-testid="checkout-bank-transfer">
              <div className="p-5 border-b border-gold/20 flex justify-between items-center">
                <h2 className="text-xl font-cinzel font-bold text-gold">{t('checkout.orderConfirmed')}</h2>
                <button onClick={onClose} className="text-cream/60 hover:text-gold"><X className="w-6 h-6" /></button>
              </div>
              <BankTransferResult orderResult={orderResult} onClose={onClose} t={t} />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    );
  }

  return (
    <React.Fragment>
      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={modalClass} data-testid="checkout-modal">
              <div className="p-5 border-b border-gold/20 flex items-center justify-between shrink-0">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold" data-testid="checkout-title">{t('checkout.title')}</h2>
                <button onClick={onClose} className="text-cream/60 hover:text-gold transition-colors" data-testid="checkout-close"><X className="w-6 h-6" /></button>
              </div>
              {step >= 0 && <StepIndicator steps={steps} currentStep={step} />}
              <div className="flex-1 overflow-y-auto p-5">
                {step === -1 && <AuthPreStep t={t} onSignIn={() => { setShowAuthModal(true); setAuthMode('login'); }} onRegister={() => { setShowAuthModal(true); setAuthMode('register'); }} onGuest={() => setStep(0)} />}
                {step === 0 && <AddressStep form={form} update={update} t={t} />}
                {step === 1 && <ShippingStep form={form} update={update} shippingMethods={shippingMethods} t={t} />}
                {step === 2 && <SummaryStep cart={cart} cartTotal={cartTotal} shippingCost={shippingCost} grandTotal={grandTotal} selectedShipping={selectedShipping} form={form} update={update} t={t} />}
              </div>
              {step >= 0 && (
                <div className="p-4 border-t border-gold/20 shrink-0 flex items-center gap-3">
                  {step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-4 py-2.5 text-cream/70 hover:text-gold font-montserrat text-sm transition-colors" data-testid="checkout-back"><ChevronLeft className="w-4 h-4" /> {t('checkout.back')}</button>}
                  <div className="flex-1" />
                  {step < 2 ? (
                    <GoldButton onClick={() => { if (step === 0 && !canProceedStep0) { toast.error(t('checkout.fillRequired')); return; } setStep(step + 1); }} className="px-6" dataTestId="checkout-next">
                      <span className="flex items-center gap-1">{t('checkout.next')} <ChevronRight className="w-4 h-4" /></span>
                    </GoldButton>
                  ) : (
                    <GoldButton onClick={handleSubmit} dataTestId="checkout-submit" disabled={isSubmitting || !canSubmit} className={`px-6 ${!canSubmit ? 'opacity-50' : ''}`}>
                      {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> {t('checkout.processing')}</span> : <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {t('checkout.placeOrder')}</span>}
                    </GoldButton>
                  )}
                </div>
              )}
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLoginSuccess={() => { setShowAuthModal(false); setStep(0); }} defaultMode={authMode} />
    </React.Fragment>
  );
};

export default CheckoutModal;
