import type { Plugin } from 'vite'
import { homeGraph, scriptTag } from '../src/content/schema'
import {
  clientWork,
  education,
  focusAreas,
  identity,
  languages,
  profiles,
  projects,
  research,
  skillGroups,
} from '../src/content/profile'
import { esc, list, pageStyles } from './shared'

/**
 * Bakes a semantic, text-first rendering of `src/content/profile.ts` straight
 * into `<div id="root">` at build time, and injects the schema.org graph built
 * by `src/content/schema.ts`.
 *
 * Why this exists
 * ---------------
 * The site is a client-rendered SPA, so the HTML that leaves the server used to
 * contain an empty `#root` and nothing else. Googlebot renders JavaScript and
 * coped; almost nothing else does. GPTBot, OAI-SearchBot, ChatGPT-User,
 * PerplexityBot, ClaudeBot, Slack/LinkedIn unfurlers and every plain `curl`
 * read raw HTML only — they all saw a blank page.
 *
 * React 18 clears the container on `createRoot(...).render()`, so this markup is
 * shown until the bundle boots and is then replaced by the real UI. That makes
 * it three useful things at once: crawlable content, a no-JavaScript fallback,
 * and an instant first paint instead of a black screen.
 *
 * It is not cloaking: the snapshot and the React render state the same facts
 * from the same module, and the snapshot stays visible to everyone.
 */

const styles = pageStyles('#seo-snapshot')

const renderSnapshot = (): string => {
  const parts: string[] = []

  parts.push(`<header>
<h1>${esc(identity.name)}</h1>
<p class="snap-role">${esc(identity.role)}</p>
<p class="snap-statement">${esc(identity.definition)}</p>
<p class="snap-statement">${esc(identity.statement)}</p>
<p class="snap-meta">${esc(identity.location)} · <a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a> · <a href="tel:${identity.phone.replace(/\s/g, '')}">${esc(identity.phone)}</a> · <a href="${esc(identity.github)}">GitHub</a> · <a href="${esc(identity.linkedin)}">LinkedIn</a></p>
<p class="snap-meta"><a href="/about">About Wiktor Jeleń →</a></p>
</header>`)

  parts.push(`<section id="snap-focus"><h2>Focus areas</h2><div class="snap-grid snap-grid-4">${focusAreas
    .map((area) => `<div><h3>${esc(area.title)}</h3>${list(area.items)}</div>`)
    .join('')}</div></section>`)

  parts.push(`<section id="snap-projects"><h2>Projects</h2>${projects
    .map(
      (project) => `<article class="snap-block">
<h3>${esc(project.name)}</h3>
<p class="snap-sub">${esc(project.tagline)} · ${esc(project.metric)}</p>
<p><span class="snap-label">Problem</span><br>${esc(project.problem)}</p>
<p><span class="snap-label">Solution</span><br>${esc(project.solution)}</p>
<p class="snap-label">Stack</p>${list(project.stack)}
${
  project.links.length
    ? `<p>${project.links
        .map((link) => `<a href="${esc(link.href)}" rel="noopener">${esc(link.label)}</a>`)
        .join(' · ')}</p>`
    : ''
}
</article>`,
    )
    .join('')}</section>`)

  parts.push(`<section id="snap-skills"><h2>Technical skills</h2><div class="snap-grid">${skillGroups
    .map((group) => `<div><h3>${esc(group.title)}</h3>${list(group.items)}</div>`)
    .join('')}</div></section>`)

  parts.push(`<section id="snap-clients"><h2>Consulting</h2>
<h3>${esc(clientWork.headline)}</h3>
<p>${esc(clientWork.body)}</p>
${list(clientWork.stats.map((stat) => `${stat.value} ${stat.label.toLowerCase()}`))}
${clientWork.quotes
  .map(
    (quote) =>
      `<blockquote class="snap-block"><p>${esc(quote.text)}</p><p class="snap-sub">${esc(quote.author)} · ${esc(quote.country)}</p></blockquote>`,
  )
  .join('')}
<p><a href="${esc(clientWork.profileUrl)}" rel="noopener">Verify on ${esc(clientWork.platform)}</a></p>
</section>`)

  parts.push(`<section id="snap-research"><h2>${esc(research.title)}</h2>
<p>${esc(research.body)}</p>
${list(research.tags)}
</section>`)

  parts.push(`<section id="snap-education"><h2>Education</h2>${education
    .map(
      (entry) => `<article class="snap-block">
<h3>${esc(entry.degree)}</h3>
<p class="snap-sub">${esc(entry.school)} · ${esc(entry.location)} · ${esc(entry.period)}</p>
</article>`,
    )
    .join('')}
<h3>Languages</h3>${list(languages, '')}
</section>`)

  /**
   * The same accounts schema.org claims as `sameAs`, stated in the markup a
   * crawler reads without executing anything. `rel="me"` is the long-standing
   * convention for "this other page is also me".
   */
  parts.push(`<section id="snap-elsewhere"><h2>Elsewhere</h2>
<ul class="snap-tags">${profiles
    .map(
      (profile) =>
        `<li><a href="${esc(profile.href)}" rel="me noopener">${esc(profile.label)} — ${esc(profile.handle)}</a></li>`,
    )
    .join('')}</ul>
</section>`)

  parts.push(`<section id="snap-contact"><h2>Contact</h2>
<p>Open to backend, platform and system-architecture work — remote or ${esc(identity.location)}.</p>
<p><a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a> · <a href="tel:${identity.phone.replace(/\s/g, '')}">${esc(identity.phone)}</a></p>
<p><a href="/about">More about Wiktor Jeleń</a></p>
</section>`)

  return `<div id="seo-snapshot">${parts.join('')}</div>`
}

export function seoSnapshot(): Plugin {
  return {
    name: 'yelon-seo-snapshot',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const marker = '<div id="root"></div>'
        const schemaMarker = '<!--__SCHEMA__-->'
        // Fail loudly: a silent miss would ship an empty page to crawlers again.
        for (const needle of [marker, schemaMarker]) {
          if (!html.includes(needle)) {
            throw new Error(
              `[seo-snapshot] could not find ${needle} in index.html — snapshot not injected`,
            )
          }
        }
        return html
          .replace('</head>', `  <style>${styles}</style>\n  </head>`)
          .replace(marker, `<div id="root">${renderSnapshot()}</div>`)
          .replace(schemaMarker, scriptTag(homeGraph()))
      },
    },
  }
}
