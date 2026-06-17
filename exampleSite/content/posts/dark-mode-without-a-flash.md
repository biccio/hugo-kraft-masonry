---
title: "Implementing Dark Mode Without a Flash"
date: 2026-04-10
categories: ["technology"]
tags: ["css", "dark-mode", "web-dev", "javascript"]
image: "https://picsum.photos/seed/dark-mode-css/900/700"
---

The flash-of-wrong-theme problem has a simple solution that most tutorials skip. Here is the approach used in this theme.

<!--more-->

The naive implementation goes like this: on page load, JavaScript reads `localStorage`, sets `data-theme` on `<html>`, done. Except that JavaScript runs after the browser has already painted the page once. If the user prefers dark mode and the default stylesheet is light, they see a white flash before the dark theme kicks in. On fast connections this lasts milliseconds; on slow ones it is long enough to be genuinely unpleasant.

The fix is to make the theme-detection script **blocking** — and to put it in `<head>`, before any stylesheet link.

```html
<script>
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      var theme = stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  })();
</script>
```

Because this runs synchronously before the first paint, `<html>` already has the correct `data-theme` attribute when the CSS is parsed. No flash.

The rest — the toggle button, persisting to `localStorage`, updating the icon — is handled by a separate deferred script that runs after DOMContentLoaded and carries no risk of a flash even if it loads slowly.

A secondary concern is the case where JavaScript is disabled entirely. A CSS `@media (prefers-color-scheme: dark)` rule targeting `:root:not([data-theme])` handles that: if the init script never ran (no `data-theme` attribute set), the media query applies the dark palette automatically based on the OS setting.

Three moving parts, zero dependencies, no flash.
