import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
  opacity?: string;
  speed?: number;
}

export default function ParallaxBackground({
  imageUrl,
  opacity = 'opacity-[0.035]',
  speed = 0.25,
}: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let active = true;
    const handleScroll = () => {
      if (!active) return;
      window.requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className={`absolute inset-x-0 -top-[30%] h-[160%] bg-cover bg-center ${opacity} mix-blend-overlay will-change-transform`}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          backgroundImage: `url(${imageUrl})`,
        }}
      />
    </div>
  );
}
