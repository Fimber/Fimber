import { useState, FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NEED_OPTIONS = [
  'Technical tutorials & guides',
  'Developer documentation & APIs',
  'Product-led content',
  'SEO & content strategy',
  'Editorial management',
  'Full content program',
  'Not sure yet',
] as const;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [need, setNeed] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Project inquiry — ${name}${company ? ` (${company})` : ''}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company || '—'}`,
      `What they need: ${need}`,
      '',
      message || '(No additional details)',
    ].join('\n');

    window.location.href = `mailto:fimberelemuwa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3.5 text-[#E0D8D0] text-base placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/40 focus:ring-1 focus:ring-[#D4AF37]/20 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left space-y-4 w-full">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="contact-company" className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          placeholder="Acme SaaS"
        />
      </div>

      <div>
        <label htmlFor="contact-need" className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">
          What you need
        </label>
        <select
          id="contact-need"
          name="need"
          required
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled>
            Select one
          </option>
          {NEED_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">
          Anything else
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Timeline, links, what you're trying to rank for…"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto group bg-[#D4AF37] hover:bg-[#bfa030] active:scale-[0.98] text-[#080808] font-bold text-base py-4 px-8 rounded-full flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 cursor-none mt-2"
      >
        <span>Send a Message</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </form>
  );
}
