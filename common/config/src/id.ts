import { getCurrentInstance, inject, provide, readonly, shallowRef, unref, watchEffect } from 'vue'

import { useNamespace } from './namespace'

import type { App, MaybeRef } from 'vue'

export const PROVIDED_ID_CONTER = '__vxp-provided-id-counter'

export interface IDCounter {
  getNext: () => number | string
}

class VxpIDCounter implements IDCounter {
  private current: number

  constructor({ current = 0 }: { current?: number } = {}) {
    this.current = current
  }

  getNext() {
    return this.current++
  }
}

const defaultCounter = new VxpIDCounter()

/**
 * Provide a id counter config for under components.
 *
 * You only should use this method when initialize application.
 *
 * @param sourceCounter id counter config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configIdCounter(sourceCounter: IDCounter = defaultCounter, app?: App) {
  if (app) {
    app.provide(PROVIDED_ID_CONTER, sourceCounter)
  } else {
    const upstreamCounter = inject<IDCounter | null>(PROVIDED_ID_CONTER, null)

    provide(PROVIDED_ID_CONTER, sourceCounter || upstreamCounter)
  }
}

export function useId(customId?: MaybeRef<string>) {
  const namespace = useNamespace()
  const counter = getCurrentInstance()
    ? inject<IDCounter>(PROVIDED_ID_CONTER, defaultCounter)
    : defaultCounter

  const id = shallowRef()

  watchEffect(
    () => {
      id.value = unref(customId) || `${namespace.value}-id-${counter.getNext()}`
    },
    { flush: 'sync' },
  )

  return readonly(id)
}
