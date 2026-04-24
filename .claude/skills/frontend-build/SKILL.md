---
name: frontend-build
description: Implements HTML, CSS, and JavaScript files for the personal portfolio website on GitHub Pages. Use this when creating or modifying site files, implementing designs, adding interactivity, fixing layouts, or integrating content into HTML.
---

# Frontend Build Skill

## Core Requirements

Every build must satisfy these non-negotiables:
- Works as static files with no server (open `index.html` directly in a browser)
- All paths relative — never `href="/style.css"`, always `href="style.css"`
- Mobile-first CSS using the design tokens from the site plan
- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`)
- `<meta name="viewport" content="width=device-width, initial-scale=1">` in every `<head>`

## HTML Structure Pattern

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[SLOT: META_DESCRIPTION]">
  <title>[SLOT: PAGE_TITLE]</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav id="navbar">...</nav>
  </header>
  <main>
    <section id="hero">...</section>
    <section id="about">...</section>
    <section id="research">...</section>
    <section id="portfolio">...</section>
    <section id="contact">...</section>
  </main>
  <footer>...</footer>
  <script src="script.js"></script>
</body>
</html>
```

## CSS Architecture

Use a single `style.css` with this organization:
1. CSS custom properties (`:root { }`) — all tokens at the top
2. Reset / base styles
3. Layout utilities (container, grid, flex helpers)
4. Component styles (nav, hero, cards, buttons)
5. Section-specific styles
6. Media queries at the bottom (mobile-first: min-width breakpoints)

Do not use CSS frameworks (Bootstrap, Tailwind) — they require a CDN or build step and add weight.

## JavaScript Patterns

`script.js` should handle:

```js
// Sticky nav with active-section highlighting
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const link = document.querySelector(`nav a[href="#${e.target.id}"]`);
    if (link) link.classList.toggle('active', e.isIntersecting);
  });
}, { threshold: 0.5 });
sections.forEach(s => observer.observe(s));

// Smooth scroll (modern browsers support this via CSS, but JS fallback)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
```

## Bioprinting Section Design

The research section should feel scientifically credible. Use:
- A subtle grid or card layout for research topics
- Icon or badge for each research area (Unicode symbols work: ⬡ for hexagonal scaffolds, etc.)
- A "Research Timeline" or "Topics I Study" format works well
- Slightly cooler color palette in this section to signal a shift in content type

## Portfolio Card Pattern

```html
<article class="project-card">
  <div class="project-card__image">
    <img src="images/project-1.jpg" alt="[SLOT: PROJECT_1_ALT]">
  </div>
  <div class="project-card__body">
    <h3><!-- SLOT: PROJECT_1_TITLE --></h3>
    <p><!-- SLOT: PROJECT_1_DESC --></p>
    <ul class="tags"><!-- SLOT: PROJECT_1_TAGS --></ul>
  </div>
</article>
```

## Slot Marker Convention

When content is not yet available, insert:
```html
<!-- SLOT: SLOT_NAME -->
```
These are replaced in Phase 3 of the orchestrator. Never write placeholder lorem ipsum — always use slot markers.

## What NOT to Do
- No `<table>` for layout
- No inline styles (use CSS classes)
- No `!important` except as a last resort
- No external font CDN that blocks render — if using Google Fonts, use `display=swap`
- No JavaScript frameworks (React, Vue) — this is a static site
