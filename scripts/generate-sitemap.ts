import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_POSTS } from '../src/data';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://fimberelemuwa.com').replace(/\/$/, '');
const SITE_NAME = 'Fimber Elemuwa';
const SITE_TAGLINE = 'B2B SaaS Technical Content Writer';
const SITE_DESCRIPTION =
  'Fimber Elemuwa writes technical tutorials, API documentation, and product-led content for B2B SaaS companies. Clients include LogRocket, Permify, Decodo, and Refine.';
const BLOG_DESCRIPTION =
  'Technical articles on B2B SaaS, developer tooling, security, scraping, and content strategy.';

const publishedPosts = DEFAULT_POSTS.filter((post) => post.status === 'published');

const postPaths = publishedPosts.map((post) => `/writing/${post.id}`);

const allPaths = ['/', '/blog', ...postPaths];

const urls = allPaths
  .map((path) => {
    const loc = `${SITE_URL}${path === '/' ? '/' : path}`;
    const priority = path === '/' ? '1.0' : path.startsWith('/writing/') ? '0.8' : '0.7';
    const changefreq = path.startsWith('/writing/') ? 'monthly' : 'weekly';
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const articleLines = publishedPosts
  .map((post) => {
    const url = `${SITE_URL}/writing/${post.id}`;
    const excerpt = post.excerpt.replace(/\s+/g, ' ').trim();
    return `- [${post.title}](${url}): ${excerpt}`;
  })
  .join('\n');

const llmsTxt = `# ${SITE_NAME}

> ${SITE_TAGLINE}. ${SITE_DESCRIPTION}

## Main pages

- [Portfolio home](${SITE_URL}/): Services, selected work, experience, testimonials, and contact.
- [Technical blog](${SITE_URL}/blog): ${BLOG_DESCRIPTION}

## Articles

${articleLines}

## External portfolio

- [Developer documentation portfolio (Mintlify)](https://hackmamba-3f164318.mintlify.app/): Live API and product documentation samples.

## Optional

- [LinkedIn](https://www.linkedin.com/in/fimber-elemuwa)
- [X / Twitter](https://x.com/Fimbosky21)
- [Instagram](https://www.instagram.com/fimberelems/)
- [Email](mailto:fimberelemuwa@gmail.com)
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(publicDir, 'llms.txt'), llmsTxt, 'utf8');

const robotsPath = join(publicDir, 'robots.txt');
writeFileSync(
  robotsPath,
  `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-crawl
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
  'utf8'
);

console.log(`Generated sitemap.xml (${allPaths.length} URLs) and llms.txt (${SITE_URL})`);
