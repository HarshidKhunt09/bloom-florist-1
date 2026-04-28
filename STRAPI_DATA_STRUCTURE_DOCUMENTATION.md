# Strapi Data Structure Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Component System Overview](#component-system-overview)
3. [Data Structure Basics](#data-structure-basics)
4. [Component Mapping](#component-mapping)
5. [Styling System](#styling-system)
6. [Component Reference](#component-reference)
7. [Complete Example](#complete-example)

---

## Introduction

This documentation explains how to structure data in Strapi CMS for the component-based page builder system. Each page can have multiple components, and each component can be customized with content, styling, and configuration options.

---

## Component System Overview

### Key Concepts

1. **Component Type**: Identified by `__component` field (e.g., `components.hero-section`)
2. **Variants**: Some components have multiple visual variants (e.g., `3col`, `4col`, `iconCards`)
3. **Configuration**: Components accept a `config` object or direct properties
4. **Styling**: Custom styles can be applied via a `style` object
5. **Global Config**: Default colors, typography, and site-wide settings
6. **Domain Config**: Site-wide configuration including footer, stored separately from page components

### Data Flow

```
Strapi API (Page Components) → ComponentRenderer → Individual Components
Strapi API (Domain Config) → Footer Component (rendered globally)
```

### Important: Footer Placement

**The footer is NOT part of page components.** It should be configured in the **Domain Configuration API** and will be rendered globally across all pages. Do not include footer components in your page component arrays.

---

## Data Structure Basics

### Component Array Structure

Components are stored in an array. Each component object has:

```json
{
  "__component": "components.component-name",
  "property1": "value1",
  "property2": "value2",
  "style": {
    "backgroundColor": "#ffffff",
    "color": "#000000"
  },
  "variant": "variant-name" // Optional, for components with variants
}
```

### Required Fields

- `__component`: Identifies which component to render (required)

### Optional Fields

- `style`: Object containing CSS-style properties
- `variant`: Specifies which variant to use (if component supports variants)
- `config`: Nested configuration object (alternative to direct properties)

---

## Component Mapping

Strapi component names map to internal component names:

| Strapi Component Name | Internal Type | Default Variant | Available Variants |
|----------------------|---------------|-----------------|-------------------|
| `components.hero-section` | `HeroSection` | `fullscreen` | `fullscreen`, `split`, `minimal` |
| `components.features-grid` | `FeaturesGrid` | `3col` | `3col`, `4col`, `iconCards` |
| `components.cta-section` | `CTA` | `centered` | `centered`, `banner`, `split` |
| `components.testimonials-grid` | `Testimonials` | `grid` | `grid` |
| `components.industry-expertise-grid` | `IndustryExpertise` | `grid` | `grid` |
| `components.footer` | `Footer` | `enhanced` | `enhanced`, `simple`, `multiColumn` |

---

## Styling System

### Style Object Structure

The `style` object accepts CSS properties in camelCase format:

```json
{
  "style": {
    "backgroundColor": "#ffffff",
    "color": "#333333",
    "padding": "2rem",
    "fontSize": "1.5rem"
  }
}
```

### Component-Specific Style Properties

Different components support different style properties. Common ones include:

- `backgroundColor`: Background color
- `color`: Text color
- `textColor`: Alternative text color property
- `headingColor`: Heading text color
- `subtitleColor`: Subtitle text color
- `primaryColor`: Primary accent color
- `secondaryColor`: Secondary accent color

### Global Color Scheme

Components inherit colors from `globalConfig.colorScheme`:

```json
{
  "colorScheme": {
    "primary": "#3498db",
    "secondary": "#2ecc71",
    "accent": "#e74c3c",
    "background": "#ffffff",
    "text": "#333333"
  }
}
```

---

## Component Reference

### 1. Hero Section (`components.hero-section`)

**Purpose**: Full-width hero section at the top of pages

**Default Variant**: `fullscreen`

**Available Variants**: `fullscreen`, `split`, `minimal`

#### Fullscreen Variant

```json
{
  "__component": "components.hero-section",
  "title": "Welcome to Inspired for Life",
  "subtitle": "Your trusted partner for excellence",
  "buttonText": "Get Started",
  "buttonLink": "#contact",
  "backgroundImage": "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920",
  "style": {
    "backgroundColor": "#0ea5e9",
    "color": "#ffffff"
  }
}
```

**Properties**:
- `title` (string): Main heading text (Note: Hero reads from `content.attributes.H1` if not provided)
- `subtitle` (string): Subtitle text (Note: Hero reads from `content.attributes.Title` if not provided)
- `buttonText` (string): CTA button text
- `buttonLink` (string): CTA button URL
- `backgroundImage` (string): Background image URL
- `style` (object): Custom styles

**Configuration Options**:
- `height`: `"screen"` | `"large"` | `"medium"` (default: `"screen"`)
- `textAlign`: `"center"` | `"left"` | `"right"` (default: `"center"`)
- `backgroundType`: `"gradient"` | `"image"` | `"solid"` (default: `"gradient"`)
- `showCTA`: `true` | `false` (default: `true`)
- `showImage`: `true` | `false` (default: `true`)

**Style Properties**:
- `backgroundColor`: Background color
- `color`: Text color (default: `"#ffffff"`)
- `padding`: Container padding (default: `"2rem"`)
- `titleColor`: Main heading (H1) text color (default: `"#ffffff"`)
- `titleFontSize`: Main heading font size (default: `"3.5rem"`)
- `titleFontWeight`: Main heading font weight (default: `"bold"`)
- `titleMarginBottom`: Main heading bottom margin (default: `"1rem"`)
- `subtitleColor`: Subtitle text color (default: `"#ffffff"`)
- `subtitleFontSize`: Subtitle font size (default: `"1.5rem"`)
- `subtitleMarginBottom`: Subtitle bottom margin (default: `"1rem"`)
- `subtitleOpacity`: Subtitle opacity 0-1 (default: `0.9`)
- `paragraphColor`: Paragraph text color (default: `"#ffffff"`)
- `paragraphFontSize`: Paragraph font size (default: `"1.125rem"`)
- `paragraphMarginBottom`: Paragraph bottom margin (default: `"2rem"`)
- `paragraphOpacity`: Paragraph opacity 0-1 (default: `0.9`)
- `paragraphLineHeight`: Paragraph line height (default: `"1.6"`)
- `buttonBackgroundColor`: CTA button background color (default: uses `colorScheme.accent` or `"#e74c3c"`)
- `buttonColor`: CTA button text color (default: `"#ffffff"`)
- `buttonPadding`: CTA button padding (default: `"1rem 2rem"`)
- `buttonBorderRadius`: CTA button border radius (default: `"0.5rem"`)
- `buttonFontSize`: CTA button font size (default: `"1.125rem"`)
- `buttonFontWeight`: CTA button font weight (default: `"600"`)
- `container`: Additional container styles (object) - merges with hero container, supports `background`, `backgroundSize`, `backgroundPosition`
- `contentWrapper`: Additional content wrapper styles (object) - merges with inner content wrapper
- `title`: Additional H1 heading styles (object) - merges with main heading styles
- `subtitle`: Additional subtitle styles (object) - merges with subtitle styles
- `paragraph`: Additional paragraph styles (object) - merges with paragraph styles
- `button`: Additional button styles (object) - merges with CTA button styles

**Note**: Hero Section reads content from `content.attributes.H1`, `content.attributes.Title`, and `content.attributes.Paragraph` if direct properties are not provided. The component also uses `content.attributes.imageUrl` for background images when `backgroundType` is `"image"`.

---

### 2. Features Grid (`components.features-grid`)

**Purpose**: Display a grid of features/services

**Default Variant**: `3col`

**Available Variants**: `3col`, `4col`, `iconCards`

#### Icon Cards Variant

```json
{
  "__component": "components.features-grid",
  "variant": "iconCards",
  "heading": "Why Choose Us",
  "features": [
    {
      "title": "Fast Performance",
      "description": "Lightning-fast load times for optimal user experience",
      "icon": "🚀"
    },
    {
      "title": "Secure & Reliable",
      "description": "Enterprise-grade security with 99.9% uptime",
      "icon": "🔒"
    },
    {
      "title": "Easy to Use",
      "description": "Intuitive interface that anyone can master",
      "icon": "✨"
    }
  ]
}
```

**Properties**:
- `variant` (string): Must be `"iconCards"` for this variant
- `heading` (string): Section heading
- `features` (array): Array of feature objects
- `style` (object): Custom styles

**Feature Object**:
- `title` (string): Feature title (required)
- `description` (string): Feature description (required)
- `icon` (string): Emoji or icon code (required)

**Style Properties**:
- `backgroundColor`: Section background color
- `padding`: Section padding (default: `"4rem 2rem"`)
- `textAlign`: Text alignment - `"center"` | `"left"` | `"right"` (default: `"center"`)
- `headingColor`: Heading text color
- `headingFontSize`: Heading font size (default: `"2rem"`)
- `headingFontWeight`: Heading font weight (default: `"700"`)
- `headingMarginBottom`: Heading bottom margin (default: `"3rem"`)
- `gridGap`: Gap between grid items (default: `"2rem"`)
- `maxWidth`: Maximum container width (default: `"1200px"`)
- `cardMinWidth`: Minimum card width in grid (default: `"280px"`)
- `cardPadding`: Card padding (default: `"3rem 2rem"`)
- `cardBackgroundColor`: Card background color (default: `"#ffffff"`)
- `cardBorderRadius`: Card border radius (default: `"1rem"`)
- `cardBoxShadow`: Card box shadow (default: `"0 10px 30px rgba(0, 0, 0, 0.1)"`)
- `cardTextAlign`: Card text alignment
- `iconSize`: Icon wrapper size (width and height) (default: `"80px"`)
- `iconMargin`: Icon wrapper margin (default: `"0 auto 1.5rem"`)
- `iconBackgroundColor`: Icon wrapper background color
- `iconFontSize`: Icon font size (default: `"2.5rem"`)
- `titleColor`: Feature title color
- `titleFontSize`: Feature title font size (default: `"1.5rem"`)
- `titleFontWeight`: Feature title font weight (default: `"bold"`)
- `titleMarginBottom`: Feature title bottom margin (default: `"1rem"`)
- `descriptionColor`: Feature description color
- `descriptionFontSize`: Feature description font size (default: `"1rem"`)
- `descriptionLineHeight`: Feature description line height (default: `"1.6"`)
- `container`: Additional container styles (object)
- `grid`: Additional grid styles (object)
- `card`: Additional card styles (object)
- `iconWrapper`: Additional icon wrapper styles (object)
- `heading`: Additional heading styles (object)
- `title`: Additional title styles (object)
- `description`: Additional description styles (object)

**Note**: Icon Cards variant displays larger icons in circular containers with elevated card design.

---

### 3. Testimonials Grid (`components.testimonials-grid`)

**Purpose**: Display customer testimonials with ratings

**Default Variant**: `grid`

```json
{
  "__component": "components.testimonials-grid",
  "subtitle": "Testimonials",
  "heading": "We care about our customers experience too",
  "showRatings": true,
  "style": {
    "backgroundColor": "#ffffff",
    "subtitleColor": "#6C757D",
    "headingColor": "#1A1A29",
    "nameColor": "#1A1A29",
    "roleColor": "#7958F8",
    "quoteColor": "#495057"
  },
  "testimonials": [
    {
      "name": "Ethan Miller",
      "position": "Product Designer",
      "content": "I've been using Inspired for Life services for a year now...",
      "rating": 5,
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    }
  ]
}
```

**Properties**:
- `subtitle` (string): Small text above heading
- `heading` (string): Main section heading
- `showRatings` (boolean): Show star ratings (default: `true`)
- `testimonials` (array): Array of testimonial objects (required)
- `style` (object): Custom styles

**Testimonial Object**:
- `name` (string): Customer name (required)
- `position` (string): Job title/role
- `content` (string): Testimonial text (required)
- `rating` (number): Star rating 1-5 (optional, default: 5)
- `image` (string): Profile image URL (optional)

**Style Properties**:
- `backgroundColor`: Section background color (default: uses `colorScheme.background` or `"#ffffff"`)
- `subtitleColor`: Subtitle text color (default: `"#6C757D"`)
- `headingColor`: Heading text color (default: uses `colorScheme.text` or `"#1A1A29"`)
- `nameColor`: Testimonial author name color (default: `"#1A1A29"`)
- `roleColor`: Job title/role color (default: uses `colorScheme.primary` or `"#7958F8"`)
- `quoteColor`: Testimonial text color (default: `"#495057"`)
- `container`: Additional container styles (object) - merges with section container, supports `padding`, `maxWidth`, `margin`, `background`
- `grid`: Additional grid styles (object) - merges with grid container, supports `gridTemplateColumns`, `gap`, `padding`
- `card`: Additional card styles (object) - merges with testimonial card, supports `backgroundColor`, `border`, `borderRadius`, `padding`, `boxShadow`
- `image`: Additional image styles (object) - merges with profile image styles, supports `width`, `height`, `borderRadius`, `border`
- `imageFallback`: Additional image fallback styles (object) - merges with initials fallback styles
- `name`: Additional name styles (object) - merges with testimonial author name styles
- `role`: Additional role styles (object) - merges with job title/role styles
- `rating`: Additional rating styles (object) - merges with star rating styles, supports `color`, `fontSize`, `marginBottom`, `letterSpacing`
- `quote`: Additional quote styles (object) - merges with testimonial text styles
- `subtitle`: Additional subtitle styles (object) - merges with subtitle paragraph styles
- `heading`: Additional heading styles (object) - merges with main heading styles

**Note**: Testimonials Grid includes image fallback functionality - if an image fails to load, it displays the user's initials in a styled container.

---

### 4. Industry Expertise Grid (`components.industry-expertise-grid`)

**Purpose**: Display industry expertise/services

**Default Variant**: `grid`

```json
{
  "__component": "components.industry-expertise-grid",
  "subtitle": "Our Expertise",
  "heading": "Industry Leadership & Experience",
  "description": "We bring deep industry knowledge and specialized experience to deliver exceptional results for our clients.",
  "showLearnMore": true,
  "style": {
    "subtitleColor": "#4F46E5",
    "headingColor": "#111827",
    "descriptionColor": "#6B7280",
    "titleColor": "#111827",
    "textColor": "#6B7280",
    "learnMoreColor": "#4F46E5"
  },
  "expertise": [
    {
      "title": "Healthcare & Life Sciences",
      "description": "Digital health solutions, electronic health records, telemedicine platforms, and regulatory compliance systems.",
      "learnMoreLink": "/services"
    }
  ]
}
```

**Properties**:
- `subtitle` (string): Small text above heading
- `heading` (string): Main section heading
- `description` (string): Section description text
- `showLearnMore` (boolean): Show "Learn More" links (default: `true`)
- `expertise` (array): Array of expertise items (required)
- `style` (object): Custom styles

**Expertise Item Object**:
- `title` (string): Industry/service title (required)
- `description` (string): Description text (required)
- `learnMoreLink` (string): Link URL for "Learn More" button
- `icon` (string): Emoji or icon (optional, auto-assigned if missing)

**Style Properties**:
- `backgroundColor`: Section background color (default: uses `colorScheme.background` or `"#ffffff"`)
- `subtitleColor`: Subtitle text color (default: `"#4F46E5"`)
- `headingColor`: Heading text color (default: `"#111827"`)
- `descriptionColor`: Description text color (default: `"#6B7280"`)
- `titleColor`: Card title color (default: `"#111827"`)
- `textColor`: Card description text color (default: `"#6B7280"`)
- `learnMoreColor`: "Learn More" link color (default: `"#4F46E5"`)
- `container`: Additional container styles (object) - merges with section container, supports `padding`, `maxWidth`, `margin`, `textAlign`, `background`
- `grid`: Additional grid styles (object) - merges with grid container, supports `display`, `gridTemplateColumns`, `gap`, `padding`
- `card`: Additional card styles (object) - merges with expertise card, supports `backgroundColor`, `border`, `borderRadius`, `padding`, `boxShadow`, `transition`
- `iconContainer`: Additional icon container styles (object) - merges with icon wrapper styles, supports `marginBottom`, `textAlign`
- `icon`: Additional icon styles (object) - merges with icon emoji styles, supports `fontSize`, `filter`
- `title`: Additional title styles (object) - merges with card title styles, supports `fontSize`, `fontWeight`, `marginBottom`, `textAlign`
- `text`: Additional description text styles (object) - merges with card description styles, supports `fontSize`, `lineHeight`, `marginBottom`, `textAlign`
- `learnMore`: Additional "Learn More" link styles (object) - merges with learn more link styles, supports `display`, `fontWeight`, `fontSize`, `textDecoration`, `borderBottom`, `paddingBottom`
- `subtitle`: Additional subtitle styles (object) - merges with subtitle paragraph styles
- `heading`: Additional heading styles (object) - merges with main heading styles
- `description`: Additional description styles (object) - merges with section description paragraph styles

**Note**: Industry Expertise Grid automatically assigns default icons based on title keywords (e.g., "healthcare" → 🏥, "finance" → 🏦, "ecommerce" → 🛒) if no icon is provided in the expertise item.

---

### 5. CTA Section (`components.cta-section`)

**Purpose**: Call-to-action section

**Default Variant**: `centered`

**Available Variants**: `centered`, `banner`, `split`

#### Centered Variant

```json
{
  "__component": "components.cta-section",
  "title": "Ready to Get Started?",
  "description": "Contact us today to learn how we can help your business grow",
  "buttonText": "Contact Us",
  "buttonLink": "/contact",
  "style": {
    "backgroundColor": "#64748b",
    "color": "#ffffff"
  }
}
```

**Properties**:
- `title` (string): CTA heading (also accepts `headingText` as alternative)
- `description` (string): Supporting text (also accepts `subtext` as alternative)
- `buttonText` (string): Button label (default: `"Contact Us"`)
- `buttonLink` (string): Button URL (default: `"#contact"`)
- `showButton` (boolean): Show/hide button (default: `true`)
- `style` (object): Custom styles

**Style Properties**:
- `backgroundColor`: Background color (default: uses `colorScheme.background` or `"#f8f9fa"`)
- `color`: Text color
- `padding`: Section padding (default: `"6rem 2rem"`)
- `textAlign`: Text alignment - `"center"` | `"left"` | `"right"` (default: `"center"`)
- `maxWidth`: Maximum content width (default: `"700px"`)
- `headingColor`: Heading text color (default: uses `textColor` or `colorScheme.text` or `"#333333"`)
- `headingFontSize`: Heading font size (default: `"3rem"`)
- `headingFontWeight`: Heading font weight (default: `"bold"`)
- `headingMarginBottom`: Heading bottom margin (default: `"1.5rem"`)
- `textColor`: Description text color (default: uses `colorScheme.text` or `"#666666"`)
- `textFontSize`: Description font size (default: `"1.25rem"`)
- `textMarginBottom`: Description bottom margin (default: `"2.5rem"`)
- `textLineHeight`: Description line height (default: `"1.6"`)
- `buttonBackgroundColor`: Button background color (default: uses `colorScheme.primary` or `"#3498db"`)
- `buttonColor`: Button text color (default: `"#ffffff"`)
- `buttonPadding`: Button padding (default: `"1.25rem 3rem"`)
- `buttonBorderRadius`: Button border radius (default: `"0.5rem"`)
- `buttonFontSize`: Button font size (default: `"1.125rem"`)
- `buttonFontWeight`: Button font weight (default: `"600"`)
- `buttonBoxShadow`: Button box shadow (default: `"0 4px 12px rgba(52, 152, 219, 0.3)"`)
- `container`: Additional container styles (object) - merges with section container
- `contentWrapper`: Additional content wrapper styles (object) - merges with inner content wrapper
- `heading`: Additional heading styles (object) - merges with heading styles
- `text`: Additional description text styles (object) - merges with text styles
- `button`: Additional button styles (object) - merges with button styles

---

### 6. Footer (`components.footer`)

**Purpose**: Site footer with multiple columns

**Default Variant**: `enhanced`

```json
  {
    "type": "components.footer",
    "config": {
      "width": "1200px",
      "columnOrder": [
        "logo",
        "siteDescription",
        "menuLinks"
      ]
    },
    "style": {
      "backgroundColor": "#1a1a1a",
      "textColor": "#ffffff",
      "linkColor": "#ffffff",
      "linkOpacity": 0.9
    }
  }
```

**Properties**:
- `type` (string): Must be `"components.footer"` (Note: Footer uses `type` instead of `__component`)
- `config` (object): Configuration object

**Config Properties**:
- `width` (string): Container width - `"full"` | `"1200px"` | `"1000px"` | `"900px"` (default: `"1200px"`)
- `columnOrder` (array): Order of columns to display - `["logo", "siteDescription", "menuLinks", "latestPages", "contactInfo"]`. Only columns in this array will be shown. Number of columns is automatically calculated from this array length.
- `contactEmail` (string): Contact email (optional, auto-generated if missing)
- `contactPhone` (string): Contact phone number (optional)
- `contactAddress` (string): Physical address (optional)
- `description` (string): Site description text (optional)

**Column Types**:
- `logo`: Site name and description
- `siteDescription`: Site description only
- `menuLinks`: Navigation links from Strapi menu API
- `latestPages`: Latest pages from articles API
- `contactInfo`: Contact email, phone, address

**Style Properties** (optional `style` object at root level, not in `config`):
- `backgroundColor`: Footer background color (default: uses `colorScheme.primary` or `"#1a1a1a"`)
- `textColor`: Default text color (default: `"#ffffff"`)
- `linkColor`: Link text color (default: `"#ffffff"`)
- `linkHoverColor`: Link hover color
- `linkOpacity`: Link opacity 0-1 (default: `0.9`)
- `linkFontSize`: Link font size (default: `"0.95rem"`)
- `logoColor`: Logo/site name color (default: uses `textColor` or `"#ffffff"`)
- `logoFontSize`: Logo font size (default: `"1.5rem"`)
- `descriptionColor`: Description text color (default: uses `textColor` or `"#ffffff"`)
- `descriptionFontSize`: Description font size (default: `"0.95rem"`)
- `titleColor`: Column title color (default: uses `textColor` or `"#ffffff"`)
- `titleFontSize`: Column title font size (default: `"1.2rem"`)
- `copyrightColor`: Copyright text color (default: uses `textColor` or `"#ffffff"`)
- `copyrightFontSize`: Copyright font size (default: `"0.9rem"`)
- `columnGap`: Gap between columns (default: `"2rem"`)
- `borderTop`: Top border style for copyright section (e.g., `"1px solid rgba(255, 255, 255, 0.15)"`)
- `paddingMobile`: Mobile padding override (default: `"2.5rem 1rem 2rem"`)
- `contactEmailType`: Email type for auto-generated email (default: `"contact"`)
- `container`: Additional container styles (object) - merges with footer container
- `grid`: Additional grid styles (object) - merges with footer grid
- `logo`: Additional logo styles (object) - merges with logo h1 styles
- `description`: Additional description styles (object) - merges with description paragraph styles
- `link`: Additional link styles (object) - merges with link styles
- `title`: Additional column title styles (object) - merges with column title h3 styles
- `copyright`: Additional copyright styles (object) - merges with copyright section styles

**Note**: Footer uses `type` instead of `__component` and accepts `style` object directly in the component, not nested in `config`.

---

## Complete Example

Here's a complete example of a page with multiple components:

```json
[
  {
    "__component": "components.hero-section",
    "title": "Welcome to Inspired for Life",
    "subtitle": "Your trusted partner for excellence",
    "buttonText": "Get Started",
    "buttonLink": "#contact",
    "backgroundImage": "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920",
    "style": {
      "backgroundColor": "#0ea5e9",
      "color": "#ffffff"
    }
  },
  {
    "__component": "components.features-grid",
    "variant": "iconCards",
    "heading": "Why Choose Us",
    "style": {
      "backgroundColor": "#ffffff",
      "headingColor": "#1A1A29",
      "cardBackgroundColor": "#ffffff",
      "iconBackgroundColor": "#3498db",
      "titleColor": "#333333",
      "descriptionColor": "#666666"
    },
    "features": [
      {
        "title": "Fast Performance",
        "description": "Lightning-fast load times for optimal user experience",
        "icon": "🚀"
      },
      {
        "title": "Secure & Reliable",
        "description": "Enterprise-grade security with 99.9% uptime",
        "icon": "🔒"
      },
      {
        "title": "Easy to Use",
        "description": "Intuitive interface that anyone can master",
        "icon": "✨"
      }
    ]
  },
  {
    "__component": "components.testimonials-grid",
    "subtitle": "Testimonials",
    "heading": "We care about our customers experience too",
    "showRatings": true,
    "style": {
      "backgroundColor": "#ffffff",
      "subtitleColor": "#6C757D",
      "headingColor": "#1A1A29",
      "nameColor": "#1A1A29",
      "roleColor": "#7958F8",
      "quoteColor": "#495057"
    },
    "testimonials": [
      {
        "name": "Ethan Miller",
        "position": "Product Designer",
        "content": "I've been using Inspired for Life services for a year now and it's made managing my business so much easier. The team is professional and results-driven.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        "name": "Emily Johnson",
        "position": "Design Lead",
        "content": "Thanks to Inspired for Life, I feel more confident about my business decisions than ever before. Their guidance has been invaluable.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      {
        "name": "Olivia Carter",
        "position": "Sales Manager",
        "content": "The customer service team at Inspired for Life went above and beyond to help me resolve any issues. Highly recommended!",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      {
        "name": "Wyatt Turner",
        "position": "CEO",
        "content": "Inspired for Life is simply the best service provider in the market that anyone can ask for. Exceptional quality and results.",
        "rating": 4,
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      {
        "name": "Sarah Wilson",
        "position": "Marketing Director",
        "content": "The transformation in our business since working with Inspired for Life has been remarkable. Professional, reliable, and effective.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      },
      {
        "name": "Michael Brown",
        "position": "Operations Manager",
        "content": "Outstanding service and support. The team at Inspired for Life understands our needs and delivers beyond expectations.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
      }
    ]
  },
  {
    "__component": "components.industry-expertise-grid",
    "subtitle": "Our Expertise",
    "heading": "Industry Leadership & Experience",
    "description": "We bring deep industry knowledge and specialized experience to deliver exceptional results for our clients.",
    "showLearnMore": true,
    "style": {
      "subtitleColor": "#4F46E5",
      "headingColor": "#111827",
      "descriptionColor": "#6B7280",
      "titleColor": "#111827",
      "textColor": "#6B7280",
      "learnMoreColor": "#4F46E5"
    },
    "expertise": [
      {
        "title": "Healthcare & Life Sciences",
        "description": "Digital health solutions, electronic health records, telemedicine platforms, and regulatory compliance systems.",
        "learnMoreLink": "/services"
      },
      {
        "title": "Financial Services",
        "description": "Banking applications, payment processing systems, risk management platforms, and regulatory compliance solutions.",
        "learnMoreLink": "/services"
      },
      {
        "title": "E-commerce & Retail",
        "description": "Online marketplaces, inventory management systems, customer experience platforms, and supply chain optimization.",
        "learnMoreLink": "/services"
      }
    ]
  },
  {
    "__component": "components.cta-section",
    "title": "Ready to Get Started?",
    "description": "Contact us today to learn how we can help your business grow",
    "buttonText": "Contact Us",
    "buttonLink": "/contact",
    "style": {
      "backgroundColor": "#64748b",
      "color": "#ffffff"
    }
  }
]
```

## Domain Configuration (Header, Footer & Global Settings)

### Overview

The Domain Configuration API stores site-wide settings that apply across all pages, including the header and footer. This is separate from page-level components.

### Domain Config Structure

```json
{
  "data": [
    {
      "attributes": {
        "domain": "example.com",
        "siteName": "Your Company Name",
        "description": "Your company description",
        "header": {
          "maxWidth": "1400px",
          "showLogo": true,
          "showNavigation": true,
          "style": {
            "backgroundColor": "#2d3436",
            "textColor": "#ffffff",
            "titleColor": "#ffffff",
            "titleFontSize": "1.75rem",
            "titleFontWeight": "700",
            "linkColor": "#dfe6e9",
            "navLinkColor": "#dfe6e9",
            "navLinkFontSize": "1rem",
            "navLinkFontWeight": "500",
            "navLinkHoverColor": "#ffffff",
            "navLinkHoverBackgroundColor": "#74b9ff",
            "navLinkActiveColor": "#ffffff",
            "navLinkActiveBackgroundColor": "#74b9ff",
            "container": {
              "padding": "1rem 2rem",
              "maxWidth": "1400px"
            },
            "logo": {
              "fontSize": "1.75rem",
              "fontWeight": "700"
            },
            "link": {
              "padding": "0.75rem 1.5rem",
              "borderRadius": "8px",
              "transition": "all 0.3s ease"
            }
          }
        },
        "footer": {
          "width": "1400px",
          "columnOrder": ["logo", "menuLinks", "contactInfo"],
          "contactEmail": "hello@example.com",
          "contactPhone": "+1 (555) 123-4567",
          "contactAddress": "123 Your Street, City, State 12345",
          "description": "Leading the future of digital transformation",
          "style": {
            "backgroundColor": "#2d3436",
            "textColor": "#ffffff",
            "linkColor": "#74b9ff",
            "linkHoverColor": "#0984e3",
            "linkOpacity": 0.9,
            "linkFontSize": "1rem",
            "logoColor": "#ffffff",
            "logoFontSize": "1.75rem",
            "descriptionColor": "#dfe6e9",
            "descriptionFontSize": "1rem",
            "titleColor": "#ffffff",
            "titleFontSize": "1.3rem",
            "copyrightColor": "#b2bec3",
            "copyrightFontSize": "0.95rem",
            "columnGap": "4rem",
            "borderTop": "2px solid rgba(116, 185, 255, 0.3)",
            "paddingMobile": "3rem 2rem 2rem",
            "contactEmailType": "hello",
            "container": {
              "padding": "5rem 3rem 3rem",
              "boxSizing": "border-box",
              "background": "linear-gradient(180deg, #2d3436 0%, #1a1a1a 100%)"
            },
            "grid": {
              "maxWidth": "1400px",
              "margin": "0 auto",
              "alignItems": "flex-start"
            },
            "logo": {
              "margin": "0",
              "lineHeight": "1.3",
              "fontWeight": "700"
            },
            "description": {
              "lineHeight": "1.8",
              "opacity": 0.95,
              "marginTop": "1.5rem"
            },
            "link": {
              "textDecoration": "none",
              "transition": "all 0.3s ease",
              "marginBottom": "0.75rem",
              "fontWeight": "500"
            },
            "title": {
              "fontWeight": 700,
              "marginBottom": "1.5rem",
              "textTransform": "uppercase",
              "letterSpacing": "0.1em",
              "fontSize": "1.1rem"
            },
            "copyright": {
              "textAlign": "center",
              "opacity": 0.8,
              "paddingTop": "3rem",
              "marginTop": "3rem"
            }
          }
        }
      }
    }
  ]
}
```

### Footer Configuration Options

#### Basic Config Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `width` | string | Footer max width | `"1400px"`, `"1200px"`, `"full"` |
| `columnOrder` | array | Order of footer columns | `["logo", "menuLinks", "contactInfo"]` |
| `contactEmail` | string | Contact email address | `"hello@example.com"` |
| `contactPhone` | string | Contact phone number | `"+1 (555) 123-4567"` |
| `contactAddress` | string | Physical address | `"123 Street, City, State"` |
| `description` | string | Footer description text | `"Company tagline"` |

#### Available Column Types

- `logo` - Company logo and site name with description
- `menuLinks` - Navigation links from Menu API
- `latestPages` - Recent pages from Articles API
- `contactInfo` - Contact information (email, phone, address)
- `siteDescription` - Just the description without logo

#### Style Properties

**Root-Level Colors & Typography:**
```json
{
  "backgroundColor": "#2d3436",
  "textColor": "#ffffff",
  "linkColor": "#74b9ff",
  "linkHoverColor": "#0984e3",
  "linkOpacity": 0.9,
  "linkFontSize": "1rem",
  "logoColor": "#ffffff",
  "logoFontSize": "1.75rem",
  "descriptionColor": "#dfe6e9",
  "descriptionFontSize": "1rem",
  "titleColor": "#ffffff",
  "titleFontSize": "1.3rem",
  "copyrightColor": "#b2bec3",
  "copyrightFontSize": "0.95rem",
  "columnGap": "4rem",
  "borderTop": "2px solid rgba(116, 185, 255, 0.3)",
  "paddingMobile": "3rem 2rem 2rem",
  "contactEmailType": "hello"
}
```

**Nested Style Objects** (for fine-grained control):
```json
{
  "container": {
    "padding": "5rem 3rem 3rem",
    "background": "linear-gradient(180deg, #2d3436 0%, #1a1a1a 100%)"
  },
  "grid": {
    "maxWidth": "1400px",
    "margin": "0 auto"
  },
  "logo": {
    "fontWeight": "700",
    "lineHeight": "1.3"
  },
  "description": {
    "lineHeight": "1.8",
    "opacity": 0.95
  },
  "link": {
    "transition": "all 0.3s ease",
    "marginBottom": "0.75rem"
  },
  "title": {
    "textTransform": "uppercase",
    "letterSpacing": "0.1em"
  },
  "copyright": {
    "textAlign": "center",
    "paddingTop": "3rem"
  }
}
```

### Style Priority System

The footer uses a three-tier style priority system:

1. **Default Values** (Lowest) - Hard-coded fallbacks
2. **Root-Level Properties** (Medium) - Direct style properties like `logoColor`
3. **Nested Objects** (Highest) - Objects like `container`, `logo`, `description`

Example:
```json
{
  "logoColor": "#ffffff",          // Priority 2: Overrides default
  "logo": {                         // Priority 3: Overrides everything
    "color": "#ff0000"              // This wins!
  }
}
```

### Integration with Menu & Articles APIs

The footer automatically integrates with:

- **Menu API**: Populates the `menuLinks` column
- **Articles API**: Populates the `latestPages` column (filtered by domain)
- **Domain Config**: Reads `siteName` and other global settings

---

## Header Configuration Options

### Overview

The header is configured in the Domain Configuration API, similar to the footer. It includes site name/logo and navigation menu.

### Header Config Structure

```json
{
  "header": {
    "style": {
      "backgroundColor": "#2d3436",
      "textColor": "#ffffff",
      "titleColor": "#ffffff",
      "titleFontSize": "1.75rem",
      "titleFontWeight": "700",
      "linkColor": "#dfe6e9",
      "navLinkColor": "#dfe6e9",
      "navLinkFontSize": "1rem",
      "navLinkFontWeight": "500",
      "navLinkHoverColor": "#ffffff",
      "navLinkHoverBackgroundColor": "#74b9ff",
      "navLinkActiveColor": "#ffffff",
      "navLinkActiveBackgroundColor": "#74b9ff"
    }
  }
}
```

### Basic Config Properties

| Property | Type | Description | Default | Example |
|----------|------|-------------|---------|---------|
| `maxWidth` | string | Header container max width | `"1200px"` | `"1400px"`, `"1200px"`, `"full"` |
| `showLogo` | boolean | Show/hide site name/logo | `true` | `true`, `false` |
| `showNavigation` | boolean | Show/hide navigation menu | `true` | `true`, `false` |

### Style Properties

#### Root-Level Colors & Typography

```json
{
  "backgroundColor": "#2d3436",
  "textColor": "#ffffff",
  "titleColor": "#ffffff",
  "titleFontSize": "1.75rem",
  "titleFontWeight": "700",
  "linkColor": "#dfe6e9",
  "navLinkColor": "#dfe6e9",
  "navLinkFontSize": "1rem",
  "navLinkFontWeight": "500",
  "navLinkHoverColor": "#ffffff",
  "navLinkHoverBackgroundColor": "#74b9ff",
  "navLinkActiveColor": "#ffffff",
  "navLinkActiveBackgroundColor": "#74b9ff"
}
```

**Property Descriptions:**

- `backgroundColor`: Header background color (applies to `.app-header`)
- `textColor`: Default text color for header
- `titleColor`: Site name/title text color
- `titleFontSize`: Site name/title font size
- `titleFontWeight`: Site name/title font weight (e.g., `"400"`, `"700"`, `"800"`)
- `linkColor`: Site name link color
- `navLinkColor`: Navigation link text color
- `navLinkFontSize`: Navigation link font size
- `navLinkFontWeight`: Navigation link font weight
- `navLinkHoverColor`: Navigation link hover text color
- `navLinkHoverBackgroundColor`: Navigation link hover background color
- `navLinkActiveColor`: Active navigation link text color
- `navLinkActiveBackgroundColor`: Active navigation link background color

#### Nested Style Objects (for fine-grained control)

```json
{
  "container": {
    "padding": "1rem 2rem",
    "maxWidth": "1400px",
    "minHeight": "6rem"
  },
  "logo": {
    "fontSize": "1.75rem",
    "fontWeight": "700",
    "color": "#ffffff"
  },
  "title": {
    "fontSize": "2rem",
    "fontWeight": "800"
  },
  "titleLink": {
    "color": "#ffffff",
    "textDecoration": "none"
  },
  "navigation": {
    "gap": "1rem"
  },
  "link": {
    "padding": "0.75rem 1.5rem",
    "borderRadius": "8px",
    "transition": "all 0.3s ease"
  },
  "linkHover": {
    "backgroundColor": "#74b9ff",
    "color": "#ffffff",
    "transform": "translateY(-2px)"
  },
  "linkActive": {
    "backgroundColor": "#74b9ff",
    "color": "#ffffff"
  }
}
```

**Nested Object Descriptions:**

- `container`: Styles for `.header-container` (inner wrapper), supports `maxWidth`, `margin`, `padding`, `display`, `justifyContent`, `alignItems`
- `logo`: Styles for `.site-title` (site name heading), supports `fontSize`, `fontWeight`, `color`, `margin`
- `title`: Alternative styles for site title (same as logo)
- `titleLink`: Styles for `.site-title a` (site name link), supports `textDecoration`, `color`, `transition`
- `navigation`: Styles for `.main-navigation` (nav wrapper), supports `gap`
- `navList`: Styles for `.nav-list` (navigation list container)
- `navItem`: Styles for `.nav-item` (navigation list item)
- `link`: Styles for `.nav-link` (navigation links), supports `padding`, `borderRadius`, `transition`
- `linkHover`: Styles for `.nav-link:hover` (hover state), supports `backgroundColor`, `color`, `transform`
- `linkActive`: Styles for `.nav-link.active` (active/current page), supports `backgroundColor`, `color`

### Complete Header Example

```json
{
  "header": {
    "maxWidth": "1400px",
    "showLogo": true,
    "showNavigation": true,
    "style": {
      "backgroundColor": "#2d3436",
      "textColor": "#ffffff",
      "titleColor": "#ffffff",
      "titleFontSize": "1.75rem",
      "titleFontWeight": "700",
      "navLinkColor": "#dfe6e9",
      "navLinkFontSize": "1rem",
      "navLinkFontWeight": "500",
      "navLinkHoverColor": "#ffffff",
      "navLinkHoverBackgroundColor": "#74b9ff",
      "container": {
        "padding": "1rem 2rem",
        "maxWidth": "1400px"
      },
      "logo": {
        "fontSize": "1.75rem",
        "fontWeight": "700"
      },
      "link": {
        "padding": "0.75rem 1.5rem",
        "borderRadius": "8px",
        "transition": "all 0.3s ease"
      },
      "linkHover": {
        "backgroundColor": "#74b9ff",
        "color": "#ffffff",
        "transform": "translateY(-2px)"
      }
    }
  }
}
```

---

## Complete Customization Examples

This section provides complete, ready-to-use examples for all three configuration types in Strapi.

---

### 1. Page Components Configuration

**Location**: Set in the **Page Component Collection** → **Components** field (array of components)

This example shows a complete page with multiple components, each with extensive styling and nested style objects.

```json
[
  {
    "__component": "components.hero-section",
    "title": "Transform Your Business Today",
    "subtitle": "Innovative solutions for modern challenges",
    "buttonText": "Start Your Journey",
    "buttonLink": "/contact",
    "backgroundImage": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920",
    "height": "large",
    "textAlign": "left",
    "backgroundType": "image",
    "showCTA": true,
    "style": {
      "backgroundColor": "#1a1a2e",
      "color": "#f0f0f0",
      "padding": "4rem",
      "titleColor": "#ff6b6b",
      "titleFontSize": "4rem",
      "titleFontWeight": "800",
      "titleMarginBottom": "1.5rem",
      "subtitleColor": "#ffd93d",
      "subtitleFontSize": "1.8rem",
      "subtitleMarginBottom": "2rem",
      "subtitleOpacity": 1,
      "paragraphColor": "#ffffff",
      "paragraphFontSize": "1.25rem",
      "paragraphLineHeight": "1.8",
      "buttonBackgroundColor": "#ff6b6b",
      "buttonColor": "#ffffff",
      "buttonPadding": "1.5rem 3.5rem",
      "buttonBorderRadius": "50px",
      "buttonFontSize": "1.25rem",
      "buttonFontWeight": "700",
      "container": {
        "background": "linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(40, 40, 68, 0.95))",
        "backgroundSize": "cover",
        "backgroundPosition": "center"
      }
    }
  },
  {
    "__component": "components.features-grid",
    "variant": "iconCards",
    "heading": "Powerful Features",
    "style": {
      "backgroundColor": "#f8f9fa",
      "padding": "6rem 3rem",
      "textAlign": "left",
      "headingColor": "#2d3436",
      "headingFontSize": "2.5rem",
      "headingFontWeight": "800",
      "headingMarginBottom": "4rem",
      "gridGap": "3rem",
      "maxWidth": "1400px",
      "cardMinWidth": "320px",
      "cardPadding": "4rem 3rem",
      "cardBackgroundColor": "#ffffff",
      "cardBorderRadius": "20px",
      "cardBoxShadow": "0 20px 60px rgba(0, 0, 0, 0.15)",
      "cardTextAlign": "left",
      "iconSize": "100px",
      "iconMargin": "0 0 2rem 0",
      "iconBackgroundColor": "#6c5ce7",
      "iconFontSize": "3rem",
      "titleColor": "#2d3436",
      "titleFontSize": "1.75rem",
      "titleFontWeight": "700",
      "titleMarginBottom": "1.5rem",
      "descriptionColor": "#636e72",
      "descriptionFontSize": "1.125rem",
      "descriptionLineHeight": "1.8",
      "container": {
        "background": "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)"
      },
      "grid": {
        "alignItems": "stretch",
        "justifyItems": "stretch"
      },
      "card": {
        "border": "2px solid transparent",
        "transition": "all 0.3s ease"
      },
      "iconWrapper": {
        "transition": "transform 0.3s ease",
        "boxShadow": "0 10px 30px rgba(108, 92, 231, 0.3)"
      },
      "heading": {
        "letterSpacing": "-0.02em",
        "textTransform": "uppercase"
      },
      "title": {
        "textTransform": "none",
        "letterSpacing": "-0.01em"
      },
      "description": {
        "fontStyle": "normal",
        "fontWeight": "400"
      }
    },
    "features": [
      {
        "title": "Ultra Fast Speed",
        "description": "Lightning-quick performance that keeps your users engaged and satisfied with every interaction.",
        "icon": "⚡"
      },
      {
        "title": "Bank-Level Security",
        "description": "Military-grade encryption and security protocols to protect your data and users' information.",
        "icon": "🛡️"
      },
      {
        "title": "Intuitive Design",
        "description": "Beautiful, user-friendly interfaces that anyone can navigate with confidence and ease.",
        "icon": "🎨"
      }
    ]
  },
  {
    "__component": "components.testimonials-grid",
    "subtitle": "Client Success Stories",
    "heading": "Trusted by Industry Leaders",
    "showRatings": true,
    "style": {
      "backgroundColor": "#2d3436",
      "subtitleColor": "#74b9ff",
      "headingColor": "#ffffff",
      "nameColor": "#ffffff",
      "roleColor": "#a29bfe",
      "quoteColor": "#dfe6e9",
      "container": {
        "padding": "6rem 2rem",
        "maxWidth": "1400px",
        "margin": "0 auto",
        "background": "linear-gradient(135deg, #2d3436 0%, #636e72 100%)"
      },
      "grid": {
        "gridTemplateColumns": "repeat(auto-fit, minmax(350px, 1fr))",
        "gap": "3rem",
        "padding": "2rem 0"
      },
      "card": {
        "backgroundColor": "#ffffff",
        "border": "none",
        "borderRadius": "16px",
        "padding": "3rem 2.5rem",
        "boxShadow": "0 15px 50px rgba(0, 0, 0, 0.2)"
      },
      "image": {
        "width": "6rem",
        "height": "6rem",
        "borderRadius": "50%",
        "border": "4px solid #74b9ff"
      },
      "imageFallback": {
        "backgroundColor": "#74b9ff",
        "color": "#ffffff",
        "fontSize": "1.5rem"
      },
      "name": {
        "fontSize": "1.25rem",
        "fontWeight": "700",
        "marginBottom": "0.5rem",
        "color": "#2d3436"
      },
      "role": {
        "fontSize": "1rem",
        "marginBottom": "1.5rem",
        "fontWeight": "500"
      },
      "rating": {
        "color": "#fdcb6e",
        "fontSize": "1.5rem",
        "marginBottom": "1.5rem",
        "letterSpacing": "3px"
      },
      "quote": {
        "fontSize": "1.125rem",
        "lineHeight": "1.7",
        "margin": "0",
        "color": "#2d3436",
        "fontStyle": "italic"
      }
    },
    "testimonials": [
      {
        "name": "Ethan Miller",
        "position": "Product Designer",
        "content": "I've been using Inspired for Life services for a year now and it's made managing my business so much easier. The team is professional and results-driven.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        "name": "Emily Johnson",
        "position": "Design Lead",
        "content": "Thanks to Inspired for Life, I feel more confident about my business decisions than ever before. Their guidance has been invaluable.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      {
        "name": "Olivia Carter",
        "position": "Sales Manager",
        "content": "The customer service team at Inspired for Life went above and beyond to help me resolve any issues. Highly recommended!",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      {
        "name": "Wyatt Turner",
        "position": "CEO",
        "content": "Inspired for Life is simply the best service provider in the market that anyone can ask for. Exceptional quality and results.",
        "rating": 4,
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      {
        "name": "Sarah Wilson",
        "position": "Marketing Director",
        "content": "The transformation in our business since working with Inspired for Life has been remarkable. Professional, reliable, and effective.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      },
      {
        "name": "Michael Brown",
        "position": "Operations Manager",
        "content": "Outstanding service and support. The team at Inspired for Life understands our needs and delivers beyond expectations.",
        "rating": 5,
        "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
      }
    ]
  },
  {
    "__component": "components.industry-expertise-grid",
    "subtitle": "Our Specializations",
    "heading": "Expert Solutions Across Industries",
    "description": "We deliver cutting-edge solutions tailored to your industry's unique needs and challenges.",
    "showLearnMore": true,
    "style": {
      "backgroundColor": "#ffffff",
      "subtitleColor": "#e17055",
      "headingColor": "#2d3436",
      "descriptionColor": "#636e72",
      "titleColor": "#2d3436",
      "textColor": "#636e72",
      "learnMoreColor": "#e17055",
      "container": {
        "padding": "6rem 2rem",
        "maxWidth": "1400px",
        "margin": "0 auto",
        "textAlign": "center",
        "background": "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)"
      },
      "grid": {
        "display": "grid",
        "gridTemplateColumns": "repeat(auto-fit, minmax(350px, 1fr))",
        "gap": "3rem",
        "padding": "3rem 0"
      },
      "card": {
        "backgroundColor": "#ffffff",
        "border": "2px solid #e9ecef",
        "borderRadius": "16px",
        "padding": "3rem 2.5rem",
        "boxShadow": "0 10px 40px rgba(0, 0, 0, 0.08)",
        "transition": "all 0.3s ease"
      },
      "iconContainer": {
        "marginBottom": "2rem",
        "textAlign": "center"
      },
      "icon": {
        "fontSize": "3rem",
        "filter": "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
      },
      "title": {
        "fontSize": "1.5rem",
        "fontWeight": "700",
        "marginBottom": "1rem",
        "textAlign": "left"
      },
      "text": {
        "fontSize": "1.125rem",
        "lineHeight": "1.8",
        "marginBottom": "2.5rem",
        "textAlign": "left"
      },
      "learnMore": {
        "display": "inline-flex",
        "alignItems": "center",
        "fontWeight": "600",
        "fontSize": "1rem",
        "textDecoration": "none",
        "borderBottom": "2px solid #e17055",
        "paddingBottom": "0.25rem"
      }
    },
    "expertise": [
      {
        "title": "Healthcare & Life Sciences",
        "description": "Digital health solutions, electronic health records, telemedicine platforms, and regulatory compliance systems.",
        "learnMoreLink": "/services"
      },
      {
        "title": "Financial Services",
        "description": "Banking applications, payment processing systems, risk management platforms, and regulatory compliance solutions.",
        "learnMoreLink": "/services"
      },
      {
        "title": "E-commerce & Retail",
        "description": "Online marketplaces, inventory management systems, customer experience platforms, and supply chain optimization.",
        "learnMoreLink": "/services"
      }
    ]
  },
  {
    "__component": "components.cta-section",
    "title": "Ready to Transform Your Business?",
    "description": "Join thousands of satisfied clients who have transformed their operations with our solutions",
    "buttonText": "Get Started Now",
    "buttonLink": "/contact",
    "showButton": true,
    "style": {
      "backgroundColor": "#6c5ce7",
      "color": "#ffffff",
      "padding": "8rem 3rem",
      "textAlign": "center",
      "headingColor": "#ffffff",
      "headingFontSize": "3.5rem",
      "headingFontWeight": "800",
      "headingMarginBottom": "2rem",
      "textColor": "#ffffff",
      "textFontSize": "1.5rem",
      "textMarginBottom": "3rem",
      "textLineHeight": "1.7",
      "buttonBackgroundColor": "#ffffff",
      "buttonColor": "#6c5ce7",
      "buttonPadding": "1.5rem 4rem",
      "buttonBorderRadius": "50px",
      "buttonFontSize": "1.25rem",
      "buttonFontWeight": "700",
      "buttonBoxShadow": "0 10px 40px rgba(255, 255, 255, 0.3)",
      "maxWidth": "900px",
      "container": {
        "background": "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
        "position": "relative",
        "overflow": "hidden"
      },
      "contentWrapper": {
        "position": "relative",
        "zIndex": 1
      },
      "heading": {
        "textShadow": "0 2px 10px rgba(0, 0, 0, 0.1)"
      },
      "button": {
        "textTransform": "uppercase",
        "letterSpacing": "0.1em"
      }
    }
  }
]
```

---

### 2. Header Configuration

**Location**: Set in the **Domain Configuration Collection** → **Header** field

This configuration applies globally to the site header across all pages.

```json
{
  "header": {
    "style": {
      "backgroundColor": "#2d3436",
      "textColor": "#ffffff",
      "titleColor": "#ffffff",
      "titleFontSize": "1.75rem",
      "titleFontWeight": "700",
      "navLinkColor": "#dfe6e9",
      "navLinkFontSize": "1rem",
      "navLinkFontWeight": "500",
      "navLinkHoverColor": "#ffffff",
      "navLinkHoverBackgroundColor": "#74b9ff",
      "container": {
        "padding": "1rem 2rem"
      },
      "logo": {
        "fontSize": "1.75rem",
        "fontWeight": "700",
        "color": "#ffffff"
      },
      "link": {
        "padding": "0.75rem 1.5rem",
        "borderRadius": "8px",
        "transition": "all 0.3s ease"
      },
      "linkHover": {
        "color": "#ffffff",
        "backgroundColor": "#74b9ff"
      }
    }
  }
}
```

**Note**: The header configuration is part of the Domain Configuration API. Include this `header` object within your domain configuration entry.

---

### 3. Footer Configuration

**Location**: Set in the **Domain Configuration Collection** → **Footer** field

This configuration applies globally to the site footer across all pages.

```json
{
  "footer": {
    "width": "1400px",
    "columnOrder": [
      "logo",
      "menuLinks",
      "contactInfo"
    ],
    "contactEmail": "hello@example.com",
    "contactPhone": "+1 (555) 123-4567",
    "contactAddress": "123 Innovation Street, Tech City, TC 12345",
    "description": "Leading the future of digital transformation",
    "style": {
      "backgroundColor": "#2d3436",
      "textColor": "#ffffff",
      "linkColor": "#74b9ff",
      "linkHoverColor": "#0984e3",
      "linkOpacity": 0.9,
      "linkFontSize": "1rem",
      "logoColor": "#ffffff",
      "logoFontSize": "1.75rem",
      "descriptionColor": "#dfe6e9",
      "descriptionFontSize": "1rem",
      "titleColor": "#ffffff",
      "titleFontSize": "1.3rem",
      "copyrightColor": "#b2bec3",
      "copyrightFontSize": "0.95rem",
      "columnGap": "4rem",
      "borderTop": "2px solid rgba(116, 185, 255, 0.3)",
      "paddingMobile": "3rem 2rem 2rem",
      "contactEmailType": "hello",
      "container": {
        "padding": "5rem 3rem 3rem",
        "boxSizing": "border-box",
        "background": "linear-gradient(180deg, #2d3436 0%, #1a1a1a 100%)"
      },
      "grid": {
        "maxWidth": "1400px",
        "margin": "0 auto",
        "alignItems": "flex-start"
      },
      "logo": {
        "margin": "0",
        "lineHeight": "1.3",
        "fontWeight": "700"
      },
      "description": {
        "lineHeight": "1.8",
        "opacity": 0.95,
        "marginTop": "1.5rem"
      },
      "link": {
        "textDecoration": "none",
        "transition": "all 0.3s ease",
        "marginBottom": "0.75rem",
        "fontWeight": "500"
      },
      "title": {
        "fontWeight": 700,
        "marginBottom": "1.5rem",
        "textTransform": "uppercase",
        "letterSpacing": "0.1em",
        "fontSize": "1.1rem"
      },
      "copyright": {
        "textAlign": "center",
        "opacity": 0.8,
        "paddingTop": "3rem",
        "marginTop": "3rem"
      }
    }
  }
}
```

**Note**: The footer configuration is part of the Domain Configuration API. Include this `footer` object within your domain configuration entry, alongside the `header` configuration.

---

## Blog Grid Component

### Overview
The Blog Grid component renders articles dynamically filtered by domain. It reads from the existing Article collection — no new collection needed. It supports 3 visual variants controllable from the backend.

### Strapi Backend Setup

#### Step 1: Add fields to Article collection (if not already present)

In **Content-Type Builder → Article**, ensure these fields exist:

| Field | Type | Purpose |
|-------|------|---------|
| `Domain` | Short text | Already exists — filters articles per site |
| `Title` | Short text | Already exists — article title |
| `Paragraph` | Long text | Already exists — used as excerpt |
| `urlSlug` | Short text | Already exists — route path (e.g., `/getting-started`) |
| `H1` | Short text | Already exists — main heading |
| `category` | Short text | **NEW** — category label (e.g., "Business", "Design", "Guides") |
| `author` | Short text | **NEW** — author name |
| `publishedAt` | Datetime | Already exists in Strapi — publish date |
| `tags` | JSON | **NEW (optional)** — array of tag strings for filtering |
| `imageUrl` | Short text | Already exists — article featured image |

#### Step 2: Add Blog Grid to Page Components

In the **Page Components** collection, add a new component entry for the page where you want the blog to appear (e.g., `page: "home"` or `page: "blog"`):

```json
{
  "__component": "components.blog-grid",
  "variant": "grid",
  "config": {
    "heading": "Latest Articles",
    "subheading": "Insights and updates from our team",
    "articlesPerPage": 6,
    "columns": 3,
    "showImage": true,
    "showExcerpt": true,
    "showDate": true,
    "showAuthor": true,
    "showCategory": true,
    "showReadMore": true,
    "excerptLength": 120,
    "readMoreText": "Read More →",
    "filterByCategory": null,
    "filterByTag": null,
    "style": {
      "backgroundColor": "#ffffff",
      "textColor": "#1f2937",
      "cardStyle": "shadow"
    }
  }
}
```

#### Step 3: Register the Component in Strapi

In Strapi's **Content-Type Builder**, create a new component:

1. **Component name**: `blog-grid`
2. **Category**: `components` (so it becomes `components.blog-grid`)
3. **Fields**:
   - `variant` (Enumeration): `grid`, `list`, `featured`
   - `config` (JSON): Holds all configuration

Then add this component to your **Page Components** collection's `components` dynamic zone.

### Variant Reference

| Variant | Description | Best For |
|---------|-------------|----------|
| `grid` | 3-column card grid with images, pagination | Blog listing pages, homepage sections |
| `list` | Vertical list with side images, longer excerpts | Content-heavy blogs, news sites |
| `featured` | Hero featured article + card grid below | Homepage featured content |

### Config Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `heading` | string | "Latest Articles" | Section heading |
| `subheading` | string | "" | Section subheading |
| `articlesPerPage` | number | 6 | Articles per page |
| `columns` | number | 3 | Grid columns (grid variant only) |
| `showImage` | boolean | true | Show article images |
| `showExcerpt` | boolean | true | Show article excerpts |
| `showDate` | boolean | true | Show publish date |
| `showAuthor` | boolean | false | Show author name |
| `showCategory` | boolean | false | Show category badge |
| `showReadMore` | boolean | true | Show read more link |
| `excerptLength` | number | 150 | Max excerpt characters |
| `readMoreText` | string | "Read More →" | Read more link text |
| `filterByCategory` | string | null | Filter to specific category |
| `filterByTag` | string | null | Filter to specific tag |
| `style.backgroundColor` | string | "#ffffff" | Section background |
| `style.textColor` | string | "inherit" | Text color |
| `style.cardStyle` | string | "shadow" | Card style: `shadow`, `outlined`, `flat` |

### Example: Multiple Blog Sections

You can have multiple blog components on the same page with different filters:

```json
[
  {
    "__component": "components.blog-grid",
    "variant": "featured",
    "config": {
      "heading": "Featured Stories",
      "articlesPerPage": 4,
      "showCategory": true,
      "showAuthor": true
    }
  },
  {
    "__component": "components.blog-grid",
    "variant": "grid",
    "config": {
      "heading": "Business Articles",
      "filterByCategory": "Business",
      "columns": 2,
      "style": { "backgroundColor": "#f9fafb" }
    }
  }
]
```

### Important Notes

1. **Article URLs**: Use flat slugs (e.g., `/getting-started`, NOT `/blog/getting-started`). The existing `[slug].js` routing handles single-segment paths.
2. **Domain filtering**: The blog component automatically uses `allArticles` passed from `getStaticProps`, which is already filtered by domain.
3. **Home page exclusion**: Articles with `urlSlug: "/"` are automatically excluded from blog listings.
4. **No new API endpoint needed**: The blog reads from the same Article collection already used by the site.

---

**Last Updated**: Based on current codebase analysis
**Version**: 1.1 — Added Blog Grid component documentation
