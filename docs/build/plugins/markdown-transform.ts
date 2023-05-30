import path from 'node:path'
import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join('\n')}
</script>
`

const combineMarkdown = (code: string, headers: string[], footers: string[]) => {
  const frontmatterEnds = code.indexOf('\n---\n') + 4
  const firstSubheader = code.search(/\n## .+/)
  const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader

  if (headers.length > 0) {
    code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }
  code += footers.join('\n')

  return `${code}\n`
}

export function MarkdownTransform(): Plugin {
  return {
    name: 'vexip-md-transform',

    enforce: 'pre',

    async transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      const componentId = path.basename(id, '.md')
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.glob('@docs/demos/${componentId}/**/*.vue', { eager: true, import: 'default' })
const codes = import.meta.glob('@docs/demos/${componentId}/**/*.vue', { eager: true, as: 'raw' })
`
        ]
      }

      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      )
    }
  }
}
