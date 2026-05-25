import type { BlogPost } from '../types';

export const DEFAULT_POST_META: Omit<BlogPost, 'content'>[] = [
  {
    "id": "post-rbac-react",
    "title": "Building Fine-Grained Role Based Access Control (RBAC) in React Apps",
    "excerpt": "Deep dive into implementing flexible permissions, guarding routes, and managing user roles dynamically in modern component architectures.",
    "tags": [
      "Security",
      "RBAC",
      "React",
      "Auth"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-18T10:00:00Z",
    "updatedAt": "2026-05-18T10:00:00Z"
  },
  {
    "id": "post-anti-bot-scraping",
    "title": "The Developer's Handbook to Bypassing Modern Anti-Bot Firewalls",
    "excerpt": "Understand IP rotation, custom header emulation, TLS fingerprinting, and automated stealth proxies to build resilient scrapers.",
    "tags": [
      "Scraping",
      "System Design",
      "Node.js",
      "Automation"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-10T14:30:00Z",
    "updatedAt": "2026-05-10T14:30:00Z"
  },
  {
    "id": "post-product-led-content",
    "title": "How to Write Product-Led Content That Engineers Actually Respect",
    "excerpt": "Stop writing clickbait. Learn how to craft code-first, developer-focused articles that show your product solving real issues without being cheesy.",
    "tags": [
      "Marketing",
      "B2B SaaS",
      "Developers",
      "Writing"
    ],
    "image": "",
    "status": "published",
    "date": "2026-05-02T16:00:00Z",
    "updatedAt": "2026-05-02T16:00:00Z"
  }
];
