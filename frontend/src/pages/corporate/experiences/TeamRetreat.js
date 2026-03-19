import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle } from 'lucide-react';
import CorporateContactForm from '../CorporateContactForm';

const TeamRetreat = () => {
  const benefits = [
    'Disconnect from daily stress and reconnect with your team',
    'Learn the meditative art of terrarium building',
    'Take home a living reminder of your shared experience',
    'Boost creativity and team bonding',
    'Customizable duration and group sizes'
  ];

  const packages = [
    {
      name: 'Half-Day Retreat',
      duration: '4 hours',
      groupSize: '10-25 people',
      includes: ['Welcome refreshments', 'Guided terrarium workshop', 'All materials included', 'Take-home terrarium']
    },
    {
      name: 'Full-Day Experience',
      duration: '8 hours',
      groupSize: '10-50 people',
      includes: ['Breakfast & lunch', 'Nature walk', 'Two workshop sessions', 'Premium terrarium kit', 'Team photos']
    },
    {
      name: 'Weekend Retreat',
      duration: '2 days',
      groupSize: '15-40 people',
      includes: ['Accommodation', 'All meals', 'Multiple workshops', 'Evening activities', 'Premium gift pack']
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
                Team Retreat Experience
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Step away from roles and reconnect through a slow, creative process.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                Our team retreats offer a unique opportunity to bond with colleagues in a peaceful, 
                nature-inspired setting. Through the meditative practice of terrarium building, 
                your team will discover new ways to collaborate, communicate, and create together.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-cream/80 font-montserrat">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/business_teambuilding.png"
                alt="Team Retreat"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-gold/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Retreat Packages
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all"
              >
                <h3 className="text-xl font-cinzel font-bold text-gold mb-4">{pkg.name}</h3>
                <div className="flex items-center gap-4 mb-4 text-cream/70 font-montserrat text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pkg.groupSize}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-cream/70 font-montserrat text-sm">
                      <CheckCircle className="w-4 h-4 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/corporate#contact"
                  className="block text-center py-2 px-4 bg-gold text-forest font-montserrat font-semibold rounded-full hover:bg-gold-light transition-colors"
                >
                  Get Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <CorporateContactForm serviceType="Team Retreat" />
    </div>
  );
};

export default TeamRetreat;
