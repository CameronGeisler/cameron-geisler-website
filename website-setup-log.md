# Cameron's Website Setup Log

**Last updated:** February 28, 2026

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Site generator | **Astro** | Markdown + components → static HTML |
| Source control | **GitHub** | `github.com/CameronGeisler/cameron-geisler-website` |
| Hosting | **Cloudflare Pages** | Auto-deploys on push to `master`; free SSL |
| Domain registrar | **Namecheap** | `camerongeisler.com` registered here |
| Booking | **Cal.com** | Embedded on math-tutoring page |

---

## Key Details

| Item | Value |
|---|---|
| Local folder | `Documents/website_personal` |
| Branch | `master` |
| Domain | `camerongeisler.com` |

---

## Daily Workflow

1. Open `Documents/website_personal` in VS Code
2. Edit files — pages in `src/pages/`, blog posts in `src/content/blog/`
3. Preview locally: `npm run dev` (opens at `localhost:4321`)
4. Commit and push: `git add -p && git commit -m "description" && git push`
5. Cloudflare Pages auto-deploys — live in ~1 minute

---

## What Was Built (Feb 2026)

- **Dark theme site** — full redesign from WordPress; styles in `public/styles/global.css`
- **Homepage** — hero, intro video, 3 featured testimonials (expandable by clicking name), "Read more" grid of 12 reviews
- **Math Tutoring page** — service details, Cal.com booking embed, student reviews carousel
- **My Math Notes page** — 3 big linked headings (Algebra & Precalculus, Calculus, Linear Algebra)
- **Blog** — 9 posts, dark 3-column card grid listing; 13 older posts archived in `src/content/blog/_archive/`
- **Nav** — Math Tutoring · My Math Notes · Blog Posts · About Me · Math Study Skills · Contact · YouTube
- **Links** — sky blue (`#7dd3fc`) with slide-in underline hover animation, optimized for dark background
