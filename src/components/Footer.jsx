/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-100 py-20 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-medium tracking-[0.4em] text-neutral-900">SAIF<span className="text-[#BFA15C]">CART</span></h3>
            <p className="text-[10px] text-neutral-400 font-bold leading-relaxed uppercase tracking-[0.3em] max-w-[320px]">
              Curating exceptional artifacts for the discerning pioneer. Designed for permanence in a transient landscape.
            </p>
            <div className="flex gap-8 items-center border-t border-neutral-50 pt-8 mt-8">
              <div className="flex flex-col">
                <span className="text-[7px] uppercase tracking-[0.4em] text-neutral-300 font-black mb-1">Established</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-900 font-bold">MMXXVI</span>
              </div>
              <div className="w-px h-6 bg-neutral-100" />
              <div className="flex flex-col">
                <span className="text-[7px] uppercase tracking-[0.4em] text-neutral-300 font-black mb-1">Region</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-900 font-bold">Global / Digital</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-900 mb-8 border-b border-neutral-50 pb-2 inline-block">Explore</h4>
            <ul className="space-y-4 text-[9px] text-neutral-400 font-bold tracking-[0.3em]">
              <li onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-black cursor-pointer transition-colors uppercase flex items-center gap-2 group">
                Atelier Home <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li onClick={() => scrollToSection('shop')} className="hover:text-black cursor-pointer transition-colors uppercase flex items-center gap-2 group">
                Current Collection <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="hover:text-black cursor-pointer transition-colors uppercase opacity-30 cursor-not-allowed">Store Locator</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-900 mb-8 border-b border-neutral-50 pb-2 inline-block">Support</h4>
            <ul className="space-y-4 text-[9px] text-neutral-400 font-bold tracking-[0.3em]">
              <li className="hover:text-black cursor-pointer transition-colors uppercase">Shipping</li>
              <li className="hover:text-black cursor-pointer transition-colors uppercase">Returns</li>
              <li className="hover:text-black cursor-pointer transition-colors uppercase">Care Guide</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-900 mb-8 border-b border-neutral-50 pb-2 inline-block">Atelier Mail</h4>
            <div className="flex flex-col gap-6">
              <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Private registry for core updates and archive events.
              </p>
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex border-b border-neutral-200 pb-3 group">
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS" 
                    className="bg-transparent text-[10px] flex-1 outline-none uppercase tracking-widest placeholder:text-neutral-200"
                  />
                  <button 
                    disabled={status !== 'idle'}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    {status === 'loading' ? (
                       <span className="w-4 h-4 rounded-full border border-neutral-200 border-t-black animate-spin block" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 hover:text-black" />
                    )}
                  </button>
                </div>
                
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-0 mt-3 flex items-center gap-2 text-[#BFA15C]"
                    >
                      <Check className="w-3 h-3" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Added to registry</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-neutral-50">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[8px] text-neutral-300 uppercase tracking-widest font-bold">
              © 2026 SaifCart Atelier. Reductive Design Architecture.
            </p>
          </div>
          <div className="flex gap-12 text-[8px] text-neutral-300 uppercase tracking-[0.4em] font-black">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
