import { config } from '@vue/test-utils'
import { vi, beforeEach } from 'vitest'
import { ResizeObserver } from '@juggle/resize-observer'

config.global.stubs = {}

vi.stubGlobal('ResizeObserver', ResizeObserver)

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
