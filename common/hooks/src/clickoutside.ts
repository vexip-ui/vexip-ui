import { getCurrentScope, onScopeDispose, ref, unref, watch } from 'vue'

import {
  CLICK_TYPE,
  createEvent,
  disconnect,
  dispatchEvent,
  getObservers,
  isClient,
  noop,
  observe
} from '@vexip-ui/utils'
import { useListener } from './listener'

import type { Ref } from 'vue'
import type { TransferNode } from '@vexip-ui/utils'

export const CLICK_OUTSIDE = 'clickoutside'

createEvent(CLICK_OUTSIDE)

if (isClient) {
  document.addEventListener(
    CLICK_TYPE,
    (event: Event) => {
      const target = event.target as Node | null
      const path = event.composedPath && event.composedPath()

      getObservers(CLICK_OUTSIDE).forEach((el: TransferNode) => {
        if (
          el !== target &&
          (path ? !path.includes(el) : !el.contains(target)) &&
          (!el.__transferElement ||
            (el.__transferElement !== target && !el.__transferElement.contains(target)))
        ) {
          dispatchEvent(el, { type: CLICK_OUTSIDE })
        }
      })
    },
    true
  )
}

/**
 * 创建一个可以添加 clickoutside 事件的元素 Ref
 *
 * @param handler 事件的回调方法
 * @param target 需要处理的元素 ref，可不传
 */
export function useClickOutside(
  handler: () => void,
  target: Ref<HTMLElement | null | undefined> = ref(null)
) {
  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      observe(el as TransferNode, CLICK_OUTSIDE)

      remove = () => {
        disconnect(el as TransferNode, CLICK_OUTSIDE)
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
