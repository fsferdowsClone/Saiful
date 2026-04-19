/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, setIsCheckoutMode } = useCart();

  const handleCheckout = () => {
    onClose();
    setIsCheckoutMode(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:bg-black/10"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col p-6 lg:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-medium uppercase tracking-widest text-[#1A1A1A]">Your Bag</h2>
                <span className="text-sm font-mono text-neutral-400">[{totalItems}]</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-neutral-200" strokeWidth={1} />
                  <p className="text-neutral-500 font-light italic">Your collection is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-xs uppercase tracking-widest font-medium border-b border-black pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-32 bg-neutral-100 flex-shrink-0 overflow-hidden rounded-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-800">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-300 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mb-4 font-light capitalize">{item.category}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-neutral-100 rounded-px p-1 bg-neutral-50/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-neutral-500 text-neutral-300 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-neutral-500 text-neutral-300 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-mono tracking-tighter">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-100 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-neutral-400 font-medium">Subtotal</span>
                  <span className="text-xl font-mono tracking-tighter">${totalPrice}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-5 px-8 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-neutral-800 transition-all active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
                <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest leading-relaxed">
                  Complimentary carbon-neutral shipping available on all orders.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
