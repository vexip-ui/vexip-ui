import { Message } from 'vexip-ui'
import { getCdnUrl } from './cdn'
import { locale } from './locale'

import type { BuiltInParserName, Plugin } from 'prettier'

function load(path: string) {
  return import(/* @vite-ignore */ getCdnUrl('prettier', `esm/${path}`))
}

let format: typeof import('prettier').format | undefined
let plugins: Plugin[]

const parsers: Record<string, BuiltInParserName> = {
  vue: 'vue',
  js: 'babel',
  ts: 'typescript',
  json: 'json',
}

export async function prettierCode(name: string, code: string) {
  if (!format) {
    const close = Message.info(locale.loading.replace('#{0}', 'Prettier'), 0)
    ;[format, ...plugins] = await Promise.all([
      load('standalone.mjs').then(m => m.default.format),
      load('parser-html.mjs').then(m => m.default),
      load('parser-typescript.mjs').then(m => m.default),
      load('parser-babel.mjs').then(m => m.default),
      load('parser-postcss.mjs').then(m => m.default),
    ])

    setTimeout(close, 500)
  }

  let parser: BuiltInParserName | undefined

  for (const ext of Object.keys(parsers)) {
    if (name.endsWith(`.${ext}`)) {
      parser = parsers[ext]
      break
    }
  }

  if (!parser) return code

  return format!(code, {
    parser,
    plugins,
    semi: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
    vueIndentScriptAndStyle: false,
  })
}
