import './style/index.scss'

import { install } from 'vexip-ui'
import { isClient, isColor } from '@vexip-ui/utils'
import prismjs from 'prismjs'
import Layout from './app.vue'
import NotFound from '../../views/not-found.vue'
import Markdown from '../../common/markdown.vue'
import AudioButton from '../../common/audio-button.vue'
import { IconDemo } from '../../common/icon-demo'
import { i18n, vexipuiLocale } from '../../i18n'
import { computeSeriesColors } from '../../common/series-color'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

import type { App } from 'vue'

export default {
  NotFound,
  Layout,
  enhanceApp({ app }: { app: App }) {
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

    app
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
  }
}
