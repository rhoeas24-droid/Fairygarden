import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CheckCircle, Leaf, Sparkles } from 'lucide-react';
import CorporateContactForm from '../CorporateContactForm';

const OfficeDecor = () => {
  const services = [
    {
      title: 'Reception Installations',
      description: 'Make a stunning first impression with large-format terrarium displays in your lobby.',
      features: ['Custom sizes', 'Brand integration', 'Monthly maintenance']
    },
    {
      title: 'Office Floor Plants',
      description: 'Bring nature to every corner with strategically placed terrariums throughout your workspace.',
      features: ['Space planning', 'Light assessment', 'Care instructions']
    },
    {
      title: 'Meeting Room Features',
      description: 'Create inspiring meeting spaces with living centerpieces and wall installations.',
      features: ['Various sizes', 'Calming designs', 'Low maintenance']
    },
    {
      title: 'Executive Office Pieces',
      description: 'Premium, statement terrariums for executive offices and boardrooms.',
      features: ['Bespoke designs', 'Premium materials', 'VIP service']
    }
  ];

  const benefits = [
    'Improve air quality and employee wellbeing',
    'Reduce stress and boost productivity',
    'Create a unique, memorable workspace',
    'Low maintenance living decor',
    'Customizable to match your brand',
    'Sustainable and eco-friendly'
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
                Office & Reception Decor
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Transform your workspace with bespoke botanical arrangements.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                Create an inspiring work environment with our custom terrarium installations. 
                From stunning reception pieces to subtle desk companions, we design living 
                decor that enhances your space and reflects your brand identity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Building2 className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Custom Installations</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Leaf className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Low Maintenance</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Maintenance Available</span>
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
                src="/business_office_decor.png"
                alt="Office Decor"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all"
              >
                <h3 className="text-xl font-cinzel font-bold text-gold mb-3">{service.title}</h3>
                <p className="text-cream/70 font-montserrat mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs font-montserrat bg-gold/20 text-gold px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Benefits of Green Workspaces
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-forest/40 border border-gold/20 rounded-lg p-4"
              >
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-cream/80 font-montserrat">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <CorporateContactForm serviceType="Office Decor" />
    </div>
  );
};

export default OfficeDecor;
