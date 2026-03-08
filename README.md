# yelon.pro ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=threedotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green) [![Live](https://img.shields.io/badge/Live-yelon.pro-00f0ff)](https://yelon.pro)

Personal portfolio website built with React, Three.js, and a healthy dose of easter eggs.

Live: https://yelon.pro

## Tech Stack

- **Frontend:** React 18, TypeScript, Three.js, GSAP, TailwindCSS
- **Build:** Vite 5
- **Deployment:** Docker + Nginx on OVH VPS
- **Contact API:** FastAPI + Resend (separate container)

## Features

- 3D particle background with Three.js
- Smooth scroll animations with GSAP
- Responsive design
- Contact form with reCAPTCHA v2
- Real-time PyPI download counter
- Client reviews section with infinite scroll (31 Fiverr testimonials)
- CI/CD pipeline with GitHub Actions (auto-deploy to VPS)

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

## Docker Deployment

```bash
# Build image
docker build -t sitecv .

# Run container
docker run -d --name sitecv -p 8080:80 sitecv
```

## CI/CD

GitHub Actions workflow automatically deploys to VPS on push to `master`.

Required secrets:
- `VPS_HOST` - VPS hostname
- `VPS_PORT` - SSH port
- `VPS_USER` - SSH username
- `VPS_SSH_KEY` - Private SSH key (ed25519, no passphrase)

## Project Structure

```
src/
  components/     # React components (Hero, About, Skills, Projects, Contact)
  hooks/          # Custom hooks (PyPI download fetcher)
  main.tsx        # Entry point with console easter egg
public/
  .well-known/    # security.txt
  *.html          # Easter egg pages
  *.txt           # robots.txt, humans.txt, llms.txt, etc.
```

## Contact

- Email: root@yelon.pro
- LinkedIn: wiktor-jelen
- GitHub: Akinzou

## License

MIT
