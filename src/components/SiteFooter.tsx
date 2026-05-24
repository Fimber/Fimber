import { Lock } from 'lucide-react';

interface SiteFooterProps {
  onAdminOpen: () => void;
}

export default function SiteFooter({ onAdminOpen }: SiteFooterProps) {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-12 px-6 md:px-12 relative z-10 text-sm text-slate-500 font-mono tracking-wide">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-1.5">
          <span className="font-syne text-lg font-extrabold tracking-tighter text-white">
            FE<span className="text-[#D4AF37]">.</span> Born to Write, Engineered to Code.
          </span>
          <p className="text-slate-600 font-light text-sm font-sans">
            © {new Date().getFullYear()} Fimber Elemuwa. All files persisted locally within preview
            environments.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://x.com/Fimbosky21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X / Twitter
          </a>
          <a
            href="https://www.instagram.com/fimberelems/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <button
            type="button"
            onClick={onAdminOpen}
            className="flex items-center gap-1.5 text-slate-600 hover:text-[#D4AF37] bg-white/[0.03] hover:bg-[#D4AF37] hover:text-[#080808] border border-white/5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-none"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
