import { saveAs } from 'file-saver'
import index from './template/index.html?raw'
import main from './template/main.js?raw'
import pkg from './template/package.json'
import config from './template/vite.config.js?raw'
import readme from './template/README.md?raw'

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
      (pkg.dependencies as any)[name] = `${versions[name]}`
    }
  }

  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', JSON.stringify(pkg, null, 2))
  zip.file('vite.config.js', config)
  zip.file('README.md', readme)

  // project src
  const src = zip.folder('src')!
  src.file('main.js', main)

  const files = store.getFiles()

  for (const file in files) {
    const filename = stripSrcPrefix(file)
    if (['import-map.json', 'main.ts'].includes(filename)) {
      continue
    }
    if (filename === 'tsconfig.json') {
      zip.file(filename, files[file])
    } else {
      src.file(filename, files[file])
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'vexip-project.zip')
}

function stripSrcPrefix(file: string) {
  return file.replace(/^src\//, '')
}
