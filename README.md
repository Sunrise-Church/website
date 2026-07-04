# Sunrise Church Static Site

This repository contains a plain static website for Sunrise Church. It is built
with HTML, CSS, and a small amount of browser JavaScript. There is no Vite,
React, Tailwind, package manager, or build step required.

## Structure

```text
/
  index.html
  about/
    index.html
  visit/
    index.html
  next-steps/
    index.html
  give/
    index.html
  first-sundays/
    index.html
  assets/
    css/
      styles.css
    js/
      main.js
```

## Local Preview

Serve the repository root with any static file server to preview pretty URLs
such as `/about/` and `/visit/`. Opening `index.html` directly still works for
the homepage, but nested directory URLs need a server.

## GitHub Pages

The site uses relative asset and page links, so it can be published from the
repository root on GitHub Pages, including project-site URLs such as
`https://USERNAME.github.io/REPOSITORY_NAME/`.

## Notes

- `Teachings` anchors to the homepage teaching section. Podcast and YouTube
  links are placeholders until real channel URLs are available.
- `next-steps/` is a polished content placeholder for connection pathways,
  groups, serving, prayer, faith conversations, and events.
- The Plan a Visit form is visual only and does not submit.
- The PayFast button is disabled until a real payment URL is configured.
- Unsplash images and Sunrise Church PDF/form links are loaded from their
  external URLs.
