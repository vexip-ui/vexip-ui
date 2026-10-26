import Bubble from './bubble.vue'

import type { ComponentPublicInstance } from 'vue'

export { Bubble }
export { bubbleProps } from './props'

export type BubbleExposed = ComponentPublicInstance & InstanceType<typeof Bubble>

export type { BubbleProps, BubbleCProps } from './props'
export type { BubbleType } from './symbol'
