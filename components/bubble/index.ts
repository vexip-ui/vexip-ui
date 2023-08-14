import Bubble from './bubble.vue'

export { Bubble }
export { bubbleProps } from './props'

export type BubbleExposed = InstanceType<typeof Bubble>

export type { BubbleProps, BubbleCProps } from './props'
export type { BubbleType } from './symbol'
