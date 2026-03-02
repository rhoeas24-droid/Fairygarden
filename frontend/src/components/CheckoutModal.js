import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, MapPin, User, Mail, Phone, FileText, Truck, Check, ChevronRight, ChevronLeft, ShieldCheck, LogIn, UserPlus, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import GoldButton from './GoldButton';
import AuthModal from './AuthModal';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InputField = ({ icon: Icon, label, testId, ...props }) => (
  <div>
    <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />}
      <input
        data-testid={testId}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg
          text-cream font-montserrat text-sm placeholder:text-cream/30
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors`}
        {...props}
      />
    </div>
  </div>
);

const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center gap-1 px-5 py-3 border-b border-gold/10">
    {steps.map((label, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-1.5">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
            ${i < currentStep ? 'bg-gold text-forest' : i === currentStep ? 'bg-gold/30 text-gold border border-gold' : 'bg-forest/40 text-cream/40 border border-cream/20'}`}>
            {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-xs font-montserrat hidden sm:inline ${i === currentStep ? 'text-gold font-semibold' : 'text-cream/40'}`}>{label}</span>
        </div>
        {i < steps.length - 1 && <div className={`w-6 h-px ${i < currentStep ? 'bg-gold' : 'bg-cream/20'}`} />}
      </React.Fragment>
    ))}
  </div>
);

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
    shipping_method: 'flat_rate',
    order_notes: '',
    accept_terms: false,
    accept_privacy: false,
    subscribe_newsletter: false,
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
    try {
      const res = await axios.get(`${API}/wc/shipping-methods`);
      setShippingMethods(res.data);
    } catch { /* fallback handled by empty array */ }
  };

  const update = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const selectedShipping = shippingMethods.find(m => m.id === form.shipping_method);
  const shippingCost = selectedShipping?.cost || 0;
  const grandTotal = cartTotal + shippingCost;

  const steps = [
    t('checkout.stepAddress', 'Address'),
    t('checkout.stepShipping', 'Shipping'),
    t('checkout.stepSummary', 'Summary'),
  ];

  const canProceedStep0 = form.billing_first_name && form.billing_last_name && form.billing_email
    && form.billing_address_1 && form.billing_city && form.billing_postcode && form.billing_country;

  const canSubmit = form.accept_terms && form.accept_privacy;

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error(t('checkout.acceptRequired', 'Please accept Terms & Conditions and Privacy Policy.'));
      return;
    }
    setIsSubmitting(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const payload = {
        session_id: sessionId,
        customer_id: customer?.customer_id || null,
        billing_first_name: form.billing_first_name,
        billing_last_name: form.billing_last_name,
        billing_email: form.billing_email,
        billing_phone: form.billing_phone,
        billing_address_1: form.billing_address_1,
        billing_city: form.billing_city,
        billing_postcode: form.billing_postcode,
        billing_country: form.billing_country,
        same_as_billing: form.same_as_billing,
        shipping_first_name: form.same_as_billing ? '' : form.shipping_first_name,
        shipping_last_name: form.same_as_billing ? '' : form.shipping_last_name,
        shipping_address_1: form.same_as_billing ? '' : form.shipping_address_1,
        shipping_city: form.same_as_billing ? '' : form.shipping_city,
        shipping_postcode: form.same_as_billing ? '' : form.shipping_postcode,
        shipping_country: form.same_as_billing ? '' : form.shipping_country,
        shipping_method: form.shipping_method,
        order_notes: form.order_notes,
        subscribe_newsletter: form.subscribe_newsletter,
        payment_method: form.payment_method,
      };
      const response = await axios.post(`${API}/wc/checkout`, payload);
      if (response.data.success) {
        setOrderResult(response.data);
        await clearCart();
        if (response.data.payment_method !== 'bacs' && response.data.checkout_url) {
          toast.success(t('checkout.orderCreated', 'Order created! Redirecting to payment...'));
          window.open(response.data.checkout_url, '_blank');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || t('checkout.error', 'Checkout failed.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bank transfer confirmation screen
  if (orderResult && orderResult.payment_method === 'bacs') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed top-[5vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh]
                bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
              data-testid="checkout-bank-transfer">
              <div className="p-5 border-b border-gold/20 flex justify-between items-center">
                <h2 className="text-xl font-cinzel font-bold text-gold">{t('checkout.orderConfirmed', 'Order Confirmed')}</h2>
                <button onClick={onClose} className="text-cream/60 hover:text-gold"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-cinzel text-gold font-bold mb-2">
                    {t('checkout.orderNumber', 'Order')} #{orderResult.order_id}
                  </h3>
                  <p className="text-gold font-cinzel text-2xl font-bold">&euro;{orderResult.total}</p>
                </div>
                <div className="bg-forest/40 border border-gold/15 rounded-xl p-4 space-y-3">
                  <h4 className="font-cinzel text-gold text-sm font-bold uppercase">{t('checkout.bankTransferInfo', 'Bank Transfer Details')}</h4>
                  <p className="text-cream/80 font-montserrat text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-cream/80 font-montserrat text-sm leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                  </p>
                  <div className="bg-forest/60 rounded-lg p-3 border border-gold/10 mt-3">
                    <p className="text-cream/60 font-montserrat text-xs">
                      {t('checkout.orderRef', 'Please use your order number as payment reference')}: <span className="text-gold font-bold">#{orderResult.order_id}</span>
                    </p>
                  </div>
                </div>
                <GoldButton onClick={onClose} className="w-full" dataTestId="bank-transfer-close">
                  {t('checkout.close', 'Close')}
                </GoldButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-[5vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh]
              bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            data-testid="checkout-modal">
            {/* Header */}
            <div className="p-5 border-b border-gold/20 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold" data-testid="checkout-title">
                {t('checkout.title', 'Checkout')}
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold transition-colors" data-testid="checkout-close">
                <X className="w-6 h-6" />
              </button>
            </div>

            {step >= 0 && <StepIndicator steps={steps} currentStep={step} />}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Pre-step: Auth options (only for guest users) */}
              {step === -1 && (
                <div className="space-y-4 py-2" data-testid="checkout-step-auth">
                  <p className="text-cream/70 font-montserrat text-sm text-center mb-2">
                    {t('checkout.howToProceed', 'How would you like to proceed?')}
                  </p>
                  <button onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
                    className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl
                      hover:border-gold/40 hover:bg-gold/5 transition-all group"
                    data-testid="checkout-signin-option">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                      <LogIn className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-left">
                      <p className="text-cream font-cinzel font-bold text-sm">{t('checkout.alreadyUser', 'Already a user? Sign In')}</p>
                      <p className="text-cream/50 font-montserrat text-xs">{t('checkout.signInDesc', 'Access your saved addresses and order history')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gold/40 ml-auto" />
                  </button>
                  <button onClick={() => { setShowAuthModal(true); setAuthMode('register'); }}
                    className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl
                      hover:border-gold/40 hover:bg-gold/5 transition-all group"
                    data-testid="checkout-register-option">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                      <UserPlus className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-left">
                      <p className="text-cream font-cinzel font-bold text-sm">{t('checkout.createAccount', 'Create Account')}</p>
                      <p className="text-cream/50 font-montserrat text-xs">{t('checkout.registerDesc', 'Track orders and save your details for next time')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gold/40 ml-auto" />
                  </button>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/15" /></div>
                    <div className="relative flex justify-center"><span className="px-3 bg-forest-dark text-cream/40 font-montserrat text-xs uppercase">{t('checkout.or', 'or')}</span></div>
                  </div>
                  <button onClick={() => setStep(0)}
                    className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl
                      hover:border-gold/40 hover:bg-gold/5 transition-all group"
                    data-testid="checkout-guest-option">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                      <ShoppingBag className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-left">
                      <p className="text-cream font-cinzel font-bold text-sm">{t('checkout.guestCheckout', 'Buy Without Registration')}</p>
                      <p className="text-cream/50 font-montserrat text-xs">{t('checkout.guestDesc', 'Continue as guest — no account needed')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gold/40 ml-auto" />
                  </button>
                </div>
              )}

              {/* Step 0: Address */}
              {step === 0 && (
                <div className="space-y-5" data-testid="checkout-step-address">
                  <div>
                    <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4" />{t('checkout.billingDetails', 'Billing Details')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputField icon={User} label={t('checkout.firstName', 'First Name') + ' *'} testId="checkout-first-name"
                        value={form.billing_first_name} onChange={update('billing_first_name')} required />
                      <InputField icon={User} label={t('checkout.lastName', 'Last Name') + ' *'} testId="checkout-last-name"
                        value={form.billing_last_name} onChange={update('billing_last_name')} required />
                      <InputField icon={Mail} label={t('checkout.email', 'Email') + ' *'} testId="checkout-email"
                        type="email" value={form.billing_email} onChange={update('billing_email')} required />
                      <InputField icon={Phone} label={t('checkout.phone', 'Phone')} testId="checkout-phone"
                        type="tel" value={form.billing_phone} onChange={update('billing_phone')} />
                    </div>
                  </div>
                  <div>
                    <InputField icon={MapPin} label={t('checkout.address', 'Address') + ' *'} testId="checkout-address"
                      value={form.billing_address_1} onChange={update('billing_address_1')} required />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      <InputField icon={MapPin} label={t('checkout.city', 'City') + ' *'} testId="checkout-city"
                        value={form.billing_city} onChange={update('billing_city')} required />
                      <InputField icon={MapPin} label={t('checkout.postcode', 'Postcode') + ' *'} testId="checkout-postcode"
                        value={form.billing_postcode} onChange={update('billing_postcode')} required />
                      <InputField icon={MapPin} label={t('checkout.country', 'Country') + ' *'} testId="checkout-country"
                        value={form.billing_country} onChange={update('billing_country')} required />
                    </div>
                  </div>
                  {/* Same as billing toggle */}
                  <label className="flex items-center gap-3 cursor-pointer" data-testid="same-as-billing">
                    <input type="checkbox" checked={form.same_as_billing} onChange={update('same_as_billing')}
                      className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
                    <span className="text-cream/80 font-montserrat text-sm">{t('checkout.sameAsBilling', 'Shipping address same as billing')}</span>
                  </label>
                  {!form.same_as_billing && (
                    <div>
                      <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                        <Truck className="w-4 h-4" />{t('checkout.shippingAddress', 'Shipping Address')}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <InputField icon={User} label={t('checkout.firstName', 'First Name')} testId="checkout-ship-first"
                          value={form.shipping_first_name} onChange={update('shipping_first_name')} />
                        <InputField icon={User} label={t('checkout.lastName', 'Last Name')} testId="checkout-ship-last"
                          value={form.shipping_last_name} onChange={update('shipping_last_name')} />
                      </div>
                      <InputField icon={MapPin} label={t('checkout.address', 'Address')} testId="checkout-ship-address"
                        value={form.shipping_address_1} onChange={update('shipping_address_1')} />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                        <InputField label={t('checkout.city', 'City')} testId="checkout-ship-city"
                          value={form.shipping_city} onChange={update('shipping_city')} />
                        <InputField label={t('checkout.postcode', 'Postcode')} testId="checkout-ship-postcode"
                          value={form.shipping_postcode} onChange={update('shipping_postcode')} />
                        <InputField label={t('checkout.country', 'Country')} testId="checkout-ship-country"
                          value={form.shipping_country} onChange={update('shipping_country')} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 1: Shipping Method */}
              {step === 1 && (
                <div className="space-y-4" data-testid="checkout-step-shipping">
                  <h3 className="font-cinzel text-gold text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4" />{t('checkout.selectShipping', 'Select Shipping Method')}
                  </h3>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label key={method.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                          ${form.shipping_method === method.id ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40 hover:border-gold/30'}`}
                        data-testid={`shipping-${method.id}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" value={method.id}
                            checked={form.shipping_method === method.id}
                            onChange={update('shipping_method')}
                            className="text-gold focus:ring-gold" />
                          <div>
                            <p className="text-cream font-montserrat text-sm font-semibold">{method.title}</p>
                            <p className="text-cream/50 font-montserrat text-xs">{method.delivery_time}</p>
                          </div>
                        </div>
                        <span className="text-gold font-cinzel font-bold">
                          {method.cost === 0 ? t('checkout.free', 'Free') : `€${method.cost.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                  {/* Order Notes */}
                  <div className="mt-4">
                    <h3 className="font-cinzel text-gold text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4" />{t('checkout.notes', 'Order Notes')}
                    </h3>
                    <textarea data-testid="checkout-notes" value={form.order_notes} onChange={update('order_notes')}
                      rows={3} placeholder={t('checkout.notesPlaceholder', 'Any special instructions...')}
                      className="w-full px-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                        placeholder:text-cream/30 focus:outline-none focus:border-gold/50 resize-none transition-colors" />
                  </div>
                </div>
              )}

              {/* Step 2: Summary */}
              {step === 2 && (
                <div className="space-y-4" data-testid="checkout-step-summary">
                  {/* Items */}
                  <div className="bg-forest/40 border border-gold/15 rounded-xl p-4">
                    <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider">
                      {t('checkout.orderSummary', 'Order Summary')}
                    </h3>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-cream/80 font-montserrat truncate mr-3">
                            {item.product_name} <span className="text-cream/40">x{item.quantity}</span>
                          </span>
                          <span className="text-gold font-montserrat font-semibold whitespace-nowrap">
                            &euro;{(item.product_price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gold/10 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/60 font-montserrat">{t('checkout.subtotal', 'Subtotal')}</span>
                        <span className="text-cream font-montserrat">&euro;{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-cream/60 font-montserrat">{selectedShipping?.title || 'Shipping'}</span>
                        <span className="text-cream font-montserrat">
                          {shippingCost === 0 ? t('checkout.free', 'Free') : `€${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gold/20">
                        <span className="font-cinzel text-cream font-bold">{t('cart.total')}:</span>
                        <span className="font-cinzel text-gold font-bold text-lg" data-testid="checkout-grand-total">
                          &euro;{grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Addresses summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-forest/40 border border-gold/15 rounded-xl p-3">
                      <p className="text-gold font-cinzel text-xs font-bold mb-1 uppercase">{t('checkout.billingDetails', 'Billing')}</p>
                      <p className="text-cream/70 font-montserrat text-xs leading-relaxed">
                        {form.billing_first_name} {form.billing_last_name}<br />
                        {form.billing_address_1}<br />
                        {form.billing_city}, {form.billing_postcode}<br />
                        {form.billing_country}
                      </p>
                    </div>
                    <div className="bg-forest/40 border border-gold/15 rounded-xl p-3">
                      <p className="text-gold font-cinzel text-xs font-bold mb-1 uppercase">{t('checkout.shippingAddress', 'Shipping')}</p>
                      <p className="text-cream/70 font-montserrat text-xs leading-relaxed">
                        {form.same_as_billing ? (
                          <>{form.billing_first_name} {form.billing_last_name}<br />{form.billing_address_1}<br />{form.billing_city}, {form.billing_postcode}<br />{form.billing_country}</>
                        ) : (
                          <>{form.shipping_first_name} {form.shipping_last_name}<br />{form.shipping_address_1}<br />{form.shipping_city}, {form.shipping_postcode}<br />{form.shipping_country}</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-cinzel text-gold text-sm font-bold mb-2 uppercase tracking-wider">
                      {t('checkout.paymentMethod', 'Payment Method')}
                    </h3>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                        ${form.payment_method === 'online' ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40'}`}>
                        <input type="radio" name="payment" value="online" checked={form.payment_method === 'online'}
                          onChange={update('payment_method')} className="text-gold focus:ring-gold" />
                        <span className="text-cream font-montserrat text-sm">{t('checkout.payOnline', 'Pay Online (Card)')}</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                        ${form.payment_method === 'bacs' ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40'}`}>
                        <input type="radio" name="payment" value="bacs" checked={form.payment_method === 'bacs'}
                          onChange={update('payment_method')} className="text-gold focus:ring-gold" />
                        <span className="text-cream font-montserrat text-sm">{t('checkout.bankTransfer', 'Bank Transfer')}</span>
                      </label>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer" data-testid="accept-terms">
                      <input type="checkbox" checked={form.accept_terms} onChange={update('accept_terms')}
                        className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
                      <span className="text-cream/80 font-montserrat text-xs">
                        {t('checkout.iAccept', 'I accept the')}{' '}
                        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openTermsModal'))}
                          className="text-gold underline hover:text-gold-light">{t('checkout.termsConditions', 'Terms & Conditions')}</button>
                        {' *'}
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer" data-testid="accept-privacy">
                      <input type="checkbox" checked={form.accept_privacy} onChange={update('accept_privacy')}
                        className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
                      <span className="text-cream/80 font-montserrat text-xs">
                        {t('checkout.iAccept', 'I accept the')}{' '}
                        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openPrivacyModal'))}
                          className="text-gold underline hover:text-gold-light">{t('checkout.privacyPolicy', 'Privacy Policy')}</button>
                        {' *'}
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer" data-testid="subscribe-newsletter">
                      <input type="checkbox" checked={form.subscribe_newsletter} onChange={update('subscribe_newsletter')}
                        className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
                      <span className="text-cream/80 font-montserrat text-xs">
                        {t('checkout.subscribeNewsletter', 'Subscribe to our newsletter for magical updates')}
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation - only show for checkout steps */}
            {step >= 0 && (
            <div className="p-4 border-t border-gold/20 shrink-0 flex items-center gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1 px-4 py-2.5 text-cream/70 hover:text-gold font-montserrat text-sm transition-colors"
                  data-testid="checkout-back">
                  <ChevronLeft className="w-4 h-4" /> {t('checkout.back', 'Back')}
                </button>
              )}
              <div className="flex-1" />
              {step < 2 ? (
                <GoldButton onClick={() => {
                  if (step === 0 && !canProceedStep0) {
                    toast.error(t('checkout.fillRequired', 'Please fill in all required fields.'));
                    return;
                  }
                  setStep(step + 1);
                }} className="px-6" dataTestId="checkout-next">
                  <span className="flex items-center gap-1">
                    {t('checkout.next', 'Next')} <ChevronRight className="w-4 h-4" />
                  </span>
                </GoldButton>
              ) : (
                <GoldButton onClick={handleSubmit} dataTestId="checkout-submit" disabled={isSubmitting || !canSubmit}
                  className={`px-6 ${!canSubmit ? 'opacity-50' : ''}`}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> {t('checkout.processing', 'Processing...')}</span>
                  ) : (
                    <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {t('checkout.placeOrder', 'Place Order')}</span>
                  )}
                </GoldButton>
              )}
            </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <AuthModal isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onLoginSuccess={() => { setShowAuthModal(false); setStep(0); }}
      defaultMode={authMode}
    />
    </>
  );
};

export default CheckoutModal;
