import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({ target, suffix = '', label }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds counting animation
    const stateSteps = 50;
    const stepTime = duration / stateSteps;
    const increment = target / stateSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={containerRef}
      className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 md:p-10 relative group overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/20 hover:bg-[#13151c]/80"
    >
      {/* Dynamic light strip on bottom */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-700 ease-out" />
      
      {/* Background soft glow */}
      <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-[#D4AF37]/[0.02] rounded-full blur-3xl group-hover:bg-[#D4AF37]/[0.05] transition-all duration-500" />

      <div className="font-syne text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 flex items-baseline">
        <span>{count}</span>
        <span className="text-[#D4AF37] ml-0.5">{suffix}</span>
      </div>
      
      <p className="text-base text-slate-300 font-light leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
        {label}
      </p>
    </div>
  );
}
