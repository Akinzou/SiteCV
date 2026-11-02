/**
 * Single source of truth for every piece of factual copy on the site.
 *
 * Two consumers read this file:
 *   1. the React components (client render)
 *   2. the `seoSnapshot` Vite plugin (build-time HTML baked into #root)
 *
 * Because both read the same data, the version a crawler sees and the version
 * a human sees cannot drift apart. Change copy here, not in the components.
 */

import { reviewStats } from './reviews'

export const identity = {
  name: 'Wiktor Jeleń',
  role: 'Backend & Platform Engineer',
  statement:
    'I design and build backend systems, infrastructure and production-grade platforms.',
  /**
   * First person, but the name and the job title stay inside one sentence.
   * "I'm X, a Y based in Z" is still an apposition an entity extractor can
   * read, which "I design and build things" on its own is not.
   */
  definition:
    "I'm Wiktor Jeleń, a backend and platform engineer based in Cracow, Poland. I build multi-tenant production systems, infrastructure and security-critical backends, and I wrote PythonMetaTrader5, an open-source library with over 43,000 PyPI downloads.",
  location: 'Cracow, Poland',
  email: 'root@yelon.dev',
  phone: '+48 576 706 766',
  site: 'https://yelon.dev',
  github: 'https://github.com/Akinzou',
  linkedin: 'https://www.linkedin.com/in/yelon/',
}

/**
 * Every public account that is unambiguously this person.
 *
 * Feeds schema.org `sameAs` and the visible link list on /about. Two rules:
 * each entry is a *profile* of the person (a project page identifies a project,
 * not its author), and each one should eventually link back here — a search
 * engine merges two accounts into one entity when both ends agree, and treats
 * a one-way claim as something the site says about itself.
 */
export const profiles = [
  { label: 'GitHub', handle: '@Akinzou', href: 'https://github.com/Akinzou' },
  {
    label: 'LinkedIn',
    handle: 'yelon',
    href: 'https://www.linkedin.com/in/yelon/',
  },
  { label: 'PyPI', handle: 'Akinzou', href: 'https://pypi.org/user/Akinzou/' },
  { label: 'Fiverr', handle: 'akinzouent', href: 'https://www.fiverr.com/akinzouent' },
]

/**
 * Short answers to the questions someone actually types about a person.
 *
 * Written to be liftable: every answer opens with the full name instead of a
 * pronoun and survives being quoted on its own, away from the question. That is
 * the shape an AI Overview or a chat assistant can reuse; a paragraph that
 * starts with "He also..." is not.
 */
export const qa: { question: string; answer: string }[] = [
  {
    question: 'Who is Wiktor Jeleń?',
    answer:
      'Wiktor Jeleń is a backend and platform engineer based in Cracow, Poland. He builds multi-tenant production systems, infrastructure and security-critical backends, and is the author of PythonMetaTrader5, an open-source order-execution library with more than 43,000 downloads on PyPI.',
  },
  {
    question: 'What does Wiktor Jeleń work on?',
    answer:
      'Wiktor Jeleń works across four areas: backend systems (TypeScript, NestJS, Python, FastAPI, PostgreSQL), platform and infrastructure (Linux, Docker, Nginx, GitHub Actions, AWS, CI/CD), system architecture (multi-tenant isolation, workflow orchestration, failure modes, integration testing) and AI integration (multi-provider LLM layers, Model Context Protocol, evaluation harnesses).',
  },
  {
    question: 'Where is Wiktor Jeleń based?',
    answer:
      'Wiktor Jeleń is based in Cracow, Poland, and is an EU citizen. He works remotely with clients in Europe, North America and Asia, and has run hardware R&D directly with a team in Shenzhen, China.',
  },
  {
    question: 'What is PythonMetaTrader5?',
    answer:
      'PythonMetaTrader5 is an open-source Python library written by Wiktor Jeleń that wraps the MetaTrader 5 terminal API for algorithmic trading. It normalizes order placement, handles the full set of broker return codes and adds the safeguards the native API leaves out, so a strategy can run against a live account. It has passed 43,000 downloads on PyPI.',
  },
  {
    question: 'Does Wiktor Jeleń take client work?',
    answer:
      `Yes. Alongside software and infrastructure work, Wiktor Jeleń takes independent consulting projects in embedded Linux, Armbian, Klipper, Marlin and 3D-printer hardware. That track has ${reviewStats.total} public reviews since 2022, ${reviewStats.fiveStar} of them at five stars, from clients in ${reviewStats.countriesWord} countries, all readable on his public Fiverr profile.`,
  },
  {
    question: 'Why is the site called Yelon?',
    answer:
      '"Jeleń" is the Polish word for deer, and "Yelon" is roughly how it sounds to an English speaker. Wiktor Jeleń uses Yelon as an online handle and as the name of this site, yelon.dev.',
  },
]

export type Accent = 'blue' | 'purple' | 'green' | 'pink' | 'yellow'

/** The four things worth knowing in the first five seconds. */
export const focusAreas: { title: string; accent: Accent; items: string[] }[] = [
  {
    title: 'Backend Systems',
    accent: 'blue',
    items: ['TypeScript', 'NestJS', 'Python', 'FastAPI', 'PostgreSQL', 'REST / OpenAPI'],
  },
  {
    title: 'Platform & Infrastructure',
    accent: 'purple',
    items: ['Linux', 'Docker', 'Nginx', 'GitHub Actions', 'AWS', 'CI/CD'],
  },
  {
    title: 'System Architecture',
    accent: 'green',
    items: [
      'Multi-tenant isolation',
      'Workflow orchestration',
      'Failure modes',
      'Integration & e2e testing',
    ],
  },
  {
    title: 'AI Integration',
    accent: 'pink',
    items: [
      'Multi-provider LLM layer',
      'Model Context Protocol',
      'Evaluation harnesses',
      'Media & speech pipelines',
    ],
  },
]

export type Project = {
  name: string
  tagline: string
  accent: Accent
  featured: boolean
  problem: string
  solution: string
  stack: string[]
  metric: string
  links: { label: string; href: string }[]
  pypiPackage?: string
}

/**
 * Projects are written as case studies — problem, solution, stack, links —
 * because "Project X / Python, Docker" tells a reader nothing.
 */
export const projects: Project[] = [
  {
    name: 'KONIK',
    tagline: 'Multi-tenant automation platform · Lead backend developer',
    accent: 'purple',
    featured: true,
    problem:
      'An automation platform needs to coordinate external services and AI workflows while keeping each tenant’s data isolated.',
    solution:
      'Designed the TypeScript/NestJS backend with Temporal workflow orchestration and PostgreSQL row-level security. Built isolation-leak tests in CI, external-service integrations and a multi-provider AI layer with an evaluation harness.',
    stack: ['TypeScript', 'NestJS', 'Temporal.io', 'PostgreSQL RLS', 'GitHub Actions'],
    metric: '03–08.2026 · Architecture & delivery',
    links: [],
  },
  {
    name: 'PythonMetaTrader5',
    tagline: 'Open-source order-execution library',
    accent: 'blue',
    featured: true,
    problem:
      'The native Python API for MetaTrader 5 is low-level: raw retcodes, inconsistent data shapes, and no safeguards standing between a strategy and a live account.',
    solution:
      'A Python layer over MetaTrader 5 built for algorithmic trading: order normalization, full retcode handling and safeguards that keep execution stable against real capital.',
    stack: ['Python', 'MetaTrader 5 API', 'PyPI'],
    metric: '43,000+ PyPI downloads',
    links: [
      { label: 'GitHub', href: 'https://github.com/Akinzou/MetaTrader5-Python' },
      { label: 'PyPI', href: 'https://pypi.org/project/PythonMetaTrader5/' },
    ],
    pypiPackage: 'pythonmetatrader5',
  },
  /*
   * Four systems from the 09–11.2026 contract. Under NDA: named by function,
   * never by the client, its industry, its suppliers or internal codenames.
   */
  {
    name: "Supplier Integration Platform",
    tagline: "B2B e-commerce client (under NDA) · 2026",
    accent: "green",
    featured: true,
    problem:
      "A B2B e-commerce business buys from over a hundred suppliers, and each one exposes prices and stock differently: B2B panels on WooCommerce, PrestaShop, Shopify, Odoo and other platforms, file feeds, or nothing but an email inbox. And the ERP imports the result every hour, so one broken scraper can quietly shrink the catalogue.",
    solution:
      "Split the integration service out of a legacy system and grew it from 59 to 109 connected suppliers (89 domestic, 20 EU) covering 73,000+ products — I wrote 197 of its 207 commits. The platform runs two branches. Automatic suppliers: Playwright scrapers and API clients pull purchase prices and stock straight from their B2B panels. Manual suppliers, who have no panel: the system emails them through the Gmail API asking for current prices and stock, on a schedule built to protect the relationship — a person answers on the other side, so requests are paced instead of fired on every sync. Their replies come in whatever form that person chooses — figures typed in the email body, an XLSX or PDF attachment, or a photo of a document read with OCR — and an LLM turns each one into the same structure, which the customer-service team approves in an admin panel before it reaches the catalogue. Catalogues are published as SHA-256-checked versions with an atomic swap, and a drop of more than 20% blocks publication. CI audits secrets and system boundaries; deploys switch atomically and roll back automatically; 20 ADRs record the decisions.",
    stack: ["Node.js 24", "Express 5", "MongoDB", "Playwright", "OpenAI API", "Gmail API", "GitHub Actions"],
    metric: "59 → 109 suppliers · 830 tests · in production",
    links: [],
  },
  {
    name: "RFQ Automation Service",
    tagline: "B2B e-commerce client (under NDA) · 2026",
    accent: "blue",
    featured: true,
    problem:
      "The sales team sourced quotes by hand: read the customer request, guess which suppliers carry each item, write to each of them, then compare offers arriving in different units and currencies.",
    solution:
      "Designed and built from scratch in 8 days. The service takes a request from a salesperson by email, extracts the line items with an LLM into a strict JSON schema, and picks up to 25 suppliers from four data sources with a stated reason for each choice — 11 of 12 correct picks when replayed against historical quotes. It drafts the requests for approval and then handles the supplier replies by email, which arrive in whatever shape each supplier prefers: stock and price written in the body of the email, an XLSX attachment, or a photo of a document, which goes through OCR. Every reply is normalized to the same structure, offers are compared in net price per unit, and quantities are split between suppliers. Clean Architecture, DDD, ports & adapters and the Result pattern, with layer boundaries enforced in CI by dependency-cruiser. Security follows OWASP ASVS L2 and WSTG: 23 of 23 scenarios passed, Semgrep and secret scanning block merges, the recipient allowlist is enforced in code and senders are verified with SPF/DKIM.",
    stack: ["Node.js 24 (ESM)", "Clean Architecture / DDD", "TDD", "LLM structured outputs", "Semgrep", "dependency-cruiser"],
    metric: "Built in 8 days · 445 tests · in production",
    links: [],
  },
  {
    name: "Marketing Content Generator",
    tagline: "B2B e-commerce client (under NDA) · 2026",
    accent: "pink",
    featured: false,
    problem:
      "Marketing had to publish a steady stream of social posts for a large, constantly changing catalogue, across several language markets, without promoting products that are out of stock or making claims EU consumer law forbids.",
    solution:
      "Built from scratch in 5 days and running in production, with a full Shoper integration: the tool reads the live catalogue — stock, bestsellers, promotions, product rotation — and plans a month of Facebook and Instagram posts from it. Graphics and videos cost nothing to produce: they are composed from templates, with product photos cut out by a background-removal model running locally on ONNX (BiRefNet), in four image formats plus a 10-second video per post. When a product is discounted, the layout adds a sale badge, the percentage off and the lowest price from the previous 30 days, as the Omnibus Directive requires. The OpenAI API is used only for text: Polish copy, then translation into 15 languages with product and market context, because a plain machine translator kept getting technical terms wrong; prices follow each region’s currency. Copy is also checked against Directive 2024/825 on green claims, and a batch generator handles up to 200 products per run. Jobs run through a pg-boss queue; CI/CD with automatic rollback and Google sign-in restricted to the company domain; 132 commits and 60 PRs.",
    stack: ["TypeScript", "Fastify 5", "React 19", "PostgreSQL 17 / Drizzle", "pg-boss", "Shoper API", "OpenAI API", "ffmpeg", "ONNX Runtime"],
    metric: "Built in 5 days · ~390 tests · in production",
    links: [],
  },
  {
    name: "PIM & Dropshipping Takeover",
    tagline: "B2B e-commerce client (under NDA) · 2026",
    accent: "yellow",
    featured: false,
    problem:
      "A product-information and dropshipping system inherited from a previous team, with no delivery pipeline, secrets committed to the code and margins that did not add up.",
    solution:
      "Reviewed the code, wrote down the technical debt, then shipped 144 commits and closed about 80 tasks in 3 days. Closed a critical hole — a public endpoint that issued an administrator token without logging in — rotated the JWT keys, removed hard-coded secrets and stopped an API key leaking through error messages. Fixed margin calculation (it was computed from the gross price), added protection against ordering twice from a supplier, live exchange rates from the national bank and daily order limits. Built 12 supplier integrations from zero (~1.34M offers), with product cards created automatically from Open Icecat. Built continuous delivery from zero: GitHub Actions, a least-privilege deploy account, automatic rollback, a pre-push test gate and worker health checks.",
    stack: ["Laravel 12", "Angular 21", "MySQL", "Redis", "Docker", "GitHub Actions"],
    metric: "0 → 12 suppliers · ~1.34M offers · in production",
    links: [],
  },
  {
    name: 'TradeLockerBot',
    tagline: 'Trading automation system',
    accent: 'purple',
    featured: true,
    problem:
      'TradingView can only fire a plain, unauthenticated HTTP webhook. Anything listening on a guessable URL is eventually found by a scanner — and this endpoint opens positions on a live account.',
    solution:
      'FastAPI service translating TradingView alerts into TradeLocker orders, with the webhook path generated as a random secret that is printed once at startup and never again. Shipped as a Docker image built by GitHub Actions.',
    stack: ['Python', 'FastAPI', 'uvicorn', 'Docker', 'GitHub Actions'],
    metric: 'Docker image · CI/CD',
    links: [{ label: 'GitHub', href: 'https://github.com/Akinzou/TradeLockerBot' }],
  },
  {
    name: 'Anatomy Project',
    tagline: 'Medical University of Silesia platform',
    accent: 'green',
    featured: false,
    problem:
      'An anatomy teaching platform had to serve a whole faculty at once, authenticate against the university directory, and stay up through exam-day traffic spikes.',
    solution:
      'NestJS 11 backend for 450+ concurrent users: LDAP/Active Directory authentication, JWT authorization, and an OpenAPI-documented REST API with pagination and filtering pushed down to the database.',
    stack: ['NestJS', 'TypeORM', 'MySQL', 'LDAP', 'JWT', 'Jest'],
    metric: '450+ concurrent users',
    links: [],
  },
  {
    name: 'GEEETECH A10M Enhancement',
    tagline: 'Hardware R&D, Shenzhen',
    accent: 'pink',
    featured: false,
    problem:
      'The A10M printer had structural and motion-control weaknesses that firmware tuning alone could not compensate for.',
    solution:
      'Structural redesign of printer components in Fusion 360, combined with Klipper firmware optimization and improved stepper motor control.',
    stack: ['Fusion 360', 'Klipper', 'C++', 'CAD'],
    metric: 'Shenzhen R&D',
    links: [],
  },
  {
    name: 'IoT Pipe Monitoring',
    tagline: 'ThingsBoard integration for the heating industry',
    accent: 'yellow',
    featured: false,
    problem:
      'District-heating operators find out about pipe degradation after a failure. The impedance data existed, but never reached anyone who could act on it.',
    solution:
      'Impedance monitoring built on ThingsBoard: embedded C++ firmware feeding a web interface, with AWS-based alerting on threshold breaches.',
    stack: ['ThingsBoard', 'C++', 'AWS', 'Embedded'],
    metric: 'AWS alerting',
    links: [],
  },
]

/** Dates and responsibilities from the existing CV; keep the public timeline concise. */
export const experience = [
  {
    /**
     * Under NDA: no client name, no industry, no supplier names, no internal
     * system names — anywhere (site, PDF, llms.txt). Describe systems by function.
     */
    period: '09.2026 - 11.2026', role: 'Backend & Automation Engineer (contract)',
    company: 'B2B e-commerce automation (under NDA)', location: 'Poland, Remote',
    highlights: [
      'Extended a supplier-catalogue integration platform from 59 to 109 supplier integrations covering 73,000+ products: automatic suppliers scraped from their B2B panels (WooCommerce, PrestaShop, Shopify, Odoo and others) with Playwright or read through APIs, and manual suppliers emailed for current prices and stock on a schedule that protects the relationship, whose replies (email text, XLSX, PDF or a photo read with OCR) are parsed by an LLM and approved by the team in an admin panel. Catalogues are published as SHA-256-checked versions with atomic swaps, and a drop of more than 20% blocks publication; 830 automated tests.',
      'Designed and built from scratch in 8 days an RFQ automation service: it takes a request from the sales team by email, extracts line items with an LLM into a strict JSON schema, matches up to 25 suppliers from four data sources and prepares the requests; supplier replies with stock and price — written in the email body, sent as XLSX or as a photo read with OCR — are normalized, compared per unit and quantities split between suppliers. Clean Architecture, DDD, ports & adapters and TDD with layers enforced in CI; 445 tests including golden tests on real requests and 13 prompt-injection scenarios against the live model; security to OWASP ASVS L2 / WSTG with 23 of 23 scenarios passed, Semgrep and secret scanning gating every merge.',
      'Built from scratch in 5 days a marketing-content generator now in production (TypeScript, Fastify, React, PostgreSQL, pg-boss) with a full Shoper integration: it plans a month of posts from the live catalogue and composes images in four formats and a 10-second video from templates at no generation cost, adding a sale badge, the discount and the 30-day lowest price (Omnibus) for discounted products; the OpenAI API writes the Polish copy and translates it into 15 languages with product context; ~390 tests, CI/CD with automatic rollback.',
      'Took over a legacy PIM / dropshipping system (Laravel, Angular, MySQL, Redis, Docker): reviewed the code and documented the technical debt, closed a critical vulnerability where a public endpoint issued an admin token without login, rotated JWT keys, removed hard-coded secrets, stopped an API key leaking through error messages, fixed margin calculation, added protection against duplicate supplier orders, and built 12 supplier integrations from zero (~1.34M offers). Set up continuous delivery from scratch with a least-privilege deploy account and automatic rollback.',
      'All four systems run in production, with 1,600+ automated tests, CI/CD with automatic rollback, and secret scanning and Semgrep gates on every merge.',
    ],
  },
  {
    period: '03.2026 - 08.2026', role: 'Lead Backend Developer',
    company: 'KonikSystems · KONIK', location: 'Remote',
    highlights: [
      'Lead developer and architect of a multi-tenant automation platform with a TypeScript/NestJS backend, Temporal.io orchestration and a React dashboard; primary contributor to the codebase.',
      'Designed tenant isolation in PostgreSQL using row-level security, with automated isolation-leak tests running in CI.',
      'Built the test and delivery pipeline: unit and integration tests, Temporal TestWorkflowEnvironment, Playwright, and a multi-stage GitHub Actions CI/CD.',
      'Designed the integration layer: Stripe, Google Ads/Analytics, Meta API, social publishing, scraping and enrichment, and a video processing pipeline.',
      'Built the LLM and generative-AI integration layer — Claude, GPT and Gemini APIs, MCP, Flux/LoRA and Whisper — together with the evaluation harness for AI output quality.',
    ],
  },
  {
    period: '09.2025 - 02.2026', role: 'Backend Engineer',
    company: 'Randlab Software · Anatomy Project', location: 'Remote',
    highlights: [
      'Designed and deployed a scalable backend (NestJS 11, TypeORM, MySQL 8) for 450+ concurrent users of a Medical University of Silesia platform.',
      'Integrated authentication with the university Active Directory (LDAP) and JWT-based authorization; hardened the API with OWASP Top 10 audits, strict input validation (Zod) and data sanitization.',
      'Designed a REST API with a Swagger/OpenAPI contract — pagination, filtering and sorting pushed down to the database rather than into application memory — plus unit and integration tests in Jest.',
      'Set up production environments (Ubuntu, Nginx reverse proxy, SSL, PM2) and CI/CD pipelines in GitHub Actions.',
    ],
  },
  {
    period: '08.2024 - 08.2025', role: 'R&D Systems Engineer',
    company: 'GEEETECH', location: 'Remote · Shenzhen R&D team',
    highlights: [
      'Owned system integration and Klipper firmware optimization for the Shenzhen R&D hub, working fully remotely and self-directed.',
      'Redesigned structural components of the A10M printer in Fusion 360 and optimized stepper motor control.',
      'Coordinated technical requirements between European stakeholders and the Shenzhen R&D team.',
    ],
  },
  {
    period: '04.2023 - 07.2024', role: 'Sales Systems Consultant',
    company: 'Randlab Software (Polsat Plus Group)', location: 'Remote',
    highlights: [
      'Automated client documentation generation and configured complex sales offers for POS, telemarketing and mobile sales channels.',
    ],
  },
  {
    period: '09.2022 - 03.2023', role: 'Embedded / ThingsBoard Specialist',
    company: 'Randlab Software', location: 'Nowy Sącz, Poland',
    highlights: [
      'Built a pipe impedance monitoring system for the heating industry on ThingsBoard.',
      'Integrated hardware (C++) with web interfaces and implemented AWS-based alerting.',
    ],
  },
]

/** "MM.YYYY" at the start of an `experience` period, as epoch ms. */
const periodStart = (period: string) => {
  const [month, year] = period.split(' - ')[0].split('.').map(Number)
  return new Date(year, month - 1).getTime()
}
const careerStart = Math.min(...experience.map((entry) => periodStart(entry.period)))
/**
 * Tenure since the first job, to one decimal and floored (3.86 → 3.8) so it
 * never claims more than has actually passed. Evaluated when the bundle loads,
 * so every visit recomputes it — nothing to update by hand.
 */
const yearsOfExperience = Math.floor((Date.now() - careerStart) / (365.25 * 24 * 60 * 60 * 1000) * 10) / 10

export type Stat = {
  label: string
  value: number
  suffix: string
  accent: Accent
  /** Decimal places to show; the count-up animation respects it too. */
  decimals?: number
  /** When set, the tile shows the live pepy.tech count and links to it. */
  pypiPackage?: string
}

/**
 * Headline numbers under the About intro. Deliberately just these three —
 * the two hard figures that survived the CV, plus tenure computed from the
 * first `experience` entry so it never goes stale.
 */
export const stats: Stat[] = [
  { label: 'PyPI Downloads', value: 43000, suffix: '+', accent: 'blue', pypiPackage: 'pythonmetatrader5' },
  { label: 'Concurrent Users', value: 450, suffix: '+', accent: 'purple' },
  { label: 'Years Commercial Experience', value: yearsOfExperience, suffix: '', accent: 'green', decimals: 1 },
]

/** Text-only logo strip; most recent first. */
export const workedWith: { name: string; detail: string; accent: Accent }[] = [
  { name: 'RANDLAB', detail: 'Software House', accent: 'green' },
  { name: 'CTS AUDIO', detail: 'Audio Systems', accent: 'blue' },
  { name: 'GEEETECH', detail: 'Shenzhen R&D', accent: 'blue' },
  { name: 'POLSAT PLUS', detail: 'Cyfrowy Polsat Group', accent: 'purple' },
  { name: 'WSB-NLU', detail: 'National Louis University', accent: 'green' },
]

export const skillGroups: { title: string; accent: Accent; items: string[] }[] = [
  {
    title: 'Backend & Data',
    accent: 'blue',
    items: [
      'TypeScript',
      'Node.js',
      'NestJS',
      'Temporal.io',
      'PostgreSQL',
      'Redis',
      'MySQL',
      'Python',
      'FastAPI',
    ],
  },
  {
    title: 'Platform & Infrastructure',
    accent: 'purple',
    items: ['Linux', 'Docker', 'GitHub Actions', 'Nginx', 'AWS', 'Hetzner', 'CI/CD'],
  },
  {
    title: 'Security',
    accent: 'green',
    items: ['PostgreSQL RLS', 'IAM', 'LDAP / AD', 'JWT', 'OWASP Top 10', 'TLS'],
  },
  {
    title: 'AI & Automation',
    accent: 'pink',
    items: [
      'Claude / OpenAI / Gemini APIs',
      'Model Context Protocol',
      'Evaluation harnesses',
      'Flux / LoRA',
      'Whisper',
    ],
  },
  {
    title: 'Additional',
    accent: 'yellow',
    items: ['React', 'C++', 'Embedded systems', 'Fusion 360'],
  },
]

/**
 * Verifiable third-party proof, which is the rarest thing on a portfolio.
 * Framed as paid client work rather than as a marketplace profile: embedded
 * Linux, firmware and hardware are a second area of depth standing next to the
 * software track, not an appendix to it — hence "software and infrastructure
 * work" rather than "the backend work", which narrowed it unnecessarily. The
 * platform is named once, in the sentence that offers verification.
 *
 * Counts come from `reviewStats`, computed off the review list in
 * ./reviews.ts, so this section and the feed on the page cannot disagree.
 */
export const clientWork = {
  platform: 'Fiverr',
  profileUrl: 'https://www.fiverr.com/akinzouent',
  headline: 'Paid Client Work — Embedded Linux, Firmware & Hardware',
  body:
    `Alongside my software and infrastructure work, I take on independent technical consulting projects involving embedded Linux, Armbian, Klipper, Marlin and 3D-printer hardware. ${reviewStats.total} public reviews since 2022, ${reviewStats.fiveStar} of them at five stars, from clients in ${reviewStats.countriesWord} countries. Every review is publicly verifiable on Fiverr.`,
  stats: [
    { label: 'Public reviews', value: String(reviewStats.total) },
    { label: 'Five-star', value: `${reviewStats.fiveStar} of ${reviewStats.total}` },
    { label: 'Countries', value: String(reviewStats.countries) },
  ],
  /** Quoted verbatim; each one is on the public profile. */
  quotes: [
    {
      text: 'This guy knows what he is doing. Helped me get my modified ender 3 printing again. I have been scratching my head on the problems with it for months and he helped me get it working in a couple days.',
      author: 'ccrank85',
      country: 'US',
    },
    {
      text: 'Was very helpful and willing to help immediately. Was also very flexible in helping with the issue we were in vastly different time zones. 10/10 would reach out for consulting again.',
      author: 'skilnotfound',
      country: 'US',
    },
  ],
}

export const education = [
  {
    period: '10.2024 – Present',
    degree: 'B.Eng. in Computer Science, Cybersecurity — in progress (part-time)',
    school: 'WSB-National Louis University',
    location: 'Nowy Sącz, Poland',
  },
  {
    period: '2019 – 2024',
    degree: 'Mechatronics Technician',
    school: 'Technical School of Electrical Engineering and Mechanics',
    location: 'Nowy Sącz, Poland',
  },
]

/** Served from public/; regenerate with `npm run cv:pdf` after changing src/content/cv.ts or anything it reads here. */
export const cvPdf = { href: '/Wiktor_Jelen_CV.pdf', label: 'Download CV (PDF)' }

/**
 * "How I work", stated as things that were actually built rather than as a
 * philosophy. Every line is checkable against the experience and projects
 * above; no claim without a mechanism behind it.
 */
export const howIWork = {
  intro:
    'System-first: invariants and failure modes are decided before implementation, then held in place by tests and hard gates rather than by convention. In practice:',
  points: [
    'Tenant isolation enforced in PostgreSQL row-level security, with isolation-leak tests that fail the CI build.',
    'Long-running processes orchestrated as Temporal.io workflows and tested in TestWorkflowEnvironment.',
    '1,600+ automated tests and CI/CD with automatic rollback across four production systems in my last engagement.',
    'Security verified, not asserted: OWASP ASVS L2 / WSTG with 23 of 23 scenarios passed, 13 prompt-injection scenarios run against the live model, Semgrep and secret scanning blocking merges.',
    'Data that others depend on published as SHA-256-checked versions with an atomic swap; a catalogue drop of more than 20% blocks publication.',
    'University Active Directory authentication behind a platform serving 450+ concurrent users.',
  ],
  remote: 'Fully remote, cross-cultural collaboration (EU–China).',
  tags: ['Temporal Orchestration', 'PostgreSQL RLS', 'CI/CD with Rollback', 'OWASP ASVS L2', 'Integration & e2e Testing', 'Multi-provider AI'],
}

export const languages = [
  'Polish — native',
  'English — working proficiency (EU–China R&D collaboration, international clients)',
]

export const research = {
  title: 'Interests & R&D',
  body:
    'I explore evolutionary computation for algorithmic trading: generating strategy populations in StrategyQuant X, then stress-testing their robustness before live execution.',
  tags: [
    'Machine Learning',
    'Genetic Algorithms',
    'Evolutionary Computation',
    'StrategyQuant X',
    'Algorithmic Trading',
  ],
}
