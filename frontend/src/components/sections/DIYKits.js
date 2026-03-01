import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Wrench, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'sonner';
import { useCart } from '../../contexts/CartContext';
import CustomTerrariumBuilder from '../CustomTerrariumBuilder';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Helper function to strip HTML tags from WooCommerce descriptions
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

const DIYKits = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Refetch products when language changes
  useEffect(() => {
    fetchProducts();
  }, [i18n.language]);

  const fetchProducts = async () => {
    try {
      // Fetch from WooCommerce API with language parameter
      const response = await axios.get(`${API}/wc/products`, {
        params: { lang: i18n.language }
      });
      // Filter only DIY Kits category
      const diyKits = response.data.filter(p => 
        p.category === 'DIY Kits' || p.categories?.includes('DIY Kits')
      );
      setProducts(diyKits);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to old API if WooCommerce fails
      try {
        const fallbackResponse = await axios.get(`${API}/products`);
        setProducts(fallbackResponse.data.filter(p => p.category === 'DIY Kit'));
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const diyProduct = {
      ...product,
      id: `diy-${product.id}`,
      name: `DIY Kit: ${product.name}`,
      price: product.price * 0.85, // 15% cheaper as DIY
      isDIYKit: true
    };
    addToCart(diyProduct);
    toast.success(`DIY Kit: ${product.name} added to cart!`);
  };

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
          
          {/* New Description */}
          <div className="max-w-3xl mx-auto space-y-4 text-forest/80 font-montserrat text-sm sm:text-base lg:text-lg leading-relaxed text-justify px-4">
            <p>
              {t('diy.description1')}
            </p>
            <p>
              {t('diy.description2')}
            </p>
            <p className="mt-8">
              {t('diy.cantFind')}{' '}
              <button 
                onClick={() => setIsCustomBuilderOpen(true)}
                className="text-gold-dark hover:text-gold font-semibold underline decoration-gold/50 hover:decoration-gold transition-colors"
              >
                {t('diy.buildOwn')}
              </button>
            </p>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16 mb-8">
            <div className="flex flex-col items-center gap-2 text-forest">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                <Package className="w-7 h-7 text-gold-dark" />
              </div>
              <span className="font-cinzel font-bold text-base sm:text-lg">{t('diy.featureIncluded')}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-forest">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                <Wrench className="w-7 h-7 text-gold-dark" />
              </div>
              <span className="font-cinzel font-bold text-base sm:text-lg">{t('diy.featureTools')}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-forest">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-gold-dark" />
              </div>
              <span className="font-cinzel font-bold text-base sm:text-lg">{t('diy.featureGuide')}</span>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.filter(p => !p.name.toLowerCase().includes('diy')).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gold/10"
                data-testid={`diy-product-${product.id}`}
              >
                {/* Image with Frame */}
                <div className="relative aspect-square overflow-hidden bg-forest/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* DIY Badge */}
                  <div className="absolute top-3 left-3 bg-gold text-forest px-3 py-1 rounded-full text-xs font-bold font-montserrat">
                    DIY KIT
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-cinzel font-bold text-forest text-sm sm:text-base mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-forest/60 font-montserrat text-xs line-clamp-2 mb-3 text-justify">
                    {stripHtml(product.description)}
                  </p>
                  
                  {/* Price - 15% less than ready-made */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gold-dark font-cinzel font-bold text-lg">
                        €{(product.price * 0.85).toFixed(2)}
                      </span>
                      <span className="text-forest/40 font-montserrat text-xs ml-2 line-through">
                        €{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3 py-2 px-4 bg-forest hover:bg-forest/90 text-cream font-montserrat text-sm font-semibold rounded-lg transition-colors"
                    data-testid={`diy-add-to-cart-${product.id}`}
                  >
                    {t('diy.addToCart')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <CustomTerrariumBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
      />
    </section>
  );
};

export default DIYKits;
