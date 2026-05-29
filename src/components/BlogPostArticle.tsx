import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { parseMarkdownToHtml } from '../lib/markdown';

interface BlogPostArticleProps {
  post: BlogPost;
  showMeta?: boolean;
}

export default function BlogPostArticle({ post, showMeta = true }: BlogPostArticleProps) {
  const wordsCount = post.content ? post.content.trim().split(/\s+/).length : 0;
  const readDuration = Math.max(1, Math.ceil(wordsCount / 225));

  return (
    <article className="font-sans max-w-none">
      {showMeta && (
        <header className="space-y-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="flex items-center gap-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-full px-3.5 py-1 text-xs font-mono font-medium tracking-wider text-[#D4AF37] uppercase"
              >
                <Tag className="w-3 h-3" aria-hidden />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tighter">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 font-light border-b border-white/5 pb-10">
            <time dateTime={post.date} className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" aria-hidden />
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="text-slate-600" aria-hidden>
              •
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" aria-hidden />
              {readDuration} min read
            </span>
          </div>
        </header>
      )}

      {post.image && (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 border border-white/5">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className="text-slate-200 font-light text-lg leading-relaxed space-y-6 md:text-xl"
        dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(post.content) }}
      />
    </article>
  );
}
