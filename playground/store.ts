import { shallowRef, reactive, computed, watch, watchEffect } from 'vue'
import { Confirm } from 'vexip-ui'
import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'
import { File, compileFile } from '@vue/repl'
import mainCode from './templates/main.js?raw'
import appCode from './templates/app.vue?raw'
import themeCode from './templates/theme.vue?raw'

import type { Store, StoreOptions, StoreState } from '@vue/repl'

type ReplOptions = Omit<StoreOptions, 'defaultVueRuntimeURL' | 'defaultVueServerRendererURL'> & {
  versions?: Record<string, string>
}

interface PathMeta {
  pkg: string,
  path: string
}

const mainFile = 'main.js'
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
  '@vexip-ui/utils': 'dist/index.mjs'
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

function getUnpkgUrl(pkg: string, path: string, version = 'latest') {
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

export function useReplStore(options: ReplOptions = {}) {
  options = {
    serializedState: '',
    showOutput: false,
    outputMode: 'preview',
    versions: {},
    ...options
  }

  const language = defaultLanguage
  const versions = reactive({ ...options.versions })

  const compiler = shallowRef<typeof import('vue/compiler-sfc')>()

  const files: StoreState['files'] = {}

  if (options.serializedState) {
    const saved = JSON.parse(atou(options.serializedState))

    for (const filename of Object.keys(saved)) {
      files[filename] = new File(filename, saved[filename])
    }
  } else {
    files[appFile] = new File(appFile, appCode)
  }

  for (const filename of Object.keys(inertnalFiles)) {
    files[filename] = new File(filename, inertnalFiles[filename], true)
  }

  const state = reactive<StoreState>({
    mainFile,
    files,
    activeFile: files[appFile],
    errors: [],
    resetFlip: false,
    vueRuntimeURL: '',
    vueServerRendererURL: ''
  })

  const importMap = computed(() => ({ imports: buildImportMap(versions) }))

  const store = reactive({
    state,
    compiler,
    initialShowOutput: options.showOutput,
    initialOutputMode: options.outputMode,
    init,
    setActive,
    addFile,
    deleteFile,
    getImportMap
  } as any as Store)

  watch(
    importMap,
    value => {
      state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(value, null, 2),
        true
      )
    },
    { immediate: true, deep: true }
  )
  watch(
    () => versions['vexip-ui'],
    () => {
      state.files[mainFile] = new File(
        mainFile,
        mainCode.replace(
          '__VEXIP_UI_STYLE__',
          getUnpkgUrl('vexip-ui', 'dist/style.css', versions['vexip-ui'])
        ),
        true
      )

      compiler.value && compileFile(store, state.files[mainFile])
    },
    { immediate: true, deep: true }
  )

  async function loadCompiler(version?: string) {
    const compilerUrl = getUnpkgUrl(
      '@vue/compiler-sfc',
      'dist/compiler-sfc.esm-browser.js',
      version
    )

    compiler.value = await import(/* @vite-ignore */ compilerUrl)
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
    if (!inertnalFiles[filename]) {
      state.activeFile = state.files[filename]
    }
  }

  function addFile(fileOrFilename: string | File): void {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    state.files[file.filename] = file

    if (!file.hidden) setActive(file.filename)
  }

  function deleteFile(filename: string) {
    const { confirm, ok, cancel } = localeConfig[language]

    Confirm.open({
      content: confirm.replace('#{0}', filename),
      confirmType: 'error',
      confirmText: ok,
      cancelText: cancel
    }).then(isConfirm => {
      if (!isConfirm) return

      if (state.activeFile.filename === filename) {
        state.activeFile = state.files[appFile]
      }

      delete state.files[filename]
    })
  }

  function serialize() {
    return '#' + utoa(JSON.stringify(getFiles()))
  }

  function getFiles() {
    const exported: Record<string, string> = {}

    for (const filename of Object.keys(state.files)) {
      if (!inertnalFiles[filename]) {
        exported[filename] = state.files[filename].code
      }
    }

    return exported
  }

  async function setFiles(newFiles: Record<string, string>) {
    const newFileNames = Object.keys(newFiles)
    const files: Record<string, File> = {}

    for (const filename of newFileNames) {
      files[filename] = new File(filename, newFiles[filename])
    }

    for (const filename of Object.keys(inertnalFiles)) {
      files[filename] = new File(filename, inertnalFiles[filename], true)
    }

    for (const file in files) {
      await compileFile(store, files[file])
    }

    state.files = files

    if (!newFileNames.includes(state.activeFile.filename)) {
      setActive(appFile)
    }

    state.resetFlip = !state.resetFlip
  }

  function getImportMap() {
    return importMap.value
  }

  async function setVersions(newVersions: Record<string, string>) {
    Object.assign(versions, newVersions)
  }

  return {
    ...store,

    versions,
    init,
    serialize,
    getFiles,
    setFiles,
    setVersions
  }
}

export type ReplStore = ReturnType<typeof useReplStore>
