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
      className="relative py-24 px-4"
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
          className="text-center mb-12"
        >
          <Building2 className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4" data-testid="for-business-title">
            For Business
          </h2>
          <p className="text-cream/80 font-montserrat text-lg max-w-2xl mx-auto">
            Bring a touch of nature to your office, events, or corporate gifts. We create custom terrarium solutions for businesses of all sizes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-cream font-montserrat font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat
                  transition-all duration-200"
                placeholder="Your full name"
                data-testid="contact-name-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cream font-montserrat font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat
                  transition-all duration-200"
                placeholder="your.email@company.com"
                data-testid="contact-email-input"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-cream font-montserrat font-semibold mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat
                  transition-all duration-200"
                placeholder="Your company name"
                data-testid="contact-company-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-cream font-montserrat font-semibold mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/20 border border-gold/40 text-cream placeholder:text-cream/50
                  focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat
                  transition-all duration-200"
                placeholder="Tell us about your project or inquiry..."
                data-testid="contact-message-input"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
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
                <label htmlFor="privacyAccepted" className="text-cream/90 font-montserrat text-sm">
                  I have read and accept the{' '}
                  <button
                    type="button"
                    onClick={scrollToPrivacy}
                    className="text-gold hover:text-gold-light underline"
                  >
                    Privacy Policy
                  </button>{' '}
                  *
                </label>
              </div>

              <div className="flex items-start gap-3">
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
                <label htmlFor="subscribeNewsletter" className="text-cream/90 font-montserrat text-sm">
                  Subscribe to our newsletter for updates and special offers
                </label>
              </div>
            </div>

            <GoldButton type="submit" className="w-full" dataTestId="contact-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </GoldButton>
          </form>

          <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center gap-3 text-cream/80">
              <Mail className="w-5 h-5 text-gold" />
              <span className="font-montserrat text-sm">contact@fairygarden.com</span>
            </div>
            <div className="flex items-center gap-3 text-cream/80">
              <Phone className="w-5 h-5 text-gold" />
              <span className="font-montserrat text-sm">+1 (555) 123-4567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForBusiness;
