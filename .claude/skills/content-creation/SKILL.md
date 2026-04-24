---
name: content-creation
description: Creates and refines all website copy for the personal portfolio — about me, portfolio project descriptions, and bioprinting research summaries. Use this when writing, editing, or updating any textual content on the site, including hero taglines, section intros, research descriptions, and contact copy.
---

# Content Creation Skill

## Tone & Voice

| Section | Tone | Model sentence |
|---------|------|----------------|
| Hero | Confident, concise, memorable | "I build tissues, one layer at a time." |
| About | Warm, genuine, human | "I got into bioprinting because I wanted science to be tangible." |
| Research | Precise, credible, curious | "My focus is on extrusion-based bioprinting of vascular scaffolds." |
| Portfolio | Achievement-oriented, specific | "Built a cell viability tracking tool used in three lab studies." |
| Contact | Friendly, inviting | "I'd love to connect — whether you're a researcher, recruiter, or just curious." |

Avoid: corporate buzzwords ("synergy", "passionate about"), vague claims ("I love technology"), or anything that sounds like it was written for a job application.

## Content Slots to Fill

Fill every slot from `_workspace/01_site-plan.md`. Common slots for this site:

### Hero Section
- `HERO_NAME` — User's full name
- `HERO_TAGLINE` — One punchy line about who they are and what they do
- `HERO_CTA` — Call-to-action button text (e.g., "View My Research" or "See My Work")

### About Section
- `ABOUT_INTRO` — 2-3 sentences: who this person is, where they study/work, what drives them
- `ABOUT_BACKGROUND` — 1-2 sentences: educational background or career path

### Bioprinting Research Section
- `BIOPRINTING_SUMMARY` — 2-3 sentence overview of their engagement with bioprinting
- `BIOPRINTING_DETAIL` — Deeper paragraph on their specific focus, methods, or findings
- `BIOPRINTING_TOPICS` — Bulleted list of 4-6 research topics or areas of interest

### Portfolio Section (repeat per project)
- `PROJECT_N_TITLE` — Project name
- `PROJECT_N_DESC` — 2-3 sentence description: what it is, what you did, what it achieved
- `PROJECT_N_TAGS` — 3-5 skill/technology tags as `<li>` items

### Skills Section
- `SKILLS_LIST` — Grouped list: Lab Skills | Programming | Tools

### Contact Section
- `CONTACT_INTRO` — 1 sentence invitation to connect
- `META_DESCRIPTION` — 150-character page description for SEO

## Bioprinting Accuracy Reference

Use only claims that apply to the user's actual work. Background facts you can accurately use:

**What bioprinting is:**
Bioprinting applies additive manufacturing to deposit biological materials — cells, hydrogels, growth factors — in precise 3D arrangements to create tissue constructs or organ models.

**Common methods:**
- Extrusion-based: most common; pushes bioink through a nozzle; good for viscous materials
- Inkjet: droplet-based; good for precise cell placement; lower cell density
- Stereolithography (SLA/DLP): light-cured; high resolution; limited bioink options

**Key challenges:**
- Vascularization: creating blood vessel networks in thick tissue
- Cell viability during and after printing
- Mechanical properties matching native tissue
- Scalability from lab to clinical use

**Applications:**
- Skin grafts, cartilage repair, bone scaffolds
- Drug testing models (organoids, tumor models)
- Cornea, heart patch, liver tissue research

## Output Format

Write `_workspace/02_content.md` as:

```markdown
# Portfolio Content

## SLOT: HERO_NAME
Paul Kim

## SLOT: HERO_TAGLINE
Biomedical engineer exploring the frontier of living materials.

## SLOT: ABOUT_INTRO
[2-3 sentences]

[... continue for every slot in the site plan]
```

## When Information Is Missing

If the user hasn't provided something essential (their name, specific projects, school/lab affiliation), insert:
```
[FILL IN: e.g., "your full name here"]
```

If bioprinting content needs user verification:
```
[REVIEW: verify this matches your specific research focus]
```

Never invent facts. Never use placeholder text. Every slot gets either real content or a clearly marked fill-in.
