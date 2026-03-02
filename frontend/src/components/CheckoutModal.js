import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, MapPin, User, Mail, Phone, FileText, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import GoldButton from './GoldButton';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InputField = ({ icon: Icon, label, testId, ...props }) => (
  <div>
    <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
      <input
        data-testid={testId}
        className="w-full pl-10 pr-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg
          text-cream font-montserrat text-sm placeholder:text-cream/30
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30
          transition-colors"
        {...props}
      />
    </div>
  </div>
);

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '', country: '',
    notes: ''
  });

  const updateField = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.postcode || !form.country) {
      toast.error(t('checkout.fillRequired', 'Please fill in all required fields.'));
      return;
    }

    setIsSubmitting(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.post(`${API}/wc/checkout`, {
        session_id: sessionId,
        billing_first_name: form.firstName,
        billing_last_name: form.lastName,
        billing_email: form.email,
        billing_phone: form.phone,
        billing_address_1: form.address,
        billing_city: form.city,
        billing_postcode: form.postcode,
        billing_country: form.country,
        order_notes: form.notes,
      });

      if (response.data.success && response.data.checkout_url) {
        toast.success(t('checkout.orderCreated', 'Order created! Redirecting to payment...'));
        await clearCart();
        onClose();
        window.open(response.data.checkout_url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.detail || t('checkout.error', 'Checkout failed. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-[5vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh]
              bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl z-50
              flex flex-col overflow-hidden"
            data-testid="checkout-modal"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold/20 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold" data-testid="checkout-title">
                {t('checkout.title', 'Checkout')}
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold transition-colors" data-testid="checkout-close">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-5 space-y-6">

                {/* Order Summary */}
                <div className="bg-forest/40 border border-gold/15 rounded-xl p-4" data-testid="checkout-summary">
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
                  <div className="mt-3 pt-3 border-t border-gold/20 flex justify-between">
                    <span className="font-cinzel text-cream font-bold">{t('cart.total')}:</span>
                    <span className="font-cinzel text-gold font-bold text-lg" data-testid="checkout-total">
                      &euro;{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Billing Details */}
                <div>
                  <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('checkout.billingDetails', 'Billing Details')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField icon={User} label={t('checkout.firstName', 'First Name') + ' *'} testId="checkout-first-name"
                      value={form.firstName} onChange={updateField('firstName')} required />
                    <InputField icon={User} label={t('checkout.lastName', 'Last Name') + ' *'} testId="checkout-last-name"
                      value={form.lastName} onChange={updateField('lastName')} required />
                    <InputField icon={Mail} label={t('checkout.email', 'Email') + ' *'} testId="checkout-email"
                      type="email" value={form.email} onChange={updateField('email')} required />
                    <InputField icon={Phone} label={t('checkout.phone', 'Phone')} testId="checkout-phone"
                      type="tel" value={form.phone} onChange={updateField('phone')} />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    {t('checkout.shippingAddress', 'Shipping Address')}
                  </h3>
                  <div className="space-y-3">
                    <InputField icon={MapPin} label={t('checkout.address', 'Address') + ' *'} testId="checkout-address"
                      value={form.address} onChange={updateField('address')} required />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InputField icon={MapPin} label={t('checkout.city', 'City') + ' *'} testId="checkout-city"
                        value={form.city} onChange={updateField('city')} required />
                      <InputField icon={MapPin} label={t('checkout.postcode', 'Postcode') + ' *'} testId="checkout-postcode"
                        value={form.postcode} onChange={updateField('postcode')} required />
                      <InputField icon={MapPin} label={t('checkout.country', 'Country') + ' *'} testId="checkout-country"
                        value={form.country} onChange={updateField('country')} required />
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {t('checkout.notes', 'Order Notes')}
                  </h3>
                  <textarea
                    data-testid="checkout-notes"
                    value={form.notes}
                    onChange={updateField('notes')}
                    rows={3}
                    placeholder={t('checkout.notesPlaceholder', 'Any special instructions...')}
                    className="w-full px-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg
                      text-cream font-montserrat text-sm placeholder:text-cream/30
                      focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30
                      resize-none transition-colors"
                  />
                </div>
              </div>

              {/* Footer / Submit */}
              <div className="p-5 border-t border-gold/20 shrink-0">
                <GoldButton
                  onClick={handleSubmit}
                  className="w-full"
                  dataTestId="checkout-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('checkout.processing', 'Processing...')}
                    </span>
                  ) : (
                    t('checkout.placeOrder', 'Place Order & Pay')
                  )}
                </GoldButton>
                <p className="text-cream/40 font-montserrat text-xs text-center mt-3">
                  {t('checkout.paymentRedirect', 'You will be redirected to our secure payment page to complete your purchase.')}
                </p>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
