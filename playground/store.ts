import { reactive, watchEffect } from 'vue'
import { Confirm } from 'vexip-ui'
import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'
import * as defaultCompiler from 'vue/compiler-sfc'
import { File, compileFile } from '@vue/repl'
import mainCode from './templates/main.vue?raw'
import appCode from './templates/app.vue?raw'
import themeCode from './templates/theme.vue?raw'

import type {
  Store,
  StoreOptions as _StoreOptions,
  StoreState,
  SFCOptions,
  OutputModes
} from '@vue/repl'

type StoreOptions = Omit<_StoreOptions, 'defaultVueRuntimeURL' | 'defaultVueServerRendererURL'>

const mainFile = 'Main.vue'
const appFile = 'App.vue'
const themeFile = 'ThemeSwitch.vue'

const inertnalFiles: Record<string, string> = {
  [mainFile]: mainCode,
  [themeFile]: themeCode
}

const pkgPathMap: Record<string, string> = {
  vue: 'dist/vue.runtime.esm-browser.js',
  'vue/server-renderer': 'dist/server-renderer.esm-browser.js',
  'vexip-ui': 'dist/vexip-ui.mjs',
  '@vexip-ui/icons': 'dist/index.mjs',
  '@vexip-ui/utils': 'dist/index.mjs',
  'vue-router': 'vue-router.js'
}

const devPathMap: Record<string, string> = {
  vue: 'proxy/vue',
  'vue/server-renderer': 'proxy/vue-server',
  'vexip-ui': 'proxy/vexip-ui',
  '@vexip-ui/icons': 'proxy/icons',
  '@vexip-ui/utils': 'proxy/utils',
  'vue-router': 'proxy/vue-router'
}

// function getUnpkgLink(pkg: string, version: string, path: string) {
//   return `https://unpkg.com/${pkg}@${version}/${path}`
// }

function buildImportMap(versions: Record<string, string> = {}) {
  const importMap = { ...pkgPathMap }

  for (const pkg of Object.keys(importMap)) {
    const version = versions[pkg] || 'latest'

    if (version === 'latest') {
      importMap[pkg] = `${location.origin}/${
        import.meta.env.DEV ? devPathMap[pkg] : importMap[pkg]
      }`
    } else {
      importMap[pkg] = `https://unpkg.com/${pkg}@${version}/${importMap[pkg]}`
    }
  }

  return importMap
}

export class ReplStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  options?: SFCOptions
  initialShowOutput: boolean
  initialOutputMode: OutputModes
  versions: Record<string, string> = {}

  // private pendingCompiler: Promise<any> | null = null

  constructor({
    serializedState = '',
    showOutput = false,
    outputMode = 'preview'
  }: StoreOptions = {}) {
    const files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))

      for (const filename of Object.keys(saved)) {
        files[filename] = new File(filename, saved[filename])
      }
    } else {
      files[appFile] = new File(appFile, appCode)
    }

    for (const filename of Object.keys(inertnalFiles)) {
      files[filename] = new File(filename, inertnalFiles[filename], true)
    }

    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode as OutputModes

    this.state = reactive({
      mainFile,
      files,
      activeFile: files[appFile],
      errors: [],
      resetFlip: true,
      vueRuntimeURL: '',
      vueServerRendererURL: ''
    })

    this.state.mainFile = mainFile

    this.initImportMap()
  }

  init() {
    watchEffect(() => compileFile(this, this.state.activeFile))

    for (const file of Object.keys(this.state.files)) {
      compileFile(this, this.state.files[file])
    }
  }

  setActive(filename: string) {
    if (!inertnalFiles[filename]) {
      this.state.activeFile = this.state.files[filename]
    }
  }

  addFile(fileOrFilename: string | File): void {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    this.state.files[file.filename] = file

    if (!file.hidden) this.setActive(file.filename)
  }

  deleteFile(filename: string) {
    Confirm.open({
      content: `Are you sure you want to delete ${filename}?`,
      confirmType: 'error',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then(isConfirm => {
      if (!isConfirm) return

      if (this.state.activeFile.filename === filename) {
        this.state.activeFile = this.state.files[this.state.mainFile]
      }

      delete this.state.files[filename]
    })
  }

  serialize() {
    return '#' + utoa(JSON.stringify(this.getFiles()))
  }

  getFiles() {
    const exported: Record<string, string> = {}

    for (const filename of Object.keys(this.state.files)) {
      if (!inertnalFiles[filename]) {
        exported[filename] = this.state.files[filename].code
      }
    }

    return exported
  }

  async setFiles(newFiles: Record<string, string>) {
    const newFileNames = Object.keys(newFiles)
    const files: Record<string, File> = {}

    for (const filename of newFileNames) {
      files[filename] = new File(filename, newFiles[filename])
    }

    for (const filename of Object.keys(inertnalFiles)) {
      files[filename] = new File(filename, inertnalFiles[filename], true)
    }

    for (const file in files) {
      await compileFile(this, files[file])
    }

    this.state.mainFile = mainFile
    this.state.files = files

    if (!newFileNames.includes(this.state.activeFile.filename)) {
      this.setActive(mainFile)
    }

    this.initImportMap()
    this.forceSandboxReset()
  }

  private forceSandboxReset() {
    this.state.resetFlip = !this.state.resetFlip
  }

  private initImportMap() {
    const defaultMap = buildImportMap(this.versions)
    const map = this.state.files['import-map.json']

    if (!map) {
      this.state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: defaultMap
          },
          null,
          2
        )
      )
    } else {
      try {
        const json = JSON.parse(map.code)

        for (const name of Object.keys(defaultMap)) {
          if (!json.imports[name]) {
            json.imports[name] = defaultMap[name]
          }
        }

        map.code = JSON.stringify(json, null, 2)
      } catch (e) {}
    }
  }

  getImportMap() {
    try {
      return JSON.parse(this.state.files['import-map.json'].code)
    } catch (e) {
      this.state.errors = [`Syntax error in import-map.json: ${(e as Error).message}`]
      return {}
    }
  }

  setImportMap(map: {
    imports: Record<string, string>,
    scopes?: Record<string, Record<string, string>>
  }) {
    this.state.files['import-map.json']!.code = JSON.stringify(map, null, 2)
  }

  async setVersions(versions: Record<string, string>) {
    if (versions.vue && versions.vue !== this.versions.vue) {
      const compilerUrl = `https://unpkg.com/@vue/compiler@${versions.vue}/dist/compiler-sfc.esm-browser.js`

      this.compiler = await import(/* @vite-ignore */ compilerUrl)
    }

    this.versions = { ...versions }

    this.initImportMap()
    this.forceSandboxReset()
  }

  resetVersions() {
    this.versions = {}
    this.compiler = defaultCompiler

    this.initImportMap()
    this.forceSandboxReset()
  }
}

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)

  return btoa(binary)
}

function atou(base64: string): string {
  const binary = atob(base64)

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)

    return strFromU8(unzipped)
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary))
}
