import { getCurrentScope, onScopeDispose, ref, unref, watch } from 'vue'

import { ensureArray, isClient, noop } from '@vexip-ui/utils'

import type { Ref } from 'vue'

export type IntersectionHandler = (entry: IntersectionObserverEntry) => any
export type UseIntersectionOptions = IntersectionObserverInit & {
  /**
   * 元素交叉状态变化时的回调方法
   */
  handler: IntersectionHandler,
  /**
   * 作用的目标元素的 Ref
   */
  target?: Ref<HTMLElement | null | undefined>
}

const observerCache = new WeakMap<
  Element | Document,
  Map<
    string,
    Map<
      string,
      { ob: IntersectionObserver, count: number, handlers: WeakMap<Element, IntersectionHandler> }
    >
  >
>()

export function useIntersection(options: UseIntersectionOptions) {
  const target = options.target || ref(null)

  if (!isClient) {
    return { target, disconnect: noop }
  }

  const { handler } = options

  let root = options.root ?? document

  const threshold = ensureArray(options.threshold || 0).join() || '0'
  const margin = options.rootMargin || '_'

  if (!observerCache.has(root)) {
    observerCache.set(root, new Map())
  }

  const thresholdCache = observerCache.get(root)!

  if (!thresholdCache.has(threshold)) {
    thresholdCache.set(threshold, new Map())
  }

  const marginCache = thresholdCache.get(threshold)!

  if (!marginCache.has(margin)) {
    marginCache.set(margin, {
      ob: new IntersectionObserver(handleIntersect, options),
      count: 0,
      handlers: new WeakMap<Element, IntersectionHandler>()
    })
  }

  let state = marginCache.get(margin)
  let { ob: observer, handlers } = state!

  let remove = noop

  const stopWatch = watch(
    () => unref(target),
    el => {
      remove()

      if (!el || !observer) {
        return
      }

      handlers.set(el, handler)
      observer.observe(el)
      state && state.count++

      remove = () => {
        observer.unobserve(el)
        handlers.delete(el)
        state && state.count--
        remove = noop
      }
    },
    { immediate: true, flush: 'post' }
  )

  getCurrentScope() && onScopeDispose(disconnect)

  function handleIntersect(entries: IntersectionObserverEntry[]) {
    for (let i = 0, len = entries.length; i < len; ++i) {
      const entry = entries[i]
      const handler = handlers.get(entry.target)

      if (typeof handler === 'function') {
        handler(entry)
      }
    }
  }

  function disconnect() {
    stopWatch()
    remove()

    if (!state) return

    if (state.count <= 0) {
      marginCache.delete(margin)

      if (!marginCache.size) {
        thresholdCache.delete(threshold)

        if (!thresholdCache.size) {
          observerCache.delete(root)
        }
      }
    }

    state = undefined
    observer = undefined!
    handlers = undefined!
    root = undefined!
  }

  return { target, disconnect }
}
