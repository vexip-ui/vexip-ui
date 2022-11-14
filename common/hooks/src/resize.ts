import { isClient } from '@vexip-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'

export type ResizeHandler = (entry: ResizeObserverEntry) => any

const handlerMap = new WeakMap<Element, ResizeHandler>()

function handleResize(entries: ResizeObserverEntry[]) {
  for (let i = 0, len = entries.length; i < len; ++i) {
    const entry = entries[i]
    const handler = handlerMap.get(entry.target)

    if (typeof handler === 'function') {
      handler(entry)
    }
  }
}

const resizeObserver = new (isClient ? window.ResizeObserver || ResizeObserver : ResizeObserver)(
  handleResize
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

export function useResize() {
  return {
    observeResize,
    unobserveResize
  }
}
