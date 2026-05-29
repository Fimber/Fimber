import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'src/data/postContents.ts'), 'utf8');
const jsonMatch = src.match(/export const POST_CONTENTS = (\{[\s\S]*\}) as Record/);
if (!jsonMatch) throw new Error('Could not parse POST_CONTENTS');
const contents = eval(`(${jsonMatch[1]})`);

const articlesDir = path.join(root, 'src/data/articles');
fs.mkdirSync(articlesDir, { recursive: true });

for (const [id, content] of Object.entries(contents)) {
  fs.writeFileSync(
    path.join(articlesDir, `${id}.ts`),
    `const content: string = ${JSON.stringify(content)};\nexport default content;\n`
  );
}

fs.writeFileSync(
  path.join(root, 'src/data/postContents.ts'),
  `import postRbacReact from './articles/post-rbac-react';
import postAntiBotScraping from './articles/post-anti-bot-scraping';
import postProductLedContent from './articles/post-product-led-content';

export const POST_CONTENTS: Record<string, string> = {
  'post-rbac-react': postRbacReact,
  'post-anti-bot-scraping': postAntiBotScraping,
  'post-product-led-content': postProductLedContent,
};
`
);

console.log('Modularized', Object.keys(contents).length, 'articles');
