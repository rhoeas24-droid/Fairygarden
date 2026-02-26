import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { Sparkles, Wand2 } from 'lucide-react';
import GoldButton from '../GoldButton';
import CustomTerrariumBuilder from '../CustomTerrariumBuilder';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(t('gallery.addedToCart', { name: product.name }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-forest/80 backdrop-blur-md border border-gold/30 rounded-xl overflow-hidden
        hover:border-gold hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]
        transition-all duration-300 group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-cinzel font-bold text-gold" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-cream/80 font-montserrat text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-cinzel font-bold text-gold-light" data-testid={`product-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
              text-[#3e2b08] font-bold text-sm uppercase rounded-full
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
            <ProductCard key={product.id} product={product} index={index} />
          ))}
          
          {/* Custom Terrarium Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: products.length * 0.1 }}
            className="bg-gradient-to-br from-gold/20 to-forest/80 backdrop-blur-md border-2 border-gold/50 border-dashed rounded-xl overflow-hidden
              hover:border-gold hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]
              transition-all duration-300 group cursor-pointer"
            onClick={() => setIsCustomBuilderOpen(true)}
            data-testid="custom-terrarium-card"
          >
            <div className="relative overflow-hidden aspect-square flex items-center justify-center bg-forest/60">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center"
              >
                <Wand2 className="w-20 h-20 text-gold mx-auto mb-4" />
                <Sparkles className="w-8 h-8 text-gold-light absolute top-1/4 right-1/4 animate-pulse" />
                <Sparkles className="w-6 h-6 text-gold-light absolute bottom-1/3 left-1/4 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </motion.div>
            </div>
            
            <div className="p-6 space-y-3 text-center">
              <h3 className="text-xl font-cinzel font-bold text-gold">
                {t('gallery.customTitle')}
              </h3>
              <p className="text-cream/80 font-montserrat text-sm leading-relaxed">
                {t('gallery.customDescription')}
              </p>
              <div className="pt-2">
                <span className="inline-block px-6 py-2 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
                  text-[#3e2b08] font-bold text-sm uppercase rounded-full
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
    </section>
  );
};

export default TerrariumGallery;