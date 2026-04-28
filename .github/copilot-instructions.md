# Copilot Instructions

## Build & Run

```bash
npm run dev          # Start dev server
npm run build        # Static export (output: ./out/)
npm run lint         # ESLint via next lint
```

This is a **statically exported** Next.js site (`output: 'export'` in next.config.js). There are no tests configured.

## Architecture

This is a **multi-tenant website builder** powered by Next.js (Pages Router) + Strapi CMS + Tailwind CSS. A single codebase serves different websites by filtering Strapi content based on a domain identifier set via `NEXT_PUBLIC_HARDCODED_DOMAIN` in `.env.local`.

### Dual Rendering System

The site has two rendering paths, selected at runtime via `usesComponentSystem()` in `lib/utils.js`:

1. **Legacy layout** — Hardcoded HTML structure using article attributes (`H1`, `Title`, `Paragraph`, `Markdown`, inline styles from `containerStyles`/`headerStyles`/`bodyStyles`/`paragraphStyles`).
2. **Component system (v2)** — Dynamic rendering via `ComponentRenderer` which maps Strapi component data to React components using `lib/componentMap.js`.

Both paths coexist in `pages/index.js` and `pages/[slug].js`. The component system activates when `globalConfig.useComponentSystem === true` or `globalConfig.templateVersion >= 'v2.0'`.

### Data Flow

```
Strapi APIs → getStaticProps → Page Component → ComponentRenderer → Individual Components
                                              → FooterEnhanced (from Domain Config, rendered globally)
```

Four Strapi APIs are consumed (configured via env vars, "0" means disabled):
- **Articles API** (`NEXT_PUBLIC_STRAPI_API_URL`) — Page content, filtered by domain
- **Page Components API** (`NEXT_PUBLIC_STRAPI_PAGE_COMPONENTS_API`) — Component system configuration per page
- **Domain Config API** (`NEXT_PUBLIC_STRAPI_DOMAIN_CONFIG_API`) — Site-wide settings: color scheme, header config, footer, typography
- **Menu API** (`NEXT_PUBLIC_STRAPI_MENU_API`) — Navigation links (link1anchor/link1url through link6anchor/link6url)

### Component System

Components are registered in `lib/componentMap.js` using `"Type.variant"` keys (e.g., `"HeroSection.fullscreen"`, `"FeaturesGrid.3col"`).

`ComponentRenderer` maps Strapi's `__component` field (e.g., `"components.hero-section"`) to internal types. Each component receives: `config`, `layout`, `content`, `globalConfig`, `allArticles`, `menuItems`.

Component types and their directory structure:
- `components/sections/HeroSection/` — Hero variants (only section type in a subdirectory)
- `components/{Type}/{Variant}.js` — All other components (FeaturesGrid, CTA, Footer, FAQ, etc.)

**Footer is special**: it lives in Domain Config, not in page components. Pages filter out footer components from `pageComponents` before passing to `ComponentRenderer`, then render `FooterEnhanced` separately from `globalConfig.footer`.

### Layout System

`LayoutRow` handles grid-based split layouts (e.g., 2-column, custom ratios like `[2, 1]` for 2/3 + 1/3). It nests child components within a CSS grid.

## Key Conventions

- **Styling**: Tailwind CSS with custom utilities (`glass`, `glass-dark`, `text-gradient`, `text-gradient-primary`, `bg-gradient-radial`, `border-gradient`, text shadows). Custom color palette under `primary.*`. Images are unoptimized (static export constraint).
- **Global app structure**: `_app.js` fetches domain config, site name, and menu globally via `getInitialProps`. Header renders in `_app.js`; footer renders per-page.
- **Strapi attributes format**: Article data lives under `article.attributes.*` (Strapi v4 format). Fields use PascalCase (`MetaTitle`, `MetaDescription`, `SiteName`, `Domain`, `urlSlug`).
- **Unsplash integration**: Images are fetched at build time using `imgkeywords` from article attributes. The API key is in `config/index.js`.
- **Markdown processing**: Uses remark + remark-gfm + remark-html pipeline. Escaped newlines (`\\n`) are unescaped before processing.
- **Canonical URLs**: Handled by `getCanonicalUrl()` in `lib/utils.js` — falls back to `Domain + urlSlug` when `CanonicalURL` is not set.
- **Adding a new component**: Create the variant file in `components/{Type}/{Variant}.js`, import it in `lib/componentMap.js`, add the `"Type.variant"` entry, and add the Strapi `__component` mapping in `ComponentRenderer.js`.
- **Existing docs**: See `STRAPI_DATA_STRUCTURE_DOCUMENTATION.md` for Strapi data structure reference and `layout-system.md` for layout preset details.
