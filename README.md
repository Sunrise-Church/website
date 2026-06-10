# Sunrise Church Static Site

This repository contains a plain static website for Sunrise Church. It is built
with HTML, CSS, and a small amount of browser JavaScript. There is no Vite,
React, Tailwind, package manager, or build step required.

## Structure

```text
/
  index.html
  about.html
  visit.html
  give.html
  assets/
    css/
      styles.css
    js/
      main.js
```

## Local Preview

Open `index.html` directly in a browser, or serve the repository root with any
static file server.

## GitHub Pages

The site uses relative asset and page links, so it can be published from the
repository root on GitHub Pages, including project-site URLs such as
`https://USERNAME.github.io/REPOSITORY_NAME/`.

## Notes

- `Listen` and `Connect` navigation links are placeholders for future pages.
- The Plan a Visit form is visual only and does not submit.
- The PayFast button is disabled until a real payment URL is configured.
- Unsplash images and Sunrise Church PDF/form links are loaded from their
  external URLs.
