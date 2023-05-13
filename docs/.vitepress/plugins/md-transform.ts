import { readFile } from 'node:fs/promises'
import { basename, relative, resolve, sep } from 'node:path'
import type { Plugin } from 'vite'
import { resolveModule } from 'local-pkg'
import { toCapitalCase } from '@vexip-ui/utils'

let components: string[]
const docsRoot = resolve(__dirname, '../..')

export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) {
        return
      }
      if (/[\\/]guide[\\/]/.test(id)) {
        return code
      }

      const componentId = basename(id, '.md')
      const lang = getLang(id)

      await queryMetaData()
      if (components.includes(toCapitalCase(componentId))) {
        code = convertContributor(lang, componentId, code)
      }

      return code
    }
  }
}

function convertContributor(lang: string, componentId: string, code: string) {
  const contributorText = lang === 'zh-CN' ? '贡献者' : 'Contributor'
  const contributorInfo = `
### ${contributorText}

<Contributor source="${componentId}" />
`
  code += contributorInfo
  return code
}

function getLang(id: string) {
  return relative(docsRoot, id).split(sep)[0]
}

async function queryMetaData() {
  try {
    const root = resolveModule('vexip-ui/meta-data/components.json') || process.cwd()
    const path =
      resolveModule('vexip-ui/meta-data/components.json') ||
      resolveModule('vexip-ui/meta-data/components.json', { paths: [root] })
    const metaData = JSON.parse(await readFile(path!, 'utf-8'))

    components = metaData.components || []
  } catch (e) {
    console.error(e)
    throwLoadError()
  }
}

function throwLoadError() {
  throw new Error('[vexip-ui:plugins] failed to load vexip-ui, have you installed it?')
}
