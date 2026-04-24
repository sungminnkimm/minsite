# Paul Kim — Portfolio Site Plan

Source-of-truth build plan. Frontend-developer and content-writer execute this in parallel without further architect input.

---

## 1. Tech Stack Decision

**Plain HTML/CSS/JS (no framework, no build step).**

Rationale: GitHub Pages serves static files with zero configuration, the site has one page of content, and the user needs to edit it directly without toolchain overhead. No Jekyll — a `.nojekyll` sentinel file will be included.

---

## 2. Layout Choice

**Single-page layout** (`index.html` with anchor-linked sections and smooth-scroll navigation).

Rationale: Six sections of modest depth, audience wants a fast overview (recruiters, collaborators, professors), and a single file minimizes maintenance friction for a student-run site.

---

## 3. File / Directory Listing

```
D:\minsite\
├── index.html           # Entire site (all six sections)
├── style.css            # All styles, design tokens as CSS custom properties
├── script.js            # Smooth scroll, sticky nav, active-section highlight, mobile menu toggle
├── images/
│   ├── profile.jpg              # Paul's portrait for hero/about [user-provided]
│   ├── bioprint-control.svg     # Diagram/illustration for bioprinting section [can be placeholder]
│   ├── bioprint-cornea.svg      # Cornea interest illustration [can be placeholder]
│   ├── project-extrusion.jpg    # Low-shear extrusion system render/sketch [placeholder OK]
│   └── favicon.svg              # Site favicon
├── .nojekyll            # Empty file — tells GitHub Pages to skip Jekyll processing
├── README.md            # Short repo description (not rendered on site)
└── _workspace/          # Architect/writer/builder intermediate artifacts — NOT deployed
    ├── 01_site-plan.md
    ├── 02_content.md
    └── 03_build-notes.md
```

**Do not create** any `package.json`, `node_modules/`, `_config.yml`, or build config. None are needed.

---

## 4. Sections (in scroll order)

All sections live inside `index.html`. Each section has an `id` matching its nav anchor. Use semantic HTML5 (`<header>`, `<section>`, `<article>`, `<footer>`).

### 4.1 Hero — `#hero`
- Full-viewport section, dark navy background with subtle accent
- Large name heading, one-line tagline, two CTAs (scroll to Research, scroll to Contact)
- Optional small portrait or abstract molecular/circuit motif

### 4.2 About Me — `#about`
- Two-column on desktop (portrait left, text right), stacked on mobile
- One intro paragraph + one background/interests paragraph + a compact highlight list (3 bullets)

### 4.3 Research / Bioprinting Studies — `#research`
- Visually distinct: off-white panel with left accent border in cyan to signal "scientific zone"
- Short summary paragraph at top
- Two topic cards side-by-side: (a) Control Engineering for Bioprinting (primary), (b) Cornea Bioprinting (secondary interest)
- Each card: icon/illustration, title, 2–3 sentence description, topic tags
- Optional "Currently Exploring" note block

### 4.4 Portfolio — `#portfolio`
- Grid of project cards (one column mobile, two columns desktop)
- Featured project first: **Low-Cost Low-Shear Extrusion System** — larger card, "Upcoming — Summer 2026" status pill
- Card anatomy: image/placeholder, title, status pill, short description, tag chips, optional links
- Room for 2–3 more cards as placeholders for future projects

### 4.5 Skills — `#skills`
- Three skill clusters displayed as grouped tag pills: Biomedical Engineering, Research, Technical/Tooling
- Clean, no progress bars (avoids false-precision cliché)

### 4.6 Contact — `#contact`
- Centered block, dark background matching hero for bookend effect
- Email link (primary CTA), GitHub link, LinkedIn link, optional ORCID slot
- Simple footer beneath: copyright, current year (set via JS), "Built by Paul Kim"

---

## 5. Navigation Structure

Sticky top nav (translucent background with backdrop blur, solidifies on scroll).

| Label | Anchor |
|-------|--------|
| Paul Kim (logo/home) | `#hero` |
| About | `#about` |
| Research | `#research` |
| Portfolio | `#portfolio` |
| Skills | `#skills` |
| Contact | `#contact` |

Mobile: hamburger icon toggles a full-width dropdown. Active section highlighted via JS `IntersectionObserver` adding an `.is-active` class to the matching nav link.

---

## 6. Design Tokens

Copy these verbatim into `:root` in `style.css`.

```css
:root {
  /* Colors — scientific, modern, trustworthy with a bio-accent */
  --color-bg:           #0b1220;   /* deep navy, hero/contact background */
  --color-bg-alt:       #f7f9fc;   /* off-white, main body background */
  --color-surface:      #ffffff;   /* card surfaces */
  --color-panel:        #eef2f7;   /* research section panel */
  --color-text:         #1a2332;   /* primary body text on light bg */
  --color-text-invert:  #eaf2ff;   /* body text on dark bg */
  --color-muted:        #64748b;   /* secondary / meta text */
  --color-border:       #d9e2ec;   /* card borders, dividers */

  --color-primary:      #0f3460;   /* navy-blue, headings, links */
  --color-accent:       #14b8a6;   /* teal — bio/organoid accent, CTA hover */
  --color-accent-2:     #22d3ee;   /* cyan — research section accent */
  --color-cta:          #e94560;   /* coral — primary button */
  --color-cta-hover:    #c9354f;

  /* Typography */
  --font-heading: 'Space Grotesk', 'Inter', 'Segoe UI', system-ui, sans-serif;
  --font-body:    'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', Consolas, monospace;

  --fs-xs:   0.75rem;
  --fs-sm:   0.875rem;
  --fs-base: 1rem;
  --fs-md:   1.125rem;
  --fs-lg:   1.375rem;
  --fs-xl:   1.875rem;
  --fs-2xl:  2.5rem;
  --fs-3xl:  3.5rem;    /* hero name */

  --lh-tight: 1.15;
  --lh-body:  1.6;

  /* Spacing scale */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  2rem;
  --space-xl:  4rem;
  --space-2xl: 6rem;
  --space-3xl: 8rem;

  /* Radius, shadow, motion */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(15, 52, 96, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 52, 96, 0.08);
  --shadow-lg: 0 12px 32px rgba(15, 52, 96, 0.12);
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;

  /* Breakpoints (used in media queries, not as custom props) */
  /* mobile  <= 480px
     tablet  <= 768px
     desktop <= 1200px */

  --max-width: 1120px;
}
```

Load fonts via a single Google Fonts `<link>` in `<head>`:
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

---

## 7. Content Slots

The content-writer fills these placeholders. Frontend-developer uses the exact same slot tokens as HTML comments or visible text in the shell so they are findable with a single find-and-replace pass.

### Hero
- `{{HERO_NAME}}` — "Paul Kim"
- `{{HERO_ROLE}}` — one line, e.g. "Biomedical Engineering Student"
- `{{HERO_TAGLINE}}` — one-sentence mission (organoids / bioprinting / microfluidics angle)
- `{{HERO_CTA_PRIMARY}}` — button text, e.g. "See my research"
- `{{HERO_CTA_SECONDARY}}` — button text, e.g. "Get in touch"

### About
- `{{ABOUT_INTRO}}` — 2–3 sentences: who Paul is, what he studies
- `{{ABOUT_BACKGROUND}}` — 2–3 sentences: journey, motivation, what drives him
- `{{ABOUT_HIGHLIGHT_1}}`, `{{ABOUT_HIGHLIGHT_2}}`, `{{ABOUT_HIGHLIGHT_3}}` — short bullet phrases (max ~8 words each)

### Research
- `{{RESEARCH_SUMMARY}}` — 2–3 sentence framing of his bioprinting interests overall
- `{{RESEARCH_TOPIC_1_TITLE}}` — "Control Engineering for Bioprinting"
- `{{RESEARCH_TOPIC_1_DESC}}` — 3–4 sentences explaining the focus
- `{{RESEARCH_TOPIC_1_TAGS}}` — comma-separated tag list (e.g. "PID, feedback loops, extrusion control")
- `{{RESEARCH_TOPIC_2_TITLE}}` — "Cornea Bioprinting"
- `{{RESEARCH_TOPIC_2_DESC}}` — 2–3 sentences on the secondary interest
- `{{RESEARCH_TOPIC_2_TAGS}}` — comma-separated tag list
- `{{RESEARCH_CURRENT}}` — 1–2 sentence "Currently exploring" note

### Portfolio
Featured project:
- `{{PROJECT_1_TITLE}}` — "Low-Cost Low-Shear Extrusion System"
- `{{PROJECT_1_STATUS}}` — "Upcoming — Summer 2026"
- `{{PROJECT_1_DESC}}` — 3–4 sentences: problem, approach, expected outcome
- `{{PROJECT_1_TAGS}}` — comma-separated tags (e.g. "bioprinting, hardware design, control")
- `{{PROJECT_1_LINK}}` — URL or `#` if none yet
- `{{PROJECT_1_LINK_LABEL}}` — e.g. "Project notes" or "Coming soon"

Placeholder slots 2 and 3 (content-writer marks as "Coming soon" unless user provides):
- `{{PROJECT_2_TITLE}}`, `{{PROJECT_2_STATUS}}`, `{{PROJECT_2_DESC}}`, `{{PROJECT_2_TAGS}}`, `{{PROJECT_2_LINK}}`, `{{PROJECT_2_LINK_LABEL}}`
- `{{PROJECT_3_TITLE}}`, `{{PROJECT_3_STATUS}}`, `{{PROJECT_3_DESC}}`, `{{PROJECT_3_TAGS}}`, `{{PROJECT_3_LINK}}`, `{{PROJECT_3_LINK_LABEL}}`

### Skills
- `{{SKILLS_BIOMED}}` — comma-separated list of biomedical engineering skills
- `{{SKILLS_RESEARCH}}` — comma-separated list of research skills
- `{{SKILLS_TECHNICAL}}` — comma-separated list of technical/tooling skills

### Contact
- `{{CONTACT_INTRO}}` — one sentence inviting contact
- `{{CONTACT_EMAIL}}` — `paulkim0724@gmail.com` (confirmed from user profile)
- `{{CONTACT_GITHUB}}` — GitHub profile URL  [DECISION NEEDED — see §9]
- `{{CONTACT_LINKEDIN}}` — LinkedIn profile URL  [DECISION NEEDED — see §9]
- `{{CONTACT_ORCID}}` — optional; writer may omit if unknown

### Meta
- `{{SITE_TITLE}}` — e.g. "Paul Kim — Biomedical Engineering Portfolio"
- `{{SITE_DESCRIPTION}}` — 1 sentence meta description for `<meta name="description">`
- `{{SITE_OG_IMAGE}}` — path to social share image (writer may specify `images/og.png`, builder adds the file later)

---

## 8. GitHub Pages Configuration

- **Source branch:** `main`
- **Source folder:** repo root (not `/docs`)
- **Custom domain:** none
- **Required files at repo root:** `index.html`, `style.css`, `script.js`, `.nojekyll`, `images/`
- **`.nojekyll` rationale:** prevents GitHub from running the Jekyll processor, which can ignore files beginning with `_` and slow first deploy
- **No `_config.yml`** — not using Jekyll
- **Deployment:** push to `main`, enable Pages in repo Settings → Pages → Source: `main` / root
- **Do NOT deploy:** `_workspace/`, `CLAUDE.md`, `.claude/`, `.omc/`. Add a `.gitignore` entry for `_workspace/` during build
- **Check after deploy:** site renders at `https://<username>.github.io/<repo-name>/` (or user's chosen repo)

---

## 9. [DECISION NEEDED]

Items the architect cannot resolve from provided information. Leave the slot in the HTML as a placeholder until the user answers, or have the content-writer insert a safe fallback.

1. **GitHub username / URL** — needed for `{{CONTACT_GITHUB}}` and for the deployed site URL. Fallback: writer inserts `https://github.com/` as `#` placeholder, builder leaves a TODO comment.
2. **LinkedIn URL** — needed for `{{CONTACT_LINKEDIN}}`. Fallback: omit the LinkedIn link if not provided.
3. **Portrait photo** — `images/profile.jpg` not yet supplied. Builder uses a neutral silhouette/placeholder SVG; real photo can be dropped in later under the same filename.
4. **Project images** — no renders exist for the extrusion system yet (planning phase). Builder generates a simple SVG placeholder showing a stylized syringe/extruder; replace when renders or photos exist.
5. **University / program name** — mentioned as "biomedical engineering student" but no institution specified. Writer should keep bio institution-agnostic or mark a TODO if the user later wants it called out.
6. **Résumé/CV PDF** — not requested in scope. If user wants one later, add `cv.pdf` to repo root and a link in the hero or contact area.

---

## 10. Handoff Summary

- **Frontend-developer** reads this plan and produces `index.html` (with all content slots as literal `{{SLOT_NAME}}` strings), `style.css` (with tokens from §6), `script.js`, `.nojekyll`, and placeholder SVGs in `images/`. Writes notes to `_workspace/03_build-notes.md`.
- **Content-writer** reads this plan and user requirements, produces `_workspace/02_content.md` mapping every slot from §7 to final copy, respecting the scientific yet personal tone and the fact that the extrusion project is still in planning.
- **Next phase (integrator)** runs the find-and-replace of `{{SLOT}}` tokens in `index.html` against the content map, then the site is ready to commit and deploy.
