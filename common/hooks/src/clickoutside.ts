import { getCurrentScope, onScopeDispose, ref, unref, watch } from 'vue'

import { CLICK_TYPE, dispatchEvent, isClient, noop } from '@vexip-ui/utils'
import { useListener } from './listener'

import type { Ref } from 'vue'
import type { TransferNode } from '@vexip-ui/utils'

export const CLICK_OUTSIDE = 'clickoutside'

const elements = new Set<TransferNode>()
let downTarget: EventTarget | null = null

function isInside(target: EventTarget | null, el: TransferNode) {
  if (!(target instanceof Node)) return false

  return (
    el === target ||
    el.contains(target) ||
    (!!el.__transferElement &&
      (el.__transferElement === target || el.__transferElement.contains(target)))
  )
}

if (isClient) {
  // 桌面端使用 'click' 作为触发器，但滚动条拖拽时 mouseup 在组件外会误判。
  // pointerdown 在 mousedown 之前触发，且不受 scrollbar 内部 preventDefault 的影响，
  // 用它来记录用户开始按压时的真实目标。
  if (CLICK_TYPE === 'click') {
    document.addEventListener(
      'pointerdown',
      (event: Event) => {
        downTarget = event.target
      },
      true,
    )
  }

  document.addEventListener(
    CLICK_TYPE,
    (event: Event) => {
      const currentDownTarget = downTarget
      downTarget = null

      elements.forEach(el => {
        if (currentDownTarget && isInside(currentDownTarget, el)) {
          return
        }

        const target = event.target as Node | null
        const path = event.composedPath && event.composedPath()

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
    true,
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
  target: Ref<HTMLElement | null | undefined> = ref(null),
) {
  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el) {
        return
      }

      elements.add(el)

      remove = () => {
        elements.delete(el)
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
  useListener(target, CLICK_OUTSIDE, handler)

  return target
}
