/**
 * Content Section - Two Column Variant
 * Text on one side, image on the other
 */

import React, { useMemo } from 'react';
import SafeHTML from '../SafeHTML';
import { toHtml } from '../../lib/markdown';

export default function ContentTwoColumn({ config = {}, content = {}, globalConfig = {} }) {
  const {
    imagePosition = 'right',
    imageUrl,
  } = config;

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
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
    <section style={containerStyle} className="content-two-column component-enter">
      <div style={gridStyle} className="responsive-grid">
        <div style={textContainerStyle}>
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
        <div style={imageContainerStyle}>
          {(config?.image || imageUrl || attributes?.imageUrl) && (
            <img 
              src={config?.image || imageUrl || attributes.imageUrl} 
              alt={config?.heading || attributes?.Title || 'Content image'} 
              style={imageStyle}
            />
          )}
        </div>
      </div>
    </section>
  );
}
