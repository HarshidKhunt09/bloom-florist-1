/**
 * Blog List Component
 * Vertical list layout with side images and longer excerpts.
 *
 * Backend config:
 *   __component: "components.blog-grid"
 *   variant: "list"
 *   config: { heading, subheading, articlesPerPage, showImage, showExcerpt,
 *             showDate, showAuthor, showCategory, showReadMore, excerptLength,
 *             readMoreText, filterByCategory, filterByTag,
 *             style: { backgroundColor, textColor } }
 */

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  formatDate, getExcerpt, getArticleSlug, getArticleImage,
  getArticleDate, getInitials, filterArticles,
} from './utils';

export default function BlogList({
  config = {},
  content = {},
  globalConfig = {},
  allArticles = [],
}) {
  const heading = config.heading || 'Latest Articles';
  const subheading = config.subheading || '';
  const articlesPerPage = config.articlesPerPage || 5;
  const showImage = config.showImage !== false;
  const showExcerpt = config.showExcerpt !== false;
  const showDate = config.showDate !== false;
  const showAuthor = config.showAuthor ?? false;
  const showCategory = config.showCategory ?? false;
  const showReadMore = config.showReadMore !== false;
  const excerptLength = config.excerptLength || 200;
  const readMoreText = config.readMoreText || 'Continue Reading →';
  const filterByCategory = config.filterByCategory || null;
  const filterByTag = config.filterByTag || null;
  const excludeSlugs = config.excludeSlugs || null;
  const style = config.style || {};

  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(
    () => filterArticles(allArticles, { filterByCategory, filterByTag, excludeSlugs }),
    [allArticles, filterByCategory, filterByTag, excludeSlugs]
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const visibleArticles = filteredArticles.slice(startIdx, startIdx + articlesPerPage);

  const primaryColor = globalConfig?.colorScheme?.primary || '#2563eb';

  if (filteredArticles.length === 0) {
    return (
      <section
        style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 4rem)', backgroundColor: style.backgroundColor || '#ffffff' }}
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
        backgroundColor: style.backgroundColor || '#ffffff',
        color: style.textColor || 'inherit',
      }}
      aria-label="Blog articles"
    >
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, margin: 0, color: style.textColor || '#111827' }}>
            {heading}
          </h2>
          {subheading && <p style={{ color: '#6b7280', marginTop: '0.5rem', lineHeight: 1.6 }}>{subheading}</p>}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {visibleArticles.map((article, i) => {
            const attrs = article.attributes || {};
            const slug = getArticleSlug(article);
            const image = getArticleImage(article);
            const date = getArticleDate(attrs);
            const title = attrs.Title || attrs.H1 || 'Untitled';

            return (
              <article
                key={article.id || slug}
                style={{
                  borderBottom: i < visibleArticles.length - 1 ? '1px solid #f3f4f6' : 'none',
                  padding: '1.75rem 0',
                }}
              >
                <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.75rem)', flexWrap: 'wrap' }}>
                  {/* Image */}
                  {showImage && (
                    <Link href={slug} style={{ flexShrink: 0, textDecoration: 'none' }}>
                      <div
                        style={{
                          width: 'clamp(180px, 18vw, 240px)',
                          aspectRatio: '16 / 11',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#f3f4f6',
                        }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}25)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: primaryColor, opacity: 0.4 }}>
                              {getInitials(title)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    {/* Meta */}
                    {(showCategory || showDate || showAuthor) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.78rem', color: '#9ca3af', flexWrap: 'wrap' }}>
                        {showCategory && attrs.category && (
                          <span style={{ color: primaryColor, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.04em' }}>
                            {attrs.category}
                          </span>
                        )}
                        {showCategory && attrs.category && (showDate && date || showAuthor && attrs.author) && (
                          <span style={{ color: '#d1d5db' }}>·</span>
                        )}
                        {showDate && date && <time dateTime={date}>{formatDate(date)}</time>}
                        {showDate && date && showAuthor && attrs.author && <span style={{ color: '#d1d5db' }}>·</span>}
                        {showAuthor && attrs.author && <span>{attrs.author}</span>}
                      </div>
                    )}

                    {/* Title */}
                    <Link href={slug} style={{ textDecoration: 'none' }}>
                      <h3
                        style={{
                          fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                          fontWeight: 600,
                          lineHeight: 1.4,
                          margin: '0 0 0.4rem',
                          color: style.textColor || '#111827',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.target.style.color = primaryColor; }}
                        onMouseLeave={(e) => { e.target.style.color = style.textColor || '#111827'; }}
                      >
                        {title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    {showExcerpt && (
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7, margin: '0 0 0.6rem' }}>
                        {getExcerpt(article, excerptLength)}
                      </p>
                    )}

                    {/* Read More */}
                    {showReadMore && (
                      <Link href={slug} style={{ fontSize: '0.82rem', fontWeight: 600, color: primaryColor, textDecoration: 'none' }}>
                        {readMoreText}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Blog pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: '2.5rem' }}>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page"
              style={{ padding: '0.4rem 0.85rem', border: 'none', borderRadius: '6px', background: currentPage === 1 ? '#f3f4f6' : `${primaryColor}10`, color: currentPage === 1 ? '#d1d5db' : primaryColor, cursor: currentPage === 1 ? 'default' : 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} aria-label={`Page ${page}`} aria-current={currentPage === page ? 'page' : undefined}
                style={{ padding: '0.4rem 0.75rem', border: 'none', borderRadius: '6px', background: currentPage === page ? primaryColor : 'transparent', color: currentPage === page ? '#fff' : '#6b7280', cursor: 'pointer', fontWeight: currentPage === page ? 600 : 400, fontSize: '0.85rem', minWidth: '36px' }}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page"
              style={{ padding: '0.4rem 0.85rem', border: 'none', borderRadius: '6px', background: currentPage === totalPages ? '#f3f4f6' : `${primaryColor}10`, color: currentPage === totalPages ? '#d1d5db' : primaryColor, cursor: currentPage === totalPages ? 'default' : 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>
              Next →
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
