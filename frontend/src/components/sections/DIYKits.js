import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Scissors, Leaf, BookOpen, Bug, Sparkles, ArrowRight } from 'lucide-react';
import { GlassWater, Layers, FlaskConical, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomTerrariumBuilder from '../CustomTerrariumBuilder';

const DIYKits = () => {
  const { t } = useTranslation();
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);

  return (
    <section id="diy-kits" className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gold-dark mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-forest mb-4" data-testid="diy-kits-title">
            {t('diy.title')}
          </h2>
          
          {/* Full Description Text */}
          <div className="max-w-3xl mx-auto space-y-4 text-forest/80 font-montserrat text-sm sm:text-base lg:text-lg leading-relaxed text-justify px-4">
            <p>
              Love our gardens but want the hands-on experience of building one yourself? Choose any design from our entire collection — past and present. Even if it's no longer available in the shop, the concept lives on, and you can recreate it at home with our DIY Kit.
            </p>
            <p>
              We take care of the rest: every substrate layer, every plant, every tool — all carefully selected and packed for you, along with a detailed step-by-step guide to walk you through the whole process.
            </p>
            <p className="mt-8">
              Can't find your perfect design?{' '}
              <button 
                onClick={() => setIsCustomBuilderOpen(true)}
                className="text-gold-dark hover:text-gold font-semibold underline decoration-gold/50 hover:decoration-gold transition-colors"
              >
                Put together your own right here!
              </button>
            </p>
          </div>
          
          {/* Kit Contents Grid */}
          <div className="mt-10 sm:mt-16 mb-8 max-w-4xl mx-auto px-2">
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-forest mb-6 text-center">
              Our kits include:
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
            {[
              { icon: GlassWater, name: 'Glass Container' },
              { icon: Layers, name: 'Drainage Mix' },
              { icon: FlaskConical, name: 'Substrate Mix' },
              { icon: Leaf, name: 'Plants' },
              { icon: Sparkles, name: 'Decor Items' },
              { icon: Scissors, name: 'Scissors' },
              { icon: PenTool, name: 'Tweezers' },
              { icon: PenTool, name: 'Brush' },
              { icon: BookOpen, name: 'Step-by-Step Guide' },
              { icon: Bug, name: 'Magic Bugs' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 sm:gap-2 text-forest">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gold-dark" />
                </div>
                <span className="font-montserrat font-semibold text-xs sm:text-sm text-center leading-tight">{item.name}</span>
              </div>
            ))}
            </div>
          </div>

          {/* Go to Webshop Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              to="/webshop#diy-kits"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-forest hover:bg-forest/90 text-cream font-cinzel font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Go to Webshop
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <CustomTerrariumBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
      />
    </section>
  );
};

export default DIYKits;
