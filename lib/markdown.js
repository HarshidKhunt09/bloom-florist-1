import { marked } from 'marked';

const MD_PATTERN = /(^|\n)\s*(#{1,6}\s|[*-]\s|\d+\.\s|\*\*[^*]+\*\*|\[.+\]\(.+\))/;
const HTML_PATTERN = /<\/?(p|h[1-6]|ul|ol|li|strong|em|a|table|blockquote|div)\b/i;

export function toHtml(value) {
  if (!value || typeof value !== 'string') return '';
  if (HTML_PATTERN.test(value)) return value;
  if (MD_PATTERN.test(value)) {
    try { return marked.parse(value, { breaks: true, gfm: true }); } catch { return value; }
  }
  return value;
}
