import { reactive, ref, watch } from 'vue'

import { isClient } from '@vexip-ui/utils'
import { observeResize } from './resize'

import type { Ref } from 'vue'
import type { MaybeElement } from './shared/types'

export interface InitThemeOptions {
  name: string,
  rootClass?: string,
  varsClass?: string,
}

const styleId = '__theme_style__'
const elClass = '__theme_observer__'

const elCache = new WeakMap<Element, Element>()

export function useTheme(wrapper?: MaybeElement) {
  const theme = ref<string>()

  if (isClient) {
    wrapper = wrapper || document.body

    let observer = elCache.get(wrapper)

    if (!observer) {
      observer = createObserver(theme)!
      wrapper.appendChild(observer)
      elCache.set(wrapper, observer)
    }
  }

  return { theme }
}

const activeThemes = reactive(new Map<string, string[]>())
const themeWidths = new Map<number, string>()

watch(activeThemes, () => {
  if (!isClient) return

  themeWidths.clear()

  const prevStyle = document.head.querySelector(`#${styleId}`)

  if (prevStyle) {
    document.head.removeChild(prevStyle)
  }

  const style = document.createElement('style')

  let content = `.${elClass} { width: 1px }`
  let width = 1

  for (const [name, [rootClass, varsClass]] of activeThemes.entries()) {
    content += ` html.${rootClass} .${elClass}, .${varsClass} .${elClass} { width: ${++width}px }`
    themeWidths.set(width, name)
  }

  style.textContent = content
  style.id = styleId
  document.head.appendChild(style)
})

export function addActiveThemes(themes: (string | InitThemeOptions)[]) {
  for (const theme of themes) {
    const {
      name,
      rootClass = name,
      varsClass = `vxp-theme-vars-${rootClass}`,
    } = typeof theme === 'string' ? ({ name: theme } as InitThemeOptions) : theme

    activeThemes.set(name, [rootClass, varsClass])
  }
}

export function setActiveThemes(themes: (string | InitThemeOptions)[]) {
  activeThemes.clear()
  addActiveThemes(themes)
}

let idCount = 0

function getElId() {
  return `__theme_observer_${idCount++}__`
}

function createObserver(theme: Ref<string | undefined>) {
  if (!isClient) return

  const observer = document.createElement('div')

  observer.id = getElId()
  observer.className = elClass
  observer.role = 'none'
  observer.style.cssText =
    'position: fixed; top -10px; left: -10px; height: 1px; visibility: hidden;'

  observeResize(observer, entry => {
    if (!isClient) return

    const width = entry.borderBoxSize?.[0].inlineSize ?? entry.contentRect.width

    theme.value = themeWidths.get(width)
  })

  return observer
}
