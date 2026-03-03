import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Default fallback images
const defaultImages = {
  'ready-florariums': '/BG_TILE_FINAL.jpg',
  'diy-kits': 'https://fairygarden4u.com/build_your_own.jpg',
  'bottles-jars-tools': 'https://fairygarden4u.com/workshop_event.jpg',
  'decorations-terrascaping': 'https://fairygarden4u.com/workshop_event.jpg',
};

const CategoryCard = ({ category, index, productImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Use product images if available, otherwise fallback
  const images = productImages[category.imageKey] || [defaultImages[category.imageKey]];
  
  // Rotate images every 3 seconds if there are multiple
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const scrollToSection = () => {
    const element = document.getElementById(category.targetId);
    if (element) {
      // For shop categories that need the webshop expanded
      if (category.targetId.startsWith('shop-')) {
        window.dispatchEvent(new CustomEvent('expandWebshop', { detail: { targetId: category.targetId } }));
      }
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={scrollToSection}
      className="group cursor-pointer"
      data-testid={`shop-category-${category.imageKey}`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 
        bg-forest/40 backdrop-blur-sm border border-gold/20 rounded-2xl
        hover:bg-forest/60 hover:border-gold/40 transition-all duration-300
        hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)]">
        
        {/* Image Container - 300x300 on desktop, smaller on mobile */}
        <div className="relative w-48 h-48 sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] flex-shrink-0 overflow-hidden rounded-xl">
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
          
          {/* Gold frame overlay */}
          <div className="absolute inset-0 border-2 border-gold/30 rounded-xl pointer-events-none" />
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-cinzel font-bold text-gold mb-2 sm:mb-3
            group-hover:text-gold-light transition-colors">
            {category.title}
          </h3>
          <p className="text-cream/70 font-montserrat text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            {category.description}
          </p>
          <div className="inline-flex items-center gap-2 text-gold font-montserrat text-sm font-semibold
            group-hover:gap-3 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OurShop = () => {
  const [productImages, setProductImages] = useState({});
  
  // Fetch product images from API
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        // Fetch ready florariums
        const florariumsRes = await axios.get(`${API}/wc/products`, {
          params: { product_type: 'ready-florarium' }
        });
        const florariumImages = florariumsRes.data
          .filter(p => p.image)
          .slice(0, 4)
          .map(p => p.image);
        
        // Fetch DIY kits
        const diyRes = await axios.get(`${API}/wc/products`, {
          params: { product_type: 'diy-kit' }
        });
        const diyImages = diyRes.data
          .filter(p => p.image)
          .slice(0, 4)
          .map(p => p.image);
        
        setProductImages({
          'ready-florariums': florariumImages.length > 0 ? florariumImages : [defaultImages['ready-florariums']],
          'diy-kits': diyImages.length > 0 ? diyImages : [defaultImages['diy-kits']],
          'bottles-jars-tools': [defaultImages['bottles-jars-tools']],
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
      title: 'Ready Florariums',
      description: 'Handcrafted, ready-to-enjoy closed ecosystems. Each piece is unique, bringing a touch of enchanted nature into your space.',
      imageKey: 'ready-florariums',
      targetId: 'gallery',
    },
    {
      title: 'DIY Kits',
      description: 'Everything you need to create your own magical terrarium. Complete kits with plants, tools, and step-by-step guidance.',
      imageKey: 'diy-kits',
      targetId: 'diy-kits',
    },
    {
      title: 'Bottles, Jars & Tools',
      description: 'Premium glass containers and professional tools for your florarium projects. Coming soon!',
      imageKey: 'bottles-jars-tools',
      targetId: 'shop-bottles',
    },
    {
      title: 'Decorations & Terrascaping',
      description: 'Driftwood, stones, moss and miniature figures to bring your miniature world to life. Coming soon!',
      imageKey: 'decorations-terrascaping',
      targetId: 'shop-decorations',
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
      {/* Dark overlay */}
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
        
        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.imageKey} category={category} index={index} productImages={productImages} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurShop;
