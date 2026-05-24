import { resolveBrand } from '../data/brands';

interface CompanyLogoProps {
  company: string;
  className?: string;
  imageClassName?: string;
  showName?: boolean;
}

export default function CompanyLogo({
  company,
  className = '',
  imageClassName = '',
  showName = false,
}: CompanyLogoProps) {
  const brand = resolveBrand(company);

  if (!brand) {
    return (
      <span className={`font-mono text-[#D4AF37] tracking-wider uppercase ${className}`}>
        {company}
      </span>
    );
  }

  const monoFilter = brand.monochrome
    ? 'brightness-0 invert opacity-70 group-hover:opacity-100'
    : 'opacity-75 group-hover:opacity-100';

  return (
    <span className={`inline-flex items-center gap-3 min-w-0 ${className}`}>
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={120}
        height={32}
        loading="lazy"
        decoding="async"
        className={`h-7 w-auto max-w-[130px] object-contain object-left transition-opacity duration-300 ${monoFilter} ${imageClassName}`}
      />
      {showName && (
        <span className="font-mono text-sm text-slate-400 tracking-wider uppercase truncate">
          {brand.name}
        </span>
      )}
    </span>
  );
}
