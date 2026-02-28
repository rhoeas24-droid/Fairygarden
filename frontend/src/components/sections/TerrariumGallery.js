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
      {/* Frame with image */}
      <div className="relative aspect-square">
        {/* Golden frame - background */}
        <img
          src="/ablak.png"
          alt=""
          className="absolute inset-0 w-full h-full object-fill"
        />
        {/* Product image - on top in center */}
        <div className="absolute inset-[15%] overflow-hidden rounded-lg shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-[15%] rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <Eye className="w-12 h-12 text-gold" />
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-cinzel font-bold text-gold" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-cream/80 font-montserrat text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-cinzel font-bold text-gold-light" data-testid={`product-price-${product.id}`}>
            €{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
              text-[#3e2b08] font-bold text-xs uppercase rounded-full
              shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),inset_-1px_-1px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
              hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.6),0_6px_12px_rgba(201,168,76,0.3)]
              active:translate-y-1 transition-all duration-200"
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
      className="relative py-24 px-4"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-4" data-testid="gallery-title">
            {t('gallery.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-lg max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
          <p className="text-gold/80 font-montserrat text-sm mt-4 max-w-2xl mx-auto italic">
            {t('gallery.uniqueNote')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            {/* Frame with wand icon */}
            <div className="relative aspect-square">
              {/* Background inside frame */}
              <div className="absolute inset-[12%] overflow-hidden flex items-center justify-center bg-forest/80">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-center relative"
                >
                  <Wand2 className="w-16 h-16 text-gold mx-auto" />
                  <Sparkles className="w-6 h-6 text-gold-light absolute -top-2 -right-2 animate-pulse" />
                  <Sparkles className="w-4 h-4 text-gold-light absolute -bottom-1 -left-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </motion.div>
              </div>
              {/* Golden frame - on top */}
              <img
                src="/ablak.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />
            </div>
            
            {/* Custom info */}
            <div className="p-4 space-y-2 text-center">
              <h3 className="text-lg font-cinzel font-bold text-gold">
                {t('gallery.customTitle')}
              </h3>
              <p className="text-cream/80 font-montserrat text-xs leading-relaxed line-clamp-2">
                {t('gallery.customDescription')}
              </p>
              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="text-xl font-cinzel font-bold text-gold-light">
                  {t('gallery.customFromPrice', { price: MIN_CUSTOM_PRICE })}
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                  text-[#3e2b08] font-bold text-xs uppercase rounded-full
                  shadow-[inset_1px_1px_4px_rgba(255,255,255,0.5),inset_-1px_-1px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
                  group-hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,0.6),inset_-1px_-1px_4px_rgba(0,0,0,0.6),0_6px_12px_rgba(201,168,76,0.3)]
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