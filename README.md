# Cameron Geisler Website — Astro Migration

This folder contains all the migrated content and pages from camerongeisler.com (WordPress → Astro).

## How to Use This

Copy the contents of this folder into your existing Astro project at `Documents/website_personal`.

### What's included

- `src/pages/` — All site pages (8 static pages + blog listing + individual post template)
- `src/content/blog/` — 23 blog posts as Markdown files
- `src/content/testimonials.json` — 12 student testimonials
- `src/layouts/Layout.astro` — Main site layout (header, nav, footer)
- `public/styles/global.css` — All site styles
- `public/images/` — All WordPress uploads (original + thumbnails)
- `astro.config.mjs` — Astro config (site URL set to camerongeisler.com)
- `package.json` — Dependencies (just Astro)

### Pages

| URL | File |
|-----|------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/contact` | `src/pages/contact.astro` |
| `/math-tutoring` | `src/pages/math-tutoring.astro` |
| `/math-study-skills` | `src/pages/math-study-skills.astro` |
| `/math-resources` | `src/pages/math-resources.astro` |
| `/textbook` | `src/pages/textbook.astro` |
| `/principles-for-studying-math` | `src/pages/principles-for-studying-math.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` |

### Setup (if starting fresh)

```bash
cd Documents/website_personal
npm install
npm run dev
```

Then open http://localhost:4321 in your browser.

### Deploy to Netlify

Just push to GitHub — Netlify will auto-build and deploy.
