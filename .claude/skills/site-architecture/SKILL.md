---
name: site-architecture
description: Plans the structure, page layout, navigation, and tech choices for a static personal portfolio website targeting GitHub Pages. Use this when designing or redesigning the site structure, choosing tech stack, or deciding what sections to include.
---

# Site Architecture Skill

## Tech Stack Decision

For a personal portfolio on GitHub Pages with no build tooling, use **plain HTML/CSS/JS**:
- Zero configuration for GitHub Pages
- No npm, no Jekyll, no Node required
- Editable with any text editor
- Fast load times

Only choose Jekyll if the user explicitly wants blog posts with dates, or needs templating across many pages.

## Recommended Site Structure

### Single-Page Layout (Recommended for portfolio sites)
All content on `index.html` with smooth-scroll navigation. Best for portfolios because:
- Visitors see everything without navigation friction
- Easy to maintain one file
- GitHub Pages serves it perfectly

```
D:\minsite\
├── index.html          ← entire site
├── style.css           ← all styles
├── script.js           ← smooth scroll, nav, interactions
├── images/             ← photos, diagrams, project screenshots
│   ├── profile.jpg
│   └── bioprint-*.jpg
├── .nojekyll           ← tells GitHub not to run Jekyll
└── _workspace/         ← intermediate build files (do not push)
```

### Multi-Page Layout (Use if site has 4+ distinct content areas)
```
D:\minsite\
├── index.html          ← home / hero
├── about.html          ← about me
├── research.html       ← bioprinting studies
├── portfolio.html      ← projects
├── contact.html        ← contact
├── style.css
├── script.js
├── images/
└── .nojekyll
```

## Recommended Sections for This Portfolio

| Section | Purpose | Slot Names |
|---------|---------|------------|
| Hero | Name, tagline, call-to-action | `HERO_NAME`, `HERO_TAGLINE`, `HERO_CTA` |
| About | Who I am, background, interests | `ABOUT_INTRO`, `ABOUT_BACKGROUND` |
| Bioprinting Research | Studies, topics, findings | `BIOPRINTING_SUMMARY`, `BIOPRINTING_DETAIL`, `BIOPRINTING_TOPICS` |
| Portfolio | Projects, work samples | `PROJECT_1_TITLE`, `PROJECT_1_DESC`, `PROJECT_1_TAGS` (repeat per project) |
| Skills | Technical and scientific skills | `SKILLS_LIST` |
| Contact | Email, GitHub, LinkedIn | `CONTACT_EMAIL`, `CONTACT_GITHUB`, `CONTACT_LINKEDIN` |

## Design Tokens for a Scientific Portfolio

```css
/* Colors — clean, scientific, trustworthy */
--color-primary: #1a1a2e;      /* deep navy */
--color-accent: #16213e;       /* darker navy */
--color-highlight: #0f3460;    /* blue highlight */
--color-cta: #e94560;          /* coral for buttons */
--color-bg: #f8f9fa;           /* light background */
--color-text: #212529;         /* dark text */
--color-muted: #6c757d;        /* secondary text */

/* Typography */
--font-heading: 'Inter', 'Segoe UI', sans-serif;
--font-body: 'Inter', 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Spacing scale */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;
--space-2xl: 8rem;

/* Breakpoints */
--bp-mobile: 480px;
--bp-tablet: 768px;
--bp-desktop: 1200px;
```

## Navigation Design

For a single-page site:
```html
<nav>
  <a href="#about">About</a>
  <a href="#research">Research</a>
  <a href="#portfolio">Portfolio</a>
  <a href="#contact">Contact</a>
</nav>
```

Sticky nav that highlights the active section as user scrolls (JS IntersectionObserver).

## Output Format

Write `_workspace/01_site-plan.md` with these sections:
1. Tech Stack Decision + rationale
2. Layout choice (single-page vs multi-page) + rationale
3. Exact file/directory listing
4. Section list with slot names
5. Design tokens (copy the values above, adjust if user specified preferences)
6. Navigation structure
7. GitHub Pages config notes (include `.nojekyll` reminder)
8. Any `[DECISION NEEDED]` items
