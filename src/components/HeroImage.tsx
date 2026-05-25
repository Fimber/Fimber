export default function HeroImage() {
  return (
    <picture>
      <source srcSet="/images/fimber-elemuwa.webp" type="image/webp" />
      <img
        src="/images/fimber-elemuwa.png"
        alt="Fimber Elemuwa — B2B SaaS Technical Content Writer"
        width={480}
        height={600}
        className="absolute inset-0 w-full h-full object-cover object-[center_12%]"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}
