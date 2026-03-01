import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, Users, Gift, Gem, TreeDeciduous, CalendarDays, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GoldButton from '../GoldButton';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Service card component with alternating layout
const ServiceCard = ({ service, index, t }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-10 items-center mb-12 lg:mb-20`}
      data-testid={`service-card-${service.id}`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          {/* Golden frame effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-gold/30 via-gold/50 to-gold/30 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-xl border-2 border-gold/40 bg-forest-dark">
            <img
              src={service.image}
              alt={t(`forBusiness.services.${service.id}.title`)}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <div className={`flex items-center gap-3 mb-4 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
          <service.icon className="w-8 h-8 text-gold" />
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-cinzel font-bold text-gold">
            {t(`forBusiness.services.${service.id}.title`)}
          </h3>
        </div>
        <p className="text-cream/85 font-montserrat text-sm sm:text-base leading-relaxed text-justify">
          {t(`forBusiness.services.${service.id}.description`)}
        </p>
      </div>
    </motion.div>
  );
};

const ForBusiness = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    privacyAccepted: false,
    subscribeNewsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service definitions with images and icons
  const services = [
    {
      id: 'teambuilding',
      image: '/business_teambuilding.png',
      icon: Users
    },
    {
      id: 'representativeGift',
      image: '/business_gift_small.png',
      icon: Gift
    },
    {
      id: 'exclusiveGift',
      image: '/business_gift_exclusive.png',
      icon: Gem
    },
    {
      id: 'officeDecor',
      image: '/business_office_decor.png',
      icon: TreeDeciduous
    },
    {
      id: 'eventRental',
      image: '/business_event_rental.png',
      icon: CalendarDays
    }
  ];

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
        service: formData.service,
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
      setFormData({ name: '', email: '', company: '', service: '', message: '', privacyAccepted: false, subscribeNewsletter: false });
    } catch (error) {
      toast.error(t('forBusiness.errorMessage'));
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPrivacy = () => {
    window.dispatchEvent(new CustomEvent('openPrivacyModal'));
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="for-business-title">
            {t('forBusiness.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-2">
            {t('forBusiness.subtitle')}
          </p>
        </motion.div>

        {/* Services */}
        <div className="mb-16 lg:mb-24">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} t={t} />
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-2xl mx-auto"
          id="business-contact-form"
        >
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold text-center mb-6 sm:mb-8">
            {t('forBusiness.formTitle')}
          </h3>
          
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
                placeholder={t('forBusiness.namePlaceholder')}
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
                placeholder={t('forBusiness.companyPlaceholder')}
                data-testid="contact-company-input"
              />
            </div>

            {/* Service Dropdown */}
            <div>
              <label htmlFor="service" className="block text-cream font-montserrat font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                {t('forBusiness.serviceLabel')}
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gold/40 text-cream
                    focus:border-gold focus:ring-1 focus:ring-gold rounded-md font-montserrat text-sm sm:text-base
                    transition-all duration-200 appearance-none cursor-pointer"
                  data-testid="contact-service-select"
                >
                  <option value="" className="bg-forest text-cream">{t('forBusiness.servicePlaceholder')}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id} className="bg-forest text-cream">
                      {t(`forBusiness.services.${service.id}.title`)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold pointer-events-none" />
              </div>
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
                placeholder={t('forBusiness.messagePlaceholder')}
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
