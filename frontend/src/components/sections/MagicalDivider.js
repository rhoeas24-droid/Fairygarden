import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Truck, Heart, Award } from 'lucide-react';

const features = [
  {
    icon: Gift,
    title: 'Unique Gifts',
    description: 'Discover unique and sustainable gift ideas — from ready-made terrariums and DIY kits to hands-on experiences at our workshops.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Enjoy free delivery on all orders over €50. We ship our full product range across Cyprus.',
  },
  {
    icon: Heart,
    title: 'Handmade with Care',
    description: 'Every ready-made terrarium is crafted using our own in-house propagated plants, planted in our specially developed and perfected substrate.',
  },
  {
    icon: Award,
    title: "Cyprus's Only Shippable Pre-Assembled Terrarium Provider",
    description: 'Thanks to our unique technology, we are the only provider in Cyprus able to ship pre-assembled terrariums directly to your door.',
  },
];

const MagicalDivider = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="text-base sm:text-lg font-cinzel font-bold text-forest leading-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-forest/70 font-montserrat text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MagicalDivider;
