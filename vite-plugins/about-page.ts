import type { Plugin } from 'vite'
import { aboutGraph, scriptTag } from '../src/content/schema'
import {
  clientWork,
  education,
  focusAreas,
  identity,
  languages,
  profiles,
  projects,
  qa,
  research,
} from '../src/content/profile'
import { esc, list, pageStyles } from './shared'

/**
 * Emits `/about` as a standalone static document at build time.
 *
 * Why a second URL exists at all
 * ------------------------------
 * yelon.pro was a single page. A one-URL domain gives a search engine almost
 * nothing to work with: one title, one description, one set of signals, and no
 * way to tell "the site" apart from "the person the site is about". /about is
 * the page that answers "who is Wiktor Jeleń" directly, in the words someone
 * would actually type, and it is what an entity extractor or a generative
 * search result can quote from.
 *
 * Why it is static rather than a React route
 * ------------------------------------------
 * There is no client-side router here, and this page is text. Shipping it as
 * plain HTML means it needs no JavaScript, renders instantly, and cannot ever
 * disagree with the crawler's view of it — because there is only one view.
 * It reads the same `profile.ts` the app does, so the copy stays in one place.
 *
 * Served extensionless as `/about` by the `try_files $uri $uri.html` rule in
 * nginx.conf.
 */

const extraStyles = (root: string): string => `
${root} .doc-nav{font-size:.85rem;color:#8b949e;margin-bottom:2.5rem}
${root} .doc-lede{font-size:1.15rem;color:#e6edf3;max-width:46rem;margin-bottom:1.5rem}
${root} dl.doc-facts{display:grid;grid-template-columns:auto 1fr;gap:.5rem 1.5rem;margin:0 0 1rem;font-size:.9rem}
${root} dl.doc-facts dt{color:#00ff9d;text-transform:uppercase;letter-spacing:.08em;font-size:.75rem;padding-top:.15rem}
${root} dl.doc-facts dd{margin:0;color:#e6edf3}
${root} .doc-qa{margin-bottom:1.75rem}
${root} .doc-qa h3{color:#00f0ff;font-size:1rem;margin-bottom:.4rem}
${root} .doc-qa p{max-width:46rem;margin:0}
${root} .doc-links{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:.75rem}
${root} .doc-links li{margin:0}
${root} .doc-links a{display:inline-block;border:1px solid rgba(0,240,255,.35);border-radius:3px;padding:.35rem .8rem;font-size:.85rem}
${root} .doc-foot{margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(139,148,158,.2);font-size:.85rem;color:#8b949e}
@media (max-width:34rem){${root} dl.doc-facts{grid-template-columns:1fr;gap:.15rem}${root} dl.doc-facts dd{margin-bottom:.6rem}}
`

const renderAbout = (): string => {
  const parts: string[] = []

  parts.push(
    `<p class="doc-nav"><a href="/">← yelon.pro</a> &nbsp;/&nbsp; About</p>`,
  )

  parts.push(`<header>
<h1>About ${esc(identity.name)}</h1>
<p class="snap-role">${esc(identity.role)} · ${esc(identity.location)}</p>
</header>`)

  /**
   * Third person, name first. This is the paragraph a search engine or an
   * assistant quotes when it has to say in one breath who this person is, and
   * it only works if it can stand alone with no surrounding context.
   */
  parts.push(`<section id="summary">
<p class="doc-lede">Wiktor Jeleń is a backend and platform engineer based in Cracow, Poland. He builds multi-tenant production systems, infrastructure and security-critical backends, and wrote PythonMetaTrader5, an open-source order-execution library with more than 42,000 downloads on PyPI.</p>
<dl class="doc-facts">
<dt>Name</dt><dd>${esc(identity.name)} (Wiktor Jelen)</dd>
<dt>Role</dt><dd>${esc(identity.role)}</dd>
<dt>Based in</dt><dd>${esc(identity.location)} · EU citizen · works remotely</dd>
<dt>Focus</dt><dd>${esc(focusAreas.map((area) => area.title).join(' · '))}</dd>
<dt>Open source</dt><dd>PythonMetaTrader5 — 42,000+ PyPI downloads</dd>
<dt>Education</dt><dd>${esc(education[0].degree)}, ${esc(education[0].school)}</dd>
<dt>Languages</dt><dd>${esc(languages.join(' · '))}</dd>
<dt>Contact</dt><dd><a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a></dd>
</dl>
</section>`)

  parts.push(`<section id="questions"><h2>Common questions</h2>${qa
    .map(
      (entry) => `<div class="doc-qa">
<h3>${esc(entry.question)}</h3>
<p>${esc(entry.answer)}</p>
</div>`,
    )
    .join('')}</section>`)

  parts.push(`<section id="in-my-words"><h2>In my own words</h2>
<p class="snap-statement">${esc(identity.definition)}</p>
<p class="snap-statement">I work system-first. Architecture, invariants and failure modes get decided before implementation, and behaviour is held in place by tests and explicit constraints rather than by convention — because the systems I am usually asked to build are the ones where a quiet failure is expensive: tenant data that must not leak across a boundary, an order that must not be sent twice, an authentication path that a whole faculty depends on during an exam.</p>
<p class="snap-statement">The second track is hardware. I spent a year on R&D with a printer manufacturer in Shenzhen and have taken paid embedded Linux and firmware work continuously since 2022. It is not a hobby next to the software work; it is the reason I am comfortable at the layer where the two meet.</p>
</section>`)

  parts.push(`<section id="focus"><h2>What I work on</h2><div class="snap-grid snap-grid-4">${focusAreas
    .map((area) => `<div><h3>${esc(area.title)}</h3>${list(area.items)}</div>`)
    .join('')}</div></section>`)

  parts.push(`<section id="work"><h2>Selected work</h2>${projects
    .map(
      (project) => `<article class="snap-block">
<h3>${esc(project.name)}</h3>
<p class="snap-sub">${esc(project.tagline)} · ${esc(project.metric)}</p>
<p>${esc(project.solution)}</p>
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

  parts.push(`<section id="consulting"><h2>Consulting</h2>
<h3>${esc(clientWork.headline)}</h3>
<p>${esc(clientWork.body)}</p>
<p><a href="${esc(clientWork.profileUrl)}" rel="noopener">Verify on ${esc(clientWork.platform)}</a></p>
</section>`)

  parts.push(`<section id="research"><h2>${esc(research.title)}</h2>
<p>${esc(research.body)}</p>
${list(research.tags)}
</section>`)

  /**
   * The same URLs as schema.org `sameAs`, rendered for humans. Worth having
   * visibly on the page and not only in the JSON-LD: a claim about identity is
   * more credible when the page makes it out loud, and these are the pages a
   * reader — or an assistant asked to check — goes to next.
   */
  parts.push(`<section id="elsewhere"><h2>Elsewhere</h2>
<p>The same person, on the accounts worth checking:</p>
<ul class="doc-links">${profiles
    .map(
      (profile) =>
        `<li><a href="${esc(profile.href)}" rel="me noopener">${esc(profile.label)} — ${esc(profile.handle)}</a></li>`,
    )
    .join('')}</ul>
</section>`)

  parts.push(`<section id="contact"><h2>Contact</h2>
<p>Open to backend, platform and system-architecture work — remote or ${esc(identity.location)}.</p>
<p><a href="mailto:${esc(identity.email)}">${esc(identity.email)}</a> · <a href="tel:${identity.phone.replace(/\s/g, '')}">${esc(identity.phone)}</a></p>
<p class="doc-foot"><a href="/">Back to yelon.pro</a> — projects, skills and the full review feed.</p>
</section>`)

  return parts.join('')
}

const document = (): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Wiktor Jeleń — Backend &amp; Platform Engineer in Cracow</title>
    <meta name="description" content="Who Wiktor Jeleń is: a backend and platform engineer based in Cracow, Poland, author of PythonMetaTrader5 (42,000+ PyPI downloads), working on multi-tenant systems, infrastructure and AI integration." />
    <meta name="author" content="${esc(identity.name)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <link rel="canonical" href="https://yelon.pro/about" />
    <link rel="icon" type="image/png" href="/yelon.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="theme-color" content="#0a0a0f" />

    <meta property="og:type" content="profile" />
    <meta property="og:url" content="https://yelon.pro/about" />
    <meta property="og:title" content="About Wiktor Jeleń — Backend &amp; Platform Engineer" />
    <meta property="og:description" content="Backend and platform engineer based in Cracow, Poland. Author of PythonMetaTrader5. Multi-tenant systems, infrastructure, security and AI integration." />
    <meta property="og:image" content="https://yelon.pro/yelon.png" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="YELON.PRO" />
    <meta property="profile:first_name" content="Wiktor" />
    <meta property="profile:last_name" content="Jeleń" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>html{background:#0a0a0f}body{margin:0}${pageStyles('#doc')}${extraStyles('#doc')}</style>
  </head>
  <body>
    <main id="doc">${renderAbout()}</main>
    ${scriptTag(aboutGraph())}
  </body>
</html>
`

export function aboutPage(): Plugin {
  return {
    name: 'yelon-about-page',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'about.html', source: document() })
    },
  }
}
