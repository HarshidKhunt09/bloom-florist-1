/**
 * About Section - Story Variant
 * Narrative-style about section
 */

import React, { useMemo } from 'react';
import SafeHTML from '../SafeHTML';
import { toHtml } from '../../lib/markdown';

export default function AboutStory({ config = {}, content = {}, globalConfig = {} }) {
  const { width = 'narrow' } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const widths = {
    narrow: '700px',
    normal: '900px',
    wide: '1100px',
  };

  const containerStyle = {
    padding: '6rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const contentWrapperStyle = {
    maxWidth: `min(${widths[width] || widths.narrow}, 95vw)`,
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: colorScheme.primary || '#3498db',
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

  return (
    <section style={containerStyle} className="about-story component-enter">
      <div style={contentWrapperStyle}>
        <h2 style={headingStyle}>{config?.heading || 'Our Story'}</h2>
        {attributes?.Title && !attributes.Title.includes('|') && <p style={subtitleStyle}>{attributes.Title}</p>}
        {!html && attributes?.Paragraph && (
          <p style={{ ...proseStyle, marginBottom: '1.5rem' }}>{attributes.Paragraph}</p>
        )}
        {html && (
          <div className="prose-content" style={proseStyle}>
            <SafeHTML html={html} />
          </div>
        )}
      </div>
    </section>
  );
}
