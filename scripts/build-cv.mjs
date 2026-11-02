/**
 * Renders src/content/cv.ts to a one-page, text-based A4 PDF at
 * public/Wiktor_Jelen_CV.pdf.
 *
 *   npm run cv:pdf          build the PDF (needs local Chrome or Edge)
 *   npm run cv:pdf -- --html  also keep the intermediate HTML in local/cv-build/
 *
 * Deliberately plain: one column, real text, standard fonts, no icons, no
 * tables for layout — the shape an ATS parser reads top to bottom.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { hashFile, hashHtml, loadModules, renderHtml, root } from './cv-render.mjs'

const keepHtml = process.argv.includes('--html')
const { cvModule } = await loadModules()
const html = renderHtml(cvModule)

const buildDir = resolve(root, 'local/cv-build')
mkdirSync(buildDir, { recursive: true })
const htmlPath = resolve(buildDir, 'cv.html')
writeFileSync(htmlPath, html)

const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const browser = browsers.find((path) => existsSync(path))
if (!browser) throw new Error('No Chrome/Edge found — set CHROME_PATH')

const out = resolve(root, 'public/Wiktor_Jelen_CV.pdf')
execFileSync(browser, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${out}`,
  `file:///${htmlPath.replace(/\\/g, '/')}`,
], { stdio: 'ignore' })

writeFileSync(hashFile, hashHtml(html) + '\n')
if (!keepHtml) rmSync(buildDir, { recursive: true, force: true })
console.log(`CV written to ${out}`)
