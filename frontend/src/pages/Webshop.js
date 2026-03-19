import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/sections/Footer';
import { Toaster } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-forest/40 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden
        hover:border-gold/40 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={product.image || '/BG_TILE_FINAL.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.on_sale && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-cinzel font-bold text-gold mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-cream/60 font-montserrat text-sm line-clamp-2 mb-3 flex-1">
            {product.short_description || product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="font-cinzel font-bold">
              {product.on_sale ? (
                <>
                  <span className="text-cream/50 line-through text-sm mr-2">{product.regular_price}€</span>
                  <span className="text-gold text-lg">{product.price}€</span>
                </>
              ) : (
                <span className="text-gold text-lg">{product.price}€</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !product.in_stock}
              className={`px-4 py-2 rounded font-montserrat text-sm font-semibold transition-all
                ${product.in_stock 
                  ? 'bg-gold text-forest hover:bg-gold-light' 
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            >
              {isAdding ? 'Added!' : product.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, products }) => {
  if (products.length === 0) return null;
  
  return (
    <section id={category.id} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-2">
          {category.title}
        </h2>
        <p className="text-cream/60 font-montserrat text-sm">
          {category.description}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const Webshop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'enchanted-florariums',
      title: 'Enchanted Florariums',
      description: 'Handcrafted, ready-to-enjoy closed ecosystems',
      productType: 'ready-florarium',
    },
    {
      id: 'bottles-jars',
      title: 'Bottles & Jars',
      description: 'Premium glass containers for your projects',
      productType: 'bottles-jars',
    },
    {
      id: 'tools-equipments',
      title: 'Tools & Equipments',
      description: 'Professional terrarium tools and equipment',
      productType: 'tools-equipments',
    },
    {
      id: 'plants-substrates-bugs',
      title: 'Plants, Substrates & Bugs',
      description: 'Plants, substrates, and beneficial insects',
      productType: 'plants-substrates',
    },
    {
      id: 'decorations-terrascaping',
      title: 'Decorations & Terrascaping',
      description: 'Decorative elements for your miniature world',
      productType: 'decorations',
    },
    {
      id: 'diy-kits',
      title: 'DIY Florarium Kits',
      description: 'Complete kits to create your own terrarium',
      productType: 'diy-kit',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products
        const response = await axios.get(`${API}/wc/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // Filter products by category
  const getProductsForCategory = (productType) => {
    return products.filter(p => p.product_type === productType || p.category === productType);
  };

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeCategory);

  return (
    <div className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-forest/95 fixed" />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Link
                to="/#our-shop"
                className="inline-flex items-center gap-2 text-gold font-montserrat text-sm mb-6 hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4">
                Webshop
              </h1>
              <p className="text-cream/70 font-montserrat text-sm sm:text-base max-w-2xl mx-auto">
                Discover our complete collection of handcrafted florariums, supplies, and everything you need to create your own magical miniature ecosystem.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all
                  ${activeCategory === 'all' 
                    ? 'bg-gold text-forest font-semibold' 
                    : 'bg-forest/50 text-cream/70 border border-gold/30 hover:border-gold/50'}`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all
                    ${activeCategory === cat.id 
                      ? 'bg-gold text-forest font-semibold' 
                      : 'bg-forest/50 text-cream/70 border border-gold/30 hover:border-gold/50'}`}
                >
                  {cat.title}
                </button>
              ))}
            </motion.div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                <p className="text-cream/60 font-montserrat">Loading products...</p>
              </div>
            ) : (
              /* Product Categories */
              <div>
                {filteredCategories.map((category) => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    products={getProductsForCategory(category.productType)}
                  />
                ))}
                
                {/* If no products found */}
                {products.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-cream/60 font-montserrat text-lg mb-4">
                      No products available at the moment.
                    </p>
                    <p className="text-cream/40 font-montserrat text-sm">
                      Please check back soon!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default Webshop;
