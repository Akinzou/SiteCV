/**
 * The schema.org entity graph, generated from `profile.ts`.
 *
 * Why this is code and not hand-written JSON in index.html
 * -------------------------------------------------------
 * The graph used to live as a literal <script type="application/ld+json"> block
 * in index.html. It drifted: it still listed four employers months after the
 * Experience section was deleted from the page, and it described the person
 * with a job title the page no longer used. Structured data that contradicts
 * the visible page is worse than no structured data — it is the thing Google
 * uses to decide whether to trust the rest of the markup.
 *
 * Now both pages that carry a graph (`/` and `/about`) build it from the same
 * module the visible copy comes from, so they cannot disagree.
 *
 * One entity, two pages
 * ---------------------
 * Every node has a stable absolute `@id`. `https://yelon.pro/#person` is the
 * same node whether it is reached from `/` or from `/about`, so a crawler that
 * sees both merges them into one entity instead of inventing two people.
 */

import {
  education,
  focusAreas,
  identity,
  profiles,
  projects,
  qa,
  research,
} from './profile'

const SITE = 'https://yelon.pro'

export const ids = {
  person: `${SITE}/#person`,
  website: `${SITE}/#website`,
  profilePage: `${SITE}/#profile`,
  aboutPage: `${SITE}/about#page`,
  faq: `${SITE}/about#faq`,
  projects: `${SITE}/#projects`,
}

/**
 * Deliberately shorter than it once was. The list had grown to 44 entries,
 * including things the page never mentions (Three.js, TailwindCSS). A topic
 * list is a claim about expertise; padding it dilutes every entry in it.
 * Everything below is stated somewhere on the site.
 */
const knowsAbout = [
  'Backend Development',
  'Platform Engineering',
  'System Architecture',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Temporal.io',
  'Docker',
  'Linux',
  'Nginx',
  'CI/CD',
  'GitHub Actions',
  'Amazon Web Services',
  'Multi-tenant Architecture',
  'Row-Level Security',
  'Application Security',
  'OWASP Top 10',
  'LDAP',
  'Large Language Model Integration',
  'Model Context Protocol',
  'Embedded Systems',
  'Klipper Firmware',
  'Algorithmic Trading',
  'Evolutionary Computation',
]

/**
 * The whole point of `sameAs`: tell a search engine that the person described
 * here is the same person behind these accounts. Every URL is a profile of the
 * person — not a project page, which says nothing about identity. The PyPI
 * *project* page appears further down as the library's `downloadUrl`, which is
 * where it actually belongs.
 *
 * These are claims yelon.pro makes about itself, and a one-way claim is weak
 * evidence. They only carry real weight once each profile links back here.
 */
const sameAs = profiles.map((profile) => profile.href)

const personNode = () => ({
  '@type': 'Person',
  '@id': ids.person,
  name: identity.name,
  alternateName: ['Wiktor Jelen', 'Yelon'],
  givenName: 'Wiktor',
  familyName: 'Jeleń',
  jobTitle: identity.role,
  /**
   * One sentence, name first, no adjectives that cannot be checked. This is the
   * field an entity extractor quotes when it needs to say who someone is.
   */
  disambiguatingDescription:
    'Polish backend and platform engineer based in Cracow, author of the open-source PythonMetaTrader5 library.',
  description:
    'Wiktor Jeleń is a backend and platform engineer based in Cracow, Poland. He builds multi-tenant production systems, infrastructure and security-critical backends, and wrote PythonMetaTrader5, an open-source order-execution library with more than 42,000 PyPI downloads.',
  url: SITE,
  mainEntityOfPage: { '@id': ids.profilePage },
  image: `${SITE}/yelon.png`,
  email: identity.email,
  telephone: identity.phone.replace(/\s/g, ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cracow',
    addressRegion: 'Małopolskie',
    addressCountry: 'PL',
  },
  homeLocation: {
    '@type': 'Place',
    name: 'Cracow, Poland',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cracow',
      addressCountry: 'PL',
    },
  },
  nationality: { '@type': 'Country', name: 'Poland' },
  sameAs,
  knowsAbout,
  knowsLanguage: [
    { '@type': 'Language', name: 'Polish', alternateName: 'pl' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Backend and Platform Engineer',
    occupationLocation: { '@type': 'Country', name: 'Poland' },
    skills: focusAreas.flatMap((area) => area.items),
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: education[0].degree,
      recognizedBy: { '@type': 'EducationalOrganization', name: education[0].school },
    },
  ],
  alumniOf: education.map((entry) => ({
    '@type': 'EducationalOrganization',
    name: entry.school,
    address: {
      '@type': 'PostalAddress',
      addressLocality: entry.location.replace(/, Poland$/, ''),
      addressCountry: 'PL',
    },
  })),
})

/** Only the projects with a public repository — the rest have nothing to point at. */
const projectsNode = () => ({
  '@type': 'ItemList',
  '@id': ids.projects,
  name: 'Projects by Wiktor Jeleń',
  itemListElement: projects
    .filter((project) => project.links.some((link) => link.label === 'GitHub'))
    .map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.solution,
        codeRepository: project.links.find((link) => link.label === 'GitHub')!.href,
        programmingLanguage: project.stack.filter((item) =>
          ['Python', 'TypeScript', 'C++'].includes(item),
        ),
        ...(project.links.find((link) => link.label === 'PyPI')
          ? { downloadUrl: project.links.find((link) => link.label === 'PyPI')!.href }
          : {}),
        author: { '@id': ids.person },
      },
    })),
})

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': ids.website,
  url: SITE,
  name: 'Wiktor Jeleń — Backend & Platform Engineer',
  description:
    'Portfolio of Wiktor Jeleń, backend and platform engineer working on multi-tenant production systems, infrastructure and security.',
  inLanguage: 'en',
  author: { '@id': ids.person },
  publisher: { '@id': ids.person },
})

/** The graph for `/` — a ProfilePage whose subject is the person. */
export const homeGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': ids.profilePage,
      url: `${SITE}/`,
      name: 'Wiktor Jeleń | Backend & Platform Engineer',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.person },
      mainEntity: { '@id': ids.person },
      dateModified: new Date().toISOString().slice(0, 10),
      significantLink: `${SITE}/about`,
    },
    personNode(),
    projectsNode(),
    websiteNode(),
  ],
})

/**
 * The graph for `/about`. It repeats the full Person node rather than
 * referencing it, so this page stands on its own for a crawler that never
 * fetches the home page. The shared `@id` is what keeps it one entity.
 */
export const aboutGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': ids.aboutPage,
      url: `${SITE}/about`,
      name: `About ${identity.name}`,
      description: `Who Wiktor Jeleń is, what he works on, and where to verify it: ${research.title.toLowerCase()}, open-source work and public client reviews.`,
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.person },
      mainEntity: { '@id': ids.person },
      dateModified: new Date().toISOString().slice(0, 10),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE}/about` },
        ],
      },
    },
    personNode(),
    /**
     * FAQPage no longer produces a rich result for a site like this one —
     * Google restricted those to government and health domains in 2023. It is
     * here because it is still parsed: it marks the short answers as answers,
     * which is the format generative search actually lifts from.
     */
    {
      '@type': 'FAQPage',
      '@id': ids.faq,
      isPartOf: { '@id': ids.aboutPage },
      mainEntity: qa.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: entry.answer },
      })),
    },
    projectsNode(),
    websiteNode(),
  ],
})

export const scriptTag = (graph: unknown): string =>
  `<script type="application/ld+json">${JSON.stringify(graph, null, 2)}</script>`
