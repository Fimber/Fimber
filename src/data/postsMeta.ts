import type { BlogPost } from '../types';

export const DEFAULT_POST_META: Omit<BlogPost, 'content'>[] = [
  {
    "id": "post-rbac-react",
    "title": "Building Fine-Grained Role Based Access Control (RBAC) in React Apps",
    "excerpt": "Architect permission-based RBAC in React: context checkers, Guard components, protected routes, server middleware, multi-tenant orgs, and tests—with Permify-ready patterns.",
    "tags": [
      "Security",
      "RBAC",
      "React",
      "TypeScript",
      "Permify"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-18T12:00:00Z",
    "updatedAt": "2026-05-18T12:00:00Z"
  },
  {
    "id": "post-anti-bot-scraping",
    "title": "How Modern Anti-Bot Systems Work and What Developers Should Know About Web Data Collection",
    "excerpt": "TLS fingerprinting, JS challenges, behavioral analysis, and the legal landscape (CFAA, hiQ, GDPR)—plus how to build defensible data pipelines without defaulting to aggressive scraping.",
    "tags": [
      "Scraping",
      "Web Data",
      "Security",
      "Playwright",
      "Legal"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-10T12:00:00Z",
    "updatedAt": "2026-05-10T12:00:00Z"
  },
  {
    "id": "post-product-led-content",
    "title": "How to Write Product-Led Content That Engineers Actually Respect",
    "excerpt": "Lead with the problem, prove credibility with working code, introduce the product honestly, and measure activation—not pageviews. A full guide to product-led content engineers trust.",
    "tags": [
      "Product-Led Content",
      "B2B SaaS",
      "Developers",
      "Writing",
      "SEO"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-24T12:00:00Z",
    "updatedAt": "2026-05-24T12:00:00Z"
  }
];
