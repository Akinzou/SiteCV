/**
 * Installs a git pre-commit hook that runs `npm run cv:check`, so a commit
 * cannot land while the CV PDF, llms.txt or the local CVs disagree with
 * profile.ts. Runs from `npm install` (the "prepare" script); a no-op where
 * there is no .git directory, e.g. on the Vercel build.
 */
import { existsSync, writeFileSync, chmodSync } from 'node:fs'
import { resolve } from 'node:path'
import { root } from './cv-render.mjs'

const hooks = resolve(root, '.git/hooks')
if (existsSync(hooks)) {
  const hook = resolve(hooks, 'pre-commit')
  writeFileSync(hook, '#!/bin/sh\n# installed by scripts/install-hooks.mjs\nnpm run --silent cv:check\n')
  chmodSync(hook, 0o755)
  console.log('pre-commit hook installed: npm run cv:check')
}
