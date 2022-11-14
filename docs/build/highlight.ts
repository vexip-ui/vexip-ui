import prismjs from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import { escapeHtml } from './escape-html'

loadLanguages(['markup', 'css', 'javascript'])

export function highlight(str: string, lang?: string) {
  if (lang) {
    lang = lang.toLowerCase()

    const rawLang = lang

    lang = getLangCodeFromExtension(lang)

    if (!prismjs.languages[lang]) {
      try {
        loadLanguages([lang])
      } catch (e) {
        console.warn(`Syntax highlight for language "${lang}" is not supported.`)
      }
    }

    if (prismjs.languages[lang]) {
      const code = prismjs.highlight(str, prismjs.languages[lang], lang)

      return wrap(code, rawLang)
    }
  }

  return wrap(str, 'text')
}

function wrap(code: string, lang: string) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }

  const lineCount = code.split('\n').length - 1
  const lineUnits = Array.from({ length: lineCount }, () => '<span></span>').join('')
  const lineNumbers = `<span aria-hidden="true" class="code-line-numbers">${lineUnits}</span>`

  return `<pre v-pre class="language-${lang}" lang="${lang}"><code>${code}</code>${lineNumbers}</pre>`
}

function getLangCodeFromExtension(extension: string) {
  const extensionMap: Record<string, string> = {
    vue: 'markup',
    html: 'markup',
    md: 'markdown',
    rb: 'ruby',
    ts: 'typescript',
    py: 'python',
    sh: 'bash',
    yml: 'yaml',
    styl: 'stylus',
    kt: 'kotlin',
    rs: 'rust'
  }

  return extensionMap[extension] ?? extension
}
