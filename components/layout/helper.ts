import { currentBreakPoint } from '@/components/grid'

import { computed, inject, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue'

import { adjustAlpha, isClient, mixColor, noop, parseColorToRgba, toFixed } from '@vexip-ui/utils'
import { LAYOUT_STATE } from './symbol'

import type { Ref } from 'vue'
import type { Color } from '@vexip-ui/utils'
import type { BreakPoint } from '@/components/grid'
import type { LayoutMediaJudger, LayoutState } from './symbol'

const rootEl = isClient ? document.documentElement : undefined
const rootStyle = rootEl && getComputedStyle(rootEl)

export function computeSeriesColors(value: Color) {
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
      expandMatched: false,
      useExpand: false,
      expanded: false,
      reduced: false,
      navConfig: false,
      classes: Object.freeze({}),
      changeInLock: noop
    }) as LayoutState
  )
}

const breakPoints = Object.freeze<BreakPoint[]>(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])

export function useMediaQuery(query: Ref<boolean | string | LayoutMediaJudger>) {
  const matched = ref(false)
  const updateTrigger = ref(0)

  const computedStyle = isClient && getComputedStyle(document.documentElement)
  const computedQuery = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    updateTrigger.value

    if (typeof query.value !== 'function' && breakPoints.includes(query.value as any)) {
      const usedQuery = query.value === 'xs' ? 'sm' : query.value

      if (usedQuery === currentBreakPoint.value) return true

      const media =
        computedStyle && computedStyle.getPropertyValue(`--vxp-break-point-${usedQuery}`).trim()

      return media && `only screen and ${media}`
    }

    return query.value
  })

  let isMounted = false
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

    if (typeof computedQuery.value === 'function') {
      matched.value = computedQuery.value(currentBreakPoint.value)
      return
    }

    if (isMounted) {
      mediaQuery = matchMedia(computedQuery.value)
      mediaQuery?.addEventListener('change', update)
    }

    matched.value = mediaQuery!.matches
  }

  watch(computedQuery, () => {
    update()
  })

  onMounted(() => {
    ++updateTrigger.value
    isMounted = true
    update()
  })

  onBeforeUnmount(() => {
    isMounted = false
    mediaQuery?.removeEventListener('change', update)
    mediaQuery = undefined
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
