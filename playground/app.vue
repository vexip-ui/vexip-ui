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
import { Confirm } from '@/components/confirm'
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
}).then(() => app.mount('#app'))
`

const welcomeCode = `<template>
  <Button type="primary">{{ msg }}</Button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const msg = ref('Hello World!')
${'</'}script>
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

const store = new ReplStore({
  serializedState,
  defaultVueRuntimeURL: vueRuntimeUrl
})

store.setImportMap({
  imports: {
    vue: vueRuntimeUrl,
    'vexip-ui': `${location.origin}/vexip-ui.es.js`
  }
})
;(serializedState
  ? store.setFiles(
    {
      'import-map.json': store.getFiles()['import-map.json'],
      'main.ts': mianCode,
      'App.vue': welcomeCode
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
    refTransform: true,
    propsDestructureTransform: true
  }
}

// persist state
watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>

<style lang="scss">
body {
  --base: #{$vxp-color-content-normal};
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
</style>
