import { DEFAULT_POSTS } from '../data';
import { BlogPost } from '../types';

export const BLOG_STORAGE_KEY = 'fe_blog_posts';

/** Posts baked into the bundle — always visible to crawlers and pre-render */
export function getCrawlablePosts(): BlogPost[] {
  return DEFAULT_POSTS.filter((post) => post.status === 'published');
}

export function getPostById(id: string): BlogPost | undefined {
  const fromDefaults = DEFAULT_POSTS.find((post) => post.id === id);
  if (fromDefaults?.status === 'published') return fromDefaults;
  return undefined;
}

/** Browser-only: admin edits in localStorage (never relied on for SEO) */
export function loadPostsFromStorage(): BlogPost[] {
  if (typeof window === 'undefined') return DEFAULT_POSTS;

  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved) return JSON.parse(saved) as BlogPost[];
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
    return DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function savePostsToStorage(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}
