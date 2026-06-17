# Kraft Masonry

A minimal Hugo theme for personal blogs.

**Homepage**: site title in the top-left header, a hero area with one or more subtitle lines (markdown formatting supported), a client-side category filter, and a CSS Grid masonry with automatic bento-style tiling — some cards span two columns and display their image and text side by side. **Single posts**: classic title-and-content layout with a clickable tag list at the bottom. Full **light / dark mode** support with system detection and a manual toggle.

No npm, no Sass, no external fonts or CDN dependencies. CSS and JS are processed entirely through Hugo Pipes.

---

## Screenshots



---

## Features

- **Masonry homepage** — CSS Grid with `grid-auto-flow: dense` for automatic gap filling
- **Bento-style wide cards** — selected cards span 2 columns with image and text side by side
- **Client-side category filter** — instant filtering by category, no page reload
- **Tag taxonomy** — tag list at the bottom of each post, clickable tag cloud at `/tags/`
- **Light / dark mode** — system preference detection + manual toggle persisted to `localStorage`
- **Responsive** — 3 / 2 / 1 column breakpoints
- **No external dependencies** — system font stacks, Hugo Pipes for CSS/JS minification and fingerprinting
- **i18n ready** — Italian and English string files included; add more via `i18n/`

---

## Requirements

Hugo **0.143.0** or later (extended edition recommended for future Sass support).

---

## Installation

### Option A — Git submodule (recommended)

```bash
cd your-site
git submodule add https://github.com/biccio/hugo-kraft-masonry.git themes/hugo-kraft-masonry
```

Then in your `hugo.toml`:

```toml
theme = "hugo-kraft-masonry"
```

### Option B — Direct copy

Copy the `hugo-kraft-masonry/` folder (excluding `exampleSite/`) into your site's `themes/` directory.

### Try the demo site

The `exampleSite/` directory contains a ready-to-run site with six sample posts across three categories ("Travels", "Technology", "Everyday life") and multiple tags.

```bash
mkdir my-site && cd my-site
git submodule add https://github.com/biccio/hugo-kraft-masonry.git themes/hugo-kraft-masonry
cp -r themes/hugo-kraft-masonry/exampleSite/* .
hugo server
```

---

## Configuration

A minimal `hugo.toml`:

```toml
baseURL  = "https://example.com/"
title    = "My Blog"
theme    = "hugo-kraft-masonry"

# i18n: set to "it" for Italian UI strings, "en" for English
defaultContentLanguage = "en"

[taxonomies]
  category = "categories"
  tag      = "tags"

[params]
  description = "A personal blog about travel, tech, and everyday life."
  author      = "Your Name"

  [params.hero]
    subtitle = [
      "A **minimal** Hugo theme for personal blogs.",
      "Masonry grid · Category filter · Tags · Light & dark mode.",
      "Free and open source — [MIT licence](https://github.com/YOUR_USERNAME/hugo-kraft-masonry/blob/main/LICENSE)."
    ]
```

### All parameters

| Parameter | Default | Description |
|---|---|---|
| `params.hero.subtitle` | — | Array of strings rendered below the site header as the homepage hero. Each element is a separate line, processed through Hugo's `markdownify` — inline Markdown is fully supported: `**bold**`, `*italic*`, `[link](url)`, and raw HTML (requires `markup.goldmark.renderer.unsafe = true`). The hero is **not shown** if this key is absent. |
| `params.description` | — | Fallback meta description for pages that don't define their own. |
| `params.author` | site `title` | Displayed in the footer. |
| `params.mainSections` | `["posts"]` | Content sections treated as "posts" for the homepage masonry grid. |
| `params.homepagePostLimit` | `12` | Maximum number of posts shown in the homepage grid, sorted by date descending. |
| `params.enableCategoryFilter` | `true` | Show / hide the category filter bar and its JS on the homepage. |
| `params.wideCardEvery` | `4` | Controls wide-card frequency when `featured` is not set in front matter. A card is made wide when `(len(title) + len(permalink) + date.YearDay) mod wideCardEvery == 0`. Default: roughly 1 in 4 cards. |

---

## Post front matter

```yaml
---
title: "My Post Title"
date: 2026-06-01
categories: ["travel"]     # one or more categories
tags: ["gravel", "italy"]  # one or more tags
image: "https://..."       # cover image URL (optional)
featured: true             # force this card to be wide (optional)
---

Opening paragraph — used as the card abstract on the homepage.

<!--more-->

Rest of the post body.
```

### Cover image

Two lookup strategies, in priority order:

1. **Page bundle resource**: if the post is a [page bundle](https://gohugo.io/content-management/page-bundles/) and contains a file whose name starts with `cover`, `feature`, or `thumbnail` (e.g. `cover.jpg`), it is used automatically.
2. **`image` front matter parameter**: an absolute URL or site-root path.

If neither is present the card is shown without an image (text adjusts automatically).

### Abstract

Generated from Hugo's `.Summary`: the text before `<!--more-->`, or the first ~70 words if the marker is absent. Truncated to 160 characters in normal cards, 240 in wide cards.

---

## Wide cards (bento tiling)

Cards with the `post-card--wide` class span 2 grid columns. On screens ≥ 760 px the image and text are displayed side by side; below that breakpoint (or on single-column mobile) they stack normally.

**Which cards are wide?** Decided per post in this order:

1. **Front matter override** (explicit, stable):
   ```yaml
   featured: true   # always wide
   featured: false  # never wide
   ```
2. **Deterministic pseudo-random** (when `featured` is not set): computed from `len(title) + len(permalink) + date.YearDay` modulo `params.wideCardEvery` (default `4`). The result is stable across rebuilds — layout does not shift between deploys.

> **Note on `grid-auto-flow: dense`**: to fill gaps left by wide cards, the browser may display a later post visually before an earlier one. Reading / tab order always follows the markup (date order). If you want strict visual order, remove `dense` from the masonry rule in `assets/css/main.css` — gaps will remain empty instead.

---

## Category filter

The filter bar above the grid is purely **client-side** (no page reload):

1. `partials/category-filter.html` renders one button per category in `.Site.Taxonomies.categories`, with `data-filter="<slug>"`.
2. `partials/post-card.html` adds `data-categories="slug1 slug2 ..."` to each card.
3. `assets/js/filter.js` listens for clicks and toggles the `hidden` attribute on non-matching cards.

Slugs are generated with Hugo's `urlize` function on both sides, so mixed-case category names always match correctly.

Without JS the filter bar is visible but inert — all posts remain shown. For JS-free category browsing the dedicated `/categories/<slug>/` pages (linked from card tags and from `/categories/`) remain available.

---

## Tag taxonomy

With `[taxonomies] tag = "tags"` in `hugo.toml`, Hugo automatically generates:

- **`/tags/`** — alphabetical tag cloud with post counts.
- **`/tags/<slug>/`** — masonry grid of all posts carrying that tag, with a `# Tag Name · N posts` header.

Tags are linked from the footer of each single post (shown only when `tags` is defined in front matter and the page type is not `page`). Hovering a tag pill fills it with the accent colour — the same interaction as the active category filter button.

---

## Light / dark mode

- On load, an **inline blocking script** in `<head>` (`partials/theme-init.html`) sets `data-theme="light"` or `"dark"` on `<html>` before the first paint, reading `localStorage` first, then `prefers-color-scheme`. No flash.
- The **sun / moon toggle button** in the header (SVG icons, no icon font) flips `data-theme` and persists the choice to `localStorage`.
- **Without JS**, a `@media (prefers-color-scheme: dark)` rule applies the dark palette automatically when the OS is in dark mode.

Both themes are defined as CSS custom properties:

```css
:root                    { /* light theme */ }
:root[data-theme="dark"] { /* dark theme  */ }
```

---

## Typography & design tokens

All colours, fonts, and key dimensions are defined as CSS custom properties in `assets/css/main.css`. Override any of them without touching the rest of the stylesheet:

```css
:root {
  /* Colours — light theme */
  --color-bg:         #ffffff;
  --color-surface:    #f7f6f2;
  --color-ink:        #232017;
  --color-muted:      #837a64;
  --color-accent:     #2f5d50;
  --color-on-accent:  #fbf8f1;
  --color-line:       #e4dfd1;

  /* Font stacks */
  --font-title:   "Avenir Next", "Century Gothic", "Futura", "Trebuchet MS", sans-serif;
  --font-display: "Iowan Old Style", "Palatino Linotype", "Source Serif Pro", Georgia, serif;
  --font-body:    -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono:    "IBM Plex Mono", "SF Mono", "Roboto Mono", Consolas, monospace;
}
```

Three intentionally different typefaces:
- **`--font-title`** (geometric sans) — site logo in the header
- **`--font-display`** (serif) — post titles in cards and single pages
- **`--font-body`** (system sans) — body text

To use a self-hosted custom font (e.g. for GDPR / privacy reasons), add `@font-face` rules at the top of `main.css` and update the relevant `--font-*` variable.

---

## File structure

```
hugo-kraft-masonry/
├── archetypes/
│   └── default.md              # default front matter for "hugo new"
├── assets/
│   ├── css/main.css            # all styles (design tokens in :root)
│   └── js/
│       ├── filter.js           # client-side category filter
│       └── theme-toggle.js     # light/dark toggle
├── i18n/
│   ├── en.toml                 # English UI strings
│   └── it.toml                 # Italian UI strings
├── layouts/
│   ├── 404.html
│   ├── index.html              # homepage: hero + filter + masonry
│   ├── _default/
│   │   ├── baseof.html         # shared HTML skeleton
│   │   ├── list.html           # sections, category pages, tag pages
│   │   └── single.html         # classic post layout + tag footer
│   └── partials/
│       ├── category-filter.html
│       ├── footer.html
│       ├── head.html
│       ├── header.html         # site logo + nav + light/dark toggle
│       ├── post-card.html      # masonry card (normal + wide)
│       └── theme-init.html     # inline blocking script (no flash)
├── exampleSite/                # demo site with sample posts
├── theme.toml
├── LICENSE
└── README.md
```

---

## Netlify deployment

`exampleSite/netlify.toml` provides a ready-to-use deployment configuration:

```toml
[build]
  publish = "public"
  command = "hugo --gc --minify"

[build.environment]
  HUGO_VERSION = "0.143.0"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"
```

Copy it to your site root alongside `hugo.toml`.

---

## i18n

The theme ships with English (`en.toml`) and Italian (`it.toml`) UI strings (navigation labels, filter text, tag counts, etc.). Set `defaultContentLanguage` in `hugo.toml` to select the active locale. To add a new language, create `i18n/<code>.toml` with the same keys.

---

## Known limitations

- The homepage category filter does not update the URL, so a filtered view is not shareable via link and not indexed by search engines. Dedicated `/categories/<slug>/` pages remain available for that.
- No built-in pagination on `/posts/`. If your post count grows, add Hugo's standard `.Paginate` to `layouts/_default/list.html`.
- `--font-title` relies on system fonts. On Linux, "Avenir Next", "Century Gothic", and "Futura" are rarely installed and the stack falls back to a generic sans-serif. For a consistent cross-platform appearance, self-host a geometric sans (e.g. [Jost](https://fonts.google.com/specimen/Jost), [DM Sans](https://fonts.google.com/specimen/DM+Sans)) and update `--font-title`.

---

## License

MIT — see [LICENSE](LICENSE).
