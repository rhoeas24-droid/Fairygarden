import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
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

const ProductCard = ({ product, index, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = (e) => {
    e.stopPropagation();
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
      onClick={() => onViewDetails(product)}
      data-testid={`diy-product-${product.id}`}
    >
      {/* Product image with gold frame overlay */}
      <div className="relative" style={{ aspectRatio: '867/1535' }}>
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
        <img
          src="https://fairygarden4u.com/ablak_frame.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
        {/* DIY Badge */}
        <div className="absolute top-[12%] left-[12%] z-20 bg-gold text-forest px-3 py-1 rounded-full text-xs font-bold font-montserrat">
          DIY KIT
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-3 sm:p-4 space-y-2 text-center">
        <h3 className="text-sm sm:text-base font-cinzel font-bold text-gold uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-cream/70 font-montserrat text-xs leading-relaxed line-clamp-2 text-justify">
          {stripHtml(product.description)}
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="text-base sm:text-lg font-cinzel font-bold text-gold">
            €{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-br from-[#d4af37] via-[#c9a84c] to-[#8b7620]
              text-[#3e2b08] font-bold text-[10px] sm:text-xs uppercase rounded-full tracking-wider
              shadow-[0_4px_8px_rgba(0,0,0,0.2)]
              hover:shadow-[0_6px_12px_rgba(201,168,76,0.4)]
              active:translate-y-0.5 transition-all duration-200"
            data-testid={`diy-add-to-cart-${product.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DIYKitsWebshop = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <section 
      id="diy-kits" 
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 scroll-mt-24"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest-dark/90" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4" data-testid="diy-kits-title">
            DIY Florarium Kits
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Create your own florarium at home with our DIY Kit.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-cream/60 font-montserrat">{t('diy.noProducts', 'DIY kits coming soon!')}</p>
          </div>
        ) : (
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
