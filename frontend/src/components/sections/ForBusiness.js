import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ForBusiness = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 'experiences',
      title: 'Team Experiences',
      subtitle: 'Retreat & Team Building',
      description: 'Hands-on florarium workshops designed to develop your team — aligned with your business goals, culture, and challenges.',
      image: '/business_teambuilding.png',
      icon: Users,
      link: '/corporate/experiences'
    },
    {
      id: 'solutions',
      title: 'Florarium Solutions',
      subtitle: 'For Workspaces & Brands',
      description: 'Office & event decorations, branded gifts for employees and partners — living compositions that elevate your brand presence.',
      image: '/business_gift_exclusive.png',
      icon: Gift,
      link: '/corporate/solutions'
    }
  ];

  return (
    <section
      id="for-business"
      className="relative py-12 sm:py-16 lg:py-20 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-gold mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3" data-testid="for-business-title">
            {t('forBusiness.title')}
          </h2>
          <p className="text-cream/75 font-montserrat text-sm sm:text-base max-w-2xl mx-auto px-2">
            From team development workshops to elegant brand solutions — we bring living botanical art to your business.
          </p>
        </motion.div>

        {/* Two Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="h-full"
            >
              <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-forest/50 backdrop-blur-sm h-full flex flex-col">
                {/* Image */}
                <div className="h-[200px] sm:h-[240px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon className="w-6 h-6 text-gold" />
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold">
                      {category.title}
                    </h3>
                  </div>
                  
                  <p className="text-gold/70 font-montserrat text-sm font-medium mb-3">
                    {category.subtitle}
                  </p>
                  
                  <p className="text-cream/70 font-montserrat text-sm leading-relaxed mb-5 flex-1">
                    {category.description}
                  </p>
                  
                  {/* Explore Button */}
                  <Link
                    to={category.link}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center justify-center w-fit px-5 py-2.5 
                      bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                      text-forest font-montserrat font-semibold text-sm
                      rounded border border-[#A88A3D]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                      hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                      transition-all duration-200"
                    data-testid={`explore-${category.id}-btn`}
                  >
                    Explore {category.title}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10 sm:mt-14"
        >
          <p className="text-cream/60 font-montserrat text-sm mb-4">
            Not sure which option fits your needs?
          </p>
          <Link
            to="/corporate"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-gold font-montserrat text-sm font-semibold 
              border-b border-gold/50 hover:border-gold transition-colors"
          >
            View all business services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ForBusiness;
