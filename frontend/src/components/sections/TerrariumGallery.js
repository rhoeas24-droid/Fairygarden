import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { Sparkles, Wand2, Eye, ChevronDown, ShoppingBag } from 'lucide-react';
import GoldButton from '../GoldButton';
import CustomTerrariumBuilder from '../CustomTerrariumBuilder';
import ProductDetailModal from '../ProductDetailModal';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Helper function to strip HTML tags from WooCommerce descriptions
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

// Calculate minimum price: S + Minimal + Container + No lighting
const MIN_CUSTOM_PRICE = (35.99 * 1.2 * 1.1 * 1.0).toFixed(2);

const ProductCard = ({ product, index, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      variation_id: product.variation_id || null
    });
    toast.success(t('gallery.addedToCart', { name: product.name }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
      onClick={() => onViewDetails(product)}
      data-testid={`product-card-${product.id}`}
    >
      {/* Product image with gold frame overlay */}
      <div className="relative" style={{ aspectRatio: '867/1535' }}>
        {/* Product image - positioned inside the transparent area */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute object-cover z-0"
          style={{
            left: '9.8%',
            top: '9.4%',
            width: '80.4%',
            height: '83.4%',
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Gold frame overlay - on top */}
        <img
          src="https://fairygarden4u.com/ablak_frame.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
      </div>
      
      {/* Product info */}
      <div className="p-3 sm:p-4 space-y-2 text-center">
        <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-cream/70 font-montserrat text-xs leading-relaxed line-clamp-2 text-justify">
          {stripHtml(product.description)}
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="text-base sm:text-lg font-cinzel font-bold text-gold" data-testid={`product-price-${product.id}`}>
            €{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
              text-[#3e2b08] font-bold text-[10px] sm:text-xs uppercase rounded-full tracking-wider
              shadow-[0_4px_8px_rgba(0,0,0,0.2)]
              hover:shadow-[0_6px_12px_rgba(201,168,76,0.4)]
              active:translate-y-0.5 transition-all duration-200"
            data-testid={`add-to-cart-${product.id}`}
          >
            {t('gallery.addToCart')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TerrariumGallery = () => {
  const [products, setProducts] = useState([]);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWebshopExpanded, setIsWebshopExpanded] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchProducts();
    
    // Check if URL has shop anchor - auto expand
    const hash = window.location.hash;
    if (hash && (hash.includes('shop-bottles') || hash.includes('shop-plants') || hash.includes('shop-decorations'))) {
      setIsWebshopExpanded(true);
    }
    
    // Listen for expand webshop event from navigation
    const handleExpandWebshop = (e) => {
      setIsWebshopExpanded(true);
      // Scroll to target after expansion
      setTimeout(() => {
        const targetId = e.detail?.targetId;
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
    };
    
    window.addEventListener('expandWebshop', handleExpandWebshop);
    return () => window.removeEventListener('expandWebshop', handleExpandWebshop);
  }, []);

  // Refetch products when language changes
  useEffect(() => {
    fetchProducts();
  }, [i18n.language]);

  const fetchProducts = async () => {
    try {
      // Fetch from WooCommerce API with language parameter and product_type filter
      const response = await axios.get(`${API}/wc/products`, {
        params: { lang: i18n.language, product_type: 'ready-florarium' }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to old API if WooCommerce fails
      try {
        const fallbackResponse = await axios.get(`${API}/products`);
        setProducts(fallbackResponse.data);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/85" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="gallery-title">
            {t('gallery.title')}
          </h2>
          <p className="text-cream font-montserrat text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-justify
            bg-forest/50 backdrop-blur-md border border-gold/15 rounded-xl px-5 py-3 sm:px-6 sm:py-4
            shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            {t('gallery.subtitle')}
          </p>
          <p className="text-gold font-montserrat text-xs sm:text-sm mt-3 sm:mt-4 max-w-2xl mx-auto italic text-justify
            bg-forest/40 backdrop-blur-sm border border-gold/10 rounded-lg px-4 py-2.5
            shadow-[0_2px_20px_rgba(212,175,55,0.08)]">
            {t('gallery.uniqueNote')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onViewDetails={setSelectedProduct}
            />
          ))}
          
          {/* Custom Terrarium Card - same style as products */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: products.length * 0.1 }}
            className="hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            onClick={() => setIsCustomBuilderOpen(true)}
            data-testid="custom-terrarium-card"
          >
            {/* Build Your Own with gold frame overlay */}
            <div className="relative" style={{ aspectRatio: '867/1535' }}>
              {/* Build Your Own image - positioned inside the transparent area */}
              <img
                src="https://fairygarden4u.com/build_your_own.jpg"
                alt="Build Your Own Terrarium"
                className="absolute object-cover z-0"
                style={{
                  left: '9.8%',
                  top: '9.4%',
                  width: '80.4%',
                  height: '83.4%',
                }}
              />
              {/* Gold frame overlay - on top */}
              <img
                src="https://fairygarden4u.com/ablak_frame.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
              />
            </div>
            
            {/* Custom info */}
            <div className="p-3 sm:p-4 space-y-2 text-center">
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide">
                {t('gallery.customTitle')}
              </h3>
              <p className="text-cream/70 font-montserrat text-xs leading-relaxed text-justify">
                {t('gallery.customDescription')}
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1 flex-wrap">
                <span className="text-base sm:text-lg font-cinzel font-bold text-gold">
                  {t('gallery.customFromPrice', { price: MIN_CUSTOM_PRICE })}
                </span>
                <span className="px-3 sm:px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                  text-[#3e2b08] font-bold text-[10px] sm:text-xs uppercase rounded-full tracking-wider
                  shadow-[0_4px_8px_rgba(0,0,0,0.2)]
                  group-hover:shadow-[0_6px_12px_rgba(201,168,76,0.4)]
                  transition-all duration-200"
                >
                  {t('gallery.customButton')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Browse More Categories */}
        {!isWebshopExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => {
                setIsWebshopExpanded(true);
                setTimeout(() => {
                  document.getElementById('shop-bottles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-forest font-cinzel font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-6 h-6" />
              Browse Our Webshop
              <ChevronDown className="w-5 h-5" />
            </button>
          </motion.div>
        )}
        
        {/* Expanded Webshop Categories */}
        <AnimatePresence>
          {isWebshopExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-24 space-y-16"
            >
              {/* Bottles, Jars & Tools */}
              <div id="shop-bottles" className="scroll-mt-24">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-6 text-center">
                  Bottles, Jars & Tools
                </h3>
                <p className="text-cream/70 font-montserrat text-center mb-8 max-w-2xl mx-auto">
                  Professional tools and premium glass containers for your florarium projects
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative opacity-50" style={{ aspectRatio: '867/1535' }}>
                      <div className="absolute inset-[8%] rounded-lg bg-forest/30 border border-gold/20 flex items-center justify-center">
                        <span className="text-gold/40 font-cinzel text-sm">Coming Soon</span>
                      </div>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'url(https://fairygarden4u.com/ablak_frame.png)',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Plants & Substrate Mix */}
              <div id="shop-plants" className="scroll-mt-24">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-6 text-center">
                  Plants & Substrate Mix
                </h3>
                <p className="text-cream/70 font-montserrat text-center mb-8 max-w-2xl mx-auto">
                  Home-grown plants and our special tried-and-tested substrate blend
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative opacity-50" style={{ aspectRatio: '867/1535' }}>
                      <div className="absolute inset-[8%] rounded-lg bg-forest/30 border border-gold/20 flex items-center justify-center">
                        <span className="text-gold/40 font-cinzel text-sm">Coming Soon</span>
                      </div>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'url(https://fairygarden4u.com/ablak_frame.png)',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorations & Terrascaping */}
              <div id="shop-decorations" className="scroll-mt-24">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-6 text-center">
                  Decorations & Terrascaping
                </h3>
                <p className="text-cream/70 font-montserrat text-center mb-8 max-w-2xl mx-auto">
                  Driftwood, stones, moss and miniature figures to bring your world to life
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative opacity-50" style={{ aspectRatio: '867/1535' }}>
                      <div className="absolute inset-[8%] rounded-lg bg-forest/30 border border-gold/20 flex items-center justify-center">
                        <span className="text-gold/40 font-cinzel text-sm">Coming Soon</span>
                      </div>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'url(https://fairygarden4u.com/ablak_frame.png)',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <CustomTerrariumBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
      />
      
      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </section>
  );
};

export default TerrariumGallery;