/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const Header = ({ onCartOpen, onHomeClick, onMenuOpen, onAIOpen }) => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Magnetic Effect for Logo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!logoRef.current) return;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2); // Reduced intensity for subtlety
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 lg:px-12 flex items-center justify-between ${
      isScrolled ? 'h-16 bg-white/70 backdrop-blur-xl border-b border-black/5' : 'h-24 bg-transparent'
    }`}>
      <div className="flex items-center gap-8">
        <motion.button 
          onClick={onMenuOpen}
          whileTap={{ scale: 0.95 }}
          className="lg:hidden p-2 -ml-2"
        >
          <Menu className="w-5 h-5 text-neutral-800" strokeWidth={1} />
        </motion.button>
        <nav className="hidden lg:flex items-center gap-10">
          {['Collections', 'Archive', 'About'].map((item, idx) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'About') {
                  document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  scrollToSection('shop');
                }
              }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-black transition-colors relative group"
            >
              {item}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"
              />
            </button>
          ))}
        </nav>
      </div>

      <motion.button 
        ref={logoRef}
        onClick={onHomeClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: mouseX, y: mouseY }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
      >
        <span className="text-xl font-medium uppercase tracking-[0.6em] text-neutral-900 group-hover:tracking-[0.65em] transition-all duration-700">SAIF<span className="text-[#BFA15C]">CART</span></span>
        <span className="text-[6px] uppercase tracking-[0.8em] text-neutral-300 mt-1 opacity-60">Atelier Edition</span>
      </motion.button>

      <div className="flex items-center gap-4 md:gap-7">
        <button 
          onClick={onAIOpen}
          className="p-2 text-neutral-400 hover:text-[#BFA15C] transition-colors relative group"
        >
          <Sparkles className="w-4 h-4" strokeWidth={1} />
          <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFA15C] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#BFA15C]"></span>
          </span>
        </button>
        
        <button className="hidden md:block p-2 text-neutral-400 hover:text-black transition-colors">
          <Search className="w-4 h-4" strokeWidth={1} />
        </button>
        
        <button
          onClick={onCartOpen}
          className="group flex items-center gap-4 py-2 px-5 bg-black text-white rounded-full transition-all active:scale-95 hover:bg-neutral-800"
        >
          <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
          {totalItems > 0 && (
            <span className="text-[9px] font-mono font-bold tracking-tighter border-l border-white/20 pl-4">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
