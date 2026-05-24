import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Simulate rapid progressive load
      const roll = Math.floor(Math.random() * 15) + 3;
      current = Math.min(current + roll, 100);
      setPercent(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]"
    >
      {/* Visual background grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full px-8">
        {/* Animated Initials Logo */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-syne text-5xl font-extrabold tracking-tighter text-[#E0D8D0]"
        >
          FE<span className="text-[#D4AF37]">.</span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-4 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#D4AF37]"
            style={{ width: `${percent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          />
        </div>

        {/* Status Percentage with Monospace font */}
        <div className="flex justify-between w-full font-mono text-sm text-slate-500 tracking-wider">
          <span>PORTFOLIO OS v4</span>
          <span className="text-[#D4AF37] font-medium">{percent}%</span>
        </div>
      </div>
    </motion.div>
  );
}
