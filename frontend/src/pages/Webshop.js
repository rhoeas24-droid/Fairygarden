import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/sections/Footer';
import TerrariumGallery from '../components/sections/TerrariumGallery';
import DIYKits from '../components/sections/DIYKits';
import Plants from '../components/sections/Plants';
import SubstratesBugs from '../components/sections/SubstratesBugs';
import { Toaster } from 'sonner';

const categories = [
  {
    id: 'enchanted-florariums',
    title: 'Enchanted Florariums',
    targetId: 'gallery',
  },
  {
    id: 'bottles-jars',
    title: 'Bottles & Jars',
    targetId: 'bottles-jars',
  },
  {
    id: 'tools-equipments',
    title: 'Tools & Equipments',
    targetId: 'tools-equipments',
  },
  {
    id: 'plants-substrates-bugs',
    title: 'Plants, Substrates & Bugs',
    targetId: 'plants-substrates-bugs',
  },
  {
    id: 'decorations-terrascaping',
    title: 'Decorations & Terrascaping',
    targetId: 'decorations-terrascaping',
  },
  {
    id: 'diy-kits',
    title: 'DIY Florarium Kits',
    targetId: 'diy-kits',
  },
];

const CategoryCard = ({ category, onClick, isActive }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-4 rounded-xl border transition-all duration-300 text-left
        ${isActive 
          ? 'bg-gold/20 border-gold text-gold' 
          : 'bg-forest/40 border-gold/20 text-cream hover:border-gold/40 hover:bg-forest/60'}`}
    >
      <h3 className="font-cinzel font-bold text-sm sm:text-base">
        {category.title}
      </h3>
    </motion.button>
  );
};

const Webshop = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Handle hash navigation on load
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

  const scrollToSection = (targetId) => {
    setActiveCategory(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="fixed inset-0 bg-forest/95 pointer-events-none" />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-16">
          {/* Header Section */}
          <section className="px-4 sm:px-6 mb-12">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
                <p className="text-cream/70 font-montserrat text-sm sm:text-base max-w-2xl mx-auto mb-8">
                  Discover our complete collection of handcrafted florariums, supplies, and everything you need to create your own magical miniature ecosystem.
                </p>

                {/* Category Navigation Grid - 2 columns x 3 rows */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      isActive={activeCategory === cat.targetId}
                      onClick={() => scrollToSection(cat.targetId)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Product Sections */}
          <TerrariumGallery />
          <DIYKits />
          <Plants />
          <SubstratesBugs />
        </main>
        
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
};

export default Webshop;
