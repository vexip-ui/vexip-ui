import { computed, getCurrentScope, onScopeDispose, unref, watch } from 'vue'

import { noop } from '@vexip-ui/utils'

import type { MaybeRef } from 'vue'

export interface UseListenerOptions extends AddEventListenerOptions {
  /**
   * 是否禁用整个 hook 的事件处理
   */
  disabled?: MaybeRef<boolean>,
}

export function useListener<E = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: (event: E) => any,
  options?: UseListenerOptions | boolean,
) {
  if (!target) {
    return noop
  }

  const normalizedOptions = computed(() => {
    if (typeof options === 'boolean') {
      return { capture: options }
    }

    return options || {}
  })

  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      const { disabled, ...opts } = normalizedOptions.value
      const handler = (event: Event) => {
        if (!unref(disabled)) {
          listener(event as E)
        }
      }

      el.addEventListener(event, handler, opts)

      remove = () => {
        el.removeEventListener(event, handler, opts)
        remove = noop
      }
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    stopWatch()
    remove()
  }

  getCurrentScope() && onScopeDispose(stop)

  return stop
}
