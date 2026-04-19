/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Plus, X, Share2, Download } from 'lucide-react';
import { generateLuxuryObject } from '../services/aiService';
import { useCart } from '../context/CartContext';

const AIGenerator = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const { addToCart } = useCart();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt || isGenerating) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const generated = await generateLuxuryObject(prompt);
      setResult(generated);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Neural synthesis interrupted. Please refine your vision and retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToArchive = () => {
    if (result) {
      // For demo purposes, we'll treat it like a real product
      const fakeProduct = {
        ...result,
        id: `ai-${Date.now()}`
      };
      addToCart(fakeProduct);
      alert('This bespoke object has been added to your archive.');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-[#F9F8F6] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Left: Input Panel */}
            <div className="w-full md:w-1/2 p-10 flex flex-col border-r border-neutral-100">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#BFA15C]" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em]">Atelier AI</h2>
                </div>
                <button onClick={onClose} className="text-neutral-400 hover:text-black transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold mb-8 leading-relaxed">
                  Describe a modernist object of permanence. Our neural engine will curate a conceptual prototype inclusive of materials and geometry.
                </p>

                <form onSubmit={handleGenerate} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-black text-neutral-900">Conceptual Vision</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., A structural obsidian lamp with raw silk diffusion..."
                      className="w-full bg-white border border-neutral-100 p-4 h-32 text-xs outline-none focus:border-[#BFA15C] transition-colors resize-none uppercase tracking-widest leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating || !prompt}
                    className="w-full bg-black text-white py-4 px-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#BFA15C]" />
                        Curating Vision...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Generate Prototype
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-50">
                <p className="text-[9px] uppercase tracking-widest text-neutral-300 font-bold">
                  AI GENERATED ARCHIVE © 2026 <br />
                  SAIFCART PRIVATE ATELIER
                </p>
              </div>
            </div>

            {/* Right: Result Panel */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 px-12 text-center"
                  >
                    <div className="w-12 h-12 border-2 border-neutral-100 border-t-[#BFA15C] rounded-full animate-spin" />
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold animate-pulse">
                      Synthesizing materials & geometry...
                    </p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="relative group flex-1 bg-neutral-50 flex items-center justify-center p-8 overflow-hidden">
                      <img
                        src={result.image}
                        alt={result.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain shadow-2xl transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors">
                          <Download className="w-4 h-4 text-neutral-700" />
                        </button>
                        <button className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors">
                          <Share2 className="w-4 h-4 text-neutral-700" />
                        </button>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl p-4 border border-white/40 shadow-xl">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">{result.name}</h3>
                          <span className="text-[10px] font-mono text-[#BFA15C]">${result.price}</span>
                        </div>
                        <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold truncate">
                          {result.materials}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-8 space-y-6">
                      <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-loose">
                          {result.description}
                        </p>
                      </div>
                      <button
                        onClick={handleAddToArchive}
                        className="w-full border border-black py-3 px-6 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all active:scale-[0.98]"
                      >
                        Add Prototype to Archive
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 text-neutral-200"
                  >
                    <Sparkles className="w-12 h-12 opacity-10" />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black">Waiting for vision</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIGenerator;
