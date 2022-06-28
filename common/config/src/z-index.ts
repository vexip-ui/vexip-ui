import { ref, computed, provide, inject, unref } from 'vue'

import type { App, ComputedRef, Ref } from 'vue'

export interface ZIndexConfig {
  popper: number,
  masker: number,
  popup: number
}

export const PROVIDED_Z_INDEX = '___vxp-provided-z-index'

const counter = ref(0)
const globalZIndex = computed(() => ({
  popper: 1000,
  masker: 1500,
  popup: 2000
}))

function getDefaultZIndexConfig() {
  return {
    popper: 1000,
    masker: 1500,
    popup: 2000
  }
}

export function configZIndex(sourceZIndex: Partial<ZIndexConfig> | Ref<Partial<ZIndexConfig>>, app?: App) {
  if (app) {
    const zIndex = computed(() => {
      const zIndex = unref(sourceZIndex)

      return Object.assign(getDefaultZIndexConfig(), zIndex)
    })

    app.provide(PROVIDED_Z_INDEX, zIndex)
  } else {
    const upstreamZIndex = inject<ComputedRef<ZIndexConfig> | null>(PROVIDED_Z_INDEX, null)
    const zIndex = computed(() => {
      const zIndex = unref(sourceZIndex)
      const providedZIndex = Object.assign(getDefaultZIndexConfig(), zIndex)

      if (!upstreamZIndex?.value) {
        return providedZIndex
      }

      return Object.assign(upstreamZIndex.value, providedZIndex)
    })

    provide(PROVIDED_Z_INDEX, zIndex)
  }
}

export function useZIndex(type: keyof ZIndexConfig) {
  const zIndex = inject<ComputedRef<ZIndexConfig>>(PROVIDED_Z_INDEX, globalZIndex)

  counter.value++
  return computed(() => zIndex.value[type] + counter.value)
}
