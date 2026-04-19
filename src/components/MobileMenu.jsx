/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Instagram, Twitter, Mail } from 'lucide-react';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  onCategorySelect,
  onHomeClick 
}) => {
  const handleNav = (cat) => {
    onCategorySelect(cat);
    onClose();
    setTimeout(() => {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-[#F9F8F6] z-[110] shadow-2xl flex flex-col p-8 pt-24"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-neutral-800" />
            </button>

            <div className="flex-1 space-y-12">
              <nav className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold mb-8">Navigation</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => { onHomeClick(); onClose(); }}
                    className="block text-3xl font-medium tracking-tight uppercase hover:text-[#BFA15C] transition-colors"
                  >
                    Atelier Home
                  </button>
                  {['Collections', 'Objects', 'About'].map((item) => (
                    <button 
                      key={item}
                      className="block text-3xl font-medium tracking-tight uppercase hover:text-[#BFA15C] transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold mb-8">Shop by Category</p>
                <div className="grid grid-cols-1 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleNav(cat)}
                      className={`flex items-center justify-between group p-2 -mx-2 transition-all ${
                        activeCategory === cat ? 'text-black' : 'text-neutral-500'
                      }`}
                    >
                      <span className="text-xl uppercase tracking-widest font-light">{cat}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${
                        activeCategory === cat ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-neutral-200">
              <div className="flex gap-6 mb-8">
                <Instagram className="w-5 h-5 text-neutral-400 hover:text-black cursor-pointer" />
                <Twitter className="w-5 h-5 text-neutral-400 hover:text-black cursor-pointer" />
                <Mail className="w-5 h-5 text-neutral-400 hover:text-black cursor-pointer" />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 leading-relaxed font-bold">
                SAIFCART ATELIER © 2026 <br />
                PIONEERING MODERN OBJECTS
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
