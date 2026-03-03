# Cameron's Website Setup Log

**Last updated:** March 2, 2026

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

## Domain Switch (March 2, 2026)

- Cloudflare DNS transfer completed — nameservers at Namecheap updated to:
  - `holly.ns.cloudflare.com`
  - `marek.ns.cloudflare.com`
- DNS propagation in progress (typically 1–2 hours after nameserver change)
- **After propagation:** go to Cloudflare Pages → cameron-geisler-website → Custom domains → add `camerongeisler.com` to complete the switch
- Cloudflare now manages DNS for the domain (moved off Namecheap BasicDNS)

---

## Old WordPress Site (EasyWP — Keep for Now)

The old WordPress site is still live on EasyWP (Namecheap). Even after switching the domain to Cloudflare,
the old site is still accessible and manageable — the domain is just a label.

**To access the old WordPress admin after switching domains:**
1. Log into EasyWP at **app.easywp.com**
2. Your old site is still listed there — click "WP Admin" to access it directly
3. EasyWP gives every site a free subdomain (e.g. `abc123.easywp.com`) that always works regardless of domain

**Credentials needed:**
- Namecheap login (for app.easywp.com)
- WordPress username + password for the old site
- The `*.easywp.com` temporary URL (find it in the EasyWP dashboard under site settings)

---

## What Was Built (Feb 2026)

- **Dark theme site** — full redesign from WordPress; styles in `public/styles/global.css`
- **Homepage** — hero, intro video, 3 featured testimonials (expandable by clicking name), "Read more" grid of 12 reviews
- **Math Tutoring page** — service details, Cal.com booking embed, student reviews carousel
- **My Math Notes page** — 3 big linked headings (Algebra & Precalculus, Calculus, Linear Algebra)
- **Blog** — 9 posts, dark 3-column card grid listing; 13 older posts archived in `src/content/blog/_archive/`
- **Nav** — Math Tutoring · My Math Notes · Blog Posts · About Me · Math Study Skills · Contact · YouTube
- **Links** — sky blue (`#7dd3fc`) with slide-in underline hover animation, optimized for dark background
- **Pre-launch fixes** — rebuilt Math Study Skills page (clean link list), fixed old `camerongeisler.com` links in 4 blog posts, created custom 404 page (`/404`), created private Recommended Textbooks page (`/my-recommended-textbooks`)
- **Contact page** — removed WordPress comment artifacts, fixed tutoring form link to relative URL
