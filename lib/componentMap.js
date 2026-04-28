/**
 * Component Map
 * Maps component type.variant strings to React components
 * Add new components here as you build them
 */

// Hero Section variants (ONLY HeroSection is in sections subdirectory)
import HeroFullscreen from '../components/sections/HeroSection/Fullscreen';
import HeroSplit from '../components/sections/HeroSection/Split';
import HeroMinimal from '../components/sections/HeroSection/Minimal';

// Features Grid variants (directly in components/)
import FeaturesThreeColumn from '../components/FeaturesGrid/ThreeColumn';
import FeaturesFourColumn from '../components/FeaturesGrid/FourColumn';
import FeaturesIconCards from '../components/FeaturesGrid/IconCards';

// Content Section variants (directly in components/)
import ContentTwoColumn from '../components/ContentSection/TwoColumn';
import ContentOneColumn from '../components/ContentSection/OneColumn';
import ContentSidebar from '../components/ContentSection/Sidebar';

// Gallery variants (directly in components/)
import GalleryGrid from '../components/Gallery/Grid';
import GalleryMasonry from '../components/Gallery/Masonry';

// CTA variants (directly in components/)
import CTABanner from '../components/CTA/Banner';
import CTACentered from '../components/CTA/Centered';
import CTASplit from '../components/CTA/Split';

// Footer variants (directly in components/)
import FooterMultiColumn from '../components/Footer/MultiColumn';
import FooterSimple from '../components/Footer/Simple';
import FooterEnhanced from '../components/Footer/Enhanced';

// Contact Form variants (directly in components/)
import ContactFormSimple from '../components/ContactForm/Simple';
import ContactFormDetailed from '../components/ContactForm/Detailed';

// FAQ variants (directly in components/)
import FAQAccordion from '../components/FAQ/Accordion';
import FAQGrid from '../components/FAQ/Grid';

// About Section variants (directly in components/)
import AboutStory from '../components/AboutSection/Story';
import AboutSplit from '../components/AboutSection/Split';

// Google Map variants (directly in components/)
import GoogleMapEmbedded from '../components/GoogleMap/Embedded';
import GoogleMapSimple from '../components/GoogleMap/Simple';

// Testimonials variants
import TestimonialsGrid from '../components/Testimonials/Grid';

// Industry Expertise variants
import IndustryExpertiseGrid from '../components/IndustryExpertise/Grid';

// Blog variants
import BlogGrid from '../components/Blog/Grid';
import BlogList from '../components/Blog/List';
import BlogFeatured from '../components/Blog/Featured';

/**
 * Component Registry
 * Key format: "ComponentType.variant"
 */
export const COMPONENT_MAP = {
  // Hero Section
  'HeroSection.fullscreen': HeroFullscreen,
  'HeroSection.split': HeroSplit,
  'HeroSection.minimal': HeroMinimal,

  // Features Grid
  'FeaturesGrid.3col': FeaturesThreeColumn,
  'FeaturesGrid.4col': FeaturesFourColumn,
  'FeaturesGrid.iconCards': FeaturesIconCards,

  // Content Section
  'ContentSection.twoColumn': ContentTwoColumn,
  'ContentSection.oneColumn': ContentOneColumn,
  'ContentSection.sidebar': ContentSidebar,

  // Gallery
  'Gallery.grid': GalleryGrid,
  'Gallery.masonry': GalleryMasonry,

  // CTA
  'CTA.banner': CTABanner,
  'CTA.centered': CTACentered,
  'CTA.split': CTASplit,

  // Footer
  'Footer.multiColumn': FooterMultiColumn,
  'Footer.simple': FooterSimple,
  'Footer.enhanced': FooterEnhanced,

  // Contact Form
  'ContactForm.simple': ContactFormSimple,
  'ContactForm.detailed': ContactFormDetailed,

  // FAQ
  'FAQ.accordion': FAQAccordion,
  'FAQ.grid': FAQGrid,

  // About Section
  'AboutSection.story': AboutStory,
  'AboutSection.split': AboutSplit,

  // Google Map
  'GoogleMap.embedded': GoogleMapEmbedded,
  'GoogleMap.simple': GoogleMapSimple,

  // Testimonials
  'Testimonials.grid': TestimonialsGrid,

  // Industry Expertise
  'IndustryExpertise.grid': IndustryExpertiseGrid,

  // Blog
  'Blog.grid': BlogGrid,
  'Blog.list': BlogList,
  'Blog.featured': BlogFeatured,
};

/**
 * Variant name normalisation map (PascalCase cheatsheet names → componentMap keys)
 */
const VARIANT_ALIASES = {
  'Fullscreen': 'fullscreen', 'Split': 'split', 'Minimal': 'minimal',
  'ThreeColumn': '3col', 'FourColumn': '4col', 'IconCards': 'iconCards',
  'Centered': 'centered', 'Banner': 'banner',
  'OneColumn': 'oneColumn', 'TwoColumn': 'twoColumn', 'Sidebar': 'sidebar',
  'Grid': 'grid', 'Masonry': 'masonry', 'Featured': 'featured', 'List': 'list',
  'Story': 'story', 'Simple': 'simple', 'Detailed': 'detailed',
  'Embedded': 'embedded', 'Accordion': 'accordion', 'MultiColumn': 'multiColumn',
  'Enhanced': 'enhanced',
};

/**
 * Get component by type and variant
 */
export function getComponent(type, variant) {
  // Try exact match first
  const key = `${type}.${variant}`;
  if (COMPONENT_MAP[key]) return COMPONENT_MAP[key];

  // Try normalised variant (PascalCase → camelCase/lowercase)
  const normVariant = VARIANT_ALIASES[variant] || variant.charAt(0).toLowerCase() + variant.slice(1);
  const normKey = `${type}.${normVariant}`;
  if (COMPONENT_MAP[normKey]) return COMPONENT_MAP[normKey];

  console.warn(`Component not found: ${key} (also tried ${normKey})`);
  return null;
}

/**
 * Check if component exists
 */
export function componentExists(type, variant) {
  const key = `${type}.${variant}`;
  return key in COMPONENT_MAP;
}

/**
 * Get all registered components
 */
export function getAllComponents() {
  return Object.keys(COMPONENT_MAP);
}

/**
 * Get components by type
 */
export function getComponentsByType(type) {
  return Object.keys(COMPONENT_MAP)
    .filter(key => key.startsWith(`${type}.`))
    .map(key => key.split('.')[1]);
}

export default COMPONENT_MAP;
