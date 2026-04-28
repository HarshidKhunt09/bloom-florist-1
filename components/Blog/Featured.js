/**
 * Blog Featured Component
 * Uniform card grid — no oversized hero card.
 *
 * Backend config:
 *   __component: "components.blog-grid"
 *   variant: "featured"
 *   config: { heading, subheading, articlesPerPage, showImage, showExcerpt,
 *             showDate, showAuthor, showCategory, showReadMore, excerptLength,
 *             readMoreText, filterByCategory, filterByTag,
 *             style: { backgroundColor, textColor, cardStyle } }
 */

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  formatDate, getExcerpt, getArticleSlug, getArticleImage,
  getArticleDate, getInitials, filterArticles,
} from './utils';

export default function BlogFeatured({
  config = {},
  content = {},
  globalConfig = {},
  allArticles = [],
}) {
  const heading = config.heading || 'Featured & Latest';
  const subheading = config.subheading || '';
  const articlesPerPage = config.articlesPerPage || 7;
  const showImage = config.showImage !== false;
  const showExcerpt = config.showExcerpt !== false;
  const showDate = config.showDate !== false;
  const showAuthor = config.showAuthor ?? false;
  const showCategory = config.showCategory ?? false;
  const showReadMore = config.showReadMore !== false;
  const excerptLength = config.excerptLength || 150;
  const readMoreText = config.readMoreText || 'Read More →';
  const filterByCategory = config.filterByCategory || null;
  const filterByTag = config.filterByTag || null;
  const excludeSlugs = config.excludeSlugs || null;
  const style = config.style || {};

  const filteredArticles = useMemo(
    () => filterArticles(allArticles, { filterByCategory, filterByTag, excludeSlugs }).slice(0, articlesPerPage),
    [allArticles, filterByCategory, filterByTag, excludeSlugs, articlesPerPage]
  );

  const primaryColor = globalConfig?.colorScheme?.primary || '#2563eb';

  if (filteredArticles.length === 0) {
    return (
      <section
        style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 4rem)', backgroundColor: style.backgroundColor || '#f9fafb' }}
        aria-label="Blog"
      >
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>{heading}</h2>
          <p style={{ color: '#9ca3af', marginTop: '1rem' }}>No articles found.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 4rem)',
        backgroundColor: style.backgroundColor || '#f9fafb',
        color: style.textColor || 'inherit',
      }}
      aria-label="Blog articles"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, margin: 0, color: style.textColor || '#111827' }}>
            {heading}
          </h2>
          {subheading && <p style={{ color: '#6b7280', marginTop: '0.5rem', lineHeight: 1.6 }}>{subheading}</p>}
        </div>

        {/* Uniform Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.25rem, 2vw, 1.75rem)',
          }}
        >
          {filteredArticles.map((article) => {
            const attrs = article.attributes || {};
            const slug = getArticleSlug(article);
            const image = getArticleImage(article);
            const date = getArticleDate(attrs);
            const title = attrs.Title || attrs.H1 || 'Untitled';

            return (
              <Link key={article.id || slug} href={slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <article
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; }}
                >
                  {showImage && (
                    <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', backgroundColor: '#f3f4f6', flexShrink: 0 }}>
                      {image ? (
                        <img src={image} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '2rem', fontWeight: 700, color: primaryColor, opacity: 0.4 }}>{getInitials(title)}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {(showCategory && attrs.category || showDate && date) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.78rem', color: '#9ca3af', flexWrap: 'wrap' }}>
                        {showCategory && attrs.category && (
                          <span style={{ color: primaryColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.7rem' }}>{attrs.category}</span>
                        )}
                        {showCategory && attrs.category && showDate && date && <span style={{ color: '#d1d5db' }}>·</span>}
                        {showDate && date && <time dateTime={date}>{formatDate(date)}</time>}
                      </div>
                    )}
                    <h3 style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 600, lineHeight: 1.4, margin: '0 0 0.5rem', color: style.textColor || '#111827', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {title}
                    </h3>
                    {showExcerpt && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6, margin: '0 0 1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {getExcerpt(article, excerptLength)}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      {showAuthor && attrs.author ? (
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{attrs.author}</span>
                      ) : <span />}
                      {showReadMore && (
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: primaryColor }}>{readMoreText}</span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
