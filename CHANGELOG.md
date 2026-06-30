# Changelog

All notable changes to Kraft Masonry are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org/).

---

## [0.9.0] — 2026-06-30

### Added
- **Homepage Person JSON-LD** — set `[params.person_ld]` in `hugo.toml` to emit a `schema.org/Person` `<script type="application/ld+json">` block in the `<head>` of the homepage only. Supports name fields (`person_name`, `person_given_name`, `person_family_name`), contact info (`person_email`, `person_telephone`, `person_url`), `person_image`, `person_vatid`, `person_knows_language` (array), and a full `PostalAddress` sub-object via `address_*` keys. All fields are optional; the address block is omitted when no `address_*` key is set.

---

## [0.8.0] — 2026-06-29

### Added
- **EchoThread comments** — opt-in comment widget rendered at the bottom of every post when `params.echothread.apiKey` is set; emits no HTML when absent. Thread identity uses `File.UniqueID` (MD5 of the source path) so threads survive URL changes. Supports `params.echothread.theme` (`auto` / `light` / `dark`) and `params.echothread.accentColor`.

---

## [0.7.0] — 2026-06-19

### Added
- **Inline image shortcode** — `{{< img >}}` with `left` / `right` / `center` / `full` alignment, optional `caption`, and `width` override. Floating images collapse to full-width on viewports ≤ 600 px. Add `<div class="img-clear"></div>` to stop text wrapping after a float.

---

## [0.6.0] — 2026-06-19

### Added
- **Google Analytics (GA4)** — set `params.googleAnalytics = "G-XXXXXXXXXX"` to inject the `gtag.js` snippet in `<head>`. Loaded only on production builds (`hugo --environment production` / `HUGO_ENV=production`); local and preview traffic is never tracked.

---

## [0.5.1] — 2026-06-15

### Fixed
- Four bugs identified in code review (template, CSS, and layout corrections).

---

## [0.5.0] — 2026-06-15

### Added
- **Configurable footer** — `params.footer.left` and `params.footer.right` accept inline Markdown and are rendered with `markdownify`. Falls back to `© <year> <title>` and the i18n `builtWith` string when either key is absent.

### Changed
- Abstract card truncation limit documented: 200 characters for normal cards, 240 for wide (`featured`) cards.
- Increased visible characters in post-card summary.

### Fixed
- `single.html` moved to the correct layout directory.

---

## [0.4.0] — 2026-06-10

### Added
- **Locale-aware date format** — `params.dateFormat` accepts Hugo's predefined tokens (`:date_full`, `:date_long`, `:date_medium`, `:date_short`) or a custom Go layout (e.g. `02/01/2006`). Month and weekday names are localised to the page language; the `<time datetime>` attribute stays ISO 8601.

---

## [0.3.1] — 2026-06-10

### Fixed
- `schema.html` structured-data partial corrected after initial release.

---

## [0.3.0] — 2026-06-10

### Added
- **JSON-LD structured data** — optional `schema` front-matter block emits a `<script type="application/ld+json">` per post. Page-derived fields (headline, dates, URL, cover image, word count, language) are filled automatically; omitted fields fall back to site values.

---

## [0.2.0] — 2026-06-05

### Added
- **`disableDescriptionMobile`** — set to `true` to hide the homepage hero/description block on viewports ≤ 640 px, surfacing the post grid immediately on small screens.
- Open Graph meta tags in `<head>`.

### Changed
- Navigation gap reduced to `1.1rem` on mobile for a more compact layout.

### Fixed
- Card horizontal centering corrected.
- Post card aspect ratio fixed.
- Various CSS border and layout fixes.

---

## [0.1.0] — 2026-05-01

### Added
- Initial release: masonry homepage (CSS Grid + `grid-auto-flow: dense`), bento-style wide cards, client-side category filter, tag taxonomy, light/dark mode with system detection and manual toggle, responsive 3/2/1 column breakpoints, i18n support (English and Italian).
