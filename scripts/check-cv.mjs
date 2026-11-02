/**
 * `npm run cv:check` — fails when any copy of the CV has drifted from
 * src/content/profile.ts, the single source of truth.
 *
 * Checks:
 *   1. public/Wiktor_Jelen_CV.pdf is current: the HTML cv.ts renders today
 *      hashes to what `npm run cv:pdf` recorded in scripts/cv.hash.
 *   2. public/llms.txt (hand-written) carries every role and period and the
 *      current PyPI figure.
 *   3. The local per-offer base CVs (local/job-search/CV_WiktorJelen_Backend_
 *      {EN,PL}.html, gitignored, skipped when absent) carry every period, the
 *      EN one every role, both the current PyPI figure and education years.
 *   4. Nothing under NDA leaks into any of them.
 *
 * Wired as a git pre-commit hook (scripts/install-hooks.mjs).
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { hashFile, hashHtml, loadModules, renderHtml, root } from './cv-render.mjs'

const { cvModule, profile } = await loadModules()
const problems = []
const fail = (where, what) => problems.push(`${where}: ${what}`)

/** Visible text of an HTML file, entities decoded, whitespace collapsed. */
const textOf = (html) =>
  html
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;|&middot;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/\s+/g, ' ')

const pypi = profile.stats.find((stat) => stat.pypiPackage)
const pypiEn = `${pypi.value.toLocaleString('en-US')}+`
const pypiPl = `${pypi.value.toLocaleString('en-US').replace(/,/g, ' ')}+`
const dash = (period) => period.replace(' - ', ' – ')

/** Client, industry, suppliers and internal codenames of the NDA engagement. */
const ndaLeak =
  /MasterEnergy|MasterClick|fotowolt|photovolt|falownik|inverter|energy storage|magazyn(?:y|ów) energii|SupplierHQ|SourcingHQ|ContentCreator|x-kom|ecogral|deye|suntrado|panpower/i

// 1. PDF freshness
const expected = hashHtml(renderHtml(cvModule))
const recorded = existsSync(hashFile) ? readFileSync(hashFile, 'utf8').trim() : ''
if (expected !== recorded) fail('public/Wiktor_Jelen_CV.pdf', 'stale — run `npm run cv:pdf` and commit the PDF and scripts/cv.hash')
if (ndaLeak.test(renderHtml(cvModule))) fail('CV PDF', 'contains an NDA-restricted name')

// 2. llms.txt
const llms = readFileSync(resolve(root, 'public/llms.txt'), 'utf8')
for (const entry of profile.experience) {
  const period = entry.period.replace(' - ', '-')
  if (!llms.includes(period)) fail('public/llms.txt', `missing period ${period}`)
  if (!llms.includes(entry.role)) fail('public/llms.txt', `missing role "${entry.role}"`)
}
if (!llms.includes(pypiEn)) fail('public/llms.txt', `PyPI figure is not ${pypiEn}`)
for (const entry of profile.education)
  for (const year of entry.period.match(/\d{4}/g) ?? [])
    if (!llms.includes(year)) fail('public/llms.txt', `education year ${year} missing`)
if (ndaLeak.test(llms)) fail('public/llms.txt', 'contains an NDA-restricted name')

// 3. Local base CVs
const local = [
  { lang: 'EN', pypiFigure: pypiEn, roles: true },
  { lang: 'PL', pypiFigure: pypiPl, roles: false },
]
for (const { lang, pypiFigure, roles } of local) {
  const file = resolve(root, `local/job-search/CV_WiktorJelen_Backend_${lang}.html`)
  if (!existsSync(file)) continue
  const where = `local CV ${lang}`
  const text = textOf(readFileSync(file, 'utf8'))
  for (const entry of profile.experience) {
    if (!text.includes(dash(entry.period))) fail(where, `missing period ${dash(entry.period)}`)
    if (roles && !text.includes(entry.role.replace(' (contract)', ''))) fail(where, `missing role "${entry.role}"`)
  }
  const stale = [...text.matchAll(/(\d{2}[ ,]\d{3})\+ (?:PyPI downloads|pobrań z PyPI)/g)].map((m) => `${m[1]}+`)
  if (!stale.length) fail(where, 'no PyPI download figure found')
  for (const figure of stale) if (figure !== pypiFigure) fail(where, `PyPI figure ${figure}, expected ${pypiFigure}`)
  for (const entry of profile.education) {
    const years = entry.period.match(/\d{4}/g) ?? []
    for (const year of years) if (!text.includes(year)) fail(where, `education year ${year} missing`)
  }
  if (/System Architect/.test(text)) fail(where, 'still says "System Architect"')
  if (ndaLeak.test(text)) fail(where, 'contains an NDA-restricted name')
}

if (problems.length) {
  console.error(`CV drift — ${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log('CV check: PDF, llms.txt and local CVs agree with profile.ts')
