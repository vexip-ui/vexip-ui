import { computed, reactive, ref, shallowRef, watch, watchEffect } from 'vue'
import { File, compileFile } from '@vue/repl'

import { Confirm } from 'vexip-ui'
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import { getCdnUrl } from './cdn'
import { locale } from './locale'
import mainCode from './templates/main.ts?raw'
import appCode from './templates/app.vue?raw'
import themeCode from './templates/theme.vue?raw'
import tsconfigCode from './templates/tsconfig.json?raw'

import type { Store, StoreOptions, StoreState } from '@vue/repl'

type ReplOptions = Omit<StoreOptions, 'defaultVueRuntimeURL' | 'defaultVueServerRendererURL'> & {
  versions?: Record<string, string>
}

interface PathMeta {
  pkg: string,
  path: string
}

interface ImportMap {
  imports?: Record<string, string>,
  scopes?: Record<string, string>
}

// repl internal files
const IMPORT_MAP = 'import-map.json'
const TSCONFIG = 'tsconfig.json'

const mainFile = 'src/main.ts'
const appFile = 'src/App.vue'
const themeFile = 'src/ThemeSwitch.vue'
const importsFile = 'src/imports.json'

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
  '@vexip-ui/utils': 'dist/index.mjs'
}

const internalFiles: Record<string, string> = {
  [themeFile]: themeCode
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

export function useReplStore(options: ReplOptions = {}) {
  options = {
    serializedState: '',
    showOutput: false,
    outputMode: 'preview',
    versions: {},
    ...options
  }

  const versions = reactive({ ...options.versions })
  const compiler = shallowRef<typeof import('vue/compiler-sfc')>()

  const files: StoreState['files'] = {}

  if (options.serializedState) {
    const saved = JSON.parse(atou(options.serializedState))

    for (const name of Object.keys(saved)) {
      const filename = normalizeFilename(name)

      files[filename] = new File(filename, saved[name])
    }
  } else {
    files[appFile] = new File(appFile, appCode)
  }

  for (const name of Object.keys(internalFiles)) {
    const filename = normalizeFilename(name)

    files[filename] = new File(filename, internalFiles[name], true)
  }

  if (!files[IMPORT_MAP]) {
    files[IMPORT_MAP] = new File(IMPORT_MAP, JSON.stringify({ imports: {} }, undefined, 2) + '\n')
  }

  if (!files[TSCONFIG]) {
    files[TSCONFIG] = new File(TSCONFIG, tsconfigCode)
  }

  const state: StoreState = reactive({
    mainFile,
    files,
    activeFile: files[appFile],
    errors: [],
    resetFlip: false,
    vueRuntimeURL: '',
    vueServerRendererURL: '',
    typescriptLocale: undefined,
    typescriptVersion: computed(() => versions.typescript || 'latest')
  })

  const customImports = computed(() => {
    const code = state.files[importsFile]?.code.trim()
    let map: ImportMap = {}

    if (!code) return map

    try {
      map = JSON.parse(code)
    } catch (e) {
      console.error(e)
    }

    return map
  })
  const internalImports = computed(() => buildImports(versions))
  const importMap = computed(() => {
    return <ImportMap>{
      imports: {
        ...internalImports.value,
        ...(customImports.value.imports || {})
      },
      scopes: customImports.value.scopes
    }
  })

  const store: Store = reactive({
    state,
    compiler: compiler as any,
    initialShowOutput: !!options.showOutput,
    initialOutputMode: (options.outputMode || 'preview') as Store['initialOutputMode'],
    init,
    setActive,
    addFile,
    deleteFile,
    renameFile,
    getImportMap,
    getTsConfig,
    reloadLanguageTools: undefined,
    customElement: /\.ce\.vue$/
  })

  // watch(
  //   importMap,
  //   value => {
  //     state.files[IMPORT_MAP] = new File(
  //       IMPORT_MAP,
  //       JSON.stringify(value, null, 2),
  //       true
  //     )
  //   },
  //   { immediate: true, deep: true }
  // )
  watch(
    () => versions['vexip-ui'],
    () => {
      state.files[mainFile] = new File(
        mainFile,
        mainCode.replace(
          '__VEXIP_UI_STYLE__',
          getCdnUrl('vexip-ui', 'dist/style.css', versions['vexip-ui'])
        ),
        true
      )

      compiler.value && compileFile(store, state.files[mainFile])
    },
    { immediate: true, deep: true }
  )

  function normalizeFilename(origin: string) {
    if (origin === importsFile) {
      origin = IMPORT_MAP
    }

    if (origin === IMPORT_MAP || origin === TSCONFIG || origin.startsWith('src/')) {
      return origin
    }

    return `src/${origin}`
  }

  function buildImports(versions: Record<string, string> = {}) {
    const imports: Record<string, string> = {}

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

      imports[name] = getCdnUrl(pkg, path, versions[pkg] || 'latest')
    }

    return imports
  }

  async function loadCompiler(version?: string) {
    const compilerUrl = getCdnUrl('@vue/compiler-sfc', 'dist/compiler-sfc.esm-browser.js', version)
    const runtimeDom = getCdnUrl('@vue/runtime-dom', 'dist/runtime-dom.esm-browser.js', version)

    compiler.value = await import(/* @vite-ignore */ compilerUrl)
    state.vueRuntimeURL = runtimeDom
  }

  async function init() {
    if (!compiler.value) {
      await loadCompiler()
      watchEffect(() => compileFile(store, state.activeFile))
    }

    for (const file of Object.values(state.files)) {
      compileFile(store, file)
    }
  }

  function setActive(filename: string) {
    if (!internalFiles[filename]) {
      state.activeFile = state.files[filename]
    }
  }

  function addFile(fileOrFilename: string | File): void {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    state.files[file.filename] = file

    if (!file.hidden) setActive(file.filename)
  }

  function deleteFile(filename: string) {
    const { doDelete, del, cancel } = locale

    Confirm.open({
      content: doDelete.replace('#{0}', filename),
      confirmType: 'error',
      confirmText: del,
      cancelText: cancel
    }).then(isConfirm => {
      if (!isConfirm) return

      if (state.activeFile.filename === filename) {
        state.activeFile = state.files[appFile]
      }

      delete state.files[filename]
    })
  }

  function renameFile(oldName: string, newName: string) {
    const file = state.files[oldName]

    if (
      !file ||
      !newName ||
      oldName === newName ||
      file.hidden ||
      [appFile].includes(file.filename)
    ) {
      return
    }

    file.filename = newName

    const files = { ...state.files }

    delete files[oldName]
    files[newName] = file
    state.files = files

    compileFile(store, file)
  }

  function serialize() {
    return '#' + utoa(JSON.stringify(getFiles()))
  }

  function getFiles() {
    const exported: Record<string, string> = {}

    for (const filename of Object.keys(state.files)) {
      if (!internalFiles[filename]) {
        exported[filename] = state.files[filename].code
      }
    }

    return exported
  }

  function getImportMap() {
    return importMap.value
  }

  function getTsConfig() {
    try {
      return JSON.parse(state.files[TSCONFIG].code)
    } catch (e) {
      return {}
    }
  }

  async function setVersions(newVersions: Record<string, string>) {
    Object.assign(versions, newVersions)
  }

  return {
    ...store,

    versions,
    dark: ref(false),
    init,
    serialize,
    getFiles,
    setVersions
  }
}

export type ReplStore = ReturnType<typeof useReplStore>
