import BlogPostPage from './BlogPostPage';
import { getPostById, loadPostsFromStorage } from '../lib/blogPosts';
import type { BlogPost } from '../types';

interface BlogPostRouteProps {
  id: string;
  posts: BlogPost[];
}

export default function BlogPostRoute({ id, posts }: BlogPostRouteProps) {
  const post =
    posts.find((p) => p.id === id && p.status === 'published') ?? getPostById(id);

  if (post) return <BlogPostPage post={post} />;

  return (
    <div className="min-h-screen bg-[#080808] text-[#E0D8D0] flex items-center justify-center p-8">
      <p>Article not found.</p>
    </div>
  );
}
