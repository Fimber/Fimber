/** Public site URL — set VITE_SITE_URL in .env for production deploys */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://fimberelemuwa.com';

export const SITE_NAME = 'Fimber Elemuwa';
export const SITE_TAGLINE = 'Technical Content Writer';
export const SITE_DESCRIPTION =
  'Fimber Elemuwa writes technical tutorials, API documentation, and product-led content for B2B SaaS companies. Clients include LogRocket, Permify, Decodo, and Refine.';

export const BLOG_PAGE_DESCRIPTION =
  'Technical articles on B2B SaaS, developer tooling, security, scraping, and content strategy.';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/fimber-elemuwa',
  twitter: 'https://x.com/Fimbosky21',
  instagram: 'https://www.instagram.com/fimberelems/',
  logrocket: 'https://blog.logrocket.com/author/fimberelemuwa/',
  email: 'mailto:fimberelemuwa@gmail.com',
} as const;

export function postPath(postId: string): string {
  return `/writing/${postId}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Open Graph / Twitter card image — replace with /images/og-default.png (1200×630) when ready */
export const DEFAULT_OG_IMAGE = '/images/fimber-elemuwa.webp';

export function resolveOgImage(image?: string): string {
  const trimmed = image?.trim();
  if (!trimmed) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return absoluteUrl(trimmed.startsWith('/') ? trimmed : `/${trimmed}`);
}
