import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, AlertTriangle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!expected) {
      setErrorMsg('Admin login is not configured. Set VITE_ADMIN_PASSWORD in your environment.');
      return;
    }
    if (password === expected) {
      onSuccess();
    } else {
      setErrorMsg('Incorrect password. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="relative bg-[#0b0c10] border border-white/10 rounded-2xl w-full max-w-sm p-8 shadow-2xl relative z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-5 text-[#D4AF37] border border-[#D4AF37]/20">
                <Lock className="w-5 h-5" />
              </div>

              <h3 className="font-syne text-2xl font-extrabold text-[#E0D8D0] tracking-tight mb-2">
                Admin Console
              </h3>
              <p className="text-light text-slate-400 text-sm mb-6 leading-relaxed">
                Provide authorization credential code to update client-facing files, configure analytics, and publish articles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                  Security Passphrase
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="••••••••••••••"
                  className="w-full bg-[#13151c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-slate-600 transition-all duration-200"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-light"
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#bfa030] active:scale-[0.98] text-[#080808] font-semibold text-sm py-3.5 rounded-full shadow-lg shadow-[#D4AF37]/10 transition-all duration-300 transform cursor-none"
              >
                Access Control Console
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
