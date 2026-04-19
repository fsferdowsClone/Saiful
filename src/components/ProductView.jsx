/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Shield, Truck, RotateCw, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductView = ({ product, onBack, onCartOpen, onAIOpen }) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('details');

  const handleAddToCart = () => {
    addToCart(product);
    onCartOpen();
  };

  const tabs = [
    { id: 'details', label: 'Specifics' },
    { id: 'specs', label: 'Technical' },
    { id: 'materials', label: 'Composition' }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
      <nav className="mb-12">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-xs uppercase tracking-widest font-medium text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Collection
        </button>
      </nav>

      <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative rounded-lg bg-white p-2">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-square bg-neutral-50 rounded-lg overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
              <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square bg-neutral-50 rounded-lg overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
              <img src={product.hoverImage || product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col pt-4"
        >
          <div className="flex items-center gap-4 mb-3">
             <span className="px-2 py-0.5 border border-neutral-100 text-[10px] uppercase tracking-widest text-neutral-400 font-medium bg-white">
              Limited Edition
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#BFA15C] font-semibold">
              In Stock
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 mb-4 uppercase">
            {product.name}
          </h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-mono text-neutral-800">${product.price}</span>
            <span className="text-xs text-neutral-400 font-mono italic">VAT Included</span>
          </div>

          <p className="text-lg text-neutral-600 font-light leading-relaxed mb-10 max-w-lg">
            {product.description}
          </p>

          {/* Tabbed Info Section */}
          <div className="mb-12">
            <div className="flex border-b border-neutral-100 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-4 pr-8 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
                    activeTab === tab.id ? 'text-black' : 'text-neutral-300 hover:text-neutral-500'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-8 h-px bg-black"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'details' && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {product.details?.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-neutral-500 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 gap-y-4">
                      {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
                          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{key}</span>
                          <span className="text-sm font-mono text-neutral-800">{value}</span>
                        </div>
                      ))}
                      {!product.specifications && (
                        <p className="text-sm text-neutral-400 italic">Not specified</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'materials' && (
                    <div className="space-y-4">
                      <p className="text-sm text-neutral-500 font-light leading-relaxed">
                        {product.materials || 'Crafted with premium materials selected for durability and tactile quality.'}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold mt-6">
                        <Shield className="w-3 h-3" />
                        Ethically Sourced & Produced
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-5 px-8 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              Add to Collection
            </button>
            <button
              onClick={onAIOpen}
              className="flex-1 border border-neutral-200 py-5 px-8 uppercase tracking-[0.2em] text-xs font-semibold hover:border-[#BFA15C] hover:text-[#BFA15C] transition-all bg-white flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-3 h-3 group-hover:scale-125 transition-transform" strokeWidth={1.5} />
              AI Atelier
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-neutral-100">
            {[
              { icon: Truck, text: 'Privileged Shipping' },
              { icon: Shield, text: 'Secured Payment' },
              { icon: RotateCw, text: 'Curated Exchange' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                <item.icon className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductView;
