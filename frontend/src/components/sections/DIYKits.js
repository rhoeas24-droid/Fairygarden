import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GoldButton from '../GoldButton';

const DIYKits = () => {
  const { t } = useTranslation();
  
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="diy-kits" className="relative py-24 px-4 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-forest" data-testid="diy-kits-title">
              {t('diyKits.title')}
            </h2>
            <p className="text-forest/80 font-montserrat text-lg leading-relaxed">
              {t('diyKits.description')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-forest text-lg">{t('diyKits.premiumTitle')}</h3>
                  <p className="text-forest/70 font-montserrat">{t('diyKits.premiumDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-forest text-lg">{t('diyKits.giftTitle')}</h3>
                  <p className="text-forest/70 font-montserrat">{t('diyKits.giftDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-forest text-lg">{t('diyKits.easyTitle')}</h3>
                  <p className="text-forest/70 font-montserrat">{t('diyKits.easyDesc')}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <GoldButton onClick={scrollToGallery} dataTestId="shop-diy-kits-button">
                {t('diyKits.button')}
              </GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1640746956838-895c7faca1eb?auto=format&fit=crop&w=800&q=80"
                alt="DIY Terrarium Kit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
            </div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-cream"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1509021754700-4e73d47eb910?auto=format&fit=crop&w=400&q=80"
                alt="Finished Terrarium"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DIYKits;