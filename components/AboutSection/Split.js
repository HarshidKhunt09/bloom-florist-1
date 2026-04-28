/**
 * About Section - Split Variant
 * Text on one side, image on the other
 */

import React, { useMemo } from 'react';
import SafeHTML from '../SafeHTML';
import { toHtml } from '../../lib/markdown';

export default function AboutSplit({ config = {}, content = {}, globalConfig = {} }) {
  const {
    imagePosition = 'right',
    imageUrl,
  } = config;

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  const containerStyle = {
    padding: '6rem 2rem',
    backgroundColor: colorScheme.background || '#f8f9fa',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    maxWidth: 'min(1200px, 95vw)',
    margin: '0 auto',
    alignItems: 'center',
  };

  const textContainerStyle = {
    order: imagePosition === 'right' ? 1 : 2,
  };

  const imageContainerStyle = {
    order: imagePosition === 'right' ? 2 : 1,
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
    color: colorScheme.primary || '#3498db',
    fontWeight: '600',
  };

  const proseStyle = {
    fontSize: '1.0625rem',
    lineHeight: '1.75',
    color: colorScheme.text || '#374151',
  };

  const html = useMemo(
    () => toHtml(config?.content || attributes?.ProcessedMarkdown || attributes?.Markdown || ''),
    [config?.content, attributes?.ProcessedMarkdown, attributes?.Markdown]
  );

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  return (
    <section style={containerStyle} className="about-split component-enter">
      <div style={gridStyle} className="responsive-grid">
        <div style={textContainerStyle}>
          <h2 style={headingStyle}>{config?.heading || 'About Us'}</h2>
          {attributes?.Title && !attributes.Title.includes('|') && <p style={subtitleStyle}>{attributes.Title}</p>}
          {!html && attributes?.Paragraph && (
            <p style={{ ...proseStyle, marginBottom: '1.5rem' }}>{attributes.Paragraph}</p>
          )}
          {html && (
            <div className="prose-content" style={proseStyle}>
              <SafeHTML html={html} />
            </div>
          )}
          {config?.stats && config.stats.length > 0 && (
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {config.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 'bold', color: colorScheme.primary || '#3498db' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.875rem', color: colorScheme.text || '#666', marginTop: '0.25rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={imageContainerStyle}>
          {(imageUrl || attributes?.imageUrl) ? (
            <img 
              src={imageUrl || attributes.imageUrl} 
              alt={config?.heading || 'About us'}
              style={imageStyle}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', minHeight: '300px',
              borderRadius: '0.5rem',
              background: `linear-gradient(135deg, ${colorScheme.primary || '#3498db'}15, ${colorScheme.primary || '#3498db'}30)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', opacity: 0.2, fontWeight: 'bold', color: colorScheme.primary || '#3498db' }}>✦</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
