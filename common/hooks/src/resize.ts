import { type MaybeRef, getCurrentScope, onScopeDispose, unref, watch } from 'vue'

import { isClient, noop } from '@vexip-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'

export interface ResizeInfo extends ResizeObserverEntry {
  offsetWidth: number,
  offsetHeight: number,
  width: number,
  height: number,
}

export type ResizeHandler = (entry: ResizeInfo) => any

export interface UseResizeOptions {
  /**
   * 作用的目标元素的 Ref
   */
  target?: MaybeRef<HTMLElement | null | undefined>,
  onResize?: ResizeHandler,
}

const handlerMap = new WeakMap<Element, ResizeHandler>()

function handleResize(entries: ResizeObserverEntry[]) {
  for (let i = 0, len = entries.length; i < len; ++i) {
    const entry = entries[i]
    const handler = handlerMap.get(entry.target)

    if (typeof handler === 'function') {
      const { inlineSize, blockSize } = entry.borderBoxSize?.[0] ?? {}
      const { offsetWidth, offsetHeight } = entry.target as HTMLElement

      handler(
        Object.assign(entry, {
          offsetWidth,
          offsetHeight,
          width: inlineSize ?? offsetWidth,
          height: blockSize ?? offsetHeight,
        }),
      )
    }
  }
}

const resizeObserver = new (isClient ? window.ResizeObserver || ResizeObserver : ResizeObserver)(
  handleResize,
)

export function observeResize(el: Element, handler: ResizeHandler) {
  handlerMap.set(el, handler)
  resizeObserver.observe(el)
}

export function unobserveResize(el: Element) {
  if (handlerMap.has(el)) {
    resizeObserver.unobserve(el)
    handlerMap.delete(el)
  }
}

export function useResize(options: UseResizeOptions = {}) {
  let remove = noop

  const stopWatch = watch(
    () => unref(options.target),
    el => {
      remove()

      if (!el || typeof options.onResize !== 'function') {
        return
      }

      observeResize(el, options.onResize)

      remove = () => {
        unobserveResize(el)
        remove = noop
      }
    },
    { immediate: true },
  )

  const unobserve = () => {
    stopWatch()
    remove()
  }

  getCurrentScope() && onScopeDispose(unobserve)

  return {
    /**
     * @deprecated Will be removed in next major version, please directly use `observeResize` from imports.
     */
    observeResize,
    /**
     * @deprecated Will be removed in next major version, please directly use `unobserveResize` from imports.
     */
    unobserveResize,
    unobserve,
  }
}
