import { BlogPost } from '../types';
import BlogPostArticle from '../components/BlogPostArticle';
import { SITE_NAME } from '../siteConfig';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#E0D8D0] font-sans">
      <div className="absolute inset-0 z-0 opacity-[0.035] bg-[linear-gradient(rgba(212,175,55,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-20">
        <nav aria-label="Breadcrumb">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-slate-400 hover:text-[#D4AF37] transition-colors py-2"
          >
            ← Back to Blog
          </a>
        </nav>

        <div className="mt-10">
          <BlogPostArticle post={post} />
        </div>

        <footer className="mt-16 pt-10 border-t border-white/5">
          <p className="font-syne text-base font-bold text-white">
            Written by{' '}
            <a href="/" className="hover:text-[#D4AF37] transition-colors">
              {SITE_NAME}
            </a>
          </p>
          <p className="text-sm text-slate-500 mt-1">B2B SaaS Technical Content Writer & Editor</p>
        </footer>
      </div>
    </div>
  );
}
