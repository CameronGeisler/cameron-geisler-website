# Website To-Do List

## Archived Blog Articles (Review for Future Use)

These 15 articles are saved in `src/content/blog/_archive/` — they were from the old WordPress site
but were not published on the new site. Review each one and decide whether to:
- **Publish** — move it out of `_archive/` into `src/content/blog/` (it will appear on the blog automatically)
- **Rewrite** — update the content and then publish
- **Discard** — delete if no longer relevant

To publish any of these, just move the file from `_archive/` into the parent `blog/` folder.

---

### Investing / Personal Finance (6 articles)
These are off-topic for a math tutoring site. Could be published as general life-skills content,
or discarded if you want to keep the blog focused on math/education.

| File | Topic |
|------|-------|
| `why-you-should-invest-to-build-wealth.md` | General case for investing |
| `why-you-should-start-investing-today.md` | Starting investing early |
| `dont-lose-money-the-first-rule-of-investing.md` | Capital preservation |
| `dont-start-investing-before-you-do-these-things.md` | Pre-investing checklist |
| `diversification-the-holy-grail-of-investing.md` | Diversification basics |
| `a-beginners-guide-to-choosing-a-brokerage.md` | Picking a brokerage |
| `wise-review-for-transferring-from-paypal-to-cad-bank.md` | Wise (money transfer app) review |

---

### Sleep & Health (4 articles)
Relevant to students (energy, focus, study habits). Could fit your audience well.

| File | Topic |
|------|-------|
| `the-transformative-power-of-quality-sleep-the-giant-list-of-benefits.md` | Benefits of sleep |
| `smartphones-and-sleep.md` | Phone usage and sleep quality |
| `the-power-of-naps-20-minutes-to-boost-your-energy.md` | Power napping |
| `the-best-way-to-wake-up-without-feeling-groggy.md` | Morning routines / sleep inertia |

---

### Productivity & Learning (4 articles)
Directly relevant to students — good candidates for publishing.

| File | Topic |
|------|-------|
| `action-creates-actions.md` | Motivation / taking action |
| `book-notes.md` | How to take notes from books |
| `the-downside-of-summaries-vs-long-form.md` | Summary vs. deep reading |
| `video-speed-controller.md` | Browser tool for watching videos faster |

---

## Other Future Tasks

- [ ] Add a custom 404 page (`src/pages/404.astro`)
- [ ] Clean up legacy WordPress folders in `public/images/` (`wp-file-manager-pro/`, `wp_encryption/`, `auto-install-free-ssl/`)
- [ ] Update the blog description in `src/pages/blog/index.astro` — currently says "investing, and more" but the blog is now tutoring-focused
- [ ] Point camerongeisler.com DNS to Netlify once ready to go live
