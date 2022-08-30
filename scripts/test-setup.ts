import { config } from '@vue/test-utils'
import { vi, beforeEach } from 'vitest'
import { ResizeObserver } from '@juggle/resize-observer'

config.global.stubs = {
  Transition: {
    inheritAttrs: false,
    setup(_, { slots }) {
      return () => slots.default?.()
    }
  }
}

vi.stubGlobal('ResizeObserver', ResizeObserver)

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
