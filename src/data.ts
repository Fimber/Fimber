import { Service, Project, Experience, Testimonial, BlogPost } from './types';

export { BRANDS } from './data/brands';

export const SERVICES: Service[] = [
  {
    num: '01',
    iconName: 'edit',
    title: 'Technical Tutorials & Guides',
    description:
      'I write long-form tutorials that start with a working repo and end with a shipped feature. I write the code, run it, break it on purpose, then walk the reader through the fix. That process is why 40+ of my guides are still live on LogRocket and why developers keep coming back to them.\n\nTopics I go deep on: React architecture, TypeScript patterns, RBAC policy design, web scraping infrastructure, and frontend performance.',
    proof: '40+ guides on LogRocket · RBAC series for Permify · Scraping tutorials for Decodo',
  },
  {
    num: '02',
    iconName: 'book-open',
    title: 'Developer Documentation & APIs',
    description:
      "API references, SDK quickstarts, and full doc sites on Mintlify or Docusaurus. I don't write endpoint specs from a Notion doc someone forwarded me. I test the API, read the response objects, and write docs that reflect what the developer will actually encounter.\n\nI've shipped a complete Mintlify documentation portal from scratch. You can browse it live.",
    proof: 'Live Mintlify docs portfolio',
    proofLink: {
      label: 'Browse the live docs',
      href: 'https://hackmamba-3f164318.mintlify.app/',
    },
  },
  {
    num: '03',
    iconName: 'code',
    title: 'Product-Led Content',
    description:
      "Here's how this works. I build a barebones app with standard open-source tools. I show where it cracks under real conditions. Then I introduce your SDK as the fix, with the exact code to prove it. The reader learns something useful. Your signup rate goes up.\n\nI did this for Permify (25% traffic lift) and Scrape.do (~35% organic growth).",
    proof: 'Permify content program · Scrape.do developer tutorials',
  },
  {
    num: '04',
    iconName: 'search',
    title: 'SEO & Content Strategy',
    description:
      "I don't bolt SEO onto finished drafts. I build it into the content architecture from the outline stage: keyword research, topic clustering, competitive gap analysis, editorial calendars. Then I measure what actually ranks and adjust.",
    proof: 'Refine SEO overhaul · saas.group content architecture',
  },
  {
    num: '05',
    iconName: 'calendar',
    title: 'Editorial Management',
    description:
      "I ran the editorial side of In Plain English, a developer publication with 50,000+ readers. Screened submissions, set code standards, coordinated contributors, formatted newsletters. If you need someone who can manage the whole content operation and write for it too, I've done that.",
    proof: 'In Plain English (50k+ readers managed)',
  },
];

export const PROJECTS: Project[] = [
  {
    client: 'Hackmamba',
    title: 'Live Developer Documentation Portfolio (Mintlify)',
    metrics: ['API + product guides', 'Mintlify site architecture', 'Live doc portal'],
    link: 'https://hackmamba-3f164318.mintlify.app/',
    date: '2025 — Portfolio',
    featured: true
  },
  {
    client: 'Decodo',
    title: 'Web Scraping API Docs & Developer Tutorials',
    metrics: ['Scraping API education', 'Integration guides', 'Technical SEO content'],
    link: 'https://decodo.com/',
    date: '2024 — Present'
  },
  {
    client: 'Studio1HQ',
    title: 'Agency Technical Content for DevTools & SaaS Clients',
    metrics: ['Blogs-as-a-Service', 'DevRel-ready tutorials', 'Multi-client editorial'],
    link: 'https://studio1hq.com/',
    date: '2024 — Present'
  },
  {
    client: 'Hackmamba',
    title: 'Agency Technical Content & Documentation Programs',
    metrics: ['Client-facing tutorials', 'Product documentation', 'Developer education'],
    link: 'https://hackmamba.io/',
    date: '2024 — Present'
  },
  {
    client: 'Scrape.do',
    title: 'B2B Technical Scraping Tutorials & SDK Guides',
    metrics: ['~35% organic growth', 'Key developer terms top 3 on Google'],
    link: 'https://scrape.do/authors/fimber/',
    date: 'Aug 2024 — Present'
  },
  {
    client: 'Permify',
    title: 'Fine-grained Authorization & RBAC Policy Guides',
    metrics: ['25% traffic lift', 'Ranked #1 for complex RBAC topics'],
    link: 'https://www.linkedin.com/in/fimber-elemuwa',
    date: 'Aug 2024 — Present'
  },
  {
    client: 'Refine',
    title: 'SEO Strategy & Developer Content Overhaul',
    metrics: ['20% global traffic lift', '60% session engagement boost'],
    link: 'https://www.linkedin.com/in/fimber-elemuwa',
    date: 'Dec 2022 — Jan 2023'
  },
  {
    client: 'LogRocket',
    title: 'Frontend Architecture & Modern Dev Tooling Guides',
    metrics: ['3+ years contributing', 'Over 40 complex guides written'],
    link: 'https://blog.logrocket.com/author/fimberelemuwa/',
    date: 'Jun 2022 — Present'
  },
  {
    client: 'In Plain English',
    title: 'Publication Oversight & Editorial Direction',
    metrics: ['50k+ readers managed', 'Set developer editorial standards'],
    link: 'https://withblue.ink/',
    date: 'Apr 2023 — Sep 2023'
  },
  {
    client: 'saas.group',
    title: 'Product-Led Content Campaigns Across Brands',
    metrics: ['Ongoing support', 'Multi-channel full-funnel content'],
    link: 'https://www.linkedin.com/in/fimber-elemuwa',
    date: 'Oct 2023 — Present'
  }
];

/** Experience timeline — most recent first */
export const EXPERIENCES: Experience[] = [
  {
    date: '2025',
    company: 'Hackmamba',
    category: 'Agency',
    description:
      'Technical content agency partner—writing developer tutorials, product documentation, and editorial programs for B2B SaaS and devtool clients, including Mintlify-ready doc deliverables.',
    metric: 'Docs + tutorials',
  },
  {
    date: '2025',
    company: 'Studio1HQ',
    category: 'Agency',
    description:
      'Contributing technical blogs, API guides, and DevRel-aligned content for devtools and SaaS brands through Studio1’s agency model—coders who write, writers who code.',
    metric: 'Technical content',
  },
  {
    date: '2024',
    company: 'Decodo',
    category: 'Scraping',
    description:
      'Authoring technical content for Decodo’s web scraping platform (formerly Smartproxy)—API tutorials, integration walkthroughs, and developer education on proxies, anti-bot bypass, and data extraction.',
    metric: 'API + scraping guides',
  },
  {
    date: '2024',
    company: 'Scrape.do',
    description:
      'Building SDK guides, integration docs, and deep tutorials on scraping infrastructure—pairing product documentation with SEO-driven developer education.',
    metric: '~35% organic growth',
  },
  {
    date: '2024',
    company: 'Permify',
    description:
      'Authoring core guides, API-adjacent policy docs, use cases, and technical comparisons for fine-grained authorization, RBAC/ABAC models, and policy languages.',
    metric: '25% traffic lift',
  },
  {
    date: '2023',
    company: 'saas.group',
    description:
      'Designing product-led content architectures, developer documentation standards, and SEO-optimised editorial across portfolio brands to acquire technical users.',
    metric: 'Docs + full-funnel strategy',
  },
  {
    date: '2023',
    company: 'In Plain English',
    description:
      'Served as Publication Manager. Screened tutorial submissions, formatted code standards, and coordinated newsletters to 50k+ technical readers.',
    metric: '50k+ readers managed',
  },
  {
    date: '2022',
    company: 'LogRocket',
    description:
      'Writing rich tutorials and structured how-to documentation on React, TypeScript, and web performance—content read by tens of thousands of developers monthly.',
    metric: '40+ technical guides',
  },
  {
    date: '2022',
    company: 'Refine',
    description:
      'Restructured key landing page copy, optimized tutorial frameworks, and resolved key technical SEO issues regarding code indexing.',
    metric: '20% traffic + 60% engagement',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Working with Fimber over the past couple of years has been an absolute pleasure. He fact-checks every claim, tailors his writing perfectly to the developer audience, and always meets deadlines.',
    author: 'Raisa Yogiaman',
    role: 'Content Marketer, saas.group',
    initials: 'RY',
    colorClass: 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
  },
  {
    quote: 'He takes initiative, researches complicated subject matters deeply, and consistently delivers exceptionally high-quality work — no matter the complexity of the technical topics.',
    author: 'Shannon Kelly Ash',
    role: 'Head of Content Marketing, saas.group',
    initials: 'SK',
    colorClass: 'bg-[#E0D8D0]/10 text-[#E0D8D0] border border-[#E0D8D0]/20'
  },
  {
    quote: 'Fimber has a rare superpower: he is able to grasp highly complex cloud and system concepts and explain them in a way that is easy-to-understand, engaging, and authoritative.',
    author: 'Sunil Sandhu',
    role: 'CEO, In Plain English',
    initials: 'SS',
    colorClass: 'bg-[#D4AF37]/5 text-[#E0D8D0] border border-white/5'
  }
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'post-rbac-react',
    title: 'Building Fine-Grained Role Based Access Control (RBAC) in React Apps',
    excerpt: 'Deep dive into implementing flexible permissions, guarding routes, and managing user roles dynamically in modern component architectures.',
    content: `# Building Fine-Grained Role Based Access Control (RBAC) in React Apps

When building enterprise applications, handling access control is one of the most critical aspects of frontend architecture. While simple authentication blocks unauthenticated visitors, enterprise SaaS apps require **fine-grained role-based access control (RBAC)**.

Developers must not only prevent loading pages unless authorized but also block specific active buttons, input sections, or sidebar navigation tabs.

Let's explore how to structure high-performance RBAC cleanly without bloating your client bundles or causing erratic page flickers.

---

## 1. The Dynamic Permission Standard

A bad pattern in frontend authorization is hardcoding checks against raw role strings like this:

\`\`\`tsx
// ❌ Avoid hardcoding raw roles
if (user.role === 'admin') {
  return <DeleteButton />;
}
\`\`\`

**Why is this bad?** Roles change. You might need to add a "Sub-Admin" or "Billing-Manager" next month. Hardcoding roles means diving back into code. Instead, decouple **Roles** from **Permissions**:

- **Roles**: Admin, Editor, Viewer, Guest
- **Permissions**: \`posts:create\`, \`posts:delete\`, \`billing:write\`, \`users:invite\`

Your user model should return an array of direct permissions:

\`\`\`json
{
  "id": "usr_9921",
  "name": "Fimber Elemuwa",
  "role": "Editor",
  "permissions": ["posts:create", "posts:update", "posts:publish"]
}
\`\`\`

---

## 2. Implementing the React Context Hook

Let us build a dedicated \`AuthProvider\` tracking the authenticated identity.

\`\`\`typescript
import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: { permissions: string[] } | null;
  hasPermission: (perm: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  hasPermission: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = { permissions: ['posts:create', 'posts:update'] }; // Mocked fetch

  const hasPermission = (perm: string) => {
    return user?.permissions.includes(perm) || false;
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
\`\`\`

---

## 3. Creating the Sleek Guard Component

To toggle UI features gracefully, we design a reusable \`<Guard>\` wrapper.

\`\`\`tsx
import React from 'react';
import { useAuth } from './AuthContext';

interface GuardProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const Guard: React.FC<GuardProps> = ({ permission, fallback = null, children }) => {
  const { hasPermission } = useAuth();
  
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
\`\`\`

Now, managing elements becomes extremely declarative and safe:

\`\`\`tsx
<Guard permission="posts:delete" fallback={<p className="text-sm text-gray-400">Read-Only Access</p>}>
  <button className="bg-red-500 text-white px-4 py-2 rounded">
    Delete Permanent Post
  </button>
</Guard>
\`\`\`

Implementing permission layers with this design shields sensitive actions from client error leaks while preparing your app to integrate centralized policy servers like **Permify** easily!`,
    tags: ['Security', 'RBAC', 'React', 'Auth'],
    image: '',
    status: 'published',
    date: '2026-05-18T10:00:00Z',
    updatedAt: '2026-05-18T10:00:00Z'
  },
  {
    id: 'post-anti-bot-scraping',
    title: "The Developer's Handbook to Bypassing Modern Anti-Bot Firewalls",
    excerpt: 'Understand IP rotation, custom header emulation, TLS fingerprinting, and automated stealth proxies to build resilient scrapers.',
    content: `# The Developer's Handbook to Bypassing Modern Anti-Bot Firewalls

Data runs modern SaaS engines. To train AI engines or monitor software competitors, you must extract clean data at scale. But today, simple HTTP requests are immediately blocked by advanced shields like Cloudflare, Akamai, or Datadome.

As web writers, explaining both the legalities and mechanical layers of scraping is a high-value skill. Let us dive into the mechanics of building resilient, high-speed crawling pipelines.

---

## 1. Demystifying Cloudflare JA3 TLS Fingerprinting

Modern scrapers cannot merely fake User-Agent strings. Web application firewalls do not even look at the User-Agent first; they analyze the **JA3 TLS Fingerprint**.

During the initial TLS handshake (Client Hello), your browser lists supported cipher suites, extensions, and elliptic curves in a precise arrangement. Browsers like Chrome have unique fingerprints compared to Node/Python engines like Axios or Urllib:

- **Chrome JA3 Hash**: \`771,4865-4866-4867-49195-49199...\`
- **Axios HTTP Client Hash**: \`771,52393-52392-49200-49199...\`

If your scraping framework claims it is Chrome in its user-agent headers, but initiates handshakes with a standard Node.js cipher list, Cloudflare detects this mismatch and blocks the request immediately with a 403 Forbidden status.

### The Fix: TLS Spoofing in Node

Use clients like \`cURL-impersonate\` or Node-native spoofing packages that compile OpenSSL with Chrome-identical ciphers.

---

## 2. Setting Up Advanced Session Resilience

To scrape thousands of items across target stores, always implement custom **IP rotation** and **automatic cookie persistence** using professional residential backconnect proxies.

Here is a resilient Axios request architecture with proxies and user emulation details:

\`\`\`javascript
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

async function fetchStealth(url) {
  // Rotate residential IPs per request
  const proxyUrl = 'http://username-session-random123:password@proxy.provider:8000';
  const agent = new HttpsProxyAgent(proxyUrl);
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
  };

  try {
    const response = await axios.get(url, { 
      httpAgent: agent, 
      httpsAgent: agent, 
      headers,
      timeout: 10000 
    });
    return response.data;
  } catch (err) {
    console.error('Request compromised:', err.message);
    throw err;
  }
}
\`\`\`

Using tools like **Scrape.do** handles proxy rotation, headless browser rendering, and JS challenges in a single API call, allowing you to focus purely on parsing structure rather than bypass telemetry.`,
    tags: ['Scraping', 'System Design', 'Node.js', 'Automation'],
    image: '',
    status: 'published',
    date: '2026-05-10T14:30:00Z',
    updatedAt: '2026-05-10T14:30:00Z'
  },
  {
    id: 'post-product-led-content',
    title: 'How to Write Product-Led Content That Engineers Actually Respect',
    excerpt: 'Stop writing clickbait. Learn how to craft code-first, developer-focused articles that show your product solving real issues without being cheesy.',
    content: `# How to Write Product-Led Content That Engineers Actually Respect

If your primary user is software engineers, cloud architects, or DevOps leads, standard marketing material will not work. Engineers have incredibly high-precision radar for "marketing fluff". They do not care about buzzwords, sleek landing gradients, or hype. They care about **working solutions to active problems**.

Product-led content is an editorial art. It allows B2B SaaS firms to place their product directly into developer workflows as a logical solution, and here is how to execute it perfectly.

---

## 1. Code First, Talk Later

If your article has no code block or terminal snippet in the first three scrolls, a developer will bounce. They want to see that you actually understand the language environment they work in.

Never start with:
*"In contemporary enterprise infrastructures, managing scalable systems requires high-velocity cloud orchestration..."*

Instead, immediately demonstrate the pain point:
\`\`\`bash
$ npm install custom-orm-package
Error: Cannot resolve dependency tree. Peer conflict on react@19
\`\`\`

**Why?** This is a real struggle. The developer immediately thinks "Yes! I saw this error yesterday on my project!" You have instant buy-in because you started with their reality.

---

## 2. Embed the Product Honestly

Do not make your product a magical savior that solves all world issues in one click. Frame it dynamically:

1. **The Context**: Build a clear, barebones app using standard open-source technologies (e.g. Express, MongoDB).
2. **The Breaking Point**: Show where that architecture starts to crack under scale or complexity (e.g. database locking, complex authorization trees, query latency).
3. **The Pivot**: Introduce your product. Show exactly how replacing those 200 lines of messy custom code with your SDK takes only 5 lines.
4. **The Code Proof**: Provide the script. Let them see the precise configuration.

---

## 3. SEO That Supports, Not Suffocates

Keyword stuffing will destroy your credibility. If an engineer reads "best modern react database driver" six times in two paragraphs, they will immediately distrust the writer.

Instead, write **authoritative cluster content**. Cover secondary topics like API structures, performance configurations, and security issues thoroughly. Provide deep-dive value, and search engines like Google will reward your systemic topical authority naturally.`,
    tags: ['Marketing', 'B2B SaaS', 'Developers', 'Writing'],
    image: '',
    status: 'published',
    date: '2026-05-02T16:00:00Z',
    updatedAt: '2026-05-02T16:00:00Z'
  }
];
