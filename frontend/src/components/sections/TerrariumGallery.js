import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { Sparkles, Wand2, Eye } from 'lucide-react';
import GoldButton from '../GoldButton';
import CustomTerrariumBuilder from '../CustomTerrariumBuilder';
import ProductDetailModal from '../ProductDetailModal';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Calculate minimum price: S + Minimal + Container + No lighting
const MIN_CUSTOM_PRICE = (35.99 * 1.2 * 1.1 * 1.0).toFixed(2);

const ProductCard = ({ product, index, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
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
        {/* Product image - behind the frame, positioned inside the transparent area */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute object-cover"
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
      
      {/* Product info */}
      <div className="p-3 sm:p-4 space-y-2 text-center">
        <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-cream/70 font-montserrat text-xs leading-relaxed line-clamp-2">
          {product.description}
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
  const { t } = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
          <p className="text-gold/80 font-montserrat text-xs sm:text-sm mt-3 sm:mt-4 max-w-2xl mx-auto italic">
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
              {/* Background with icon - positioned inside the transparent area */}
              <div 
                className="absolute bg-forest/50 flex items-center justify-center"
                style={{
                  left: '9.8%',
                  top: '9.4%',
                  width: '80.4%',
                  height: '83.4%',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-center relative"
                >
                  <Wand2 className="w-16 h-16 sm:w-20 sm:h-20 text-gold drop-shadow-lg" />
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold-light absolute -top-2 -right-2 animate-pulse" />
                </motion.div>
              </div>
              {/* Gold frame overlay - on top */}
              <img
                src="https://fairygarden4u.com/ablak_frame.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
              />
            </div>
            </div>
            
            {/* Custom info */}
            <div className="p-3 sm:p-4 space-y-2 text-center">
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide">
                {t('gallery.customTitle')}
              </h3>
              <p className="text-cream/70 font-montserrat text-xs leading-relaxed">
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