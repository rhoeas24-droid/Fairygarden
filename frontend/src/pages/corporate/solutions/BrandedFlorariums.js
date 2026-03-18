import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, CheckCircle, Mail, Palette, Package } from 'lucide-react';

const BrandedFlorariums = () => {
  const options = [
    {
      name: 'Mini Desk Terrariums',
      description: 'Compact branded terrariums perfect for employee desks.',
      minOrder: '25 units',
      image: '/business_gift_small.png'
    },
    {
      name: 'Medium Gift Terrariums',
      description: 'Elegant mid-size terrariums ideal for client gifts.',
      minOrder: '15 units',
      image: '/business_gift_small.png'
    },
    {
      name: 'Premium Statement Pieces',
      description: 'Large, impressive terrariums for VIP gifts or awards.',
      minOrder: '5 units',
      image: '/business_gift_exclusive.png'
    }
  ];

  const brandingOptions = [
    'Custom branded packaging with your logo',
    'Personalized care cards with your message',
    'Branded plant markers and tags',
    'Custom ribbon and gift wrapping',
    'Corporate color-coordinated designs',
    'QR codes linking to your company'
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
                Branded Florariums
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Living gifts that keep your brand on their desks.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                Transform your corporate gifting with unique, branded terrariums. 
                Unlike traditional gifts that are forgotten, our living florariums 
                stay on recipients' desks for years, keeping your brand visible 
                and memorable.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Gift className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Fully Customizable</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Palette className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Brand Colors</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Package className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Gift-Ready</span>
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
                src="/business_gift_small.png"
                alt="Branded Florariums"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Gift Options
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {options.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl overflow-hidden hover:border-gold/50 transition-all"
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-cinzel font-bold text-gold mb-2">{option.name}</h3>
                  <p className="text-cream/70 font-montserrat text-sm mb-4">{option.description}</p>
                  <p className="text-gold/80 font-montserrat text-sm">Min. order: {option.minOrder}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Options */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Branding Options
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {brandingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-forest/40 border border-gold/20 rounded-lg p-4"
              >
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-cream/80 font-montserrat">{option}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-forest/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold mb-6">
            Create Your Branded Collection
          </h2>
          <p className="text-cream/70 font-montserrat mb-8">
            Tell us about your gifting needs and we'll design a custom solution for your brand.
          </p>
          <Link
            to="/corporate#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-forest font-montserrat font-bold rounded-full hover:bg-gold-light transition-colors"
          >
            <Mail className="w-5 h-5" />
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BrandedFlorariums;
