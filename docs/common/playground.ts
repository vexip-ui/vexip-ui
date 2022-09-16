let playgroundUrl = 'https://playground.vexipui.com/'

let importMap = {
  imports: {
    'vexip-ui': `${playgroundUrl}vexip-ui.js`,
    '@vexip-ui/icons': `${playgroundUrl}vexip-ui-icons.js`,
    vue: `${playgroundUrl}vue.runtime.esm-browser.js`,
    'vue/server-renderer': `${playgroundUrl}server-renderer.esm-browser.js`,
    'vue-router': `${playgroundUrl}vue-router.js`
  }
}

if (import.meta.env.DEV) {
  playgroundUrl = 'http://localhost:6012/'

  importMap = {
    imports: {
      'vexip-ui': `${playgroundUrl}vexip-ui.es.js`,
      '@vexip-ui/icons': `${playgroundUrl}icons/index.es.js`,
      vue: `${playgroundUrl}proxy/vue`,
      'vue/server-renderer': `${playgroundUrl}proxy/vue-server`,
      'vue-router': `${playgroundUrl}proxy/vue-router`
    }
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

const getThemeCode = () => `<template>
  <div style="padding: 20px 0;">
    <span style="margin-right: 10px;">Toggle Dark:</span>
    <Switch v-model:value="isDark" class="theme-switch" :open-icon="Moon" :close-icon="Sun"></Switch>
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
  --vxp-switch-bg-color-open: #{rgba(#fff, 0.05)};
  --vxp-switch-signal-bg-color: #000;
  --vxp-switch-icon-color: var(--vxp-content-color-secondary);
  --vxp-switch-shadow-focus: unset;
}
</style>
`

function utoa(data: string) {
  return btoa(unescape(encodeURIComponent(data)))
}

export function usePlayground(code: string) {
  code = code.replace(
    /\n<\/template>/,
    '\n\r\n  <!-- This is the dark theme trigger -->\r\n  <ThemeSwitch></ThemeSwitch>\r\n</template>'
  )

  const meta = {
    'import-map.json': JSON.stringify(importMap),
    'main.ts': mianCode,
    'App.vue': code,
    'ThemeSwitch.vue': getThemeCode()
  }
  const encoded = utoa(JSON.stringify(meta))

  return { link: `${playgroundUrl}#${encoded}` }
}
