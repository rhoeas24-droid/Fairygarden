import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Droplets, Sun, ThermometerSun, Ruler, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

// Helper function to strip HTML tags from WooCommerce descriptions
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

const ProductDetailModal = ({ isOpen, onClose, product, isDIYKit = false }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(t('gallery.addedToCart', { name: product.name }));
    onClose();
  };

  // Get dimensions from product or use defaults
  const height = product.dimensions?.height || '~20';
  const width = product.dimensions?.width || '~15';
  const weight = product.weight || '~1.5';

  // Care instructions for Ready Florariums
  const careInstructions = [
    { icon: Sun, title: t('product.care.light'), desc: t('product.care.lightDesc') },
    { icon: Droplets, title: t('product.care.water'), desc: t('product.care.waterDesc') },
    { icon: ThermometerSun, title: t('product.care.temp'), desc: t('product.care.tempDesc') },
    { icon: Leaf, title: t('product.care.maintenance'), desc: t('product.care.maintenanceDesc') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 pt-8 sm:pt-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-forest/80 border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Image */}
              <div className="relative p-8 bg-forest/50 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {isDIYKit && (
                    <div className="absolute -top-2 -right-2 z-10 bg-gold text-forest px-3 py-1 rounded-full text-xs font-bold">
                      DIY KIT
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-lg shadow-lg border-2 border-gold/30"
                  />
                </div>
              </div>

              {/* Right - Details */}
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-cinzel font-bold text-gold mb-2">
                    {product.name} {isDIYKit && '- DIY Kit'}
                  </h2>
                  <p className="text-cream/80 font-montserrat leading-relaxed text-justify">
                    {stripHtml(product.description)}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-cinzel font-bold text-gold-light">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="text-cream/60 text-sm">
                    {t('product.includesVat', 'incl. VAT')}
                  </span>
                </div>

                {/* Package Dimensions */}
                <div className="border-t border-gold/20 pt-4">
                  <h3 className="text-lg font-cinzel text-gold mb-3 flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    {isDIYKit ? t('diyKit.packageDimensions', 'Package Dimensions') : t('product.dimensions')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-forest/50 rounded-lg p-3 border border-gold/20">
                      <div className="text-gold font-bold">{height}cm</div>
                      <div className="text-cream/60 text-xs">{t('product.height')}</div>
                    </div>
                    <div className="bg-forest/50 rounded-lg p-3 border border-gold/20">
                      <div className="text-gold font-bold">{width}cm</div>
                      <div className="text-cream/60 text-xs">{t('product.width')}</div>
                    </div>
                    <div className="bg-forest/50 rounded-lg p-3 border border-gold/20">
                      <div className="text-gold font-bold">{weight}kg</div>
                      <div className="text-cream/60 text-xs">{t('product.weight')}</div>
                    </div>
                  </div>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                    text-[#3e2b08] font-bold text-lg uppercase rounded-full flex items-center justify-center gap-3
                    shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),inset_-1px_-1px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
                    hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.6),0_6px_12px_rgba(201,168,76,0.3)]
                    active:translate-y-1 transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isDIYKit ? t('diy.addToCart') : t('gallery.addToCart')}
                </button>
              </div>
            </div>

            {/* DIY Kit - no extra section, contents shown on main page */}
            {isDIYKit ? null : (
              <div className="p-8 border-t border-gold/20 bg-forest/30">
                <h3 className="text-xl font-cinzel text-gold mb-6 text-center">
                  {t('product.careTitle', 'Care Instructions')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {careInstructions.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-forest/50 rounded-xl border border-gold/20">
                      <item.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                      <h4 className="text-gold font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-cream/70 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            <div className="p-6 bg-gold/10 border-t border-gold/20">
              <p className="text-center text-cream/80 text-sm italic font-montserrat">
                {isDIYKit 
                  ? t('diyKit.note', 'Build your own magical terrarium with this complete kit. All materials carefully selected and packed.')
                  : t('product.uniqueNote', 'Each florarium is handcrafted and unique. The actual product may slightly differ from the image shown.')
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
