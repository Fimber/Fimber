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
    jobTitle: SITE_TAGLINE,
    url: SITE_URL,
    email: 'fimberelemuwa@gmail.com',
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter, SOCIAL_LINKS.instagram],
    description: SITE_DESCRIPTION,
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

export function blogPostingJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    url: absoluteUrl(postPath(post.id)),
    mainEntityOfPage: absoluteUrl(postPath(post.id)),
    keywords: post.tags?.join(', '),
  };
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
