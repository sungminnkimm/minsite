---
name: portfolio-orchestrator
description: Orchestrates the full build and update workflow for the personal portfolio website hosted on GitHub Pages. Use this skill for ANY website-related request: building the site, adding or editing sections, updating bioprinting content, changing the design, deploying to GitHub, refreshing the portfolio, fixing layout issues, or rebuilding from scratch. Triggers include phrases like "build my site", "update the website", "add a new section", "change the about me", "deploy to GitHub", "fix the homepage", "add my research", "redo the bioprinting page", or any mention of working on the portfolio site.
---

# Portfolio Orchestrator

Coordinates site-architect, frontend-developer, and content-writer agents to build and maintain the personal portfolio website.

**Execution Mode:** Hybrid — Phase 1 uses a solo sub-agent (sequential dependency), Phase 2 uses parallel sub-agents (independent work), Phase 3 is handled directly.

## Phase 0: Context Check

Before doing anything else, check what already exists:

```
D:\minsite\
├── index.html?          → site has been built before
├── _workspace/          → previous run exists
└── _workspace_prev/     → prior backup exists
```

**Decision logic:**
- No `index.html` and no `_workspace/` → **Fresh build** — run all phases
- `index.html` exists and user asks to update/change something → **Partial update** — identify which agent(s) to re-run; skip unchanged phases
- `_workspace/` exists and user provides new requirements → **New build** — move `_workspace/` to `_workspace_prev/` then run all phases

Report context decision to user in one sentence before proceeding.

---

## Phase 1: Site Architecture (Solo Sub-Agent)

**Execution mode: Single sub-agent**

Spawn the `site-architect` agent. Pass it:
- The user's stated goals (portfolio, bioprinting studies, about me, GitHub Pages hosting)
- Any specific requirements the user mentioned (color preferences, sections wanted, existing content)
- List of any files already present in the project root

The agent writes its plan to `_workspace/01_site-plan.md`.

Wait for completion before proceeding to Phase 2.

```
Agent(
  subagent_type: "general-purpose",
  description: "Site architect — plan the portfolio structure",
  model: "opus",
  prompt: "Read .claude/agents/site-architect.md for your role. Read .claude/skills/site-architecture/SKILL.md for guidance. [INJECT: user requirements + existing file list]"
)
```

---

## Phase 2: Parallel Build (Two Sub-Agents)

**Execution mode: Two parallel sub-agents (run_in_background)**

After `_workspace/01_site-plan.md` exists, spawn both agents simultaneously:

**Agent A — Frontend Developer:**
```
Agent(
  subagent_type: "general-purpose",
  description: "Frontend developer — build HTML/CSS/JS site shell",
  model: "opus",
  run_in_background: true,
  prompt: "Read .claude/agents/frontend-developer.md for your role. Read .claude/skills/frontend-build/SKILL.md for guidance. Read _workspace/01_site-plan.md for the site plan. Build the complete site files into the project root (D:\\minsite\\). Insert slot markers where content is pending."
)
```

**Agent B — Content Writer:**
```
Agent(
  subagent_type: "general-purpose",
  description: "Content writer — write all portfolio copy",
  model: "opus",
  run_in_background: true,
  prompt: "Read .claude/agents/content-writer.md for your role. Read .claude/skills/content-creation/SKILL.md for guidance. Read _workspace/01_site-plan.md for content slots. [INJECT: any user-provided bio, projects, research details]. Write all content to _workspace/02_content.md."
)
```

Wait for both to complete.

---

## Phase 3: Integration & GitHub Pages Setup

**Execution mode: Direct (no sub-agent needed)**

1. Read `_workspace/02_content.md`
2. Read all HTML files the frontend-developer created
3. Replace every `<!-- SLOT: NAME -->` marker with the matching content from `02_content.md`
4. Validate GitHub Pages compatibility (see `references/github-pages-guide.md`):
   - `index.html` exists at project root
   - All asset paths are relative
   - No server-side dependencies

If any `[FILL IN: ...]` markers remain in content, collect them and present to the user as a list of information needed.

---

## Phase 4: QA Check

**Execution mode: Direct review**

Run through this checklist and report results:

- [ ] `index.html` opens correctly (check structure manually)
- [ ] Navigation links all point to valid targets
- [ ] No broken image `src` paths
- [ ] CSS custom properties defined before use
- [ ] Mobile viewport meta tag present
- [ ] All content slots filled (no `<!-- SLOT:` remaining)
- [ ] No `[FILL IN:]` or `[DECISION NEEDED]` markers remaining
- [ ] `[REVIEW: ...]` markers listed for user verification

---

## Phase 5: Deployment Guidance

After build completes, provide the user with these exact steps:

```
# Deploy to GitHub Pages

1. Create a new GitHub repository at github.com (name it: yourusername.github.io
   for a user site, or any name for a project site)

2. Initialize git in this folder and push:
   git init
   git add .
   git commit -m "Initial portfolio site"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main

3. In GitHub → Settings → Pages:
   - Source: Deploy from branch
   - Branch: main / root
   - Save

4. Your site will be live at: https://USERNAME.github.io/REPO
   (or https://USERNAME.github.io if the repo is named USERNAME.github.io)
```

---

## Partial Update Mode

When running a partial update (Phase 0 detected existing site):

- User wants content change only → re-run content-writer only, then re-integrate
- User wants design change → re-run frontend-developer only
- User wants new section → re-run all three agents with updated requirements
- User wants to deploy → skip to Phase 5

---

## Test Scenarios

**Normal flow:**
> "Build my portfolio website. I'm a biomedical engineering student studying bioprinting. My name is Paul Kim."
Expected: All 5 phases run, complete site in project root, deployment instructions provided.

**Update flow:**
> "Update the bioprinting section with my new research on vascular scaffolds."
Expected: Phase 0 detects existing site, content-writer re-runs for that section only, HTML updated.

**Error flow:**
> Build runs but user hasn't provided their name or projects.
Expected: Phase 4 surfaces all `[FILL IN:]` items as a numbered list for user to complete.
