import { resolve } from 'node:path'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import type { Config } from 'prettier'

export const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

export const prettierConfig: Config = {
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  bracketSameLine: false,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.md',
      options: {
        embeddedLanguageFormatting: 'off'
      }
    }
  ]
}

export const componentsDir = resolve(rootDir, 'components')

export const components = readdirSync(componentsDir).filter(f => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})
