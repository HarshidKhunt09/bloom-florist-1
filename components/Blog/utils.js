/**
 * Blog shared utilities — date formatting, excerpt, slug, image helpers.
 * Used by Grid, List, and Featured variants.
 */

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function getExcerpt(article, length = 150) {
  const text =
    article.attributes?.Paragraph ||
    article.attributes?.MetaDescription ||
    '';
  if (text.length <= length) return text;
  return text.substring(0, length).replace(/\s+\S*$/, '') + '…';
}

export function getArticleSlug(article) {
  const slug = article.attributes?.urlSlug || '';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

export function getArticleImage(article) {
  const attrs = article.attributes || {};
  const gallery = attrs.gallery_images;
  return (
    attrs.imageUrl ||
    attrs.image?.url ||
    (Array.isArray(gallery) && gallery[0] ? gallery[0] : null) ||
    null
  );
}

export function getArticleDate(attrs) {
  return attrs.publishedAt || attrs.createdAt || null;
}

export function getInitials(title) {
  if (!title) return '?';
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const DEFAULT_EXCLUDE_SLUGS = ['/', '/home', 'home', 'about', '/about', 'services', '/services', 'contact', '/contact', 'privacy', '/privacy'];

export function filterArticles(allArticles, { filterByCategory, filterByTag, excludeSlugs } = {}) {
  if (!allArticles || !Array.isArray(allArticles)) return [];
  const excluded = excludeSlugs || DEFAULT_EXCLUDE_SLUGS;
  return allArticles.filter((a) => {
    const attrs = a.attributes || {};
    const slug = (attrs.urlSlug || '').replace(/^\/+/, '').replace(/\/+$/, '');
    const slugWithSlash = '/' + slug;
    // Exclude pages by slug
    if (excluded.includes(slug) || excluded.includes(slugWithSlash)) return false;
    if (filterByCategory && attrs.category !== filterByCategory) return false;
    if (filterByTag && !(attrs.tags || []).includes(filterByTag)) return false;
    return true;
  });
}
