/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CreditCard, Ship, CheckCircle2, AlertCircle, Loader2, Shield, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPortal = () => {
  const { isCheckoutMode, setIsCheckoutMode, cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState({ transactionId: '' });

  const handlePayment = async (e) => {
    e.preventDefault();
    setStep('processing');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total: totalPrice }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderDetails({ transactionId: data.transactionId });
        setStep('success');
        clearCart();
      } else {
        setErrorMessage(data.message || 'Payment failed. Please verify your credentials.');
        setStep('error');
      }
    } catch (err) {
      setErrorMessage('Unable to reach the payment gateway. Please check your connection.');
      setStep('error');
    }
  };

  if (!isCheckoutMode) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== 'processing' && setIsCheckoutMode(false)}
          className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-[#F9F8F6] rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[850px]"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsCheckoutMode(false)}
            className="absolute top-6 right-6 z-20 p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>

          {/* Left Side: Order Summary */}
          <div className="w-full md:w-[40%] bg-white p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-100 overflow-y-auto">
            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-10">Order Summary</h2>
            <div className="space-y-8 mb-12">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-neutral-50 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover grayscale-[0.2]" alt={item.name} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-neutral-800 leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-[10px] font-mono">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-neutral-50">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-lg font-mono text-neutral-900 pt-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold self-center">Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Logic */}
          <div className="flex-1 p-8 md:p-20 flex flex-col justify-center bg-[#F9F8F6]">
            {step === 'form' && (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handlePayment} 
                className="space-y-10"
              >
                <div>
                  <h1 className="text-3xl font-medium tracking-tighter uppercase mb-2">Secure Checkout</h1>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-light">Authenticated Payment via SaifSecure Engine</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Ship className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-500">Shipping Details</label>
                    </div>
                    <input required type="text" placeholder="FULL NAME" className="w-full bg-white border border-neutral-100 p-4 text-[11px] tracking-widest uppercase outline-none focus:border-black transition-colors" />
                    <input required type="text" placeholder="DELIVERY ADDRESS" className="w-full bg-white border border-neutral-100 p-4 text-[11px] tracking-widest uppercase outline-none focus:border-black transition-colors" />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-500">Card Details</label>
                      </div>
                      <div className="flex gap-2 opacity-30">
                        <div className="w-6 h-4 bg-neutral-400 rounded-sm" />
                        <div className="w-6 h-4 bg-neutral-300 rounded-sm" />
                        <div className="w-6 h-4 bg-neutral-500 rounded-sm" />
                      </div>
                    </div>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                      <input required type="text" placeholder="CARD NUMBER" className="w-full bg-white border border-neutral-100 py-4 pl-12 pr-4 text-[11px] tracking-widest uppercase outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM/YY" className="w-full bg-white border border-neutral-100 p-4 text-[11px] tracking-widest uppercase outline-none focus:border-black transition-colors" />
                      <input required type="text" placeholder="CVC" className="w-full bg-white border border-neutral-100 p-4 text-[11px] tracking-widest uppercase outline-none focus:border-black transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full bg-black text-white py-6 px-10 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-neutral-800 flex items-center justify-center gap-4 group">
                    <Lock className="w-3 h-3 text-[#D4AF37]" />
                    Authorize Transfer
                  </button>
                  
                  <div className="grid grid-cols-3 gap-4 pt-10 pb-2 border-t border-neutral-100 mt-10">
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <Shield className="w-4 h-4" strokeWidth={1} />
                      <span className="text-[8px] uppercase tracking-widest font-bold">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <Globe className="w-4 h-4" strokeWidth={1} />
                      <span className="text-[8px] uppercase tracking-widest font-bold">Global</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <Ship className="w-4 h-4" strokeWidth={1} />
                      <span className="text-[8px] uppercase tracking-widest font-bold">Insured</span>
                    </div>
                  </div>

                  <p className="text-[9px] text-center text-neutral-400 mt-6 uppercase tracking-widest opacity-60">Your credentials are never stored. RSA-4096 Encrypted.</p>
                </div>
              </motion.form>
            )}

            {step === 'processing' && (
              <div className="text-center space-y-8 py-20">
                <div className="relative inline-block">
                  <Loader2 className="w-16 h-16 text-neutral-200 animate-spin" strokeWidth={1} />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Lock className="w-5 h-5 text-[#D4AF37]" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight uppercase">Authorizing Collection</h2>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-light">Connecting to secure gateway...</p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-10 py-20"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-full mb-4">
                  <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tighter uppercase">Acquisition Complete</h2>
                  <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
                    Your objects have been secured. A privileged shipping detail has been dispatched to your atelier.
                  </p>
                </div>
                <div className="pt-8 space-y-6">
                  <div className="inline-block px-6 py-3 border border-neutral-200 bg-white">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-1">Receipt Hash</span>
                    <span className="text-xs font-mono font-bold text-neutral-800">{orderDetails.transactionId}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutMode(false)}
                    className="block w-full border-b border-black pb-2 text-[10px] uppercase tracking-[0.35em] font-bold hover:text-neutral-500 transition-colors"
                  >
                    Return to Emporium
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-10 py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-medium tracking-tight uppercase text-neutral-900 font-bold">Authorization Failed</h2>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                <div className="pt-8">
                  <button 
                    onClick={() => setStep('form')}
                    className="bg-black text-white py-5 px-10 text-[10px] uppercase tracking-[0.3em] font-bold"
                  >
                    Resubmit Credentials
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutPortal;
