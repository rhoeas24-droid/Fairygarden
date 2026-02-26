import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GoldButton from '../GoldButton';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Workshops = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workshop_type: 'beginner',
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
      toast.error(t('workshops.privacyError'));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/workshop/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        workshop_type: formData.workshop_type
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
      
      toast.success(t('workshops.successMessage'));
      setFormData({ name: '', email: '', phone: '', workshop_type: 'beginner', privacyAccepted: false, subscribeNewsletter: false });
    } catch (error) {
      toast.error(t('workshops.errorMessage'));
      console.error('Error submitting workshop registration:', error);
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
    <section id="workshops" className="relative py-24 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Users className="w-16 h-16 text-gold-dark mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-forest mb-4" data-testid="workshops-title">
            {t('workshops.title')}
          </h2>
          <p className="text-forest/80 font-montserrat text-lg max-w-2xl mx-auto">
            {t('workshops.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1550836017-e1b9f7894f38?auto=format&fit=crop&w=800&q=80"
              alt="Terrarium Workshop"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-forest/10 border border-gold/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-cinzel font-bold text-forest mb-6">{t('workshops.registerTitle')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="ws-name" className="block text-forest font-montserrat font-semibold mb-2">
                  {t('workshops.nameLabel')} *
                </label>
                <input
                  type="text"
                  id="ws-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  placeholder="Your full name"
                  data-testid="workshop-name-input"
                />
              </div>

              <div>
                <label htmlFor="ws-email" className="block text-forest font-montserrat font-semibold mb-2">
                  {t('workshops.emailLabel')} *
                </label>
                <input
                  type="email"
                  id="ws-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  placeholder="your@email.com"
                  data-testid="workshop-email-input"
                />
              </div>

              <div>
                <label htmlFor="ws-phone" className="block text-forest font-montserrat font-semibold mb-2">
                  {t('workshops.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="ws-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  placeholder="(555) 123-4567"
                  data-testid="workshop-phone-input"
                />
              </div>

              <div>
                <label htmlFor="ws-type" className="block text-forest font-montserrat font-semibold mb-2">
                  {t('workshops.workshopTypeLabel')} *
                </label>
                <select
                  id="ws-type"
                  name="workshop_type"
                  value={formData.workshop_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gold/40 text-forest
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat"
                  data-testid="workshop-type-select"
                >
                  <option value="beginner">{t('workshops.types.beginner')}</option>
                  <option value="intermediate">{t('workshops.types.intermediate')}</option>
                  <option value="group">{t('workshops.types.group')}</option>
                  <option value="private">{t('workshops.types.private')}</option>
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="ws-privacyAccepted"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 rounded border-gold/40 bg-white text-gold
                      focus:ring-gold focus:ring-offset-0"
                    data-testid="workshop-privacy-checkbox"
                  />
                  <label htmlFor="ws-privacyAccepted" className="text-forest/90 font-montserrat text-sm">
                    {t('forBusiness.privacyLabel')}{' '}
                    <button
                      type="button"
                      onClick={scrollToPrivacy}
                      className="text-gold-dark hover:text-gold underline"
                    >
                      {t('forBusiness.privacyLink')}
                    </button>{' '}
                    *
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="ws-subscribeNewsletter"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-gold/40 bg-white text-gold
                      focus:ring-gold focus:ring-offset-0"
                    data-testid="workshop-newsletter-checkbox"
                  />
                  <label htmlFor="ws-subscribeNewsletter" className="text-forest/90 font-montserrat text-sm">
                    {t('forBusiness.newsletterLabel')}
                  </label>
                </div>
              </div>

              <GoldButton type="submit" className="w-full" dataTestId="workshop-submit-button" disabled={isSubmitting}>
                {isSubmitting ? t('workshops.submitting') : t('workshops.submitButton')}
              </GoldButton>
            </form>

            <div className="mt-6 space-y-3 text-forest/70 font-montserrat text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold-dark" />
                <span>{t('workshops.schedule')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-dark" />
                <span>{t('workshops.location')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;
