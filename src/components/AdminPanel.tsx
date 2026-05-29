import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, PlusCircle, Trash2, Edit3, ArrowLeft, CheckCircle, Eye, FileText, Image } from 'lucide-react';
import { BlogPost } from '../types';
import { getDefaultPosts, loadPostsFromStorage, savePostsToStorage } from '../lib/blogPosts';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshBlog: () => void;
}

// Quick regex-based Markdown-to-HTML helper for preview rendering
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '<em>Nothing to preview. Start typing to see it formatted here...</em>';
  let html = markdown;

  // Escape HTML tags to prevent XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks: ```language ... ```
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre className="bg-[#080808] border border-white/5 rounded-xl p-4 my-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed">${code.trim()}</pre>`;
  });

  // Inline code: `code`
  html = html.replace(/`([^`\n]+)`/g, '<code class="bg-[#080808] border border-white/5 rounded px-1.5 py-0.5 text-[#D4AF37] font-mono text-sm font-medium">$1</code>');

  // Headers: #, ##, ###
  html = html.replace(/^### (.*$)/gim, '<h4 class="font-syne text-xl font-bold text-white mt-6 mb-2">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="font-syne text-2xl font-bold text-white mt-8 mb-3 border-b border-white/5 pb-1">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="font-syne text-3xl font-extrabold text-[#D4AF37] mt-10 mb-4">$1</h2>');

  // Blockquotes: > quote
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-2 border-[#D4AF37] pl-4 italic text-slate-400 my-4">$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="border-0 border-t border-white/10 my-8" />');

  // GFM tables
  html = html.replace(
    /^\|(.+)\|\r?\n\|[\s:|-]+\|\r?\n((?:\|.+\|\r?\n?)+)/gm,
    (_, headerRow: string, bodyRows: string) => {
      const headers = headerRow.split('|').map((c) => c.trim()).filter(Boolean);
      const rows = bodyRows
        .trim()
        .split(/\r?\n/)
        .map((row) => row.split('|').map((c) => c.trim()).filter(Boolean))
        .filter((cells) => cells.length > 0);
      const th = headers
        .map(
          (h) =>
            `<th class="px-4 py-2 text-left text-[#D4AF37] font-mono text-xs uppercase tracking-wider border-b border-white/10">${h}</th>`
        )
        .join('');
      const trs = rows
        .map(
          (cells) =>
            `<tr class="border-b border-white/5 last:border-0">${cells
              .map((c) => `<td class="px-4 py-2 text-slate-300 text-sm align-top">${c}</td>`)
              .join('')}</tr>`
        )
        .join('');
      return `<div class="overflow-x-auto my-6 rounded-xl border border-white/10"><table class="w-full text-sm"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`;
    }
  );

  // Bullet Lists
  html = html.replace(/^\- (.*$)/gim, '<li class="list-disc ml-5 text-slate-300 my-1 font-light">$1</li>');

  // Bold / Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-300">$1</em>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-[#D4AF37] hover:underline underline-offset-4">$1</a>');

  // Double newlines to paragraphs (excluding matches inside pre/code blocks)
  // Ensure lines are properly joined into paragraph groupings
  const blocks = html.split('\n\n');
  const formattedBlocks = blocks.map(block => {
    if (
      block.trim().startsWith('<h') ||
      block.trim().startsWith('<pre') ||
      block.trim().startsWith('<li') ||
      block.trim().startsWith('<blockquote') ||
      block.trim().startsWith('<hr') ||
      block.trim().startsWith('<div class="overflow-x-auto')
    ) {
      return block;
    }
    return `<p class="text-slate-200 font-light mb-4 leading-relaxed text-base md:text-lg">${block.replace(/\n/g, '<br/>')}</p>`;
  });

  return formattedBlocks.join('\n');
}

export default function AdminPanel({ isOpen, onClose, onRefreshBlog }: AdminPanelProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editorPost, setEditorPost] = useState<Partial<BlogPost> | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  // Internal form fields
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadStoragePosts();
    }
  }, [isOpen]);

  const loadStoragePosts = () => {
    try {
      setPosts(loadPostsFromStorage());
    } catch (e) {
      console.error('Error fetching blog items:', e);
      setPosts(getDefaultPosts());
    }
  };

  const savePostsCollection = (updated: BlogPost[]) => {
    setPosts(updated);
    try {
      savePostsToStorage(updated);
    } catch (e) {
      console.error('Error stringifying storage:', e);
    }
    onRefreshBlog();
  };

  const handleOpenNewEditor = () => {
    setEditorPost({ id: '' });
    setTitle('');
    setExcerpt('');
    setContent('');
    setTags('');
    setImage('');
    setEditorTab('write');
  };

  const handleOpenEditEditor = (p: BlogPost) => {
    setEditorPost(p);
    setTitle(p.title);
    setExcerpt(p.excerpt || '');
    setContent(p.content || '');
    setTags(p.tags ? p.tags.join(', ') : '');
    setImage(p.image || '');
    setEditorTab('write');
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you absolutely sure you want to delete this article?')) return;
    const filter = posts.filter(item => item.id !== id);
    savePostsCollection(filter);
  };

  const handleSavePost = (publishStatus: 'published' | 'draft') => {
    if (!title.trim()) {
      alert('Please provide a title for the blog article.');
      return;
    }

    const tagList = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const currentTimeString = new Date().toISOString();

    if (editorPost && editorPost.id) {
      // Edit mode
      const updatedList = posts.map(item => {
        if (item.id === editorPost.id) {
          return {
            ...item,
            title: title.trim(),
            excerpt: excerpt.trim(),
            content: content,
            tags: tagList,
            image: image.trim(),
            status: publishStatus,
            updatedAt: currentTimeString,
          };
        }
        return item;
      });
      savePostsCollection(updatedList);
    } else {
      // Create new
      const newPost: BlogPost = {
        id: 'post-' + Date.now().toString(36),
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content,
        tags: tagList,
        image: image.trim(),
        status: publishStatus,
        date: currentTimeString,
        updatedAt: currentTimeString,
      };
      savePostsCollection([newPost, ...posts]);
    }

    setEditorPost(null);
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.tags || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-40 flex justify-end">
          {/* Panel Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Sliding Panel Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-[#0b0c10] border-l border-white/10 w-full max-w-2xl h-full flex flex-col z-10 shadow-3xl"
          >
            {/* Header */}
            <header className="px-6 py-5 border-b border-white/5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-syne text-xl font-bold text-white">
                  {editorPost ? (editorPost.id ? 'Edit Article' : 'Draft New Article') : 'CMS Dashboard'}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {!editorPost && (
                  <button
                    onClick={handleOpenNewEditor}
                    className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#bfa030] text-[#080808] font-semibold text-xs py-2 px-4 rounded-full transition-all duration-200 cursor-none"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Post</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#090b10]">
              <AnimatePresence mode="wait">
                {!editorPost ? (
                  /* POSTS LISTING STATE */
                  <motion.div
                    key="listing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 h-full flex flex-col"
                  >
                    {/* Search block */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search post titles or tech tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-white/5 rounded-full pl-11 pr-5 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 placeholder:text-slate-600 transition-colors duration-200"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map(p => (
                          <div
                            key={p.id}
                            onClick={() => handleOpenEditEditor(p)}
                            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0b0c10]/60 hover:border-white/10 hover:bg-[#0b0c10] cursor-pointer transition-all duration-200 group"
                          >
                            <div className="min-w-0 flex-1 pr-4">
                              <h4 className="text-[#ede9e0] group-hover:text-white font-semibold text-sm truncate transition-colors duration-200">
                                {p.title || 'Untitled Draft'}
                              </h4>
                              
                              <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] tracking-wide text-slate-500">
                                <span>{new Date(p.date).toLocaleDateString()}</span>
                                <span className={`px-2 py-0.5 rounded-full font-semibold border ${
                                  p.status === 'published' 
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                    : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                                }`}>
                                  {p.status}
                                </span>
                                {p.tags && p.tags.length > 0 && (
                                  <span className="truncate text-[#D4AF37]/70">
                                    {p.tags.slice(0, 2).join(' · ')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditEditor(p);
                                }}
                                className="p-2 text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-all duration-200 cursor-none"
                                title="Edit Post"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleDeletePost(p.id, e)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-all duration-200"
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
                          <p className="text-slate-500 text-sm">No posts matched search parameters.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* POST EDITOR STATE */
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Back Navigator */}
                    <button
                      onClick={() => setEditorPost(null)}
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white mb-2 transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to list</span>
                    </button>

                    {/* Inputs */}
                    <div className="space-y-4">
                      {/* Title block */}
                      <div className="space-y-1.5 animate-fadeIn">
                        <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                          Post Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Fostering RBAC patterns inside React systems..."
                          className="w-full bg-[#0b0c10] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                      </div>

                      {/* Excerpt block */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                          Short Description / Excerpt
                        </label>
                        <input
                          type="text"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Simple overview displayed on the portfolio interface..."
                          className="w-full bg-[#0b0c10] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                      </div>

                      {/* Tags & Imagery URL Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
                            <span>Tags (Comma Separated)</span>
                          </label>
                          <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Auth, Security, Node"
                            className="w-full bg-[#0b0c10] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5 animate-fadeIn">
                            <Image className="w-3.5 h-3.5" />
                            <span>Featured Image URL (Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#0b0c10] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                          />
                        </div>
                      </div>

                      {/* MD EDITOR WITH LIVE PREVIEW TABBING */}
                      <div className="pt-2">
                        <div className="flex border-b border-white/5 mb-3">
                          <button
                            type="button"
                            onClick={() => setEditorTab('write')}
                            className={`px-4 py-2 font-mono text-xs tracking-wider border-b-2 transition-all duration-150 cursor-none ${
                              editorTab === 'write'
                                ? 'border-[#D4AF37] text-[#D4AF37]'
                                : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            Markdown Body
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditorTab('preview')}
                            className={`px-4 py-2 font-mono text-xs tracking-wider border-b-2 transition-all duration-150 flex items-center gap-1.5 cursor-none ${
                              editorTab === 'preview'
                                ? 'border-[#D4AF37] text-[#D4AF37]'
                                : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Render Preview</span>
                          </button>
                        </div>

                        {editorTab === 'write' ? (
                          <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="# Write clean Markdown matches here...&#10;&#10;## Subsections&#10;Incorporate **bolding** or *italicization* smoothly, and add fenced code scripts like:&#10;&#10;```javascript&#10;const val = 'excellent';&#10;```"
                            className="w-full h-80 bg-[#0b0c10] border border-white/5 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-[#D4AF37] leading-relaxed resize-y"
                          />
                        ) : (
                          <div
                            className="w-full min-h-[320px] max-h-96 overflow-y-auto bg-[#0b0c10] border border-white/5 rounded-xl p-5"
                            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(content) }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Action controls */}
                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setEditorPost(null)}
                        className="font-mono text-xs text-slate-400 hover:text-white transition-colors duration-250"
                      >
                        Cancel Editing
                      </button>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleSavePost('draft')}
                          className="bg-transparent border border-white/10 hover:border-slate-500 text-slate-300 py-3 px-5 rounded-full text-xs font-mono tracking-wider transition-colors duration-200 cursor-none"
                        >
                          Save Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSavePost('published')}
                          className="bg-[#D4AF37] hover:bg-[#bfa030] text-[#080808] py-3 px-6 rounded-full text-xs font-semibold tracking-wider transition-colors duration-200 shadow-md shadow-[#D4AF37]/10 cursor-none"
                        >
                          Publish Live
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
