# yelon.dev ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=threedotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green) [![Live](https://img.shields.io/badge/Live-yelon.dev-00f0ff)](https://yelon.dev)

Personal portfolio website built with React, Three.js, and a healthy dose of easter eggs.

Live: https://yelon.dev

## Tech Stack

- **Frontend:** React 18, TypeScript, Three.js, GSAP, TailwindCSS
- **Build:** Vite 5
- **Deployment:** Vercel (static frontend + a Python serverless function)
- **Contact API:** FastAPI, deployed as a single Vercel serverless function (`api/index.py`)

## Features

- 3D particle background with Three.js
- Smooth scroll animations with GSAP
- Responsive design
- Contact form with reCAPTCHA v2, Upstash Redis rate limiting, and email delivery via Resend
- Real-time PyPI download counter
- Client reviews section with infinite scroll (32 Fiverr testimonials)
- Auto-deploy on every push to `master` via Vercel's GitHub integration (preview deployments on PRs, production on merge)

## Easter Eggs

The site contains 10 hidden easter eggs for curious visitors. They're scattered across various endpoints that developers, recruiters, or security researchers might check:

| # | Location | Name |
|---|----------|------|
| 0 | Browser Console | The Curious Developer |
| 1 | /humans.txt | The Credit Reader |
| 2 | /sitemap.xml | The SEO Archaeologist |
| 3 | /.well-known/security.txt | The Security Conscious |
| 4 | /llms.txt | The AI Whisperer |
| 5 | /site.webmanifest | The PWA Prospector |
| 6 | /admin | The Unauthorized Attempt |
| 7 | /wp-login | The WordPress Hunter |
| 8 | /.env | The Secrets Seeker |
| 9 | /teapot | The RFC Connoisseur |
| Bonus | /pgp-key.txt | The Crypto Enthusiast |

Each egg contains hints pointing to the next one. Finding all of them reveals secret codes.

> **Note:** `/admin`, `/wp-login`, `/teapot`, and `/about` are served extensionless (e.g. `/admin` → `admin.html`) via explicit `rewrites` in `vercel.json`, replacing the nginx `try_files` rule (see `nginx.conf`) the old VPS deployment used for the same thing.

## AI Prompt Injection

The robots.txt and llms.txt files contain intentional "prompt injections" for AI recruitment systems. This is a demonstration of understanding how modern AI crawlers work, not an actual attempt to manipulate results. It's also a conversation starter.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

The site is deployed on Vercel:

- `vercel.json` builds the frontend (`npm run build` → `dist/`) and rewrites `/api/*` to the
  serverless function in `api/index.py`, except `/api/pepy/*`, which is proxied straight to
  `pepy.tech` for the PyPI download counter (avoids a CORS request from the browser).
- Vercel's GitHub App creates a preview deployment on every PR and deploys to production on
  every push to `master` - there's no separate GitHub Actions workflow.
- `yelon.pro` and `www.yelon.pro` 301-redirect to `yelon.dev` (also configured in
  `vercel.json`, via host-matching `redirects`), from the earlier `yelon.pro` domain.

Required environment variables (Vercel project settings → Environment Variables):
- `RESEND_API_KEY` - Resend API key used to send contact-form emails
- `RECAPTCHA_SECRET_KEY` - classic reCAPTCHA v2 secret key (matches the site key in `Contact.tsx`)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST credentials, used
  to rate-limit contact-form submissions per IP across serverless invocations

### Legacy VPS deployment (unused)

`Dockerfile`, `nginx.conf`, and `contact-api/` are left over from an earlier deployment on an
OVH VPS (Docker + nginx, with the contact API as a separate container) and are no longer part
of the live site. They still reference the old `yelon.pro` domain and aren't kept in sync with
`api/index.py`.

## Project Structure

```
src/
  components/     # React components (Hero, About, Skills, Projects, Contact)
  content/        # profile.ts / schema.ts - the copy the app and the /about page both read
  hooks/          # Custom hooks (PyPI download fetcher)
  main.tsx        # Entry point with console easter egg
api/
  index.py        # Vercel serverless function backing the contact form
public/
  .well-known/    # security.txt
  *.html          # Easter egg pages
  *.txt           # robots.txt, humans.txt, llms.txt, etc.
vite-plugins/     # Build-time plugins (SEO snapshot, static /about page)
```

## Contact

- Email: root@yelon.dev
- LinkedIn: wiktor-jelen
- GitHub: Akinzou

## License

MIT
