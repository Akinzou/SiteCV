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
    "I'm Wiktor Jeleń, a backend and platform engineer based in Cracow, Poland. I build multi-tenant production systems, infrastructure and security-critical backends, and I wrote PythonMetaTrader5, an open-source library with over 42,000 PyPI downloads.",
  location: 'Cracow, Poland',
  email: 'root@yelon.pro',
  phone: '+48 576 706 766',
  site: 'https://yelon.pro',
  github: 'https://github.com/Akinzou',
  linkedin: 'https://www.linkedin.com/in/wiktor-jelen-8a658b293/',
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
    handle: 'wiktor-jelen',
    href: 'https://www.linkedin.com/in/wiktor-jelen-8a658b293/',
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
      'Wiktor Jeleń is a backend and platform engineer based in Cracow, Poland. He builds multi-tenant production systems, infrastructure and security-critical backends, and is the author of PythonMetaTrader5, an open-source order-execution library with more than 42,000 downloads on PyPI.',
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
      'PythonMetaTrader5 is an open-source Python library written by Wiktor Jeleń that wraps the MetaTrader 5 terminal API for algorithmic trading. It normalizes order placement, handles the full set of broker return codes and adds the safeguards the native API leaves out, so a strategy can run against a live account. It has passed 42,000 downloads on PyPI.',
  },
  {
    question: 'Does Wiktor Jeleń take client work?',
    answer:
      'Yes. Alongside software and infrastructure work, Wiktor Jeleń takes independent consulting projects in embedded Linux, Armbian, Klipper, Marlin and 3D-printer hardware. That track has 31 public reviews since 2022, 30 of them at five stars, from clients in nine countries, all readable on his public Fiverr profile.',
  },
  {
    question: 'Why is the site called Yelon?',
    answer:
      '"Jeleń" is the Polish word for deer, and "Yelon" is roughly how it sounds to an English speaker. Wiktor Jeleń uses Yelon as an online handle and as the name of this site, yelon.pro.',
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
    name: 'PythonMetaTrader5',
    tagline: 'Open-source order-execution library',
    accent: 'blue',
    featured: true,
    problem:
      'The native Python API for MetaTrader 5 is low-level: raw retcodes, inconsistent data shapes, and no safeguards standing between a strategy and a live account.',
    solution:
      'A Python layer over MetaTrader 5 built for algorithmic trading: order normalization, full retcode handling and safeguards that keep execution stable against real capital.',
    stack: ['Python', 'MetaTrader 5 API', 'PyPI'],
    metric: '42,000+ PyPI downloads',
    links: [
      { label: 'GitHub', href: 'https://github.com/Akinzou/MetaTrader5-Python' },
      { label: 'PyPI', href: 'https://pypi.org/project/PythonMetaTrader5/' },
    ],
    pypiPackage: 'pythonmetatrader5',
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
 * Counts are derived from the review list rendered in About.tsx — 30 of 31 at
 * five stars, nine countries, 2022 through 2026 — so the numbers below and the
 * feed on the page cannot disagree.
 */
export const clientWork = {
  platform: 'Fiverr',
  profileUrl: 'https://www.fiverr.com/akinzouent',
  headline: 'Paid Client Work — Embedded Linux, Firmware & Hardware',
  body:
    'Alongside my software and infrastructure work, I take on independent technical consulting projects involving embedded Linux, Armbian, Klipper, Marlin and 3D-printer hardware. 31 public reviews since 2022, 30 of them at five stars, from clients in nine countries. Every review is publicly verifiable on Fiverr.',
  stats: [
    { label: 'Public reviews', value: '31' },
    { label: 'Five-star', value: '30 of 31' },
    { label: 'Countries', value: '9' },
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
    degree: 'B.Eng. in Computer Science, Cybersecurity (part-time)',
    school: 'WSB National Louis University',
    location: 'Cracow, Poland',
  },
  {
    period: 'Completed',
    degree: 'Mechatronics Technician',
    school: 'Technical School of Electrical Engineering and Mechanics',
    location: 'Nowy Sącz, Poland',
  },
]

export const languages = [
  'Polish — native',
  'English — working proficiency (EU–China R&D collaboration, international clients)',
]

export const research = {
  title: 'Interests & R&D',
  body:
    'The execution layer came first: PythonMetaTrader5, my open-source order-execution library for MetaTrader 5, now past 42,000 downloads. My R&D since then has moved up the stack into machine learning — specifically evolutionary computation, where genetic algorithms breed and select trading strategies instead of them being hand-written. I use StrategyQuant X to generate strategy populations and stress-test the survivors for robustness before anything touches real capital.',
  tags: [
    'Machine Learning',
    'Genetic Algorithms',
    'Evolutionary Computation',
    'StrategyQuant X',
    'Algorithmic Trading',
  ],
}
