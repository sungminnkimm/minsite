# GitHub Pages Compatibility Guide

## How GitHub Pages Works

GitHub Pages serves static files from a GitHub repository. It supports:
- Plain HTML/CSS/JS (no build step needed)
- Jekyll (auto-built by GitHub)
- Any static output placed in the repo

## Deployment Options

| Option | Branch | Folder | Best For |
|--------|--------|--------|---------|
| User/Org site | `main` | root `/` | `username.github.io` repo |
| Project site (root) | `main` | root `/` | Any repo, served at `/repo-name/` |
| Project site (docs) | `main` | `/docs` | Keep source and site separate |

**Recommendation for this project:** Use `main` branch, project root. Simplest setup.

## Plain HTML (No Jekyll)

If the site is plain HTML/CSS/JS:
- No `_config.yml` needed
- Files are served as-is
- `index.html` at root → homepage
- No files/folders starting with `_` (GitHub Pages hides these if Jekyll is detected)
  - Exception: rename `_workspace/` to something else before pushing, or add `.nojekyll`

**Add a `.nojekyll` file** to the repo root to tell GitHub Pages not to process the site with Jekyll. This prevents issues with folders named with underscores (`_workspace/`):

```
touch .nojekyll
```

## Relative vs Absolute Paths

✅ Correct (relative):
```html
<link rel="stylesheet" href="style.css">
<img src="images/photo.jpg">
<a href="about.html">About</a>
```

❌ Wrong (absolute — breaks on project sites):
```html
<link rel="stylesheet" href="/style.css">
<img src="/images/photo.jpg">
```

Exception: If the site is a user site (`username.github.io`), absolute paths from root work. For project sites, they don't — relative paths always work everywhere.

## Custom Domain

To use a custom domain (e.g., `paulkim.com`):
1. Add a `CNAME` file to repo root with just the domain: `paulkim.com`
2. Configure DNS with your domain registrar (A records or CNAME to GitHub's IPs)
3. Enable in GitHub Settings → Pages → Custom domain

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Site shows README instead of page | No `index.html` | Create `index.html` at root |
| CSS not loading | Absolute path | Change to relative path |
| 404 on all pages | Pages not enabled | Enable in repo Settings → Pages |
| `_workspace/` folder causes Jekyll error | Jekyll sees `_` folder | Add `.nojekyll` file |
| Changes not showing | Cache | Hard refresh (Ctrl+Shift+R) or wait 1-2 min |
