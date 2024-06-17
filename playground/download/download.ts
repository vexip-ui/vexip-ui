import { saveAs } from 'file-saver'

import index from './template/index.html?raw'
import main from './template/main.ts?raw'
import pkg from './template/package.json'
import config from './template/vite.config.js?raw'
import readme from './template/README.md?raw'
import vueDts from './template/vue.d.ts?raw'

import type { ReplStore } from '../store'

export async function downloadProject(store: ReplStore) {
  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()
  const versions: Record<string, string> = {
    vue: __VUE_VERSION__,
    'vexip-ui': __VERSION__,
    ...store.versions
  }

  for (const name of Object.keys(pkg.dependencies)) {
    if (versions[name]) {
      ;(pkg.dependencies as any)[name] = `${versions[name]}`
    }
  }

  const files = store.getFiles()

  for (const file in files) {
    if (file === 'import-map.json') {
      continue
    }

    zip.file(file, files[file])
  }

  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', JSON.stringify(pkg, null, 2) + '\n')
  zip.file('vite.config.js', config)
  zip.file('README.md', readme)

  zip.file('src/main.ts', main)
  zip.file('src/vue.d.ts', vueDts)

  const blob = await zip.generateAsync({ type: 'blob' })

  saveAs(blob, 'vexip-project.zip')
}
