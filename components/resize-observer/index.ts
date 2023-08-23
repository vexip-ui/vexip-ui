import ResizeObserver from './resize-observer'

import type { ComponentPublicInstance } from 'vue'

export { ResizeObserver }
export { resizeObserverProps } from './props'

export type ResizeObserverExposed = ComponentPublicInstance & InstanceType<typeof ResizeObserver>

export type { ResizeObserverProps, ResizeObserverCProps } from './props'
