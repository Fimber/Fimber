import { Experience } from '../types';
import CompanyLogo from './CompanyLogo';

interface ExperienceTimelineItemProps {
  exp: Experience;
}

export default function ExperienceTimelineItem({ exp }: ExperienceTimelineItemProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-8 border-b border-white/5 last:border-0 hover:bg-white/[0.01] px-4 rounded-xl transition-all duration-200 group">
      <div className="sm:col-span-4 font-mono text-sm tracking-wider text-[#D4AF37] pt-1">{exp.date}</div>

      <div className="sm:col-span-8 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <CompanyLogo company={exp.company} imageClassName="h-8 max-w-[160px]" />
          {exp.category && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border border-white/10 rounded-full px-2.5 py-0.5">
              {exp.category}
            </span>
          )}
        </div>
        <h3 className="font-syne text-lg font-bold text-white tracking-tight">{exp.company}</h3>
        <p className="text-slate-300 text-base font-light leading-relaxed">{exp.description}</p>
        {exp.metric && (
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-full px-3.5 py-0.5 text-xs font-mono tracking-wider text-[#D4AF37] mt-1 uppercase">
            • {exp.metric}
          </span>
        )}
      </div>
    </div>
  );
}
