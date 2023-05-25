import ResizeObserver from './resize-observer'

export { ResizeObserver }
export { resizeObserverProps } from './props'

export type ResizeObserverExposed = InstanceType<typeof ResizeObserver>

export type { ResizeObserverProps, ResizeObserverCProps } from './props'
