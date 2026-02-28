import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GoldButton from '../GoldButton';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ForBusiness = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    privacyAccepted: false,
    subscribeNewsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast.error(t('forBusiness.privacyError'));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      });
      
      if (formData.subscribeNewsletter) {
        try {
          await axios.post(`${API}/newsletter/subscribe`, {
            email: formData.email
          });
        } catch (err) {
          console.log('Newsletter subscription error:', err);
        }
      }
      
      toast.success(t('forBusiness.successMessage'));
      setFormData({ name: '', email: '', company: '', message: '', privacyAccepted: false, subscribeNewsletter: false });
    } catch (error) {
      toast.error(t('forBusiness.errorMessage'));
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPrivacy = () => {
    const element = document.getElementById('privacy-policy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="for-business"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest-dark/90" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="for-business-title">
            {t('forBusiness.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            {t('forBusiness.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-cream font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                {t('forBusiness.nameLabel')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base
                  transition-all duration-200"
                placeholder="Your full name"
                data-testid="contact-name-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cream font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                {t('forBusiness.emailLabel')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base
                  transition-all duration-200"
                placeholder="your.email@company.com"
                data-testid="contact-email-input"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-cream font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                {t('forBusiness.companyLabel')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base
                  transition-all duration-200"
                placeholder="Your company name"
                data-testid="contact-company-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-cream font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                {t('forBusiness.messageLabel')} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base
                  transition-all duration-200"
                placeholder="Tell us about your project or inquiry..."
                data-testid="contact-message-input"
              />
            </div>

            <div className="space-y-2 sm:space-y-3 pt-2">
              <div className="flex items-start gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-gold/40 bg-black/20 text-gold
                    focus:ring-gold focus:ring-offset-0"
                  data-testid="privacy-checkbox"
                />
                <label htmlFor="privacyAccepted" className="text-cream/90 font-montserrat text-xs sm:text-sm">
                  {t('forBusiness.privacyLabel')}{' '}
                  <button
                    type="button"
                    onClick={scrollToPrivacy}
                    className="text-gold hover:text-gold-light underline"
                  >
                    {t('forBusiness.privacyLink')}
                  </button>{' '}
                  *
                </label>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-gold/40 bg-black/20 text-gold
                    focus:ring-gold focus:ring-offset-0"
                  data-testid="newsletter-checkbox"
                />
                <label htmlFor="subscribeNewsletter" className="text-cream/90 font-montserrat text-xs sm:text-sm">
                  {t('forBusiness.newsletterLabel')}
                </label>
              </div>
            </div>

            <GoldButton type="submit" className="w-full" dataTestId="contact-submit-button" disabled={isSubmitting}>
              {isSubmitting ? t('forBusiness.submitting') : t('forBusiness.submitButton')}
            </GoldButton>
          </form>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gold/20 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <div className="flex items-center gap-2 sm:gap-3 text-cream/80 justify-center">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="font-montserrat text-xs sm:text-sm break-all">contact@fairygarden4u.com</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-cream/80 justify-center">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="font-montserrat text-xs sm:text-sm">+1 (555) 123-4567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForBusiness;
