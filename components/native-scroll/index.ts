import NativeScroll from './native-scroll.vue'

export { NativeScroll }
export { animateScrollTo } from './helper'

export type NativeScrollExposed = InstanceType<typeof NativeScroll>

export type { NativeScrollProps, NativeScrollCProps } from './props'
export type { NativeScrollMode } from './symbol'
