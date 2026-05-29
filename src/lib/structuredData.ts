import { BlogPost } from '../types';
import {
  BLOG_PAGE_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
  postPath,
} from '../siteConfig';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: 'Technical Content Writer',
    description:
      'B2B SaaS technical content writer specializing in developer tutorials, API documentation, and product-led content.',
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.logrocket],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_NAME} — Portfolio`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: { '@type': 'Person', name: SITE_NAME },
  };
}

export function blogIndexJsonLd(posts: BlogPost[]) {
  const published = posts.filter((post) => post.status === 'published');
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} — Technical Blog`,
    url: absoluteUrl('/blog'),
    description: BLOG_PAGE_DESCRIPTION,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    blogPost: published.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(postPath(post.id)),
      datePublished: post.date,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function toSchemaDate(iso: string): string {
  return iso.slice(0, 10);
}

/** Article schema for individual posts (Google rich results / E-E-A-T) */
export function articleJsonLd(post: BlogPost) {
  const url = absoluteUrl(postPath(post.id));
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: toSchemaDate(post.date),
    dateModified: toSchemaDate(post.updatedAt || post.date),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return articleJsonLd(post);
}

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE_NAME} — Technical Content Writing`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    provider: { '@type': 'Person', name: SITE_NAME },
    areaServed: 'Worldwide',
    serviceType: [
      'Technical Content Writing',
      'B2B SaaS Content Strategy',
      'SEO Content',
      'Developer Documentation',
    ],
  };
}
