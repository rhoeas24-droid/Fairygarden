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
    workshop_type: 'single',
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
      setFormData({ name: '', email: '', phone: '', workshop_type: 'single', privacyAccepted: false, subscribeNewsletter: false });
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
    <section id="workshops" className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gold-dark mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-forest mb-3 sm:mb-4" data-testid="workshops-title">
            {t('workshops.title')}
          </h2>
          <p className="text-forest/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            {t('workshops.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-6"
          >
            <img
              src="https://fairygarden4u.com/workshop_event.jpg"
              alt="Florarium Workshop"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
            />
            
            {/* Workshop Description */}
            <div className="bg-forest/5 border border-gold/20 rounded-xl p-4 sm:p-6">
              <p className="text-forest/90 font-montserrat text-sm sm:text-base leading-relaxed text-justify">
                Join our hands-on florarium workshop and create your own stunning closed florarium from start to finish! All materials, tools and plants are provided — all you need to bring is your enthusiasm. We start with a short introduction to the magic of closed ecosystems, then guide you through designing and building your own creation step by step. Every participant leaves with their finished florarium in hand. Workshops last approximately 2–3 hours and require a minimum of 5 registered participants to run.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-forest/10 border border-gold/30 rounded-2xl p-4 sm:p-6 lg:p-8 order-1 lg:order-2"
          >
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-forest mb-4 sm:mb-6">{t('workshops.registerTitle')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="ws-name" className="block text-forest font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {t('workshops.nameLabel')} *
                </label>
                <input
                  type="text"
                  id="ws-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base"
                  placeholder="Your full name"
                  data-testid="workshop-name-input"
                />
              </div>

              <div>
                <label htmlFor="ws-email" className="block text-forest font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {t('workshops.emailLabel')} *
                </label>
                <input
                  type="email"
                  id="ws-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base"
                  placeholder="your@email.com"
                  data-testid="workshop-email-input"
                />
              </div>

              <div>
                <label htmlFor="ws-phone" className="block text-forest font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {t('workshops.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="ws-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gold/40 text-forest placeholder:text-forest/50
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base"
                  placeholder="(555) 123-4567"
                  data-testid="workshop-phone-input"
                />
              </div>

              <div>
                <label htmlFor="ws-type" className="block text-forest font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {t('workshops.workshopTypeLabel')} *
                </label>
                <select
                  id="ws-type"
                  name="workshop_type"
                  value={formData.workshop_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gold/40 text-forest
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base"
                  data-testid="workshop-type-select"
                >
                  <option value="single">For Single Person</option>
                  <option value="couples">For Couples</option>
                  <option value="family">For Families (3+ persons)</option>
                </select>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-2">
                <div className="flex items-start gap-2 sm:gap-3">
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
                  <label htmlFor="ws-privacyAccepted" className="text-forest/90 font-montserrat text-xs sm:text-sm">
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

                <div className="flex items-start gap-2 sm:gap-3">
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
                  <label htmlFor="ws-subscribeNewsletter" className="text-forest/90 font-montserrat text-xs sm:text-sm">
                    {t('forBusiness.newsletterLabel')}
                  </label>
                </div>
              </div>

              <GoldButton type="submit" className="w-full" dataTestId="workshop-submit-button" disabled={isSubmitting}>
                {isSubmitting ? t('workshops.submitting') : t('workshops.submitButton')}
              </GoldButton>
            </form>

            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-forest/70 font-montserrat text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dark flex-shrink-0" />
                <span>{t('workshops.schedule')}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dark flex-shrink-0" />
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
