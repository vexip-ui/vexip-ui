import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import {
  CLICK_TYPE,
  createEvent,
  getObservers,
  observe,
  disconnect,
  dispatchEvent
} from '@vexip-ui/utils'

import type { Ref } from 'vue'
import type { TransferNode } from '@vexip-ui/utils'

export const CLICK_OUTSIDE = 'clickoutside'

createEvent(CLICK_OUTSIDE)

document.addEventListener(CLICK_TYPE, (event: Event & { path?: TransferNode[] }) => {
  const target = event.target
  const path = event.path || (event.composedPath && event.composedPath())

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
 * @param wrapper - 需要处理的元素 ref，可不传
 *
 * @returns 可以添加事件的元素 Ref
 */
export function useClickOutside(wrapper: Ref<HTMLElement | null> = ref(null)) {
  onMounted(() => {
    nextTick(() => {
      if (wrapper.value) {
        observe(wrapper.value as TransferNode, CLICK_OUTSIDE)
      }
    })
  })

  onBeforeUnmount(() => {
    disconnect(wrapper.value as TransferNode, CLICK_OUTSIDE)
  })

  return wrapper
}
