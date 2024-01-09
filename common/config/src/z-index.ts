import { computed, getCurrentInstance, inject, provide, unref } from 'vue'

import { isClient, isDefined } from '@vexip-ui/utils'

import type { App, ComputedRef, MaybeRef } from 'vue'

export const PROVIDED_Z_INDEX = '___vxp-provided-z-index'

let counter = 0
let initZIndex = 2000

if (isClient) {
  const rootStyle = getComputedStyle(document.documentElement)
  const cssZIndex = parseFloat(rootStyle.getPropertyValue('--vxp-z-index-popup').trim())

  if (!Number.isNaN(cssZIndex)) {
    initZIndex = cssZIndex
  }
}

export const globalZIndex = computed(() => initZIndex)

function getOrDefault(num: number, def: number) {
  return isDefined(num) && !Number.isNaN(num) ? num : def
}

/**
 * Provide a z-index config for under components.
 *
 * @param sourceZIndex z-index config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configZIndex(sourceZIndex: MaybeRef<number>, app?: App) {
  if (app) {
    const zIndex = computed(() => {
      const zIndex = unref(sourceZIndex)

      return getOrDefault(zIndex, globalZIndex.value)
    })

    app.provide(PROVIDED_Z_INDEX, zIndex)
  } else {
    const upstreamZIndex = inject<ComputedRef<number> | null>(PROVIDED_Z_INDEX, null)
    const zIndex = computed(() => {
      const zIndex = unref(sourceZIndex)

      return getOrDefault(
        zIndex,
        upstreamZIndex ? getOrDefault(upstreamZIndex.value, globalZIndex.value) : globalZIndex.value
      )
    })

    provide(PROVIDED_Z_INDEX, zIndex)
  }
}

export function useZIndex() {
  const zIndex = getCurrentInstance()
    ? inject<ComputedRef<number>>(PROVIDED_Z_INDEX, globalZIndex)
    : globalZIndex

  // return computed(() => zIndex.value + counter++)
  return () => zIndex.value + counter++
}
