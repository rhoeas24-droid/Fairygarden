import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, CheckCircle, Crown, Star, Award } from 'lucide-react';
import CorporateContactForm from '../CorporateContactForm';

const PartnerGifts = () => {
  const giftTiers = [
    {
      name: 'Executive Collection',
      description: 'Impressive medium-format terrariums for valued partners.',
      features: ['30-40cm displays', 'Premium glass vessels', 'Luxury packaging', 'Personalized card'],
      icon: Star,
      priceRange: '€150-300'
    },
    {
      name: 'Prestige Collection',
      description: 'Large statement pieces for your most important relationships.',
      features: ['50-70cm displays', 'Designer containers', 'White-glove delivery', 'Custom plaque'],
      icon: Crown,
      priceRange: '€400-800'
    },
    {
      name: 'Bespoke Commissions',
      description: 'One-of-a-kind living art pieces created specifically for VIPs.',
      features: ['Custom dimensions', 'Unique designs', 'Artist collaboration', 'Installation service'],
      icon: Award,
      priceRange: 'From €1000'
    }
  ];

  const occasions = [
    'Partnership anniversaries',
    'Major contract signings',
    'VIP client appreciation',
    'Board member recognition',
    'Retirement celebrations',
    'Holiday executive gifts'
  ];

  const whyChoose = [
    'Memorable and unique - not another bottle of wine',
    'Long-lasting - grows with your relationship',
    'Conversation starter on their desk',
    'Reflects care and thoughtfulness',
    'Eco-friendly and sustainable',
    'Personalized to recipient'
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
                Exclusive Partner Gifts
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Impress VIP partners with bespoke, living art.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                For relationships that matter most, ordinary gifts won't do. Our premium 
                partner gift collection features handcrafted terrariums that make a lasting 
                impression - literally growing on their desk as a reminder of your partnership.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Crown className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">VIP Quality</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Gift className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Luxury Packaging</span>
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
                src="/business_gift_exclusive.png"
                alt="Partner Gifts"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gift Tiers */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Gift Collections
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {giftTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all text-center"
              >
                <tier.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-cinzel font-bold text-gold mb-3">{tier.name}</h3>
                <p className="text-cream/70 font-montserrat text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6 text-left">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-cream/60 font-montserrat text-sm">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-gold font-cinzel font-bold text-lg">{tier.priceRange}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Perfect Occasions
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {occasions.map((occasion, index) => (
              <motion.span
                key={occasion}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-forest/40 border border-gold/20 text-cream/80 font-montserrat px-5 py-2 rounded-full"
              >
                {occasion}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Why Terrarium Gifts?
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {whyChoose.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-forest/60 border border-gold/20 rounded-lg p-4"
              >
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-cream/80 font-montserrat">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <CorporateContactForm serviceType="Partner Gifts" />
    </div>
  );
};

export default PartnerGifts;
