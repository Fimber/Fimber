import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { DEFAULT_POSTS } from './data';
import { resolvePageMeta } from './lib/pageMeta';
import { postPath } from './siteConfig';

export async function prerender(data: { url: string }) {
  const pathname = new URL(data.url, 'http://prerender.local').pathname;
  const pageMeta = resolvePageMeta(pathname, DEFAULT_POSTS);

  const html = renderToString(
    <StrictMode>
      <App prerenderPath={pathname} />
    </StrictMode>
  );

  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const discovered = parseLinks(html);

  const postRoutes = DEFAULT_POSTS.filter((p) => p.status === 'published').map((p) =>
    postPath(p.id)
  );

  return {
    html,
    links: new Set(['/blog', ...discovered, ...postRoutes]),
    head: {
      lang: 'en',
      title: pageMeta.title,
      elements: new Set(pageMeta.headElements),
    },
  };
}
