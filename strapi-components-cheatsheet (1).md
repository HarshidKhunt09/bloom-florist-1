# 🚀 Strapi Components Quick Reference Cheat Sheet

## All 28 Available Component Variants

### 🎯 Hero Sections (3 variants)
```json
{ "type": "HeroSection", "variant": "Split" }
{ "type": "HeroSection", "variant": "Fullscreen" }
{ "type": "HeroSection", "variant": "Minimal" }
```

### 📢 Call-to-Action (3 variants)
```json
{ "type": "CTA", "variant": "Centered" }
{ "type": "CTA", "variant": "Banner" }
{ "type": "CTA", "variant": "Split" }
```

### ⭐ Features Grid (3 variants)
```json
{ "type": "FeaturesGrid", "variant": "ThreeColumn" }
{ "type": "FeaturesGrid", "variant": "FourColumn" }
{ "type": "FeaturesGrid", "variant": "IconCards" }
```

### ❓ FAQ (2 variants)
```json
{ "type": "FAQ", "variant": "Accordion" }
{ "type": "FAQ", "variant": "Grid" }
```

### 🖼️ Gallery (2 variants)
```json
{ "type": "Gallery", "variant": "Grid" }
{ "type": "Gallery", "variant": "Masonry" }
```

### 📧 Contact Form (2 variants)
```json
{ "type": "ContactForm", "variant": "Simple" }
{ "type": "ContactForm", "variant": "Detailed" }
```

### 📝 Content Section (3 variants)
```json
{ "type": "ContentSection", "variant": "OneColumn" }
{ "type": "ContentSection", "variant": "TwoColumn" }
{ "type": "ContentSection", "variant": "Sidebar" }
```

### ℹ️ About Section (2 variants)
```json
{ "type": "AboutSection", "variant": "Story" }
{ "type": "AboutSection", "variant": "Split" }
```

### 📍 Google Map (2 variants)
```json
{ "type": "GoogleMap", "variant": "Simple" }
{ "type": "GoogleMap", "variant": "Embedded" }
```

### 🦶 Footer (2 variants)
```json
{ "type": "Footer", "variant": "Simple" }
{ "type": "Footer", "variant": "MultiColumn" }
```

### 📐 Layout Row (Special)
```json
{ 
  "type": "LayoutRow",
  "layout": { "columns": 2, "gap": "medium" },
  "children": [ /* any two components */ ]
}
```

---

## 📋 Required Content Fields by Component

| Component | Required Fields |
|-----------|----------------|
| **HeroSection** | `H1`, `Title`, `Paragraph`, `imageUrl` |
| **CTA** | None (uses config) |
| **FeaturesGrid** | `features` array with `title`, `description`, `icon` |
| **FAQ** | `faq_items` array with `question`, `answer` |
| **Gallery** | `gallery_images` array with `url`, `caption` |
| **ContactForm** | None (form fields are standard) |
| **ContentSection** | `Title`, `Paragraph` |
| **AboutSection** | `Title`, `Paragraph`, `imageUrl` (for Split) |
| **GoogleMap** | None (uses config for coordinates) |
| **Footer** | `footerColumns` array (for MultiColumn only) |

---

## 🎨 Common Config Options

### All Components Support:
```json
{
  "config": {
    // Component-specific settings
  },
  "layout": {
    "padding": "normal",  // or custom value
    "margin": "normal"
  }
}
```

### Global Config (Site-wide):
```json
{
  "colorScheme": {
    "primary": "#3498db",
    "secondary": "#2ecc71",
    "background": "#ffffff",
    "text": "#333333"
  },
  "typography": {
    "headingFont": "Poppins, sans-serif",
    "bodyFont": "Inter, sans-serif"
  }
}
```

---

## 🔥 Most Popular Config Options

### HeroSection
- `imagePosition`: `"right"` or `"left"`
- `textAlign`: `"left"`, `"center"`, `"right"`
- `showCTA`: `true` or `false`

### CTA
- `buttonText`: `"Contact Us"`
- `buttonLink`: `"#contact"`
- `headingText`: `"Get in Touch"`
- `subtext`: `"Description"`

### FeaturesGrid
- `showIcons`: `true` or `false`
- `cardStyle`: `"elevated"`, `"flat"`, `"bordered"`

### Gallery
- `columns`: `2`, `3`, or `4`
- `spacing`: `"tight"`, `"normal"`, `"loose"`
- `showCaptions`: `true` or `false`

### LayoutRow
- `columns`: `2`, `3`, or `[2, 1]` for custom ratios
- `gap`: `"tight"`, `"medium"`, `"loose"`
- `align`: `"start"`, `"center"`, `"end"`, `"stretch"`

---

## 📦 Simple Page Example

```json
{
  "components": [
    { "type": "HeroSection", "variant": "Split", "config": { "imagePosition": "right" } },
    { "type": "FeaturesGrid", "variant": "ThreeColumn", "config": { "showIcons": true } },
    { "type": "CTA", "variant": "Centered", "config": { "buttonText": "Get Started" } },
    { "type": "FAQ", "variant": "Accordion", "config": { "defaultOpen": 0 } },
    { "type": "Footer", "variant": "Simple", "config": {} }
  ]
}
```

---

## 💡 Pro Tips

1. **Always specify both `type` and `variant`** - they work together
2. **Use LayoutRow for side-by-side layouts** - nest any components
3. **Config is optional** - sensible defaults are provided
4. **Order matters** - components render top to bottom
5. **Test mobile** - all components are responsive

---

## 🎯 Component Complexity Levels

**🟢 Simple (No Config Needed):**
- ContactForm.Simple
- Footer.Simple
- ContentSection.OneColumn

**🟡 Medium (Basic Config):**
- HeroSection.Split
- CTA.Centered
- Gallery.Grid
- FAQ.Accordion

**🔴 Advanced (Multiple Config Options):**
- FeaturesGrid (with features array)
- LayoutRow (with nested children)
- Footer.MultiColumn (with footer columns)
- AboutSection.Split (with stats/timeline)

---

**Total: 28 Component Variants | 11 Component Types | Infinite Possibilities**
