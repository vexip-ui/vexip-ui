import { computed, reactive, ref, toRefs, watch, watchEffect } from 'vue'
import { File, compileFile, mergeImportMap, useStore } from '@vue/repl'

import { Confirm } from 'vexip-ui'
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import { compare } from 'compare-versions'
import { debounce } from '@vexip-ui/utils'
import { getCdnUrl } from './cdn'
import { locale } from './locale'
import mainCode from './templates/main.ts?raw'
import appCode from './templates/app.vue?raw'
import themeCode from './templates/theme.vue?raw'
import tsconfigCode from './templates/tsconfig.json?raw'

import type { ImportMap, OutputModes, Store, StoreState } from '@vue/repl'

type ReplOptions = {
  serializedState?: string,
  versions?: Record<string, string>,
  showOutput?: boolean,
  outputMode?: OutputModes
}

interface PathMeta {
  name: string,
  pkg?: string,
  path: string
}

// repl internal files
const IMPORT_MAP = 'import-map.json'
const TSCONFIG = 'tsconfig.json'

const mainFile = 'src/main.ts'
const appFile = 'src/App.vue'
const themeFile = 'src/ThemeSwitch.vue'
const importsFile = 'src/imports.json'

const pkgMetaList: (PathMeta | ((versions: Record<string, string>) => PathMeta))[] = [
  { name: 'vue', path: 'dist/vue.runtime.esm-browser.js' },
  { name: '@vue/shared', path: 'dist/shared.esm-bundler.js' },
  { name: 'vexip-ui', path: 'dist/vexip-ui.mjs' },
  versions => {
    const version = versions['vexip-ui']
    return !version || compare(version, '2.3.21', '>')
      ? {
          name: 'vexip-ui/vexip-ui.css',
          pkg: 'vexip-ui',
          path: 'dist/vexip-ui.css',
        }
      : {
          name: 'vexip-ui/style.css',
          pkg: 'vexip-ui',
          path: 'dist/style.css',
        }
  },
  { name: '@vexip-ui/icons', path: 'dist/index.mjs' },
  { name: '@vexip-ui/utils', path: 'dist/index.mjs' },
  { name: 'lucide-vue-next', path: 'dist/esm/lucide-vue-next.js' },
]

const internalFiles: Record<string, string> = {
  [themeFile]: themeCode,
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
    ...options,
  }

  const versions = reactive({ ...options.versions })

  const files: StoreState['files'] = ref(initFiles())

  const internalImports = computed(() => buildImports(versions))
  const importMap = computed(() => {
    return <ImportMap>{
      imports: {
        ...internalImports.value,
      },
    }
  })

  const state: Partial<StoreState> = toRefs(
    reactive({
      mainFile,
      files,
      activeFilename: appFile,
      builtinImportMap: importMap,
      showOutput: !!options.showOutput,
      outputMode: (options.outputMode || 'preview') as Store['outputMode'],
      vueVersion: computed(() => versions.vue || 'latest'),
      typescriptVersion: versions.typescript || 'latest',
      template: {
        welcomeSFC: mainCode,
      },
      sfcOptions: {
        script: {
          propsDestructure: true,
        },
      },
    }),
  )

  const store = useStore(state)

  watch(
    importMap,
    value => {
      store.files[IMPORT_MAP].code = JSON.stringify(
        mergeImportMap(JSON.parse(store.files[IMPORT_MAP].code), value),
        null,
        2,
      )
    },
    { deep: true },
  )
  watch(
    () => versions['vexip-ui'],
    () => {
      const version = versions['vexip-ui']
      const isNewStyle = !version || compare(version, '2.3.21', '>')

      store.files[mainFile] = new File(
        mainFile,
        mainCode.replace(
          '__VEXIP_UI_STYLE__',
          getCdnUrl(
            'vexip-ui',
            isNewStyle ? 'dist/vexip-ui.css' : 'dist/style.css',
            versions['vexip-ui'],
          ),
        ),
        true,
      )

      compileFile(store, store.files[mainFile]).then(errors => {
        store.errors = errors
      })
    },
    { immediate: true, deep: true },
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

  function initFiles() {
    const files: Record<string, File> = Object.create(null)

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

    if (!files[TSCONFIG]) {
      files[TSCONFIG] = new File(TSCONFIG, tsconfigCode)
    }

    return files
  }

  function buildImports(versions: Record<string, string> = {}) {
    const imports: Record<string, string> = Object.create(null)

    for (const meta of pkgMetaList) {
      const { name, pkg, path } = typeof meta === 'function' ? meta(versions) : meta

      if ((!name && !pkg) || !path) continue

      imports[name] = getCdnUrl(pkg || name, path, versions[pkg || name] || 'latest')
    }

    return imports
  }

  async function loadCompiler(version?: string) {
    const compilerUrl = getCdnUrl('@vue/compiler-sfc', 'dist/compiler-sfc.esm-browser.js', version)

    store.compiler = await import(/* @vite-ignore */ compilerUrl)
  }

  async function init() {
    await setVersion('vue', store.vueVersion || 'latest')

    watchEffect(() => {
      compileFile(store, store.activeFile).then(errors => {
        store.errors = errors
      })
    })

    for (const file of Object.values(store.files)) {
      compileFile(store, file).then(errors => {
        store.errors.push(...errors)
      })
    }

    const reloadLanguageTools = debounce(() => store.reloadLanguageTools?.(), 300)

    watch(
      () => [
        store.files[TSCONFIG]?.code,
        store.typescriptVersion,
        store.locale,
        store.dependencyVersion,
        store.vueVersion,
      ],
      reloadLanguageTools,
      { deep: true },
    )
  }

  function deleteFile(filename: string) {
    const { doDelete, del, cancel } = locale

    Confirm.open({
      content: doDelete.replace('#{0}', filename),
      confirmType: 'error',
      confirmText: del,
      cancelText: cancel,
    }).then(isConfirm => {
      if (!isConfirm) return

      if (store.activeFile.filename === filename) {
        store.setActive(appFile)
      }

      delete store.files[filename]
    })
  }

  function serialize() {
    return '#' + utoa(JSON.stringify(getFiles()))
  }

  function getFiles() {
    const exported: Record<string, string> = Object.create(null)

    for (const filename of Object.keys(store.files)) {
      if (!internalFiles[filename]) {
        exported[filename] = store.files[filename].code
      }
    }

    return exported
  }

  async function setVersion(key: string, version: string) {
    versions[key] = version

    switch (key) {
      case 'vue':
        await loadCompiler(version)
        break
      case 'typescript':
        store.typescriptVersion = version
        break
    }
  }

  const storeExtra = {
    versions,
    dark: false,
    init,
    serialize,
    deleteFile,
    getFiles,
    setVersion,
  }

  Object.assign(store, storeExtra)

  return store as Omit<typeof store, 'init'> & typeof storeExtra
}

export type ReplStore = ReturnType<typeof useReplStore>
