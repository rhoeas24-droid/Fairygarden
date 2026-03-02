import React, { useState } from 'react';
import { X, Trash2, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GoldButton from './GoldButton';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CartDrawer = () => {
  const { cart, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { t } = useTranslation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await axios.post(`${API}/wc/checkout`, {
        session_id: sessionId,
      });
      
      if (response.data.success && response.data.checkout_url) {
        toast.success(t('cart.orderCreated', 'Order created! Redirecting to payment...'));
        // Open WooCommerce checkout in a new tab
        window.open(response.data.checkout_url, '_blank');
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const msg = error.response?.data?.detail || t('cart.checkoutError', 'Checkout failed. Please try again.');
      toast.error(msg);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-forest-dark border-l border-gold/30 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gold/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-cinzel font-bold text-gold" data-testid="cart-drawer-title">{t('cart.title')}</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-cream hover:text-gold transition-colors"
                  data-testid="close-cart-button"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12" data-testid="empty-cart-message">
                  <p className="text-cream/60 font-montserrat">{t('cart.empty')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-forest/50 backdrop-blur-sm border border-gold/20 rounded-lg p-4 flex gap-4"
                      data-testid={`cart-item-${item.product_id}`}
                    >
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-cinzel text-cream font-semibold">{item.product_name}</h3>
                        <p className="text-gold font-montserrat">&euro;{item.product_price.toFixed(2)}</p>
                        <p className="text-cream/60 text-sm">{t('cart.qty')}: {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-cream/60 hover:text-gold transition-colors"
                        data-testid={`remove-cart-item-${item.product_id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gold/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-cinzel text-cream">{t('cart.total')}:</span>
                  <span className="text-2xl font-cinzel font-bold text-gold" data-testid="cart-total">
                    &euro;{cartTotal.toFixed(2)}
                  </span>
                </div>
                <GoldButton
                  onClick={handleCheckout}
                  className="w-full"
                  dataTestId="checkout-button"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('cart.processing', 'Processing...')}
                    </span>
                  ) : (
                    t('cart.checkout')
                  )}
                </GoldButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
