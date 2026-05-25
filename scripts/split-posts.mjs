import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../src/data.ts');
const source = fs.readFileSync(dataPath, 'utf8');
const marker = 'export const DEFAULT_POSTS: BlogPost[] = ';
const start = source.indexOf(marker);
if (start === -1) throw new Error('DEFAULT_POSTS not found');
const arrStart = source.indexOf('[', start + marker.length);
let depth = 0;
let i = arrStart;
for (; i < source.length; i++) {
  const c = source[i];
  if (c === '[') depth++;
  else if (c === ']') {
    depth--;
    if (depth === 0) {
      i++;
      break;
    }
  }
}
const arrCode = source.slice(arrStart, i);
// eslint-disable-next-line no-eval
const posts = eval(arrCode);
const contents = {};
const meta = posts.map((p) => {
  contents[p.id] = p.content;
  const { content: _c, ...rest } = p;
  return rest;
});

const dataDir = path.join(__dirname, '../src/data');
fs.writeFileSync(
  path.join(dataDir, 'postContents.ts'),
  `export const POST_CONTENTS = ${JSON.stringify(contents)} as Record<string, string>;\n`
);
fs.writeFileSync(
  path.join(dataDir, 'postsMeta.ts'),
  `import type { BlogPost } from '../types';\n\nexport const DEFAULT_POST_META: Omit<BlogPost, 'content'>[] = ${JSON.stringify(meta, null, 2)};\n`
);

const before = source.slice(0, start);
const after = source.slice(i);
const newData = `${before}export { DEFAULT_POST_META } from './data/postsMeta';\n${after.replace(/^[\s\S]*$/m, '').trim() ? '' : ''}`;
// Remove old DEFAULT_POSTS block from data.ts
const afterPosts = source.slice(i).trimStart();
const cleaned = before.trimEnd() + "\nexport { DEFAULT_POST_META } from './data/postsMeta';\n";
fs.writeFileSync(dataPath, cleaned);

console.log(`Split ${posts.length} posts into postsMeta.ts and postContents.ts`);
