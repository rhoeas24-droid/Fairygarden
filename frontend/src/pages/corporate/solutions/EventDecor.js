import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, Sparkles, Clock, Users } from 'lucide-react';
import CorporateContactForm from '../CorporateContactForm';

const EventDecor = () => {
  const eventTypes = [
    'Corporate Launches & Openings',
    'Conferences & Exhibitions',
    'Gala Dinners & Awards',
    'Product Presentations',
    'Wedding Venues',
    'Private Parties'
  ];

  const rentalOptions = [
    {
      name: 'Centerpiece Collection',
      description: 'Elegant table centerpieces for dining events and meetings.',
      includes: ['10-50 pieces', 'Delivery & setup', 'Collection after event'],
      price: 'From €15/piece'
    },
    {
      name: 'Statement Displays',
      description: 'Large floor-standing terrariums for reception areas and photo spots.',
      includes: ['5-20 pieces', 'Professional installation', 'Event duration rental'],
      price: 'From €50/piece'
    },
    {
      name: 'Full Venue Package',
      description: 'Complete terrarium styling for your entire event space.',
      includes: ['Custom design', 'All sizes included', 'On-site support'],
      price: 'Custom quote'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/corporate"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8 font-montserrat"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Corporate
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-6">
                Event Decor Rental
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Elevate your events with our curated terrarium displays.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                Create unforgettable atmospheres with our rental collection of premium 
                terrariums. From intimate dinners to grand galas, our pieces add a 
                touch of natural elegance that guests won't forget.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Flexible Rental</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Setup Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/business_event_rental.png"
                alt="Event Decor"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-cinzel font-bold text-gold mb-12">
            Perfect For
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map((type, index) => (
              <motion.span
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-forest/60 border border-gold/30 text-cream/80 font-montserrat px-5 py-2 rounded-full"
              >
                {type}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Options */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Rental Packages
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {rentalOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all flex flex-col"
              >
                <h3 className="text-xl font-cinzel font-bold text-gold mb-3">{option.name}</h3>
                <p className="text-cream/70 font-montserrat mb-4 flex-grow">{option.description}</p>
                <ul className="space-y-2 mb-4">
                  {option.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-cream/60 font-montserrat text-sm">
                      <CheckCircle className="w-4 h-4 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gold font-cinzel font-bold text-lg">{option.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <CorporateContactForm serviceType="Event Decor" />
    </div>
  );
};

export default EventDecor;
