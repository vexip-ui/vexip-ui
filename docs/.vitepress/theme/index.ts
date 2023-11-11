import './style/index.scss'

import { withBase } from 'vitepress'
import { Loading, install as VexipUI } from 'vexip-ui'
import { isClient, isColor } from '@vexip-ui/utils'
import { i18n, langOptions, vexipuiLocale } from './i18n'
import { installGlobals } from './globals'
import { computeSeriesColors } from './common/series-color'

import Layout from './app.vue'
import prismjs from 'prismjs'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

import type { App, Ref } from 'vue'
import type { Router } from 'vitepress'

export default {
  Layout,
  enhanceApp({ app, router }: { app: App, router: Router }) {
    prismjs.manual = true

    syncThemeColors()
    syncDirection()
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

function syncDirection() {
  if (!isClient) return

  const isRtl = localStorage.getItem('vexip-docs-direction-prefer-rtl')

  if (isRtl === 'true') {
    document.documentElement.classList.add('rtl')
    document.documentElement.dir = 'rtl'
  } else {
    document.documentElement.dir = 'ltr'
  }
}

function enhanceApp(app: App) {
  installGlobals(app)

  app.use(i18n).use(VexipUI, {
    locale: vexipuiLocale,
    props: {
      default: {
        transfer: true,
        autoRemove: true
      },
      confirm: {
        top: 100
      }
    }
  })
}

function enhanceRouter(router: Router) {
  const loadedMap = new Map<string, boolean>()
  const locale = i18n.global.locale as unknown as Ref<string>

  let currentPath = router.route.path

  if (isClient && location.pathname === '/') {
    currentPath = currentPath === '/' ? `/${locale.value}/` : currentPath
    // isClient && (window.location.href = currentPath)
  }

  syncLocale(currentPath)

  router.onBeforeRouteChange = to => {
    const url = getPath(to)

    syncLocale(url)
    startLoading(url)
  }

  router.onAfterRouteChanged = to => {
    clearLoading(getPath(to))
  }

  isClient &&
    window.addEventListener('popstate', () => {
      syncLocale(location.pathname)
    })

  function getPath(to: string) {
    return new URL(to, 'http://a.com').pathname
  }

  function syncLocale(to: string) {
    for (const lang of langOptions) {
      const path = withBase(`/${lang}`)

      if (to.startsWith(path)) {
        locale.value = lang
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
      Loading.close()
    })
  }
}
