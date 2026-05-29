import { DEFAULT_POST_META } from '../data/postsMeta';
import { POST_CONTENTS } from '../data/postContents';
import { BlogPost } from '../types';

export const BLOG_STORAGE_KEY = 'fe_blog_posts';
/** Bump when default posts change — clears stale localStorage copies */
export const BLOG_STORAGE_VERSION_KEY = 'fe_blog_posts_version';
export const BLOG_STORAGE_VERSION = 4;

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

/** Drop removed posts and refresh bodies from bundled sources */
export function syncPostsWithDefaults(saved: BlogPost[] | null | undefined): BlogPost[] {
  const defaults = getDefaultPosts();
  if (!saved?.length) return defaults;

  const canonicalIds = new Set(DEFAULT_POST_META.map((m) => m.id));
  const hasRemovedPosts = saved.some((p) => !canonicalIds.has(p.id));

  if (hasRemovedPosts) return defaults;

  return defaults.map((def) => {
    const fromSaved = saved.find((p) => p.id === def.id);
    if (!fromSaved) return def;
    return {
      ...def,
      status: fromSaved.status === 'draft' ? 'draft' : def.status,
    };
  });
}

/** Browser-only: admin edits in localStorage (never relied on for SEO) */
export function loadPostsFromStorage(): BlogPost[] {
  if (typeof window === 'undefined') return getDefaultPosts();

  try {
    const defaults = getDefaultPosts();
    const version = localStorage.getItem(BLOG_STORAGE_VERSION_KEY);
    const savedRaw = localStorage.getItem(BLOG_STORAGE_KEY);
    const saved = savedRaw ? (JSON.parse(savedRaw) as BlogPost[]) : null;
    const synced = syncPostsWithDefaults(saved);

    const needsPersist =
      version !== String(BLOG_STORAGE_VERSION) ||
      !savedRaw ||
      synced.length !== saved?.length;

    if (needsPersist) {
      localStorage.setItem(BLOG_STORAGE_VERSION_KEY, String(BLOG_STORAGE_VERSION));
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(synced));
    }

    return synced;
  } catch {
    const defaults = getDefaultPosts();
    localStorage.setItem(BLOG_STORAGE_VERSION_KEY, String(BLOG_STORAGE_VERSION));
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
}

export function savePostsToStorage(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}
