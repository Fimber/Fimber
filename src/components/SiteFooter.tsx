import { Lock } from 'lucide-react';

interface SiteFooterProps {
  onAdminOpen: () => void;
}

export default function SiteFooter({ onAdminOpen }: SiteFooterProps) {
  return (
    <footer className="bg-[#080808] border-t border-white/5 py-10 px-6 md:px-12 relative z-10 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-syne text-base font-bold text-white tracking-tight">
            Fimber Elemuwa · Technical Content Writer
          </p>
          <p className="text-slate-600 font-light text-sm">© 2026</p>
        </div>

        <button
          type="button"
          onClick={onAdminOpen}
          className="flex items-center gap-1.5 text-slate-600 hover:text-[#D4AF37] bg-white/[0.03] hover:bg-[#D4AF37]/10 border border-white/5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-none text-xs font-mono tracking-wider uppercase"
          aria-label="Open admin panel"
        >
          <Lock className="w-3 h-3" />
          <span>Admin</span>
        </button>
      </div>
    </footer>
  );
}
