import { beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

import { Node } from 'happy-dom'
import { ResizeObserver } from '@juggle/resize-observer'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
class IntersectionObserver {
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

vi.stubGlobal('Node', Node)
vi.stubGlobal('ResizeObserver', ResizeObserver)
vi.stubGlobal('IntersectionObserver', IntersectionObserver)

beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  }
})
