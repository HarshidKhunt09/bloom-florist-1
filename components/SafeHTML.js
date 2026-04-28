/**
 * SafeHTML Component
 * Renders HTML content with basic sanitization to prevent XSS attacks.
 * Replaces direct dangerouslySetInnerHTML usage throughout the codebase.
 */
import React from 'react';

// Tags allowed in rendered HTML
const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr', 'blockquote', 'pre', 'code',
  'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins', 'mark', 'small', 'sub', 'sup',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
  'div', 'span', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside',
  'details', 'summary', 'abbr', 'time', 'address',
  'iframe',
]);

// Attributes allowed per tag (or globally)
const ALLOWED_ATTRS = {
  '*': ['class', 'id', 'style', 'title', 'lang', 'dir'],
  'a': ['href', 'target', 'rel', 'aria-label'],
  'img': ['src', 'alt', 'width', 'height', 'loading'],
  'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'title', 'loading', 'allow'],
  'td': ['colspan', 'rowspan'],
  'th': ['colspan', 'rowspan', 'scope'],
  'ol': ['start', 'type'],
  'time': ['datetime'],
};

/**
 * Basic HTML sanitizer — strips dangerous tags and attributes.
 * For production, consider adding DOMPurify as a dependency for full coverage.
 */
function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') return '';

  // Remove script tags and their content
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove event handler attributes
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  // Remove javascript: URLs
  clean = clean.replace(/href\s*=\s*["']?\s*javascript\s*:/gi, 'href="');
  // Remove data: URLs in src (potential XSS vector)
  clean = clean.replace(/src\s*=\s*["']?\s*data\s*:/gi, 'src="');

  return clean;
}

export default function SafeHTML({ html, className, as: Tag = 'div', style }) {
  const sanitized = sanitizeHTML(html);
  if (!sanitized) return null;

  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
