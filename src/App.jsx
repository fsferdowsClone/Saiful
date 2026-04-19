/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import ProductView from './components/ProductView';
import CheckoutPortal from './components/CheckoutPortal';
import MobileMenu from './components/MobileMenu';
import AIGenerator from './components/AIGenerator';
import CategoryBanner from './components/CategoryBanner';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroRef = useRef(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2669&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517705008128-361805f42e8a?q=80&w=2574&auto=format&fit=crop'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductsList(data);
      } catch (error) {
        console.error('Failed to fetch collection:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', ...new Set(productsList.map((p) => p.category))];
  const filteredProducts = activeCategory === 'All' 
    ? productsList 
    : productsList.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white bg-[#F9F8F6]">
      <Header 
        onCartOpen={() => setIsCartOpen(true)} 
        onHomeClick={() => setSelectedProduct(null)} 
        onMenuOpen={() => setIsMenuOpen(true)}
        onAIOpen={() => setIsGeneratorOpen(true)}
      />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CheckoutPortal />
      <AIGenerator isOpen={isGeneratorOpen} onClose={() => setIsGeneratorOpen(false)} />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        onHomeClick={() => setSelectedProduct(null)}
      />

      <main>
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div
              layout
              key="listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {/* Hero Section with Parallax Slider */}
              <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] px-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentHeroIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 z-0 overflow-hidden"
                  >
                    <motion.div
                      style={{ y: heroY }}
                      className="w-full h-full"
                    >
                      <img 
                        src={heroImages[currentHeroIndex]} 
                        className="w-full h-full object-cover grayscale brightness-50"
                        alt={`Hero ${currentHeroIndex + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Indicators */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroIndex(idx)}
                      className="group flex items-center gap-4 focus:outline-none"
                    >
                      <span className={`text-[8px] font-bold tracking-widest transition-all duration-500 ${currentHeroIndex === idx ? 'text-[#BFA15C] opacity-100' : 'text-white opacity-0 group-hover:opacity-40'}`}>
                        0{idx + 1}
                      </span>
                      <div className={`h-px transition-all duration-700 ${currentHeroIndex === idx ? 'w-12 bg-[#BFA15C]' : 'w-6 bg-white/20 group-hover:w-8 group-hover:bg-white/40'}`} />
                    </button>
                  ))}
                </div>

                {/* Vertical Accents */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                  <div className="absolute left-[20%] top-0 w-px h-full bg-white" />
                  <div className="absolute right-[20%] top-0 w-px h-full bg-white" />
                </div>
                
                <div className="relative z-10 text-center space-y-16 max-w-5xl">
                  <div className="space-y-4">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="block text-[9px] uppercase tracking-[0.8em] font-black text-[#BFA15C]"
                    >
                      Private Collection — 2026 Edition
                    </motion.span>
                    
                    <motion.h1 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                      className="text-7xl md:text-[12rem] font-medium text-white tracking-[-0.06em] uppercase leading-[0.8] mb-8"
                    >
                      Atelier <br /> <span className="text-neutral-500 font-serif italic font-light tracking-tighter lowercase">Modern</span>
                    </motion.h1>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="flex flex-col items-center gap-16"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      <p className="text-neutral-400 max-w-[240px] text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed">
                        A reductive archive of structural artifacts for the discerning pioneer.
                      </p>
                      <div className="h-10 w-px bg-white/20 hidden md:block" />
                      <button 
                        onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex flex-col items-center gap-5"
                      >
                        <span className="text-[9px] uppercase tracking-[0.6em] text-white font-black group-hover:text-[#BFA15C] transition-colors">Enter Emporium</span>
                        <motion.div
                          animate={{ y: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ChevronDown className="w-5 h-5 text-[#BFA15C] stroke-[1]" />
                        </motion.div>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Product Listing */}
              <section id="shop" className="py-32 px-6 lg:px-20 max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-12">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 60 }}
                      viewport={{ once: true }}
                      className="h-px bg-[#BFA15C]"
                    />
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.85]">
                      Curated <br /> <span className="text-neutral-300">Collection</span>
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[10px] uppercase tracking-[0.3em] font-bold px-8 py-4 border transition-all ${
                          activeCategory === cat 
                            ? 'bg-black text-white border-black shadow-xl shadow-black/10' 
                            : 'bg-white text-neutral-400 border-neutral-100 hover:border-black hover:text-black'
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <CategoryBanner category={activeCategory} />

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                >
                  {loading ? (
                    Array.from({ length: 3 }).map((_, idx) => (
                      <div key={idx} className="flex flex-col gap-6 animate-pulse">
                        <div className="aspect-[3/4] bg-neutral-100 rounded-sm" />
                        <div className="space-y-3">
                          <div className="h-2 bg-neutral-100 w-1/4" />
                          <div className="h-6 bg-neutral-100 w-3/4" />
                        </div>
                      </div>
                    ))
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                      >
                        <ProductCard 
                          product={product} 
                          onClick={() => setSelectedProduct(product)}
                        />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              layout
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductView 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)}
                onCartOpen={() => setIsCartOpen(true)}
                onAIOpen={() => setIsGeneratorOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
