/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORY_IMAGES = {
  'All': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
  'Watches': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2680&auto=format&fit=crop',
  'Home': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop',
  'Apparel': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2671&auto=format&fit=crop',
  'Leather': 'https://images.unsplash.com/photo-1473187983305-f6150658ad3c?q=80&w=2670&auto=format&fit=crop',
  'Lifestyle': 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=2670&auto=format&fit=crop'
};

const CategoryBanner = ({ category }) => {
  const [image, setImage] = useState(CATEGORY_IMAGES['All']);

  useEffect(() => {
    // Smoothly transition between static curated images
    setImage(CATEGORY_IMAGES[category] || CATEGORY_IMAGES['All']);
  }, [category]);

  return (
    <div className="relative w-full h-[300px] md:h-[450px] bg-neutral-100 overflow-hidden rounded-sm group mb-16 shadow-inner">
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img
            src={image}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-[2000ms]"
            alt={category}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-2"
            >
              <span className="text-[9px] uppercase tracking-[0.5em] text-white/70 font-bold">Curated Space</span>
              <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tighter uppercase leading-[0.85]">
                {category === 'All' ? 'The Atelier' : category}
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CategoryBanner;
