import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'sonner';
import { useCart } from '../../contexts/CartContext';
import ProductDetailModal from '../ProductDetailModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

const DIYKitsWebshop = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [i18n.language]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/wc/products`, {
        params: { lang: i18n.language, product_type: 'diy-kit' }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
      isDIYKit: true,
      variation_id: product.variation_id || null
    };
    addToCart(diyProduct);
    toast.success(t('gallery.addedToCart', { name: `DIY Kit: ${product.name}` }));
  };

  return (
    <section id="diy-kits" className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 bg-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gold-dark mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-forest mb-4" data-testid="diy-kits-title">
            DIY Florarium Kits
          </h2>
          <p className="text-forest/70 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Create your own florarium at home with our DIY Kit.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-forest/60 font-montserrat">{t('diy.noProducts', 'DIY kits coming soon!')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gold/10"
                data-testid={`diy-product-${product.id}`}
              >
                <div className="relative aspect-square overflow-hidden bg-forest/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-gold text-forest px-3 py-1 rounded-full text-xs font-bold font-montserrat">
                    DIY KIT
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-cinzel font-bold text-forest text-sm sm:text-base mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-forest/60 font-montserrat text-xs line-clamp-2 mb-3 text-justify">
                    {stripHtml(product.description)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gold-dark font-cinzel font-bold text-lg">
                        €{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2 px-3 bg-gold/20 hover:bg-gold/30 text-forest font-montserrat text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                      data-testid={`diy-view-${product.id}`}
                    >
                      <Eye className="w-4 h-4" />
                      {t('diy.viewDetails', 'Details')}
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 px-3 bg-forest hover:bg-forest/90 text-cream font-montserrat text-sm font-semibold rounded-lg transition-colors"
                      data-testid={`diy-add-to-cart-${product.id}`}
                    >
                      {t('diy.addToCart')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        isDIYKit={true}
      />
    </section>
  );
};

export default DIYKitsWebshop;
