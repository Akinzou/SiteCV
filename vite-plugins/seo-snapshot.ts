import type { Plugin } from 'vite'
import {
  education,
  experience,
  focusAreas,
  identity,
  languages,
  projects,
  research,
  skillGroups,
} from '../src/content/profile'

/**
 * Bakes a semantic, text-first rendering of `src/content/profile.ts` straight
 * into `<div id="root">` at build time.
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

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const list = (items: readonly string[], className = 'snap-tags'): string =>
  `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`

const styles = `
#seo-snapshot{color:#c9d1d9;background:#0a0a0f;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;line-height:1.6;padding:3rem 1.5rem 4rem;max-width:60rem;margin:0 auto}
#seo-snapshot a{color:#00f0ff;text-decoration:none}
#seo-snapshot a:hover{text-decoration:underline}
#seo-snapshot h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.1;margin:0 0 .5rem;color:#fff;letter-spacing:-.02em}
#seo-snapshot h2{font-size:1.05rem;text-transform:uppercase;letter-spacing:.12em;color:#bf00ff;margin:3rem 0 1.25rem;padding-bottom:.5rem;border-bottom:1px solid rgba(191,0,255,.25)}
#seo-snapshot h3{font-size:1.05rem;color:#fff;margin:0 0 .25rem}
#seo-snapshot p{margin:0 0 .75rem}
#seo-snapshot .snap-role{font-size:1.25rem;color:#00f0ff;margin-bottom:1rem}
#seo-snapshot .snap-statement{font-size:1.05rem;color:#e6edf3;max-width:44rem}
#seo-snapshot .snap-meta{color:#8b949e;font-size:.85rem}
#seo-snapshot .snap-block{margin-bottom:2rem;padding-left:1rem;border-left:2px solid rgba(0,240,255,.2)}
#seo-snapshot .snap-sub{color:#8b949e;font-size:.85rem;margin-bottom:.5rem}
#seo-snapshot .snap-label{color:#00ff9d;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em}
#seo-snapshot ul{margin:0 0 .75rem;padding-left:1.1rem}
#seo-snapshot li{margin-bottom:.35rem}
#seo-snapshot .snap-tags{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;padding:0}
#seo-snapshot .snap-tags li{font-size:.8rem;color:#8b949e;border:1px solid rgba(139,148,158,.3);border-radius:3px;padding:.1rem .5rem;margin:0}
#seo-snapshot .snap-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))}
#seo-snapshot .snap-grid-4{grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))}
`

const renderSnapshot = (): string => {
  const parts: string[] = []

  parts.push(`<header>
<h1>${esc(identity.name)}</h1>
<p class="snap-role">${esc(identity.role)}</p>
<p class="snap-statement">${esc(identity.statement)}</p>
<p class="snap-meta">${esc(identity.location)} &middot; <a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a> &middot; <a href="tel:${identity.phone.replace(/\s/g, '')}">${esc(identity.phone)}</a> &middot; <a href="${esc(identity.github)}">GitHub</a> &middot; <a href="${esc(identity.linkedin)}">LinkedIn</a></p>
</header>`)

  parts.push(`<section id="snap-focus"><h2>Focus areas</h2><div class="snap-grid snap-grid-4">${focusAreas
    .map((area) => `<div><h3>${esc(area.title)}</h3>${list(area.items)}</div>`)
    .join('')}</div></section>`)

  parts.push(`<section id="snap-experience"><h2>Experience</h2>${experience
    .map(
      (role) => `<article class="snap-block">
<h3>${esc(role.role)}${role.project ? ` &mdash; ${esc(role.project)}` : ''}</h3>
<p class="snap-sub">${esc(role.company)} &middot; ${esc(role.location)} &middot; ${esc(role.period)}</p>
<ul>${role.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>
</article>`,
    )
    .join('')}</section>`)

  parts.push(`<section id="snap-projects"><h2>Projects</h2>${projects
    .map(
      (project) => `<article class="snap-block">
<h3>${esc(project.name)}</h3>
<p class="snap-sub">${esc(project.tagline)} &middot; ${esc(project.metric)}</p>
<p><span class="snap-label">Problem</span><br>${esc(project.problem)}</p>
<p><span class="snap-label">Solution</span><br>${esc(project.solution)}</p>
<p class="snap-label">Stack</p>${list(project.stack)}
${
  project.links.length
    ? `<p>${project.links
        .map((link) => `<a href="${esc(link.href)}" rel="noopener">${esc(link.label)}</a>`)
        .join(' &middot; ')}</p>`
    : ''
}
</article>`,
    )
    .join('')}</section>`)

  parts.push(`<section id="snap-skills"><h2>Technical skills</h2><div class="snap-grid">${skillGroups
    .map((group) => `<div><h3>${esc(group.title)}</h3>${list(group.items)}</div>`)
    .join('')}</div></section>`)

  parts.push(`<section id="snap-research"><h2>${esc(research.title)}</h2>
<p>${esc(research.body)}</p>
${list(research.tags)}
</section>`)

  parts.push(`<section id="snap-education"><h2>Education</h2>${education
    .map(
      (entry) => `<article class="snap-block">
<h3>${esc(entry.degree)}</h3>
<p class="snap-sub">${esc(entry.school)} &middot; ${esc(entry.location)} &middot; ${esc(entry.period)}</p>
</article>`,
    )
    .join('')}
<h3>Languages</h3>${list(languages, '')}
</section>`)

  parts.push(`<section id="snap-contact"><h2>Contact</h2>
<p>Open to backend, platform and system-architecture work &mdash; remote or ${esc(identity.location)}.</p>
<p><a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a> &middot; <a href="tel:${identity.phone.replace(/\s/g, '')}">${esc(identity.phone)}</a></p>
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
        if (!html.includes(marker)) {
          // Fail loudly: a silent miss would ship an empty page to crawlers again.
          throw new Error(
            `[seo-snapshot] could not find ${marker} in index.html — snapshot not injected`,
          )
        }
        return html
          .replace('</head>', `  <style>${styles}</style>\n  </head>`)
          .replace(marker, `<div id="root">${renderSnapshot()}</div>`)
      },
    },
  }
}
