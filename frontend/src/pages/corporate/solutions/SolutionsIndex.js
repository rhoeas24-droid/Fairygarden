import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SolutionsIndex = () => {
  const solutions = [
    {
      title: 'Branded Florariums',
      path: '/corporate/solutions/branded-florariums',
      description: 'Mini living gifts with your brand — memorable and long-lasting',
      image: '/business_gift_small.png'
    },
    {
      title: 'Event Decor & Rental',
      path: '/corporate/solutions/event-decor',
      description: 'Elevate events with curated florarium displays',
      image: '/business_event_rental.png'
    },
    {
      title: 'Office & Reception Decor',
      path: '/corporate/solutions/office-decor',
      description: 'Transform your space with custom living installations',
      image: '/business_office_decor.png'
    },
    {
      title: 'Exclusive Partner Gifts',
      path: '/corporate/solutions/partner-gifts',
      description: 'One-of-a-kind living pieces for high-value relationships',
      image: '/business_gift_exclusive.png'
    }
  ];

  const benefits = [
    'Custom tailored for your brand & space',
    'Low maintenance, high appeal designs',
    'Long-lasting natural visual presence',
    'Full-service: design → install → support'
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 leading-tight">
                <span className="text-gold italic">Florarium Solutions</span><br />
                <span className="text-cream">for Workspaces & Brands</span>
              </h1>
              
              <p className="text-base sm:text-lg font-cinzel text-gold/70 italic mb-4">
                Elegant. Memorable. Living.
              </p>
              
              <div className="w-12 h-0.5 bg-gold/40 mb-4" />
              
              <p className="text-cream/75 font-montserrat text-sm sm:text-base leading-relaxed">
                Enhance your workspace, events, and brand presence with handcrafted living compositions designed to leave a lasting impression.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="/business_gift_exclusive.png"
                  alt="Florarium Solutions"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designed Solutions Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold italic">
              Designed Solutions
            </h2>
          </motion.div>

          {/* 2x2 Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="relative overflow-hidden rounded-lg border border-gold/20 bg-forest/40 backdrop-blur-sm h-full flex flex-col">
                  {/* Image */}
                  <div className="h-[180px] sm:h-[200px] overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-cream/65 font-montserrat text-sm leading-relaxed mb-4 flex-1">
                      {solution.description}
                    </p>
                    
                    {/* Explore Button */}
                    <Link
                      to={solution.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center w-fit px-5 py-2.5 
                        bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                        text-forest font-montserrat font-semibold text-sm
                        rounded border border-[#A88A3D]
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                        hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                        transition-all duration-200"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for Impact Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold italic">
              Designed for impact
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/80 font-montserrat text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsIndex;
