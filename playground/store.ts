import { reactive, watchEffect } from 'vue'
import { Confirm } from 'vexip-ui'
import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'
import * as defaultCompiler from 'vue/compiler-sfc'
import { File, compileFile } from '@vue/repl'
import mainCode from './templates/main.vue?raw'
import appCode from './templates/app.vue?raw'
import themeCode from './templates/theme.vue?raw'

import type { Store, StoreOptions, StoreState, SFCOptions, OutputModes } from '@vue/repl'

type ReplOptions = Omit<StoreOptions, 'defaultVueRuntimeURL' | 'defaultVueServerRendererURL'> & {
  versions?: Record<string, string>
}

interface PathMeta {
  pkg: string,
  path: string
}

const mainFile = 'Main.vue'
const appFile = 'App.vue'
const themeFile = 'ThemeSwitch.vue'

const inertnalFiles: Record<string, string> = {
  [mainFile]: mainCode.replace('__VEXIP_UI_STYLE__', getUnpkgUrl('vexip-ui', 'dist/style.css')),
  [themeFile]: themeCode
}

const pkgPathMap: Record<string, string | PathMeta> = {
  vue: 'dist/vue.runtime.esm-browser.js',
  'vue/server-renderer': {
    pkg: '@vue/server-renderer',
    path: 'dist/server-renderer.esm-browser.js'
  },
  'vexip-ui': 'dist/vexip-ui.mjs',
  'vexip-ui/style.css': {
    pkg: 'vexip-ui',
    path: 'dist/style.css'
  },
  '@vexip-ui/icons': 'dist/index.mjs',
  '@vexip-ui/utils': 'dist/index.mjs',
  'vue-router': 'dist/vue-router.esm-browser.js'
}

const localeConfig = {
  en: {
    confirm: 'Are you sure you want to delete #{0}?',
    ok: 'Delete',
    cancel: 'Cancel'
  },
  zh: {
    confirm: '确定要删除 #{0} 吗？',
    ok: '删除',
    cancel: '取消'
  }
}

type Language = keyof typeof localeConfig

let defaultLanguage = (
  typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en'
) as Language

if (!localeConfig[defaultLanguage]) {
  defaultLanguage = 'en'
}

function getUnpkgUrl(pkg: string, path: string, version?: string) {
  if (!version || version === 'latest') {
    return `https://unpkg.com/${pkg}/${path}`
  }

  return `https://unpkg.com/${pkg}@${version}/${path}`
}

function buildImportMap(versions: Record<string, string> = {}) {
  const importMap: Record<string, string> = {}

  for (const name of Object.keys(pkgPathMap)) {
    const meta = pkgPathMap[name]

    let pkg = ''
    let path = ''

    if (typeof meta === 'string') {
      pkg = name
      path = meta
    } else {
      pkg = meta.pkg
      path = meta.path
    }

    if (!pkg || !path) continue

    importMap[name] = getUnpkgUrl(pkg, path, versions[pkg] || 'latest')
  }

  return importMap
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

export class ReplStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  options?: SFCOptions
  initialShowOutput: boolean
  initialOutputMode: OutputModes
  language = defaultLanguage
  versions: Record<string, string>

  constructor({
    serializedState = '',
    showOutput = false,
    outputMode = 'preview',
    versions = {}
  }: ReplOptions = {}) {
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
    this.versions = { ...versions }

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
    const { confirm, ok, cancel } = localeConfig[this.language]

    Confirm.open({
      content: confirm.replace('#{0}', filename),
      confirmType: 'error',
      confirmText: ok,
      cancelText: cancel
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
      const compilerUrl = getUnpkgUrl(
        '@vue/compiler-sfc',
        'dist/compiler-sfc.esm-browser.js',
        versions.vue
      )

      this.compiler = await import(/* @vite-ignore */ compilerUrl)
    }

    if (versions['vexip-ui'] && versions['vexip-ui'] !== this.versions['vexip-ui']) {
      const styleUrl = getUnpkgUrl('vexip-ui', 'dist/style.css', versions['vexip-ui'])

      this.state.files[mainFile].code = mainCode.replace('__VEXIP_UI_STYLE__', styleUrl)
    }

    this.versions = { ...versions }

    this.setImportMap({ imports: buildImportMap(this.versions) })
    this.forceSandboxReset()
  }

  resetVersions() {
    this.versions = {}
    this.compiler = defaultCompiler
    this.state.files[mainFile].code = mainCode.replace(
      '__VEXIP_UI_STYLE__',
      getUnpkgUrl('vexip-ui', 'dist/style.css')
    )

    this.setImportMap({ imports: buildImportMap(this.versions) })
    this.forceSandboxReset()
  }

  setLanguage(language: Language) {
    this.language = localeConfig[language] ? language : this.language
  }
}
