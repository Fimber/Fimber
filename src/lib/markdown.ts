/** Markdown-to-HTML for public articles and admin preview */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '<em>Nothing to preview. Start typing to see it formatted here...</em>';
  let html = markdown;

  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre className="bg-[#080808] border border-white/5 rounded-xl p-4 my-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed">${code.trim()}</pre>`;
  });

  html = html.replace(
    /`([^`\n]+)`/g,
    '<code class="bg-[#080808] border border-white/5 rounded px-1.5 py-0.5 text-[#D4AF37] font-mono text-sm font-medium">$1</code>'
  );

  html = html.replace(/^### (.*$)/gim, '<h4 class="font-syne text-xl font-bold text-white mt-6 mb-2">$1</h4>');
  html = html.replace(
    /^## (.*$)/gim,
    '<h3 class="font-syne text-2xl font-bold text-white mt-8 mb-3 border-b border-white/5 pb-1">$1</h3>'
  );
  html = html.replace(/^# (.*$)/gim, '<h2 class="font-syne text-3xl font-extrabold text-[#D4AF37] mt-10 mb-4">$1</h2>');

  html = html.replace(
    /^\> (.*$)/gim,
    '<blockquote class="border-l-2 border-[#D4AF37] pl-4 italic text-slate-400 my-4">$1</blockquote>'
  );

  html = html.replace(/^---$/gim, '<hr class="border-0 border-t border-white/10 my-8" />');

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

  html = html.replace(/^\- (.*$)/gim, '<li class="list-disc ml-5 text-slate-300 my-1 font-light">$1</li>');

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-300">$1</em>');

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" class="text-[#D4AF37] hover:underline underline-offset-4">$1</a>'
  );

  const blocks = html.split('\n\n');
  const formattedBlocks = blocks.map((block) => {
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
