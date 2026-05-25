type BackdropVariant = 'hero' | 'services' | 'work' | 'experience' | 'contact';

const VARIANTS: Record<BackdropVariant, string> = {
  hero: 'from-[#5c3a1f]/25 via-transparent to-[#D4AF37]/10',
  services: 'from-[#1a2030]/40 via-[#080808] to-[#0f1218]/30',
  work: 'from-[#12161f]/50 via-[#080808] to-[#0b0c10]/40',
  experience: 'from-[#151820]/45 via-transparent to-[#1a1510]/20',
  contact: 'from-[#D4AF37]/[0.04] via-[#0b0c10] to-[#080808]',
};

interface SectionBackdropProps {
  variant?: BackdropVariant;
  opacity?: string;
}

/** Lightweight gradient backdrop — no external images */
export default function SectionBackdrop({
  variant = 'hero',
  opacity = 'opacity-100',
}: SectionBackdropProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 bg-gradient-to-br ${VARIANTS[variant]} ${opacity}`}
      aria-hidden
    />
  );
}
