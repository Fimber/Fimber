import { motion } from 'motion/react';
import { BRANDS } from '../data/brands';

export default function Marquee() {
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden border-y border-white/5 bg-[#0d1018]/50 py-8 backdrop-blur-sm relative">
      <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max relative whitespace-nowrap">
        <motion.div
          className="flex items-center gap-20 pr-20"
          animate={{
            x: [0, '-33.333%'],
          }}
          transition={{
            ease: 'linear',
            duration: 22,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center shrink-0 h-10 px-2 select-none group"
              title={brand.name}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={140}
                height={40}
                loading="lazy"
                decoding="async"
                className={`h-8 md:h-9 w-auto max-w-[140px] object-contain object-center transition-opacity duration-300 ${
                  brand.monochrome
                    ? 'brightness-0 invert opacity-55 group-hover:opacity-90'
                    : 'opacity-65 group-hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
