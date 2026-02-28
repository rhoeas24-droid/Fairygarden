import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <section
      id="terms-conditions"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/95" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="terms-title">
            {t('terms.title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
        >
          <div className="prose prose-invert prose-gold max-w-none font-montserrat text-cream/90 space-y-6 sm:space-y-8 text-sm sm:text-base">
            
            {/* Chapter 1 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                {t('terms.chapter1.title')}
              </h3>
              <p className="text-cream/80 leading-relaxed">
                {t('terms.chapter1.content')}
              </p>
            </div>

            {/* Chapter 2 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                {t('terms.chapter2.title')}
              </h3>
              <p className="text-cream/80 leading-relaxed">
                {t('terms.chapter2.content')}
              </p>
            </div>

            {/* Chapter 3 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                {t('terms.chapter3.title')}
              </h3>
              <p className="text-cream/80 leading-relaxed">
                {t('terms.chapter3.content')}
              </p>
            </div>

            {/* Chapter 4 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                {t('terms.chapter4.title')}
              </h3>
              <p className="text-cream/80 leading-relaxed">
                {t('terms.chapter4.content')}
              </p>
            </div>

            {/* Chapter 5 - Custom Orders (Important!) */}
            <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 sm:p-6" id="terms-chapter-5">
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
                <span className="bg-gold text-forest px-2 py-1 rounded text-xs sm:text-sm">★</span>
                {t('terms.chapter5.title')}
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3 sm:space-y-4">
                <p>{t('terms.chapter5.intro')}</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-xs sm:text-sm">
                  <li>{t('terms.chapter5.point1')}</li>
                  <li>{t('terms.chapter5.point2')}</li>
                  <li>{t('terms.chapter5.point3')}</li>
                  <li>{t('terms.chapter5.point4')}</li>
                  <li>{t('terms.chapter5.point5')}</li>
                </ul>
              </div>
            </div>

            {/* Chapter 6 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                {t('terms.chapter6.title')}
              </h3>
              <p className="text-cream/80 leading-relaxed">
                {t('terms.chapter6.content')}
              </p>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-6 sm:pt-8 border-t border-gold/20">
              <p className="text-cream/50 text-xs sm:text-sm">
                {t('terms.lastUpdated')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsConditions;
