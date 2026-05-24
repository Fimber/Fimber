export type AppRoute =
  | { type: 'home' }
  | { type: 'blog' }
  | { type: 'post'; id: string };

export function parseRoute(pathname: string): AppRoute {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const postMatch = normalized.match(/^\/writing\/([^/]+)$/);
  if (postMatch) return { type: 'post', id: postMatch[1] };
  if (normalized === '/blog') return { type: 'blog' };
  return { type: 'home' };
}

/** Client-side navigation without full reload */
export function navigateTo(path: string): void {
  const target = path.startsWith('/') ? path : `/${path}`;
  window.history.pushState({}, '', target);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}
