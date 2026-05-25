import { DEFAULT_POST_META } from '../data/postsMeta';
import { POST_CONTENTS } from '../data/postContents';
import { BlogPost } from '../types';

export const BLOG_STORAGE_KEY = 'fe_blog_posts';

function withContent(meta: Omit<BlogPost, 'content'>): BlogPost {
  return { ...meta, content: POST_CONTENTS[meta.id] ?? '' };
}

/** Full posts — for admin and storage seed only */
export function getDefaultPosts(): BlogPost[] {
  return DEFAULT_POST_META.map(withContent);
}

/** Listing / home — no article bodies */
export function getCrawlablePosts(): BlogPost[] {
  return DEFAULT_POST_META.filter((post) => post.status === 'published').map((meta) => ({
    ...meta,
    content: '',
  }));
}

export function getPostById(id: string): BlogPost | undefined {
  const meta = DEFAULT_POST_META.find((post) => post.id === id);
  if (meta?.status === 'published') return withContent(meta);
  return undefined;
}

/** Browser-only: admin edits in localStorage (never relied on for SEO) */
export function loadPostsFromStorage(): BlogPost[] {
  if (typeof window === 'undefined') return getDefaultPosts();

  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved) return JSON.parse(saved) as BlogPost[];
    const defaults = getDefaultPosts();
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  } catch {
    return getDefaultPosts();
  }
}

export function savePostsToStorage(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}
