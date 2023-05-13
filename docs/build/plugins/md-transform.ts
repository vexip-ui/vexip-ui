import { basename } from 'node:path'
import { readFile } from 'node:fs/promises'
import { resolveModule } from 'local-pkg'
import { toCapitalCase } from '@vexip-ui/utils'

import type { Plugin } from 'vite'

export function markdownTransform(): Plugin {
  const componentRE = /[\\/]component[\\/].+\.md/

  let components: string[]

  return {
    name: 'md-transform',

    enforce: 'pre',

    async buildStart() {
      components = await loadComponents()
    },

    async transform(code, id) {
      if (!componentRE.test(id)) {
        return
      }

      const componentId = basename(id, '.md')
      // const lang = getLang(id)

      if (components.includes(toCapitalCase(componentId))) {
        code = convertContributors(componentId, code)
      }

      return code
    }
  }
}

function convertContributors(componentId: string, code: string) {
  const contributorInfo = `<Contributors source="${componentId}" />\n`
  code += contributorInfo
  return code
}

async function loadComponents() {
  const metaPath = 'vexip-ui/meta-data/components.json'

  try {
    const root = resolveModule(metaPath) || process.cwd()
    const path = resolveModule(metaPath) || resolveModule(metaPath, { paths: [root] })
    const metaData = JSON.parse(await readFile(path!, 'utf-8'))

    return metaData.components || []
  } catch (e) {
    console.error(e)
  }
}
