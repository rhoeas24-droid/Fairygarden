import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import GoldButton from '../GoldButton';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
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
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TerrariumGallery = () => {
  const [products, setProducts] = useState([]);

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
            Enchanted Terrariums
          </h2>
          <p className="text-cream/80 font-montserrat text-lg max-w-2xl mx-auto">
            Discover our magical collection of handcrafted terrariums, each one a miniature world of wonder
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerrariumGallery;