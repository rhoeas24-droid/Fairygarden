import React from 'react';
import { Check, X } from 'lucide-react';
import GoldButton from './GoldButton';

export const SummaryStep = ({ cart, cartTotal, shippingCost, grandTotal, selectedShipping, form, update, t }) => (
  <div className="space-y-4" data-testid="checkout-step-summary">
    <div className="bg-forest/40 border border-gold/15 rounded-xl p-4">
      <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider">{t('checkout.orderSummary')}</h3>
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <span className="text-cream/80 font-montserrat truncate mr-3">{item.product_name} <span className="text-cream/40">x{item.quantity}</span></span>
            <span className="text-gold font-montserrat font-semibold whitespace-nowrap">&euro;{(item.product_price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-gold/10 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-cream/60 font-montserrat">{t('checkout.subtotal')}</span>
          <span className="text-cream font-montserrat">&euro;{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cream/60 font-montserrat">{selectedShipping?.title || 'Shipping'}</span>
          <span className="text-cream font-montserrat">{shippingCost === 0 ? t('checkout.free') : `\u20AC${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gold/20">
          <span className="font-cinzel text-cream font-bold">{t('cart.total')}:</span>
          <span className="font-cinzel text-gold font-bold text-lg" data-testid="checkout-grand-total">&euro;{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-forest/40 border border-gold/15 rounded-xl p-3">
        <p className="text-gold font-cinzel text-xs font-bold mb-1 uppercase">{t('checkout.billingDetails')}</p>
        <p className="text-cream/70 font-montserrat text-xs leading-relaxed">{form.billing_first_name} {form.billing_last_name}<br />{form.billing_address_1}<br />{form.billing_city}, {form.billing_postcode}<br />{form.billing_country}</p>
      </div>
      <div className="bg-forest/40 border border-gold/15 rounded-xl p-3">
        <p className="text-gold font-cinzel text-xs font-bold mb-1 uppercase">{t('checkout.shippingAddress')}</p>
        <p className="text-cream/70 font-montserrat text-xs leading-relaxed">
          {form.same_as_billing
            ? <span>{form.billing_first_name} {form.billing_last_name}<br />{form.billing_address_1}<br />{form.billing_city}, {form.billing_postcode}<br />{form.billing_country}</span>
            : <span>{form.shipping_first_name} {form.shipping_last_name}<br />{form.shipping_address_1}<br />{form.shipping_city}, {form.shipping_postcode}<br />{form.shipping_country}</span>
          }
        </p>
      </div>
    </div>

    <div>
      <h3 className="font-cinzel text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('checkout.paymentMethod')}</h3>
      <div className="space-y-2">
        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.payment_method === 'online' ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40'}`}>
          <input type="radio" name="payment" value="online" checked={form.payment_method === 'online'} onChange={update('payment_method')} className="text-gold focus:ring-gold" />
          <span className="text-cream font-montserrat text-sm">{t('checkout.payOnline')}</span>
        </label>
        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.payment_method === 'bacs' ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40'}`}>
          <input type="radio" name="payment" value="bacs" checked={form.payment_method === 'bacs'} onChange={update('payment_method')} className="text-gold focus:ring-gold" />
          <span className="text-cream font-montserrat text-sm">{t('checkout.bankTransfer')}</span>
        </label>
      </div>
    </div>

    <div className="space-y-3 pt-2">
      <label className="flex items-start gap-3 cursor-pointer" data-testid="accept-terms">
        <input type="checkbox" checked={form.accept_terms} onChange={update('accept_terms')} className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
        <span className="text-cream/80 font-montserrat text-xs">
          {t('checkout.iAccept')}{' '}
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openTermsModal'))} className="text-gold underline hover:text-gold-light">{t('checkout.termsConditions')}</button> *
        </span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer" data-testid="accept-privacy">
        <input type="checkbox" checked={form.accept_privacy} onChange={update('accept_privacy')} className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
        <span className="text-cream/80 font-montserrat text-xs">
          {t('checkout.iAccept')}{' '}
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openPrivacyModal'))} className="text-gold underline hover:text-gold-light">{t('checkout.privacyPolicy')}</button> *
        </span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer" data-testid="subscribe-newsletter">
        <input type="checkbox" checked={form.subscribe_newsletter} onChange={update('subscribe_newsletter')} className="mt-0.5 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
        <span className="text-cream/80 font-montserrat text-xs">{t('checkout.subscribeNewsletter')}</span>
      </label>
    </div>
  </div>
);

export const BankTransferResult = ({ orderResult, onClose, t }) => (
  <div className="p-6 space-y-4 overflow-y-auto">
    <div className="text-center">
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-gold" /></div>
      <h3 className="text-lg font-cinzel text-gold font-bold mb-2">{t('checkout.orderNumber')} #{orderResult.order_id}</h3>
      <p className="text-gold font-cinzel text-2xl font-bold">&euro;{orderResult.total}</p>
    </div>
    <div className="bg-forest/40 border border-gold/15 rounded-xl p-4 space-y-3">
      <h4 className="font-cinzel text-gold text-sm font-bold uppercase">{t('checkout.bankTransferInfo')}</h4>
      <p className="text-cream/80 font-montserrat text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p className="text-cream/80 font-montserrat text-sm leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <div className="bg-forest/60 rounded-lg p-3 border border-gold/10 mt-3">
        <p className="text-cream/60 font-montserrat text-xs">{t('checkout.orderRef')}: <span className="text-gold font-bold">#{orderResult.order_id}</span></p>
      </div>
    </div>
    <GoldButton onClick={onClose} className="w-full" dataTestId="bank-transfer-close">{t('checkout.close')}</GoldButton>
  </div>
);
