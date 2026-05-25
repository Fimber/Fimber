import { useEffect, useState } from 'react';

/** Custom cursor for pointer devices only — skipped on touch/mobile */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const noTouch = !window.matchMedia('(hover: none)').matches;
    if (!finePointer || !noTouch) return;

    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#D4AF37] pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)` }}
      aria-hidden
    />
  );
}
