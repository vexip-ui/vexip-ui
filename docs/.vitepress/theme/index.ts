import './style/index.scss'

import { h } from 'vue'

import { type App, type MetaHTMLAttributes, type Ref } from 'vue'

import { useData, withBase } from 'vitepress'
import { Loading, install as VexipUI } from 'vexip-ui'
import { isClient, isColor } from '@vexip-ui/utils'
import { i18n, langOptions, vexipuiLocale } from './i18n'
import { installGlobals } from './globals'
import { computeSeriesColors } from './common/series-color'

import Layout from './app.vue'
import prismjs from 'prismjs'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

import type { HeadConfig, Router } from 'vitepress'

export default {
  Layout() {
    const { theme } = useData()
    const head = theme.value.head

    setMetaHead(head)

    return h(Layout)
  },
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
  installGlobals(app)

  app.use(i18n).use(VexipUI, {
    locale: vexipuiLocale,
    props: {
      default: {
        transfer: true,
        autoRemove: true
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
    isClient && history.replaceState(null, document.title, `/${locale.value}/`)
  }

  syncLocale(currentPath)

  router.onBeforeRouteChange = to => {
    const url = getPath(to)

    syncLocale(url)
    startLoading(url)
  }

  router.onAfterRouteChanged = to => {
    clearLoading(getPath(to))

    isClient && syncMetaTitle()
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

function syncMetaTitle() {
  const titleMetaEl = document.querySelector('meta[property="og:title"]') as MetaHTMLAttributes

  if (!titleMetaEl) return

  const titleEl = document.querySelector('title')
  const title = titleEl?.textContent!.replace(/\s\|.*/, '') || 'Vexip UI'
  const newTitle = `${title} | ${titleMetaEl?.content?.replace(/.*\s\|\s/, '')}`

  titleMetaEl.content = newTitle
}

function isMeta(headConfig: HeadConfig) {
  return headConfig[0] === 'meta'
}

function createHeadElement([tag, attrs, innerHTML]: any[]) {
  const el = document.createElement(tag)
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
  if (innerHTML) {
    el.innerHTML = innerHTML
  }
  return el
}

function setMetaHead(headList: HeadConfig[]) {
  for (const headConfig of headList) {
    if (isMeta(headConfig)) {
      const el = createHeadElement(headConfig)
      document.head.appendChild(el)
    }
  }
}
