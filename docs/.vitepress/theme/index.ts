import './style/index.scss'

import { withBase } from 'vitepress'
import { install, Loading } from 'vexip-ui'
import { isClient, isColor } from '@vexip-ui/utils'
import prismjs from 'prismjs'
import { langOptions, i18n, vexipuiLocale } from './i18n'
import { computeSeriesColors } from './common/series-color'

import Layout from './app.vue'
import NotFound from './components/not-found.vue'
import AudioButton from './components/audio-button.vue'
import IconDemo from './components/icon-demo.vue'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

import type { App } from 'vue'
import type { Router } from 'vitepress'

export default {
  NotFound,
  Layout,
  enhanceApp({ app, router }: { app: App, router: Router }) {
    (prismjs as any).manual = false

    syncThemeColors()
    enhanceApp(app)
    enhanceRouter(router)
  }
}

function syncThemeColors() {
  if (!isClient) return

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

function enhanceApp(app: App) {
  app
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

function enhanceRouter(router: Router) {
  const loadedMap = new Map<string, boolean>()

  router.onBeforeRouteChange = to => {
    const url = new URL(to, 'http://a.com').pathname

    syncLocale(url)
    startLoading(url)
  }

  router.onAfterRouteChanged = to => {
    const url = new URL(to, 'http://a.com').pathname

    clearLoading(url)
  }

  function syncLocale(to: string) {
    for (const lang of langOptions) {
      const path = withBase(`/${lang}`)

      if (to.startsWith(path)) {
        i18n.global.locale.value = lang
        vexipuiLocale.value.locale = lang
      }
    }
  }

  function startLoading(to: string) {
    if (!isClient) return

    const loaded = !!loadedMap.get(to)

    if (!loaded) {
      Loading.open(5)
    }
  }

  function clearLoading(to: string) {
    if (!isClient) return

    loadedMap.set(to, true)

    requestAnimationFrame(() => {
      Loading.open(100)
    })
  }
}
