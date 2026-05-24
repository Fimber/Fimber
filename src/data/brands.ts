export interface Brand {
  id: string;
  name: string;
  logo: string;
  /** Monochrome SVG — lighten on dark backgrounds via CSS */
  monochrome?: boolean;
}

export const BRANDS: Brand[] = [
  { id: 'hackmamba', name: 'Hackmamba', logo: '/logos/hackmamba.png' },
  { id: 'decodo', name: 'Decodo', logo: '/logos/decodo.png' },
  { id: 'studio1hq', name: 'Studio1HQ', logo: '/logos/studio1hq.png' },
  { id: 'saas-group', name: 'saas.group', logo: '/logos/saas-group.png' },
  { id: 'permify', name: 'Permify', logo: '/logos/permify.svg' },
  { id: 'scrape-do', name: 'Scrape.do', logo: '/logos/scrape-do.png' },
  { id: 'logrocket', name: 'LogRocket', logo: '/logos/logrocket.svg' },
  { id: 'refine', name: 'Refine', logo: '/logos/refine.svg', monochrome: true },
  { id: 'in-plain-english', name: 'In Plain English', logo: '/logos/in-plain-english.svg' },
  { id: 'sitepoint', name: 'SitePoint', logo: '/logos/sitepoint.svg', monochrome: true },
  { id: 'devto', name: 'Dev.to', logo: '/logos/devto.svg', monochrome: true },
];

const COMPANY_ALIASES: Record<string, string> = {
  'saas.group': 'saas-group',
  'Scrape.do': 'scrape-do',
  'Permify': 'permify',
  'LogRocket': 'logrocket',
  'Refine': 'refine',
  'In Plain English': 'in-plain-english',
  'SitePoint': 'sitepoint',
  'Dev.to': 'devto',
  Hackmamba: 'hackmamba',
  Decodo: 'decodo',
  Studio1HQ: 'studio1hq',
  'Studio1': 'studio1hq',
};

export function resolveBrand(companyName: string): Brand | undefined {
  const id =
    COMPANY_ALIASES[companyName] ??
    companyName.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
  return BRANDS.find((brand) => brand.id === id);
}
