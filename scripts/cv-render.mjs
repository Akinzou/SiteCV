/**
 * Shared by build-cv.mjs (writes the PDF) and check-cv.mjs (verifies nothing
 * drifted). Loads the TypeScript content modules through Vite and renders the
 * one-page CV HTML. Same input → byte-identical HTML, so its hash tells whether
 * the committed PDF is current without needing Chrome.
 */
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const hashFile = resolve(root, 'scripts/cv.hash')

export const loadModules = async () => {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  })
  const cvModule = await server.ssrLoadModule('/src/content/cv.ts')
  const profile = await server.ssrLoadModule('/src/content/profile.ts')
  await server.close()
  return { cvModule, profile }
}

export const hashHtml = (html) => createHash('sha256').update(html).digest('hex')

export const renderHtml = ({ cv, cvExperience, cvSkills, cvEducation, cvLanguages }) => {
  const esc = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(cv.name)} — ${esc(cv.headline)} — CV</title>
<meta name="author" content="${esc(cv.name)}">
<meta name="description" content="${esc(cv.headline)} CV">
<style>
  @page { size: A4; margin: 9mm 13mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #111; font-family: Arial, Helvetica, sans-serif; font-size: 8.9pt; line-height: 1.25; }
  a { color: inherit; text-decoration: none; }
  h1 { margin: 0; font-size: 18pt; }
  .headline { margin: 1px 0 3px; font-size: 10.5pt; font-weight: bold; color: #0f3d5c; }
  .contact { font-size: 8.8pt; color: #333; }
  .proof { margin: 5px 0 0; font-size: 9.4pt; }
  .proof b a { color: #0f3d5c; text-decoration: underline; }
  h2 { margin: 8px 0 3px; padding-bottom: 1px; border-bottom: 1px solid #0f3d5c; color: #0f3d5c; font-size: 9.4pt; text-transform: uppercase; }
  p { margin: 0; }
  .entry { margin-bottom: 3px; break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; gap: 10px; }
  .entry-head b { font-size: 9.5pt; }
  .date { white-space: nowrap; color: #333; }
  .org { color: #333; font-style: italic; }
  ul { margin: 1px 0 0; padding-left: 10px; list-style: none; }
  li { margin: 0 0 1px; text-indent: -8px; padding-left: 8px; }
  li::before { content: "• "; }
  .skills p { margin-bottom: 1px; }
  .consent { margin-top: 7px; color: #666; font-size: 6.6pt; line-height: 1.25; }
</style>
</head>
<body>
<h1>${esc(cv.name)}</h1>
<p class="headline">${esc(cv.headline)}</p>
<p class="contact">${esc(cv.contact.location)} | ${esc(cv.contact.phone)} | <a href="mailto:${esc(cv.contact.email)}">${esc(cv.contact.email)}</a> | <a href="${esc(cv.contact.linkedin)}">${esc(bare(cv.contact.linkedin))}</a> | <a href="${esc(cv.contact.github)}">${esc(bare(cv.contact.github))}</a> | <a href="${esc(cv.contact.site)}">${esc(bare(cv.contact.site))}</a></p>
<p class="proof"><b><a href="${esc(cv.proof.href)}">${esc(cv.proof.label)}</a></b> — ${esc(cv.proof.detail)} (${esc(bare(cv.proof.href))})</p>

<h2>Summary</h2>
<p>${esc(cv.summary)}</p>

<h2>Experience</h2>
${cvExperience
  .map(
    (entry) => `<div class="entry">
<div class="entry-head"><b>${esc(entry.role)}</b><span class="date">${esc(entry.period)}</span></div>
<div class="entry-head org"><span>${esc(entry.company)}</span><span>${esc(entry.location)}</span></div>
${entry.bullets.length ? `<ul>${entry.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>` : ''}
</div>`,
  )
  .join('\n')}

<h2>Skills</h2>
<div class="skills">${cvSkills.map((row) => `<p><b>${esc(row.label)}:</b> ${esc(row.items)}</p>`).join('')}</div>

<h2>Education</h2>
${cvEducation
  .map(
    (entry) => `<div class="entry"><div class="entry-head"><span><b>${esc(entry.degree)}</b> — <span class="org">${esc(entry.school)}</span>, ${esc(entry.location)}</span><span class="date">${esc(entry.period)}</span></div></div>`,
  )
  .join('\n')}

<h2>Languages</h2>
<p>${cvLanguages.map(esc).join(' · ')}</p>

<p class="consent">I hereby consent to the processing of my personal data by the potential employer for the purpose of the current and future recruitment processes, in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation).</p>
</body>
</html>
`
}
