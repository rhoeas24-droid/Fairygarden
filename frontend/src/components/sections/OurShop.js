import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Default fallback images
const defaultImages = {
  'enchanted-florariums': '/BG_TILE_FINAL.jpg',
  'bottles-jars': 'https://fairygarden4u.com/workshop_event.jpg',
  'tools-equipments': 'https://fairygarden4u.com/workshop_event.jpg',
  'plants-substrates-bugs': 'https://fairygarden4u.com/BG_TILE_FINAL.jpg',
  'decorations-terrascaping': 'https://fairygarden4u.com/workshop_event.jpg',
  'diy-kits': 'https://fairygarden4u.com/build_your_own.jpg',
};

const CategoryCard = ({ category, index, productImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = productImages[category.imageKey] || [defaultImages[category.imageKey]];
  
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <Link
      to={`/webshop#${category.targetId}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        data-testid={`shop-category-${category.imageKey}`}
      >
        <div className="flex flex-row items-center gap-4 p-4 h-[190px]
          bg-forest/40 backdrop-blur-sm border border-gold/20 rounded-2xl
          hover:bg-forest/60 hover:border-gold/40 transition-all duration-300
          hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)]">
          
          {/* Image Container */}
          <div className="relative w-[150px] h-[150px] flex-shrink-0 overflow-hidden rounded-xl">
            {images.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                alt={category.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 border-2 border-gold/30 rounded-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          {/* Text Content */}
          <div className="flex-1 min-w-0 h-full flex flex-col justify-center overflow-hidden">
            <h3 className="text-base sm:text-lg lg:text-xl font-cinzel font-bold text-gold mb-2
              group-hover:text-gold-light transition-colors leading-tight">
              {category.title}
            </h3>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm leading-relaxed line-clamp-2 overflow-hidden">
              {category.description}
            </p>
            <div className="inline-flex items-center gap-2 text-gold font-montserrat text-xs font-semibold mt-2
              group-hover:gap-3 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const OurShop = () => {
  const [productImages, setProductImages] = useState({});
  
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const florariumsRes = await axios.get(`${API}/wc/products`, {
          params: { product_type: 'ready-florarium' }
        });
        const florariumImages = florariumsRes.data
          .filter(p => p.image)
          .slice(0, 4)
          .map(p => p.image);
        
        const diyRes = await axios.get(`${API}/wc/products`, {
          params: { product_type: 'diy-kit' }
        });
        const diyImages = diyRes.data
          .filter(p => p.image)
          .slice(0, 4)
          .map(p => p.image);
        
        setProductImages({
          'enchanted-florariums': florariumImages.length > 0 ? florariumImages : [defaultImages['enchanted-florariums']],
          'diy-kits': diyImages.length > 0 ? diyImages : [defaultImages['diy-kits']],
          'bottles-jars': [defaultImages['bottles-jars']],
          'tools-equipments': [defaultImages['tools-equipments']],
          'plants-substrates-bugs': [defaultImages['plants-substrates-bugs']],
          'decorations-terrascaping': [defaultImages['decorations-terrascaping']],
        });
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };
    
    fetchProductImages();
  }, []);
  
  const categories = [
    {
      title: 'Enchanted Florariums',
      description: 'Handcrafted, ready-to-enjoy closed ecosystems. Each piece is unique, bringing a touch of enchanted nature into your space.',
      imageKey: 'enchanted-florariums',
      targetId: 'enchanted-florariums',
    },
    {
      title: 'Bottles & Jars',
      description: 'Premium glass containers in various shapes and sizes, perfect for your florarium projects.',
      imageKey: 'bottles-jars',
      targetId: 'bottles-jars',
    },
    {
      title: 'Tools & Equipments',
      description: 'Professional terrarium tools and equipment for creating and maintaining your miniature ecosystems.',
      imageKey: 'tools-equipments',
      targetId: 'tools-equipments',
    },
    {
      title: 'Plants, Substrates & Bugs',
      description: 'Carefully selected plants, premium substrates, drainage layers, and beneficial springtails.',
      imageKey: 'plants-substrates-bugs',
      targetId: 'plants-substrates-bugs',
    },
    {
      title: 'Decorations & Terrascaping',
      description: 'Driftwood, stones, moss and miniature figures to bring your miniature world to life.',
      imageKey: 'decorations-terrascaping',
      targetId: 'decorations-terrascaping',
    },
    {
      title: 'DIY Florarium Kits',
      description: 'Everything you need to create your own magical terrarium. Complete kits with plants, tools, and guidance.',
      imageKey: 'diy-kits',
      targetId: 'diy-kits',
    },
  ];
  
  return (
    <section
      id="our-shop"
      className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-4" data-testid="our-shop-title">
            Our Shop
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Explore our collection of handcrafted florariums, DIY kits, and all the supplies you need to create your own magical miniature world.
          </p>
        </motion.div>
        
        {/* 3x2 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {categories.map((category, index) => (
            <CategoryCard key={category.imageKey} category={category} index={index} productImages={productImages} />
          ))}
        </div>

        {/* Go to Webshop Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/webshop"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 
              bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
              text-forest font-montserrat font-bold text-base
              rounded-lg border border-[#A88A3D]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.3)]
              hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
              transition-all duration-200"
            data-testid="go-to-webshop-btn"
          >
            Go to Webshop
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurShop;
