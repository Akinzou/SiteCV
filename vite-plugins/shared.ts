/**
 * Helpers shared by the two build-time HTML generators (`seo-snapshot` and
 * `about-page`), so the crawler snapshot and /about look like the same site and
 * escape their input the same way.
 */

export const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const list = (
  items: readonly string[],
  className = 'snap-tags',
): string => `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`

/**
 * The site palette, as plain CSS scoped to one root selector.
 *
 * Not Tailwind on purpose: this markup is generated at build time, outside the
 * files Tailwind scans, so every class here would be purged and the page would
 * ship unstyled.
 */
export const pageStyles = (root: string): string => `
${root}{color:#c9d1d9;background:#0a0a0f;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;line-height:1.6;padding:3rem 1.5rem 4rem;max-width:60rem;margin:0 auto}
${root} a{color:#00f0ff;text-decoration:none}
${root} a:hover{text-decoration:underline}
${root} h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.1;margin:0 0 .5rem;color:#fff;letter-spacing:-.02em}
${root} h2{font-size:1.05rem;text-transform:uppercase;letter-spacing:.12em;color:#bf00ff;margin:3rem 0 1.25rem;padding-bottom:.5rem;border-bottom:1px solid rgba(191,0,255,.25)}
${root} h3{font-size:1.05rem;color:#fff;margin:0 0 .25rem}
${root} p{margin:0 0 .75rem}
${root} .snap-role{font-size:1.25rem;color:#00f0ff;margin-bottom:1rem}
${root} .snap-statement{font-size:1.05rem;color:#e6edf3;max-width:44rem}
${root} .snap-meta{color:#8b949e;font-size:.85rem}
${root} .snap-block{margin-bottom:2rem;padding-left:1rem;border-left:2px solid rgba(0,240,255,.2)}
${root} .snap-sub{color:#8b949e;font-size:.85rem;margin-bottom:.5rem}
${root} .snap-label{color:#00ff9d;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em}
${root} ul{margin:0 0 .75rem;padding-left:1.1rem}
${root} li{margin-bottom:.35rem}
${root} .snap-tags{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;padding:0}
${root} .snap-tags li{font-size:.8rem;color:#8b949e;border:1px solid rgba(139,148,158,.3);border-radius:3px;padding:.1rem .5rem;margin:0}
${root} .snap-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))}
${root} .snap-grid-4{grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))}
`
