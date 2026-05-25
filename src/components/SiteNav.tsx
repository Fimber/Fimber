import type { MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';

interface SiteNavProps {
  pathname: string;
  navScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigate: (path: string) => void;
  onAnchorClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const HOME_SECTIONS = [
  { label: 'Services', hash: 'services' },
  { label: 'Work', hash: 'work' },
  { label: 'Experience', hash: 'experience' },
];

export default function SiteNav({
  pathname,
  navScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNavigate,
  onAnchorClick,
}: SiteNavProps) {
  const isHome = pathname === '/';
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/');

  const handlePageLink = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleHomeSection = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      onAnchorClick(e);
    } else {
      e.preventDefault();
      onNavigate(`/#${hash}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 px-6 md:px-12 h-20 flex items-center justify-between ${
          navScrolled
            ? 'bg-[#080808]/85 border-b border-white/5 backdrop-blur-md'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <a
          href="/"
          onClick={(e) => handlePageLink(e, '/')}
          className="font-syne text-2xl font-extrabold tracking-tighter text-white group"
        >
          FE<span className="text-[#D4AF37] group-hover:animate-ping inline-block origin-center">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-1.5 bg-white/[0.03] border border-white/5 p-1.5 rounded-full">
          {HOME_SECTIONS.map(({ label, hash }) => (
            <li key={hash}>
              <a
                href={isHome ? `#${hash}` : `/#${hash}`}
                onClick={(e) => handleHomeSection(e, hash)}
                className="px-4 py-2 rounded-full text-sm text-slate-400 hover:text-white transition-all duration-200 uppercase tracking-widest font-mono"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/blog"
              onClick={(e) => handlePageLink(e, '/blog')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 uppercase tracking-widest font-mono ${
                isBlog ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:fimberelemuwa@gmail.com"
            className="bg-[#D4AF37] hover:bg-[#bfa030] text-[#080808] font-semibold text-sm py-2.5 px-6 rounded-full transition-all duration-300 shadow-md shadow-[#D4AF37]/5 uppercase font-mono tracking-wider cursor-none"
          >
            Hire Me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-full transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <div
        className={`md:hidden fixed top-20 inset-x-0 bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/5 z-20 flex flex-col p-8 space-y-6 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          {HOME_SECTIONS.map(({ label, hash }) => (
            <a
              key={hash}
              href={isHome ? `#${hash}` : `/#${hash}`}
              onClick={(e) => handleHomeSection(e, hash)}
              className="text-base font-syne font-bold hover:text-[#D4AF37] transition-colors capitalize"
            >
              {label}
            </a>
          ))}
          <a
            href="/blog"
            onClick={(e) => handlePageLink(e, '/blog')}
            className={`text-base font-syne font-bold transition-colors capitalize ${
              isBlog ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'
            }`}
          >
            Blog
          </a>
        </div>

        <a
          href="mailto:fimberelemuwa@gmail.com"
          className="w-full text-center bg-[#D4AF37] text-[#080808] font-semibold text-sm py-3 rounded-full cursor-none"
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
