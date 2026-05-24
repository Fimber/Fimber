import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { parseMarkdownToHtml } from './AdminPanel';

interface PostReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function PostReaderModal({ post, onClose }: PostReaderModalProps) {
  if (!post) return null;

  // Calculate approximate reading duration
  const wordsCount = post.content ? post.content.trim().split(/\s+/).length : 0;
  const readDuration = Math.max(1, Math.ceil(wordsCount / 225));

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#080808] overflow-y-auto"
        >
          {/* Subtle tech grid background in article modal for continuity */}
          <div className="absolute inset-0 z-0 opacity-[0.035] bg-[linear-gradient(rgba(212,175,55,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />

          {/* Core visual page container */}
          <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-screen">
            {/* Header / Back Action */}
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={onClose}
              className="group self-start inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-slate-400 hover:text-[#D4AF37] transition-all duration-300 md:-ml-4 py-2 px-3 rounded-full hover:bg-white/5 cursor-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Writing</span>
            </motion.button>

            {/* Meta Data tags */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="flex items-center gap-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-full px-3.5 py-1 text-xs font-mono font-medium tracking-wider text-[#D4AF37] uppercase"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Title display */}
              <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tighter pt-2">
                {post.title}
              </h1>

              {/* Timestamp & Clock limits */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 font-light pt-1.5 border-b border-white/5 pb-10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                
                <span className="text-slate-600">•</span>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{readDuration} min read</span>
                </div>
              </div>
            </motion.div>

            {/* Main Content Body */}
            <motion.article
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-10 prose prose-invert font-sans max-w-none flex-1"
            >
              {post.image && (
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 relative group border border-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
                </div>
              )}

              {/* Beautiful Markdown Renderer output */}
              <div
                className="text-slate-200 font-light text-lg leading-relaxed space-y-6 md:text-xl"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(post.content) }}
              />
            </motion.article>

            {/* Separator Footer panel */}
            <footer className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-syne text-base font-bold text-white mb-0.5">Written by Fimber Elemuwa</p>
                <p className="text-sm text-slate-500">B2B SaaS Technical Content Writer & Editor</p>
              </div>
              <button
                onClick={onClose}
                className="bg-white/5 hover:bg-[#D4AF37] hover:text-[#080808] text-slate-300 font-mono text-sm tracking-wider uppercase py-3 px-6 rounded-full transition-all duration-300 cursor-none"
              >
                Close Article
              </button>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
