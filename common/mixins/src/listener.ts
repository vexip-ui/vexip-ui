import { unref, watch, getCurrentScope, onScopeDispose } from 'vue'
import { noop } from '@vexip-ui/utils'

import type { MaybeRef } from './shared/types'

export function useListener<E = Event>(
  target: MaybeRef<EventTarget | null>,
  event: string,
  listener: (event: E) => any,
  options: AddEventListenerOptions | boolean
) {
  if (!target) {
    return noop
  }

  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      el.addEventListener(event, listener as any, options)

      remove = () => {
        el.removeEventListener(event, listener as any, options)
        remove = noop
      }
    },
    { immediate: true, flush: 'post' }
  )

  const stop = () => {
    stopWatch()
    remove()
  }

  getCurrentScope() && onScopeDispose(stop)

  return stop
}
