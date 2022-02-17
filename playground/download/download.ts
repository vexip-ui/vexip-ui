import { saveAs } from 'file-saver'

import index from './template/index.html?raw'
import main from './template/main.ts?raw'
import pkg from './template/package.json?raw'
import config from './template/vite.config.js?raw'
import readme from './template/README.md?raw'

export async function downloadProject(store: any) {
  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()

  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', pkg)
  zip.file('vite.config.js', config)
  zip.file('README.md', readme)

  // project src
  const src = zip.folder('src')!
  src.file('main.ts', main)

  const files = store.getFiles()
  for (const file in files) {
    if (file === 'main.ts' || file === 'import-map.json') {
      continue
    }

    src.file(file, files[file])
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'vexip-project.zip')
}
