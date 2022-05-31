import './style/index.scss'

import { createApp } from 'vue'
import prismjs from 'prismjs'
import { install } from 'vexip-ui'
import { isColor } from '@vexip-ui/utils'
import App from './app.vue'
import { router } from './router'
import { i18n } from './i18n'
import Markdown from './common/markdown.vue'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

;(prismjs as any).manual = false

const isDark = localStorage.getItem('vexip-docs-theme-prefer-dark')
const majorColor = localStorage.getItem('vexip-docs-prefer-major-color')

if (isDark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}

if (majorColor && isColor(majorColor)) {
  document.documentElement.style.setProperty('--vxp-color-primary-base', majorColor)
}

createApp(App)
  .component('Markdown', Markdown)
  .use(i18n)
  .use(install)
  .use(router)
  .mount('#app')
