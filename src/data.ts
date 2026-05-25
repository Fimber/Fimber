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
export { DEFAULT_POST_META } from './data/postsMeta';
