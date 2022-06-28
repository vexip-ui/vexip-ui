import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { ResizeObserver } from '@juggle/resize-observer'

config.global.stubs = {}

vi.stubGlobal('ResizeObserver', ResizeObserver)
