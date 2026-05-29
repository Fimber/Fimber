import { BlogPost } from '../types';
import { getPostById } from './blogPosts';
import {
  blogIndexJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  websiteJsonLd,
} from './structuredData';
import {
  BLOG_PAGE_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  postPath,
  resolveOgImage,
} from '../siteConfig';

export type HeadElement = {
  type: string;
  props?: Record<string, string>;
  children?: string;
};

export type PageMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage: string;
  headElements: HeadElement[];
};

function meta(name: string, content: string): HeadElement {
  return { type: 'meta', props: { name, content } };
}

function metaProperty(property: string, content: string): HeadElement {
  return { type: 'meta', props: { property, content } };
}

function canonical(href: string): HeadElement {
  return { type: 'link', props: { rel: 'canonical', href } };
}

function jsonLdScript(data: object): HeadElement {
  return {
    type: 'script',
    props: { type: 'application/ld+json' },
    children: JSON.stringify(data),
  };
}

function socialMeta(opts: {
  title: string;
  description: string;
  url: string;
  ogType?: string;
  imageUrl: string;
}): HeadElement[] {
  return [
    metaProperty('og:type', opts.ogType ?? 'website'),
    metaProperty('og:title', opts.title),
    metaProperty('og:description', opts.description),
    metaProperty('og:url', opts.url),
    metaProperty('og:image', opts.imageUrl),
    metaProperty('og:locale', 'en_US'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', opts.title),
    meta('twitter:description', opts.description),
    meta('twitter:image', opts.imageUrl),
  ];
}

function normalizePathname(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0];
  if (path === '/' || path === '') return '/';
  return path.replace(/\/$/, '');
}

/** Per-route SEO head — used by prerender and client-side navigation */
export function resolvePageMeta(pathname: string, posts?: BlogPost[]): PageMeta {
  const path = normalizePathname(pathname);
  const homeTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

  if (path === '/') {
    const url = absoluteUrl('/');
    const ogImage = resolveOgImage();
    return {
      title: homeTitle,
      description: SITE_DESCRIPTION,
      canonicalUrl: url,
      ogImage,
      headElements: [
        canonical(url),
        meta('description', SITE_DESCRIPTION),
        ...socialMeta({ title: homeTitle, description: SITE_DESCRIPTION, url, imageUrl: ogImage }),
        jsonLdScript(personJsonLd()),
        jsonLdScript(websiteJsonLd()),
        jsonLdScript(professionalServiceJsonLd()),
      ],
    };
  }

  if (path === '/blog') {
    const url = absoluteUrl('/blog');
    const blogTitle = `Blog | ${SITE_NAME}`;
    const published = (posts ?? []).filter((p) => p.status === 'published');
    const ogImage = resolveOgImage();
    return {
      title: blogTitle,
      description: BLOG_PAGE_DESCRIPTION,
      canonicalUrl: url,
      ogImage,
      headElements: [
        canonical(url),
        meta('description', BLOG_PAGE_DESCRIPTION),
        ...socialMeta({ title: blogTitle, description: BLOG_PAGE_DESCRIPTION, url, imageUrl: ogImage }),
        jsonLdScript(blogIndexJsonLd(published)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Home', url: absoluteUrl('/') },
            { name: 'Blog', url },
          ])
        ),
      ],
    };
  }

  const postMatch = path.match(/^\/writing\/([^/]+)$/);
  if (postMatch) {
    const post =
      posts?.find((p) => p.id === postMatch[1] && p.status === 'published') ??
      getPostById(postMatch[1]);
    if (post) {
      const articleUrl = absoluteUrl(postPath(post.id));
      const title = `${post.title} | ${SITE_NAME}`;
      const ogImage = resolveOgImage(post.image);
      return {
        title,
        description: post.excerpt,
        canonicalUrl: articleUrl,
        ogType: 'article',
        ogImage,
        headElements: [
          canonical(articleUrl),
          meta('description', post.excerpt),
          ...socialMeta({
            title: post.title,
            description: post.excerpt,
            url: articleUrl,
            ogType: 'article',
            imageUrl: ogImage,
          }),
          jsonLdScript(articleJsonLd(post)),
          jsonLdScript(
            breadcrumbJsonLd([
              { name: 'Home', url: absoluteUrl('/') },
              { name: 'Blog', url: absoluteUrl('/blog') },
              { name: post.title, url: articleUrl },
            ])
          ),
        ],
      };
    }
  }

  const url = absoluteUrl('/');
  const ogImage = resolveOgImage();
  return {
    title: homeTitle,
    description: SITE_DESCRIPTION,
    canonicalUrl: url,
    ogImage,
    headElements: [],
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Update document head after client-side route changes (dev + SPA navigation) */
export function applyPageMeta(meta: PageMeta) {
  if (typeof document === 'undefined') return;

  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertCanonical(meta.canonicalUrl);
  upsertMeta('property', 'og:type', meta.ogType ?? 'website');
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:url', meta.canonicalUrl);
  upsertMeta('property', 'og:image', meta.ogImage);
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', meta.ogImage);
}
