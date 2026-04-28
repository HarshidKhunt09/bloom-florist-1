# Layout Preset System

## Overview

The Layout Preset System allows pages to use predefined layouts optimized for different content types (blog, landing page, etc.) while maintaining flexibility for custom layouts.

## Implementation

### 1. Page Schema Changes

Add `layoutPreset` field to your page content type:

```json
{
  "layoutPreset": {
    "type": "enumeration",
    "enum": ["blog", "landing", "custom"],
    "default": "custom"
  }
}
```

### 2. API Response Structure

Pages will now return:

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Page Title",
      "slug": "page-slug",
      "layoutPreset": "blog",
      "components": [...],
      "layout": {
        "sidebar": true,
        "contentWidth": "narrow",
        "showBreadcrumbs": true
      }
    }
  }
}
```

### 3. Frontend Component Changes

#### LayoutWrapper Component
```javascript
const LayoutWrapper = ({ preset, children, layout }) => {
  const layoutStyles = {
    blog: {
      maxWidth: "800px",
      padding: "2rem",
      sidebar: true
    },
    landing: {
      maxWidth: "100%",
      padding: "0",
      sidebar: false
    },
    custom: {
      maxWidth: "100%",
      padding: "0"
    }
  };

  return (
    <div className={`layout-${preset}`} style={layoutStyles[preset]}>
      {children}
    </div>
  );
};
```

#### ComponentRenderer Update
```javascript
const ComponentRenderer = ({ components, layoutPreset, layout }) => {
  return (
    <LayoutWrapper preset={layoutPreset} layout={layout}>
      {components.map((component, index) => (
        <Component key={index} {...component} />
      ))}
    </LayoutWrapper>
  );
};
```

### 4. Layout Preset Configurations

#### Blog Layout
```json
{
  "layoutPreset": "blog",
  "layout": {
    "sidebar": true,
    "contentWidth": "narrow",
    "showBreadcrumbs": true,
    "showAuthor": true,
    "showDate": true
  }
}
```

#### Landing Page Layout
```json
{
  "layoutPreset": "landing",
  "layout": {
    "sidebar": false,
    "contentWidth": "full",
    "showBreadcrumbs": false,
    "showAuthor": false,
    "showDate": false
  }
}
```

#### Custom Layout
```json
{
  "layoutPreset": "custom",
  "layout": {
    "sidebar": false,
    "contentWidth": "full"
  }
}
```

### 5. CSS Classes

Add these CSS classes for layout-specific styling:

```css
.layout-blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.layout-landing {
  max-width: 100%;
  padding: 0;
}

.layout-custom {
  max-width: 100%;
  padding: 0;
}
```

## Backward Compatibility

- Existing pages without `layoutPreset` will default to "custom"
- No breaking changes to current API structure
