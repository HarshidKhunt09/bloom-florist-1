/**
 * Content Section - Sidebar Variant
 * Main content with sidebar
 */

import React from 'react';
import SafeHTML from '../SafeHTML';

export default function ContentSidebar({ config = {}, content = {}, globalConfig = {} }) {
  const { sidebarPosition = 'right', sidebarContent, sidebar } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: sidebarPosition === 'right' ? '2fr 1fr' : '1fr 2fr',
    gap: '3rem',
    maxWidth: 'min(1200px, 95vw)',
    margin: '0 auto',
  };

  const mainContentStyle = {
    order: sidebarPosition === 'right' ? 1 : 2,
  };

  const sidebarStyle = {
    order: sidebarPosition === 'right' ? 2 : 1,
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '0.5rem',
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const paragraphStyle = {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    color: colorScheme.text || '#666666',
    marginBottom: '1.5rem',
  };

  const sidebarHeadingStyle = {
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: colorScheme.text || '#333333',
  };

  return (
    <section style={containerStyle} className="content-sidebar component-enter">
      <div style={gridStyle} className="responsive-grid">
        <div style={mainContentStyle}>
          {(config?.heading || (attributes?.Title && !attributes.Title.includes('|'))) && <h2 style={headingStyle}>{config?.heading || attributes.Title}</h2>}
          {!config?.content && attributes?.Paragraph && <p style={paragraphStyle}>{attributes.Paragraph}</p>}
          {(config?.content || attributes?.ProcessedMarkdown) && (
            <SafeHTML 
              html={config?.content || attributes.ProcessedMarkdown}
              style={paragraphStyle}
            />
          )}
        </div>
        <aside style={sidebarStyle} role="complementary">
          <h3 style={sidebarHeadingStyle}>Quick Info</h3>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            {sidebar ? (
              <SafeHTML html={sidebar} />
            ) : (
              sidebarContent || 'Sidebar content goes here'
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
