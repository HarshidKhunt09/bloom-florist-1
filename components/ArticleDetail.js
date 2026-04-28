/**
 * ArticleDetail — full article detail page for the component system.
 * Renders a clean, readable article layout with hero image, title,
 * metadata, markdown content, and related articles.
 *
 * Used by [slug].js when component system is active but no
 * page-specific component config exists (i.e. blog articles).
 */

import React from 'react';
import Link from 'next/link';
import { formatDate, getArticleSlug, getArticleImage, getArticleDate, getInitials, filterArticles } from './Blog/utils';

export default function ArticleDetail({ article, globalConfig = {}, allArticles = [], menuItems = {} }) {
  if (!article) return null;
  const attrs = article.attributes || {};
  const primaryColor = globalConfig?.colorScheme?.primary || '#2563eb';
  const image = attrs.imageUrl || getArticleImage(article);
  const date = getArticleDate(attrs);
  const title = attrs.H1 || attrs.Title || 'Untitled';
  const category = attrs.category || null;
  const author = attrs.author || null;

  // Related articles — same category or just other articles, max 3
  const related = filterArticles(allArticles, { filterByCategory: null, filterByTag: null })
    .filter((a) => {
      const s = (a.attributes?.urlSlug || '').replace(/^\/+/, '');
      const current = (attrs.urlSlug || '').replace(/^\/+/, '');
      return s !== current;
    })
    .slice(0, 3);

  return (
    <article style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Image */}
      {image && (
        <div
          style={{
            width: '100%',
            maxHeight: 'clamp(220px, 30vw, 420px)',
            overflow: 'hidden',
            backgroundColor: '#f3f4f6',
            position: 'relative',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 'clamp(220px, 30vw, 420px)',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {attrs.photographerName && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '0.3rem 0.75rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.35)', borderRadius: '4px 0 0 0' }}>
              Photo by{' '}
              <a href={attrs.photographerProfileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                {attrs.photographerName}
              </a>{' '}
              on Unsplash
            </div>
          )}
        </div>
      )}

      {/* Article Header */}
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: `${image ? 'clamp(1.25rem, 2.5vw, 2rem)' : 'clamp(3rem, 6vw, 5rem)'} clamp(1.25rem, 5vw, 2rem) 0`,
        }}
      >
        {/* Meta row */}
        {(category || date || author) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
              fontSize: '0.82rem',
              color: '#9ca3af',
              flexWrap: 'wrap',
            }}
          >
            {category && (
              <span
                style={{
                  color: primaryColor,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                }}
              >
                {category}
              </span>
            )}
            {category && date && <span style={{ color: '#d1d5db' }}>·</span>}
            {date && <time dateTime={date}>{formatDate(date)}</time>}
            {date && author && <span style={{ color: '#d1d5db' }}>·</span>}
            {author && <span>{author}</span>}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 1rem',
            color: '#111827',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h1>

        {/* Subtitle / MetaDescription */}
        {attrs.MetaDescription && (
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#6b7280',
              lineHeight: 1.7,
              margin: '0 0 1.5rem',
            }}
          >
            {attrs.MetaDescription}
          </p>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '0 0 1.5rem' }} />
      </div>

      {/* Article Body */}
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 2rem) clamp(2rem, 4vw, 3rem)',
        }}
      >
        {/* Paragraph intro (if no Markdown or as lead) */}
        {attrs.Paragraph && !attrs.ProcessedMarkdown && (
          <p
            style={{
              fontSize: '1.05rem',
              color: '#374151',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            {attrs.Paragraph}
          </p>
        )}

        {/* Rendered Markdown */}
        {attrs.ProcessedMarkdown && (() => {
          // Strip the leading H1 from markdown — it duplicates the page title
          const cleaned = attrs.ProcessedMarkdown.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '');
          return (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: cleaned }}
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                color: '#374151',
                lineHeight: 1.85,
              }}
            />
          );
        })()}
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 2rem) clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              fontWeight: 700,
              marginBottom: '1.25rem',
              color: '#111827',
            }}
          >
            More Articles
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: related.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              maxWidth: related.length === 1 ? '380px' : 'none',
            }}
          >
            {related.map((relArticle) => {
              const rAttrs = relArticle.attributes || {};
              const rSlug = getArticleSlug(relArticle);
              const rImage = rAttrs.imageUrl || getArticleImage(relArticle);
              const rDate = getArticleDate(rAttrs);
              const rTitle = rAttrs.Title || rAttrs.H1 || 'Untitled';

              return (
                <Link key={relArticle.id || rSlug} href={rSlug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
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
                    <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', backgroundColor: '#f3f4f6', flexShrink: 0 }}>
                      {rImage ? (
                        <img src={rImage} alt={rTitle} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: primaryColor, opacity: 0.4 }}>{getInitials(rTitle)}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1rem', flex: 1 }}>
                      {rDate && <time style={{ fontSize: '0.72rem', color: '#9ca3af' }} dateTime={rDate}>{formatDate(rDate)}</time>}
                      <h3 style={{ fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)', fontWeight: 600, lineHeight: 1.4, margin: '0.2rem 0 0.3rem', color: '#111827', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {rTitle}
                      </h3>
                      {rAttrs.MetaDescription && (
                        <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                          {rAttrs.MetaDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
