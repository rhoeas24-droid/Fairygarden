import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Leaf, Sun, FlaskConical, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import axios from 'axios';
import GoldButton from './GoldButton';

const PRICES = {
  sizes: {
    S: 35.99,
    M: 43.99,
    L: 55.99,
    XL: 61.99
  },
  worlds: {
    minimal: 1.2,
    colorful: 1.3,
    fairytale: 1.4,
    magical: 1.6,
    carnivorous: 1.6,
    jungle: 1.8
  },
  glassTypes: {
    container: 1.1,
    bottle: 1.5
  },
  lighting: {
    no: 1.0,
    yes: 1.05
  }
};

const CustomTerrariumBuilder = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    size: 'M',
    glassType: 'container',
    world: 'magical',
    lighting: 'no',
    message: '',
    privacyAccepted: false,
    subscribeNewsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatedPrice = useMemo(() => {
    const basePrice = PRICES.sizes[formData.size];
    const worldMultiplier = PRICES.worlds[formData.world];
    const glassMultiplier = PRICES.glassTypes[formData.glassType];
    const lightingMultiplier = PRICES.lighting[formData.lighting];
    
    return (basePrice * worldMultiplier * glassMultiplier * lightingMultiplier).toFixed(2);
  }, [formData.size, formData.world, formData.glassType, formData.lighting]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const scrollToPrivacy = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById('privacy-policy');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast.error(t('customTerrarium.privacyError'));
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/custom-terrarium`, {
        name: formData.name,
        email: formData.email,
        size: formData.size,
        glass_type: formData.glassType,
        world: formData.world,
        lighting: formData.lighting === 'yes',
        message: formData.message,
        calculated_price: parseFloat(calculatedPrice),
        subscribed_to_newsletter: formData.subscribeNewsletter
      });
      
      toast.success(t('customTerrarium.successMessage'));
      onClose();
      setFormData({
        name: '',
        email: '',
        size: 'M',
        glassType: 'container',
        world: 'magical',
        lighting: 'no',
        message: '',
        privacyAccepted: false,
        subscribeNewsletter: false
      });
    } catch (error) {
      toast.error(t('customTerrarium.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        data-testid="custom-terrarium-modal"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-forest border border-gold/30 rounded-2xl shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-forest/95 backdrop-blur-md border-b border-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-gold" />
                <h2 className="text-2xl font-cinzel font-bold text-gold">
                  {t('customTerrarium.title')}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-cream/60 hover:text-gold transition-colors"
                data-testid="close-custom-terrarium-modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-cream/70 font-montserrat text-sm mt-2">
              {t('customTerrarium.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cream font-montserrat font-semibold mb-2">
                  {t('customTerrarium.nameLabel')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-forest-dark border border-gold/40 text-cream
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  data-testid="custom-terrarium-name"
                />
              </div>
              <div>
                <label className="block text-cream font-montserrat font-semibold mb-2">
                  {t('customTerrarium.emailLabel')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-forest-dark border border-gold/40 text-cream
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  data-testid="custom-terrarium-email"
                />
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-cream font-montserrat font-semibold mb-3 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-gold" />
                {t('customTerrarium.sizeLabel')}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(PRICES.sizes).map(([size, price]) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, size }))}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.size === size
                        ? 'border-gold bg-gold/20 text-gold'
                        : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                    }`}
                    data-testid={`size-${size}`}
                  >
                    <div className="font-cinzel font-bold text-lg">{size}</div>
                    <div className="font-montserrat text-xs mt-1">€{price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Type */}
            <div>
              <label className="block text-cream font-montserrat font-semibold mb-3">
                {t('customTerrarium.glassTypeLabel')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, glassType: 'container' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.glassType === 'container'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                  }`}
                  data-testid="glass-container"
                >
                  <div className="font-cinzel font-bold">{t('customTerrarium.glassContainer')}</div>
                  <div className="font-montserrat text-xs mt-1">{t('customTerrarium.glassContainerDesc')}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, glassType: 'bottle' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.glassType === 'bottle'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                  }`}
                  data-testid="glass-bottle"
                >
                  <div className="font-cinzel font-bold">{t('customTerrarium.glassBottle')}</div>
                  <div className="font-montserrat text-xs mt-1">{t('customTerrarium.glassBottleDesc')}</div>
                </button>
              </div>
            </div>

            {/* World/Theme Selection */}
            <div>
              <label className="block text-cream font-montserrat font-semibold mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-gold" />
                {t('customTerrarium.worldLabel')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(PRICES.worlds).map((world) => (
                  <button
                    key={world}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, world }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.world === world
                        ? 'border-gold bg-gold/20 text-gold'
                        : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                    }`}
                    data-testid={`world-${world}`}
                  >
                    <div className="font-cinzel font-bold text-sm">{t(`customTerrarium.worlds.${world}`)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting */}
            <div>
              <label className="block text-cream font-montserrat font-semibold mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-gold" />
                {t('customTerrarium.lightingLabel')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, lighting: 'no' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.lighting === 'no'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                  }`}
                  data-testid="lighting-no"
                >
                  <div className="font-cinzel font-bold">{t('customTerrarium.lightingNo')}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, lighting: 'yes' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.lighting === 'yes'
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-gold/30 bg-forest-dark/50 text-cream/70 hover:border-gold/50'
                  }`}
                  data-testid="lighting-yes"
                >
                  <div className="font-cinzel font-bold">{t('customTerrarium.lightingYes')}</div>
                </button>
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-cream font-montserrat font-semibold mb-2">
                {t('customTerrarium.messageLabel')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={1000}
                rows={4}
                className="w-full px-4 py-3 bg-forest-dark border border-gold/40 text-cream
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat resize-none"
                placeholder={t('customTerrarium.messagePlaceholder')}
                data-testid="custom-terrarium-message"
              />
              <div className="text-right text-cream/50 text-xs mt-1">
                {formData.message.length}/1000
              </div>
            </div>

            {/* Price Calculator */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-gold" />
                <h3 className="font-cinzel font-bold text-gold text-lg">
                  {t('customTerrarium.depositTitle')}
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-cream/70 font-montserrat text-sm">
                  {t('customTerrarium.depositDescription')}
                </div>
                <div className="text-right">
                  <div className="text-4xl font-cinzel font-bold text-gold">
                    €{calculatedPrice}
                  </div>
                  <div className="text-cream/50 text-xs font-montserrat">
                    {t('customTerrarium.depositNote')}
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Newsletter Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="custom-privacy"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gold/40 bg-forest-dark text-gold focus:ring-gold"
                  data-testid="custom-terrarium-privacy"
                />
                <label htmlFor="custom-privacy" className="text-cream/90 font-montserrat text-sm">
                  {t('customTerrarium.privacyLabel')}{' '}
                  <button
                    type="button"
                    onClick={scrollToPrivacy}
                    className="text-gold hover:text-gold-light underline"
                  >
                    {t('customTerrarium.privacyLink')}
                  </button>{' '}
                  *
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="custom-newsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gold/40 bg-forest-dark text-gold focus:ring-gold"
                  data-testid="custom-terrarium-newsletter"
                />
                <label htmlFor="custom-newsletter" className="text-cream/90 font-montserrat text-sm">
                  {t('customTerrarium.newsletterLabel')}
                </label>
              </div>
            </div>

            {/* Contact Note */}
            <div className="text-center text-cream/60 font-montserrat text-sm">
              {t('customTerrarium.contactNote')}
            </div>

            {/* Submit Button */}
            <GoldButton
              type="submit"
              className="w-full"
              dataTestId="custom-terrarium-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('customTerrarium.submitting') : t('customTerrarium.submitButton')}
            </GoldButton>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomTerrariumBuilder;
