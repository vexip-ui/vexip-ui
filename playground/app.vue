<template>
  <Header :store="store"></Header>
  <Repl
    show-compile-output
    auto-resize
    :clear-console="false"
    :store="store"
    :sfc-options="sfcOptions"
  ></Repl>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { Repl, ReplStore as _ReplStore } from '@vue/repl'
import { Confirm } from 'vexip-ui'
import Header from './components/header.vue'

class ReplStore extends _ReplStore {
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
}

const mianCode = `import { createApp } from 'vue'
import { install } from 'vexip-ui'
import App from './App.vue'
import ThemeSwitch from './ThemeSwitch.vue'

App.name = 'Repl'

const app = window.__app__ = createApp(App)

app.config.unwrapInjectedRef = true
app.config.errorHandler = e => console.error(e)

app.use(install)

new Promise((resolve, reject) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = './style.css'
  link.onload = resolve
  link.onerror = reject
  document.body.appendChild(link)
}).then(() => app.component('ThemeSwitch', ThemeSwitch).mount('#app'))
`

const welcomeCode = `<template>
  <Button type="primary" :icon="MagnifyingGlass">{{ msg }}</Button>

  <!-- This is the dark theme trigger -->
  <ThemeSwitch></ThemeSwitch>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'

const msg = ref('Hello World!')
${'</'}script>
`

const themeCode = `<template>
  <div style="padding: 20px 0;">
    <span style="margin-right: 10px;">Toggle Dark:</span>
    <Switcher v-model:value="isDark" class="theme-switch" :icon="isDark ? Moon : Sun"></Switcher>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sun, Moon } from '@vexip-ui/icons'

const rootCls = document.documentElement.classList
const isDark = ref(${document.documentElement.classList.contains('dark') ? 'true' : 'false'})

if (isDark.value) {
  rootCls.add('dark')
}

watch(isDark, value => {
  value ? rootCls.add('dark') : rootCls.remove('dark')
})
${'</'}script>

<style>
body {
  color: var(--vxp-content-color-base);
  background-color: var(--vxp-bg-color-base);
  transition: var(--vxp-transition-color), var(--vxp-transition-background);
}

.theme-switch {
  border: 1px solid var(--vxp-border-color-base);
}

html.dark .theme-switch {
  --vxp-switcher-bg-color-open: #{rgba(#fff, 0.05)};
  --vxp-switcher-signal-bg-color: #000;
  --vxp-switcher-icon-color: var(--vxp-content-color-secondary);
  --vxp-switcher-shadow-focus: unset;
}
</style>
`

const setVH = () => {
  document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')
}
window.addEventListener('resize', setVH)
setVH()

const serializedState = location.hash.slice(1)
const vueRuntimeUrl = import.meta.env.PROD
  ? `${location.origin}/vue.runtime.esm-browser.js`
  : `${location.origin}/proxy/vue`
const vueServerRendererUrl = import.meta.env.PROD
  ? `${location.origin}/server-renderer.esm-browser.js`
  : `${location.origin}/proxy/vue-server`

const store = new ReplStore({
  serializedState,
  defaultVueRuntimeURL: vueRuntimeUrl,
  defaultVueServerRendererURL: vueServerRendererUrl
})

store.setImportMap({
  imports: {
    // vue: vueRuntimeUrl,
    'vexip-ui': import.meta.env.PROD
      ? `${location.origin}/vexip-ui.js`
      : `${location.origin}/vexip-ui.es.js`,
    '@vexip-ui/icons': import.meta.env.PROD
      ? `${location.origin}/vexip-ui-icons.js`
      : `${location.origin}/icons/index.es.js`
  }
})
;(!serializedState
  ? store.setFiles(
    {
      'import-map.json': store.getFiles()['import-map.json'],
      'main.ts': mianCode,
      'App.vue': welcomeCode,
      'ThemeSwitch.vue': themeCode
    },
    'main.ts'
  )
  : store.setFiles(store.getFiles(), 'main.ts')
).then(() => {
  store.state.files['main.ts'].hidden = true
  store.setActive('App.vue')
})

// enable experimental features
const sfcOptions = {
  script: {
    // refTransform: true,
    reactivityTransform: true
  }
}

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<style lang="scss">
body {
  --base: var(--vxp-content-color-base);
  --nav-height: 50px;

  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 13px;
}

.vue-repl {
  height: calc(var(--vh) - var(--nav-height));
}

.vue-repl,
.file-selector,
.tab-buttons,
.iframe-container {
  transition: var(--vxp-transition-background), var(--vxp-transition-border);
}

.import-map-wrapper {
  background-color: transparent !important;
  background-image: none !important;
}

/* stylelint-disable-next-line selector-class-pattern */
.CodeMirror-gutters,
.split-pane .left {
  transition: var(--vxp-transition-border);
}

.iframe-container {
  background-color: var(--bg) !important;
}
</style>
