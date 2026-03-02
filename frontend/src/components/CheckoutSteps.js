import React from 'react';
import { MapPin, User, Mail, Phone, Truck, FileText, Check, ChevronRight, LogIn, UserPlus, ShoppingBag } from 'lucide-react';

export const InputField = ({ icon: Icon, label, testId, ...props }) => (
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

export const StepIndicator = ({ steps, currentStep }) => (
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

export const AuthPreStep = ({ t, onSignIn, onRegister, onGuest }) => (
  <div className="space-y-4 py-2" data-testid="checkout-step-auth">
    <p className="text-cream/70 font-montserrat text-sm text-center mb-2">{t('checkout.howToProceed', 'How would you like to proceed?')}</p>
    <button onClick={onSignIn} className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl hover:border-gold/40 hover:bg-gold/5 transition-all group" data-testid="checkout-signin-option">
      <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors"><LogIn className="w-5 h-5 text-gold" /></div>
      <div className="text-left">
        <p className="text-cream font-cinzel font-bold text-sm">{t('checkout.alreadyUser', 'Already a user? Sign In')}</p>
        <p className="text-cream/50 font-montserrat text-xs">{t('checkout.signInDesc', 'Access your saved addresses and order history')}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gold/40 ml-auto" />
    </button>
    <button onClick={onRegister} className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl hover:border-gold/40 hover:bg-gold/5 transition-all group" data-testid="checkout-register-option">
      <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors"><UserPlus className="w-5 h-5 text-gold" /></div>
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
    <button onClick={onGuest} className="w-full flex items-center gap-4 p-4 bg-forest/40 border border-gold/20 rounded-xl hover:border-gold/40 hover:bg-gold/5 transition-all group" data-testid="checkout-guest-option">
      <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors"><ShoppingBag className="w-5 h-5 text-gold" /></div>
      <div className="text-left">
        <p className="text-cream font-cinzel font-bold text-sm">{t('checkout.guestCheckout', 'Buy Without Registration')}</p>
        <p className="text-cream/50 font-montserrat text-xs">{t('checkout.guestDesc', 'Continue as guest — no account needed')}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gold/40 ml-auto" />
    </button>
  </div>
);

export const AddressStep = ({ form, update, t }) => (
  <div className="space-y-5" data-testid="checkout-step-address">
    <div>
      <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"><User className="w-4 h-4" />{t('checkout.billingDetails', 'Billing Details')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField icon={User} label={t('checkout.firstName') + ' *'} testId="checkout-first-name" value={form.billing_first_name} onChange={update('billing_first_name')} required />
        <InputField icon={User} label={t('checkout.lastName') + ' *'} testId="checkout-last-name" value={form.billing_last_name} onChange={update('billing_last_name')} required />
        <InputField icon={Mail} label={t('checkout.email') + ' *'} testId="checkout-email" type="email" value={form.billing_email} onChange={update('billing_email')} required />
        <InputField icon={Phone} label={t('checkout.phone')} testId="checkout-phone" type="tel" value={form.billing_phone} onChange={update('billing_phone')} />
      </div>
    </div>
    <div>
      <InputField icon={MapPin} label={t('checkout.address') + ' *'} testId="checkout-address" value={form.billing_address_1} onChange={update('billing_address_1')} required />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <InputField icon={MapPin} label={t('checkout.city') + ' *'} testId="checkout-city" value={form.billing_city} onChange={update('billing_city')} required />
        <InputField icon={MapPin} label={t('checkout.postcode') + ' *'} testId="checkout-postcode" value={form.billing_postcode} onChange={update('billing_postcode')} required />
        <InputField icon={MapPin} label={t('checkout.country') + ' *'} testId="checkout-country" value={form.billing_country} onChange={update('billing_country')} required />
      </div>
    </div>
    <label className="flex items-center gap-3 cursor-pointer" data-testid="same-as-billing">
      <input type="checkbox" checked={form.same_as_billing} onChange={update('same_as_billing')} className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50" />
      <span className="text-cream/80 font-montserrat text-sm">{t('checkout.sameAsBilling', 'Shipping address same as billing')}</span>
    </label>
    {!form.same_as_billing && (
      <div>
        <h3 className="font-cinzel text-gold text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"><Truck className="w-4 h-4" />{t('checkout.shippingAddress')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <InputField icon={User} label={t('checkout.firstName')} testId="checkout-ship-first" value={form.shipping_first_name} onChange={update('shipping_first_name')} />
          <InputField icon={User} label={t('checkout.lastName')} testId="checkout-ship-last" value={form.shipping_last_name} onChange={update('shipping_last_name')} />
        </div>
        <InputField icon={MapPin} label={t('checkout.address')} testId="checkout-ship-address" value={form.shipping_address_1} onChange={update('shipping_address_1')} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <InputField label={t('checkout.city')} testId="checkout-ship-city" value={form.shipping_city} onChange={update('shipping_city')} />
          <InputField label={t('checkout.postcode')} testId="checkout-ship-postcode" value={form.shipping_postcode} onChange={update('shipping_postcode')} />
          <InputField label={t('checkout.country')} testId="checkout-ship-country" value={form.shipping_country} onChange={update('shipping_country')} />
        </div>
      </div>
    )}
  </div>
);

export const ShippingStep = ({ form, update, shippingMethods, t }) => (
  <div className="space-y-4" data-testid="checkout-step-shipping">
    <h3 className="font-cinzel text-gold text-sm font-bold uppercase tracking-wider flex items-center gap-2"><Truck className="w-4 h-4" />{t('checkout.selectShipping')}</h3>
    <div className="space-y-3">
      {shippingMethods.map((method) => (
        <label key={method.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${form.shipping_method === method.id ? 'border-gold bg-gold/10' : 'border-gold/15 bg-forest/40 hover:border-gold/30'}`} data-testid={`shipping-${method.id}`}>
          <div className="flex items-center gap-3">
            <input type="radio" name="shipping" value={method.id} checked={form.shipping_method === method.id} onChange={update('shipping_method')} className="text-gold focus:ring-gold" />
            <div>
              <p className="text-cream font-montserrat text-sm font-semibold">{method.title}</p>
              <p className="text-cream/50 font-montserrat text-xs">{method.delivery_time}</p>
            </div>
          </div>
          <span className="text-gold font-cinzel font-bold">{method.cost === 0 ? t('checkout.free', 'Free') : `\u20AC${method.cost.toFixed(2)}`}</span>
        </label>
      ))}
    </div>
    <div className="mt-4">
      <h3 className="font-cinzel text-gold text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2"><FileText className="w-4 h-4" />{t('checkout.notes')}</h3>
      <textarea data-testid="checkout-notes" value={form.order_notes} onChange={update('order_notes')} rows={3} placeholder={t('checkout.notesPlaceholder')}
        className="w-full px-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold/50 resize-none transition-colors" />
    </div>
  </div>
);
