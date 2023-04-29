import './style/index.scss'

import { createApp as _createApp, createSSRApp } from 'vue'
import App from './app.vue'
import { install } from 'vexip-ui'
import { isClient, isColor } from '@vexip-ui/utils'
import prismjs from 'prismjs'
import { createRouter } from './router'
import { i18n, vexipuiLocale } from './i18n'
import Markdown from './common/markdown.vue'
import AudioButton from './common/audio-button.vue'
import { IconDemo } from './common/icon-demo'
import { computeSeriesColors } from './common/series-color'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

export async function createApp() {
  (prismjs as any).manual = false

  if (isClient) {
    const isDark = localStorage.getItem('vexip-docs-theme-prefer-dark')
    const majorColor = localStorage.getItem('vexip-docs-prefer-major-color')

    if (isDark === 'true' || matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }

    if (majorColor && isColor(majorColor)) {
      document.documentElement.style.setProperty('--vxp-color-primary-base', majorColor)
      computeSeriesColors(majorColor)
    }
  }

  const router = createRouter()
  const app = (__SSR__ ? createSSRApp : _createApp)(App)
    .component('Markdown', Markdown)
    .component('AudioButton', AudioButton)
    .component('IconDemo', IconDemo)
    .use(i18n)
    .use(install, {
      locale: vexipuiLocale,
      props: {
        default: {
          transfer: true
        }
      }
    })
    .use(router)

  return { app, router }
}
