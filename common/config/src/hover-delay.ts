import { computed, getCurrentInstance, inject, provide, unref } from 'vue'

import { isDefined } from '@vexip-ui/utils'

import type { App, ComputedRef } from 'vue'
import type { MaybeRef } from './types'

export const PROVIDED_HOVER_DELAY = '___vxp-provided-hover-delay'
export const globalDelay = computed(() => 100)

function getOrDefault(num: number, def: number) {
  return isDefined(num) && !Number.isNaN(num) ? num : def
}

/**
 * Provide a hover delay config for under components.
 *
 * @param sourceDelay hover delay config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configHoverDelay(sourceDelay: MaybeRef<number>, app?: App) {
  if (app) {
    const delay = computed(() => {
      const delay = unref(sourceDelay)

      return getOrDefault(delay, globalDelay.value)
    })

    app.provide(PROVIDED_HOVER_DELAY, delay)
  } else {
    const upstreamDelay = inject<ComputedRef<number> | null>(PROVIDED_HOVER_DELAY, null)
    const delay = computed(() => {
      const delay = unref(sourceDelay)

      return getOrDefault(
        delay,
        upstreamDelay ? getOrDefault(upstreamDelay.value, globalDelay.value) : globalDelay.value
      )
    })

    provide(PROVIDED_HOVER_DELAY, delay)
  }
}

export function useHoverDelay() {
  return getCurrentInstance()
    ? inject<ComputedRef<number>>(PROVIDED_HOVER_DELAY, globalDelay)
    : globalDelay
}
