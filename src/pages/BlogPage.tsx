import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';
import { postPath } from '../siteConfig';
import ParallaxBackground from '../components/ParallaxBackground';
import ScrollReveal from '../components/ScrollReveal';

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const publishedPosts = useMemo(() => posts.filter((p) => p.status === 'published'), [posts]);

  const allTags = useMemo(
    () => Array.from(new Set(publishedPosts.flatMap((post) => post.tags || []))),
    [publishedPosts]
  );

  const filteredPosts = selectedTag
    ? publishedPosts.filter((post) => post.tags?.includes(selectedTag))
    : publishedPosts;

  return (
    <main className="relative pt-28 pb-24 px-6 md:px-12 overflow-hidden">
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80"
        opacity="opacity-[0.02]"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-sm font-mono text-[#D4AF37] tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Technical Blog</span>
              </div>
              <h1 className="font-syne text-4xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
                Fresh Operational Articles
              </h1>
              <p className="text-slate-300 text-base font-light leading-relaxed mt-4 max-w-xl">
                Deep dives on B2B SaaS, developer tooling, security, scraping, and content strategy.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 cursor-none ${
                  selectedTag === null
                    ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md shadow-[#D4AF37]/10'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 cursor-none ${
                    selectedTag === tag
                      ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md shadow-[#D4AF37]/10'
                      : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.a
                  key={post.id}
                  href={postPath(post.id)}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#0b0c10] border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[320px] hover:bg-[#13151c] cursor-pointer transition-all duration-300 relative group no-underline"
                >
                  <div>
                    {post.image && (
                      <div className="w-full h-40 rounded-xl overflow-hidden mb-6 relative border border-white/5">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={`${tag}-${idx}`}
                          className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-full px-2.5 py-0.5 text-xs font-mono tracking-wider text-[#D4AF37] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-syne text-lg font-bold text-white leading-snug tracking-tight mb-3">
                      {post.title}
                    </h2>

                    <p className="text-slate-300 text-base font-light leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500 font-mono mt-auto pt-4 border-t border-white/5">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1 group-hover:text-[#D4AF37] transition-all">
                      Read Post <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-3xl">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <p className="text-sm text-slate-500">No published articles match the tag category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
