import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import ProductDetailModal from '../ProductDetailModal';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCard = ({ product, index, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      {/* Product image with gold frame overlay */}
      <div className="relative" style={{ aspectRatio: '867/1535' }}>
        <img
          src={product.image || '/BG_TILE_FINAL.jpg'}
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
        <img
          src="https://fairygarden4u.com/ablak_frame.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
      </div>
      
      {/* Product info */}
      <div className="p-3 sm:p-4 space-y-2 text-center">
        <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="text-base sm:text-lg font-cinzel font-bold text-gold">
            €{parseFloat(product.price).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
              text-[#3e2b08] font-bold text-[10px] sm:text-xs uppercase rounded-full tracking-wider
              shadow-[0_4px_8px_rgba(0,0,0,0.2)]
              hover:shadow-[0_6px_12px_rgba(201,168,76,0.4)]
              active:translate-y-0.5 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ToolsEquipments = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/wc/products`, {
          params: { category: 'tools-equipments' }
        });
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching tools & equipments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section 
      id="tools-equipments" 
      className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 scroll-mt-24"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Wrench className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-4">
            Tools & Equipments
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Professional terrarium tools for planting, maintenance, and care. 
            Everything you need to create and maintain your miniature garden.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Wrench className="w-16 h-16 text-gold/30 mx-auto mb-4" />
            <p className="text-cream/60 font-montserrat text-lg">
              Tools & Equipments coming soon! Check back later for our selection.
            </p>
          </motion.div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default ToolsEquipments;
