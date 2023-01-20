import {
  ref,
  reactive,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  inject
} from 'vue'
import { isClient, parseColorToRgba, mixColor, adjustAlpha, toFixed } from '@vexip-ui/utils'
import { LAYOUT_STATE } from './symbol'

import type { Ref } from 'vue'
import type { Color } from '@vexip-ui/utils'

const rootEl = isClient ? document.documentElement : undefined
const rootStyle = rootEl && getComputedStyle(rootEl)

export function computeSeriesColors(value: Color, storageName = '') {
  if (!rootEl || !rootStyle) return

  const colors: Record<string, string[]> = {
    light: [],
    opacity: [],
    dark: []
  }
  const black = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-black') || { r: 0, g: 0, b: 0, a: 1 }
  )
  const white = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-white') || { r: 255, g: 255, b: 255, a: 1 }
  )
  const style = rootEl.style

  for (let i = 1; i < 10; ++i) {
    const light = mixColor(white, value, i * 0.1).toString()
    const opacity = adjustAlpha(value, toFixed(1 - i * 0.1, 1)).toString()

    style.setProperty(`--vxp-color-primary-light-${i}`, light)
    style.setProperty(`--vxp-color-primary-opacity-${i}`, opacity)

    colors.light.push(light)
    colors.opacity.push(opacity)
  }

  for (let i = 1; i < 3; ++i) {
    const dark = mixColor(black, value, i * 0.1).toString()

    style.setProperty(`--vxp-color-primary-dark-${i}`, dark)
    colors.dark.push(dark)
  }

  style.setProperty('--vxp-color-primary-base', `${value}`)
  storageName && localStorage.setItem(storageName, `${value}`)

  return colors
}

export function useLayoutState() {
  return inject(
    LAYOUT_STATE,
    reactive({
      isLayout: false,
      locked: false,
      affixed: false,
      scrollY: 0,
      affixMatched: false,
      expanded: false,
      reduced: false,
      navConfig: false
    })
  )
}

const breakPoints = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])

export function useMediaQuery(query: Ref<string | boolean>) {
  const matched = ref(false)

  if (!isClient) return matched

  const computedStyle = getComputedStyle(document.documentElement)
  const computedQuery = computed(() => {
    if (breakPoints.includes(query.value as any)) {
      const usedQuery = query.value === 'xs' ? 'sm' : query.value
      const media = computedStyle.getPropertyValue(`--vxp-break-point-${usedQuery}`).trim()

      return `only screen and ${media}`
    }

    return query.value
  })

  let mediaQuery: MediaQueryList | undefined

  const update = () => {
    if (typeof computedQuery.value === 'boolean') {
      matched.value = computedQuery.value
      return
    }

    if (!computedQuery.value || computedQuery.value === 'min') {
      matched.value = false
      return
    }

    if (computedQuery.value === 'max') {
      matched.value = true
      return
    }

    if (!mediaQuery) {
      mediaQuery = matchMedia(computedQuery.value)
    }

    matched.value = mediaQuery.matches
  }

  watch(computedQuery, () => {
    mediaQuery = undefined
    update()
  })

  onBeforeMount(() => {
    update()
    mediaQuery?.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return matched
}

export function useUpdateCounter() {
  const counter = ref(0)

  onMounted(() => {
    counter.value++
  })
  onUpdated(() => {
    counter.value++
  })

  return counter
}
