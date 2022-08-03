import { ref, unref, watch, getCurrentScope, onScopeDispose } from 'vue'
import {
  CLICK_TYPE,
  noop,
  createEvent,
  getObservers,
  observe,
  disconnect,
  dispatchEvent
} from '@vexip-ui/utils'
import { useListener } from './listener'

import type { Ref } from 'vue'
import type { TransferNode } from '@vexip-ui/utils'

export const CLICK_OUTSIDE = 'clickoutside'

createEvent(CLICK_OUTSIDE)

document.addEventListener(CLICK_TYPE, (event: Event) => {
  const target = event.target
  const path = event.composedPath && event.composedPath()

  getObservers(CLICK_OUTSIDE).forEach((el: TransferNode) => {
    if (
      el !== target &&
      (path ? !path.includes(el) : !el.contains(target as Node)) &&
      (!el.__transferElement ||
        (el.__transferElement !== target && !el.__transferElement.contains(target as Node)))
    ) {
      dispatchEvent(el, { type: CLICK_OUTSIDE })
    }
  })
})

/**
 * 创建一个可以添加 clickoutside 事件的元素 Ref
 *
 * @param
 * @param target 需要处理的元素 ref，可不传
 */
export function useClickOutside(handler: () => void, target: Ref<HTMLElement | null> = ref(null)) {
  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      observe(target.value as TransferNode, CLICK_OUTSIDE)

      remove = () => {
        disconnect(target.value as TransferNode, CLICK_OUTSIDE)
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
  useListener(target, CLICK_OUTSIDE, handler)

  return target
}
