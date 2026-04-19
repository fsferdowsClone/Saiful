/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const ProductCard = ({ product, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group cursor-pointer flex flex-col gap-6"
      onClick={onClick}
    >
      <div className={`relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm perspective-1000 shadow-none hover:shadow-2xl transition-all duration-700 ${product.id === '4' ? 'ring-1 ring-[#D4AF37]/30 ring-offset-4 ring-offset-[#F9F8F6]' : ''}`}>
        <motion.img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${product.hoverImage ? 'group-hover:opacity-0' : ''}`}
        />
        {product.hoverImage && (
          <motion.img
            src={product.hoverImage}
            alt={`${product.name} Demo`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
          />
        )}
        
        {product.id === '4' && (
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-[#D4AF37] text-white text-[9px] uppercase tracking-[0.4em] font-bold px-4 py-2">
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
        
        <div className="absolute bottom-6 left-6 right-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.19, 1, 0.22, 1]">
          <div className="bg-white/95 backdrop-blur-md py-4 px-6 text-center shadow-lg">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black">
              Explore Details
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start pt-2">
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
            {product.category}
          </p>
          <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 leading-tight">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-mono text-neutral-900 tracking-tighter">
            ${product.price}
          </span>
          <span className="text-[7px] uppercase tracking-widest text-neutral-300 font-bold">
            Tax Incl.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
