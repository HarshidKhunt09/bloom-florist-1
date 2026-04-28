/**
 * Google Map - Embedded Variant
 * Renders Google Maps iframe from Strapi
 */

import React from 'react';
import SafeHTML from '../SafeHTML';

export default function GoogleMapEmbedded({ config = {}, content = {}, globalConfig = {} }) {
  const { width = '100%', height = '450px', containerPadding = '4rem 2rem' } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  // Get embed code from Strapi
  const embedCode = attributes?.googleMapEmbed || config?.embedCode;

  if (!embedCode) {
    return null; // Don't render if no map provided
  }

  const containerStyle = {
    padding: containerPadding,
    backgroundColor: colorScheme.background || '#ffffff',
  };

  const wrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const mapContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const iframeWrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <section style={containerStyle} className="google-map-embedded component-enter">
      <div style={wrapperStyle}>
        <div style={mapContainerStyle}>
          <div style={iframeWrapperStyle}>
            <SafeHTML html={embedCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
