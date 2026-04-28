/**
 * Utility Functions for supersimpletentacle-main
 * Includes canonical URL fix and helper functions
 */

/**
 * Get canonical URL from article attributes
 * If CanonicalURL is null/empty, uses Domain + urlSlug
 */
export function getCanonicalUrl(attributes) {
  if (!attributes) return null;

  const canonicalURL = attributes.CanonicalURL?.trim();
  const domain = attributes.Domain?.trim();
  const slug = attributes.urlSlug?.trim() || '/';

  // If we have a canonical URL, use it
  if (canonicalURL) {
    // Check if it already includes the slug
    if (canonicalURL.includes(slug) || slug === '/') {
      return `https://${canonicalURL.replace(/^https?:\/\//, '')}`;
    }
    // Add slug to canonical URL
    const cleanDomain = canonicalURL.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
    return cleanSlug && cleanSlug !== '/' 
      ? `https://${cleanDomain}/${cleanSlug}`
      : `https://${cleanDomain}`;
  }

  // Fallback: use domain + slug
  if (domain) {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
    return cleanSlug && cleanSlug !== '/' 
      ? `https://${cleanDomain}/${cleanSlug}`
      : `https://${cleanDomain}`;
  }

  return null;
}

/**
 * Parse styles from string or object
 */
export function parseStyles(styles) {
  if (typeof styles === 'string') {
    try {
      return JSON.parse(styles);
    } catch (error) {
      console.error('Error parsing styles string:', error);
      return {};
    }
  } else if (typeof styles === 'object' && styles !== null) {
    return styles;
  }
  return {};
}

/**
 * Generate CSS variables from color scheme
 */
export function generateCSSVariables(colorScheme) {
  if (!colorScheme) return {};

  return {
    '--color-primary': colorScheme.primary || '#3498db',
    '--color-secondary': colorScheme.secondary || '#2ecc71',
    '--color-accent': colorScheme.accent || '#e74c3c',
    '--color-background': colorScheme.background || '#ffffff',
    '--color-text': colorScheme.text || '#333333',
  };
}

/**
 * Generate font CSS from typography config
 */
export function generateFontCSS(typography) {
  if (!typography) return {};

  return {
    '--font-heading': typography.headingFont || 'Poppins, sans-serif',
    '--font-body': typography.bodyFont || 'Inter, sans-serif',
    '--font-size-base': typography.fontSize || '16px',
  };
}

/**
 * Safely get nested object property
 */
export function getNestedProperty(obj, path, defaultValue = null) {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result;
}

/**
 * Check if domain uses new component system
 */
export function usesComponentSystem(domainConfig) {
  return domainConfig?.useComponentSystem === true || 
         domainConfig?.templateVersion >= 'v2.0';
}

/**
 * Merge default config with domain-specific config
 */
export function mergeConfig(defaultConfig, domainConfig) {
  return {
    ...defaultConfig,
    ...domainConfig,
    colorScheme: {
      ...defaultConfig?.colorScheme,
      ...domainConfig?.colorScheme,
    },
    typography: {
      ...defaultConfig?.typography,
      ...domainConfig?.typography,
    },
  };
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Format date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get component variant key for mapping
 */
export function getComponentKey(type, variant) {
  return `${type}.${variant}`;
}

/**
 * Check if running on server side
 */
export function isServer() {
  return typeof window === 'undefined';
}

/**
 * Check if running on client side
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Get current year for copyright notices
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Safe access to nested config with default
 */
export function configValue(config, key, defaultValue) {
  if (!config) return defaultValue;
  const val = config[key];
  return val !== undefined && val !== null ? val : defaultValue;
}

/**
 * Merge custom styles over defaults, ignoring undefined/null values
 */
export function mergeStyles(...styleSources) {
  const merged = {};
  for (const source of styleSources) {
    if (source && typeof source === 'object') {
      for (const [key, value] of Object.entries(source)) {
        if (value !== undefined && value !== null) {
          merged[key] = value;
        }
      }
    }
  }
  return merged;
}
