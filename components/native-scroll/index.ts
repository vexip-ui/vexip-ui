import NativeScroll from './native-scroll.vue'

export { NativeScroll }
export type NativeScrollExposed = InstanceType<typeof NativeScroll>

export { animateScrollTo } from './helper'
export type { NativeScrollProps, NativeScrollCProps } from './props'
