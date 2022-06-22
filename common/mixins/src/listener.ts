import { unref, watch, getCurrentScope, onScopeDispose } from 'vue'
import { noop } from '@vexip-ui/utils'

import type { MaybeRef } from './shared/types'

export function useListener(target: MaybeRef<EventTarget | null>, ...args: Parameters<EventTarget['addEventListener']>) {
  if (!target) {
    return noop
  }

  const [event, listener, options] = args

  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      el.addEventListener(event, listener, options)

      remove = () => {
        el.removeEventListener(event, listener, options)
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
