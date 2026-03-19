import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gem, TreePine, ShoppingCart, Eye } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import ProductDetailModal from '../ProductDetailModal';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DecorationsTerrascaping = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/wc/products`, {
          params: { category: 'decorations-terrascaping' }
        });
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching decorations:', error);
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
      id="decorations-terrascaping" 
      className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 scroll-mt-24"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            <Gem className="w-10 h-10 sm:w-14 sm:h-14 text-gold" />
            <TreePine className="w-10 h-10 sm:w-14 sm:h-14 text-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-4">
            Decorations & Terrascaping
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Driftwood, stones, moss, and miniature figures to bring your terrarium world to life. 
            Create stunning landscapes with our handpicked decorations.
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer"
              >
                <div className="bg-forest-dark/50 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden
                  hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)]">
                  
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image || '/BG_TILE_FINAL.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Quick actions */}
                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="p-2 bg-gold text-forest rounded-full hover:bg-gold-light transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="p-2 bg-forest/80 text-gold border border-gold/30 rounded-full hover:bg-forest transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-cinzel font-bold text-gold text-sm sm:text-base mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gold font-montserrat font-bold text-lg">
                      €{parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="flex justify-center gap-2 mb-4">
              <Gem className="w-12 h-12 text-gold/30" />
              <TreePine className="w-12 h-12 text-gold/30" />
            </div>
            <p className="text-cream/60 font-montserrat text-lg">
              Decorations & Terrascaping items coming soon! Check back later for our selection.
            </p>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
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

export default DecorationsTerrascaping;
