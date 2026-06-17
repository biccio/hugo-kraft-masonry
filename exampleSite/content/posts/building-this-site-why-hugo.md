---
title: "Building This Site: Why I Chose Hugo in 2026"
date: 2026-05-14
categories: ["technology"]
tags: ["hugo", "static-site", "web-dev", "performance"]
image: "https://picsum.photos/seed/hugo-build/900/700"
---

Every few years I rebuild my personal site from scratch and spend far too long justifying the choice of tool. This time the answer was Hugo — and the reasoning was simpler than I expected.

<!--more-->

I came from a Jekyll background, tried a brief and regretted Gatsby phase, and spent a year on a headless CMS setup that required me to maintain three separate repositories just to publish a blog post. By the time I was debugging a webhook that connected a CMS to a build pipeline that triggered a CDN purge, I had lost the thread.

Hugo is fast — genuinely, absurdly fast. A full build of a hundred posts completes in under a second on a five-year-old laptop. The template language is Go's `html/template`, which takes an afternoon to learn and a month to stop second-guessing, and then you never think about it again.

The thing I appreciate most is the absence of a runtime. There is no server to patch, no dependency to update, no database to back up. The site is a folder of HTML files. I deploy it by pushing to a Git branch. A CDN serves it from an edge node close to wherever you are. It is, by any reasonable measure, the least interesting infrastructure I have ever run — and that is exactly what I want from a personal blog.

The theme you are looking at — Kraft Masonry — is the direct output of that rebuild. CSS custom properties for theming, Hugo Pipes for asset processing, a handful of lines of vanilla JavaScript for the category filter and the dark mode toggle. No build step beyond `hugo --gc --minify`.

If you are looking for a reason to try Hugo, I can give you one: your writing should be the complicated part.
