import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { ResizeObserver } from '@juggle/resize-observer'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
class IntersctionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = Object.freeze([])

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    if (!callback && options) {
      //
    }
  }

  disconnect() {}

  observe(target: Element) {}

  takeRecords() {
    return []
  }

  unobserve(target: Element) {}
}
/* eslint-enable */

config.global.stubs = {
  Transition: {
    inheritAttrs: false,
    setup(_, { slots }) {
      return () => slots.default?.()
    }
  },
  TransitionGroup: {
    inheritAttrs: false,
    setup(_, { slots }) {
      return () => slots.default?.()
    }
  }
}

vi.stubGlobal('ResizeObserver', ResizeObserver)
vi.stubGlobal('IntersctionObserver', IntersctionObserver)

beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  }
})
