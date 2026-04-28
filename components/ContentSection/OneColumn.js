/**
 * Content Section - One Column Variant
 * Full-width text content
 */

import React, { useMemo } from 'react';
import SafeHTML from '../SafeHTML';
import { toHtml } from '../../lib/markdown';

export default function ContentOneColumn({ config = {}, content = {}, globalConfig = {} }) {
  const { width = 'narrow' } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const widths = {
    narrow: 'min(700px, 95vw)',
    normal: 'min(900px, 95vw)',
    wide: 'min(1100px, 95vw)',
  };

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const contentWrapperStyle = {
    maxWidth: widths[width] || widths.narrow,
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
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
    <section style={containerStyle} className="content-one-column component-enter">
      <div style={contentWrapperStyle}>
        {(config?.heading || (attributes?.Title && !attributes.Title.includes('|'))) && <h2 style={headingStyle}>{config?.heading || attributes.Title}</h2>}
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
