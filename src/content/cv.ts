/**
 * Content for the one-page ATS CV (public/Wiktor_Jelen_CV.pdf).
 *
 * Kept out of profile.ts so the CV-only prose never ships in the client bundle,
 * but every fact that also appears on the site — name, contact, dates, titles,
 * companies, education, languages, the PyPI figure — is imported from
 * profile.ts, never retyped. That is what keeps the PDF and the site from
 * drifting. Only the numbered bullets live here.
 *
 * Rendered by scripts/build-cv.mjs (`npm run cv:pdf`); the PDF is committed
 * because the hosting build has no Chrome.
 *
 * Rules for this document: plain text an ATS can parse, a functional title,
 * no easter eggs, no school competitions, and the last engagement described
 * NDA-safe (no client, industry, supplier or internal system names).
 */

import { cvPdf, education, experience, identity, languages, projects, stats } from './profile'

const pypiProject = projects.find((project) => project.pypiPackage)!
const pypiStat = stats.find((stat) => stat.pypiPackage)!

export const cv = {
  name: identity.name,
  headline: 'Backend / Automation Engineer',
  contact: {
    location: identity.location,
    phone: identity.phone,
    email: identity.email,
    site: identity.site,
    linkedin: identity.linkedin,
    github: identity.github,
  },
  /** The first proof a reader sees, straight under the contact line. */
  proof: {
    label: `${pypiProject.name} — ${pypiStat.value.toLocaleString('en-US')}${pypiStat.suffix} PyPI downloads`,
    detail: 'author of an open-source order-execution library for MetaTrader 5',
    href: pypiProject.links.find((link) => link.label === 'PyPI')!.href,
  },
  summary:
    'Backend and automation engineer working in TypeScript, Node.js, NestJS, Python and SQL. I build integrations, workflow automation and LLM-backed services, held in place by automated tests (1,600+ in my last engagement), CI/CD with automatic rollback and security gates. AI-native development daily — Claude Code, OpenAI Codex, Antigravity.',
  pdfHref: identity.site + cvPdf.href,
}

/** Bullets per experience entry, keyed by its `period`. Fewer bullets = less weight; never fewer for a newer role. */
const bullets: Record<string, string[]> = {
  '09.2026 - 11.2026': [
    'Extended a supplier-catalogue integration platform from 59 to 109 supplier integrations (73,000+ products): B2B panel scraping with Playwright, APIs, and LLM extraction of emailed offers (PDF, XLSX) behind human approval. Versioned publishing with SHA-256 checks and a guard against a >20% catalogue drop; 830 tests.',
    'Designed and built from scratch in 8 days an RFQ automation service: LLM extraction to a strict JSON schema, supplier matching across 4 data sources, offer comparison. Clean Architecture, TDD, 445 tests incl. 13 prompt-injection scenarios against the live model; OWASP ASVS L2 / WSTG — 23 of 23 scenarios passed.',
    'Built from scratch in 5 days a multilingual marketing-content generator now in production (TypeScript, Fastify, React, PostgreSQL, job queue): copy, images and video from catalogue data, automated compliance checks, ~390 tests.',
    'Took over a legacy PIM / dropshipping system (Laravel, Angular, MySQL, Redis, Docker): closed a critical vulnerability (unauthenticated endpoint issuing an admin token), fixed margin calculation, extended supplier integrations from 6 to 12 (~1.34M offers) and set up CD with automatic rollback.',
  ],
  '03.2026 - 08.2026': [
    'Lead developer of a multi-tenant automation platform: TypeScript/NestJS backend, Temporal.io workflow orchestration, React dashboard.',
    'Designed tenant isolation with PostgreSQL row-level security, with isolation-leak tests enforced in CI; multi-stage GitHub Actions pipeline.',
    'Built the integration layer (Stripe, Google Ads/Analytics, Meta API) and a multi-provider LLM layer (Claude, GPT, Gemini, MCP) with an evaluation harness.',
  ],
  '09.2025 - 02.2026': [
    'Designed and deployed a NestJS 11 / MySQL backend for 450+ concurrent users of a Medical University of Silesia platform.',
    'University Active Directory (LDAP) authentication with JWT, OWASP Top 10 hardening, OpenAPI REST contract, Jest tests, GitHub Actions CI/CD.',
  ],
  '08.2024 - 08.2025': [
    'System integration, Klipper firmware optimization and component redesign; coordinated requirements between European stakeholders and the Shenzhen team.',
  ],
  '04.2023 - 07.2024': [
    'Automated client documentation generation and configured sales offers for POS, telemarketing and mobile channels.',
  ],
  '09.2022 - 03.2023': [
    'Pipe impedance monitoring on ThingsBoard: embedded C++ firmware, web interface and AWS alerting.',
  ],
}

export const cvExperience = experience.map((entry) => ({
  ...entry,
  period: entry.period.replace(' - ', ' – '),
  bullets: bullets[entry.period] ?? [],
}))

export const cvSkills: { label: string; items: string }[] = [
  { label: 'Backend', items: 'TypeScript, Node.js, NestJS, Express, Fastify, Python, FastAPI, PHP / Laravel, REST / OpenAPI' },
  { label: 'Data', items: 'PostgreSQL (row-level security), MySQL, MongoDB, Redis' },
  { label: 'Automation & AI', items: 'Temporal.io, Playwright, job queues, OpenAI / Claude / Gemini APIs, structured outputs, MCP, prompt-injection testing' },
  { label: 'Platform & security', items: 'Linux, Docker, Nginx, systemd, GitHub Actions CI/CD, OWASP ASVS / Top 10, Semgrep, LDAP / AD, JWT' },
  { label: 'Engineering practice', items: 'TDD, Clean Architecture / DDD, ADRs, Jest, Vitest, Playwright E2E' },
]

export const cvEducation = education

export const cvLanguages = languages
