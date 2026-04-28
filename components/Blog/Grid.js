/**
 * Blog Grid Component
 * Clean, responsive card grid for articles.
 *
 * Backend config:
 *   __component: "components.blog-grid"
 *   variant: "grid"
 *   config: {
 *     heading, subheading, articlesPerPage, columns,
 *     showImage, showExcerpt, showDate, showAuthor, showCategory, showReadMore,
 *     excerptLength, readMoreText, filterByCategory, filterByTag,
 *     style: { backgroundColor, textColor, cardStyle }
 *   }
 */

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  formatDate, getExcerpt, getArticleSlug, getArticleImage,
  getArticleDate, getInitials, filterArticles,
} from './utils';

export default function BlogGrid({
  config = {},
  content = {},
  globalConfig = {},
  allArticles = [],
}) {
  const heading = config.heading || 'Latest Articles';
  const subheading = config.subheading || '';
  const articlesPerPage = config.articlesPerPage || 6;
  const columns = config.columns || 3;
  const showImage = config.showImage !== false;
  const showExcerpt = config.showExcerpt !== false;
  const showDate = config.showDate !== false;
  const showAuthor = config.showAuthor ?? false;
  const showCategory = config.showCategory ?? false;
  const showReadMore = config.showReadMore !== false;
  const excerptLength = config.excerptLength || 120;
  const readMoreText = config.readMoreText || 'Read More →';
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

  // Empty state
  if (filteredArticles.length === 0) {
    return (
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 4rem)',
          backgroundColor: style.backgroundColor || '#f9fafb',
        }}
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
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 700,
            margin: 0,
            color: style.textColor || '#111827',
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p style={{ color: '#6b7280', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            {subheading}
          </p>
        )}
      </div>

      {/* Card Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${columns <= 2 ? '380px' : '300px'}), 1fr))`,
          gap: 'clamp(1.25rem, 2vw, 1.75rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {visibleArticles.map((article) => (
          <ArticleCard
            key={article.id || getArticleSlug(article)}
            article={article}
            showImage={showImage}
            showExcerpt={showExcerpt}
            showDate={showDate}
            showAuthor={showAuthor}
            showCategory={showCategory}
            showReadMore={showReadMore}
            excerptLength={excerptLength}
            readMoreText={readMoreText}
            primaryColor={primaryColor}
            textColor={style.textColor}
            cardStyle={style.cardStyle}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          primaryColor={primaryColor}
        />
      )}
    </section>
  );
}

/* ── Article Card ── */
function ArticleCard({
  article,
  showImage,
  showExcerpt,
  showDate,
  showAuthor,
  showCategory,
  showReadMore,
  excerptLength,
  readMoreText,
  primaryColor,
  textColor,
  cardStyle,
}) {
  const attrs = article.attributes || {};
  const slug = getArticleSlug(article);
  const image = getArticleImage(article);
  const date = getArticleDate(attrs);
  const title = attrs.Title || attrs.H1 || 'Untitled';

  return (
    <Link href={slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article
        className="blog-card"
        style={{
          background: '#ffffff',
          borderRadius: '10px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: cardStyle === 'outlined' ? '1px solid #e5e7eb' : 'none',
          boxShadow: cardStyle === 'flat' ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow =
            cardStyle === 'flat' ? 'none' : '0 1px 3px rgba(0,0,0,0.08)';
        }}
      >
        {/* Image / Placeholder */}
        {showImage && (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 10',
              overflow: 'hidden',
              backgroundColor: '#f3f4f6',
              position: 'relative',
              flexShrink: 0,
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
                <span
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: primaryColor,
                    opacity: 0.5,
                    letterSpacing: '0.05em',
                  }}
                >
                  {getInitials(title)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {/* Meta row */}
          {(showCategory || showDate) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.6rem',
                fontSize: '0.78rem',
                color: '#9ca3af',
                flexWrap: 'wrap',
              }}
            >
              {showCategory && attrs.category && (
                <span
                  style={{
                    color: primaryColor,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontSize: '0.7rem',
                  }}
                >
                  {attrs.category}
                </span>
              )}
              {showCategory && attrs.category && showDate && date && (
                <span style={{ color: '#d1d5db' }}>·</span>
              )}
              {showDate && date && <time dateTime={date}>{formatDate(date)}</time>}
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              fontWeight: 600,
              lineHeight: 1.4,
              margin: '0 0 0.5rem',
              color: textColor || '#111827',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p
              style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                lineHeight: 1.6,
                margin: '0 0 1rem',
                flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {getExcerpt(article, excerptLength)}
            </p>
          )}

          {/* Footer row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: '0.5rem',
            }}
          >
            {showAuthor && attrs.author ? (
              <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{attrs.author}</span>
            ) : (
              <span />
            )}
            {showReadMore && (
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: primaryColor,
                }}
              >
                {readMoreText}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, totalPages, onPageChange, primaryColor }) {
  return (
    <nav
      aria-label="Blog pagination"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.4rem',
        marginTop: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      <PaginationButton
        label="← Prev"
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        primaryColor={primaryColor}
      />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
          style={{
            padding: '0.4rem 0.75rem',
            border: 'none',
            borderRadius: '6px',
            background: currentPage === page ? primaryColor : 'transparent',
            color: currentPage === page ? '#fff' : '#6b7280',
            cursor: 'pointer',
            fontWeight: currentPage === page ? 600 : 400,
            fontSize: '0.85rem',
            minWidth: '36px',
            transition: 'all 0.15s ease',
          }}
        >
          {page}
        </button>
      ))}
      <PaginationButton
        label="Next →"
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        primaryColor={primaryColor}
      />
    </nav>
  );
}

function PaginationButton({ label, ariaLabel, disabled, onClick, primaryColor }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        padding: '0.4rem 0.85rem',
        border: 'none',
        borderRadius: '6px',
        background: disabled ? '#f3f4f6' : `${primaryColor}10`,
        color: disabled ? '#d1d5db' : primaryColor,
        cursor: disabled ? 'default' : 'pointer',
        fontWeight: 500,
        fontSize: '0.85rem',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}
