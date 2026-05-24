/** Public site URL — set VITE_SITE_URL in .env for production deploys */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://fimberelemuwa.com';

export const SITE_NAME = 'Fimber Elemuwa';
export const SITE_TAGLINE = 'B2B SaaS Technical Content Writer';
export const SITE_DESCRIPTION =
  'Technical content writer specializing in B2B SaaS, developer-focused tutorials, SEO content strategy, and technical deep-dives.';

export const BLOG_PAGE_DESCRIPTION =
  'Technical articles on B2B SaaS, developer tooling, security, scraping, and content strategy.';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/fimber-elemuwa',
  twitter: 'https://x.com/Fimbosky21',
  instagram: 'https://www.instagram.com/fimberelems/',
  email: 'mailto:fimberelemuwa@gmail.com',
} as const;

export function postPath(postId: string): string {
  return `/writing/${postId}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
