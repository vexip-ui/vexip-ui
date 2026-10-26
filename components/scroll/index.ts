import Scroll from './scroll.vue'

import type { ComponentPublicInstance } from 'vue'

export { Scroll }
export { scrollProps } from './props'

export type ScrollExposed = ComponentPublicInstance & InstanceType<typeof Scroll>

export type { ScrollProps, ScrollCProps } from './props'
export type {
  ScrollMode,
  ScrollPayload,
  BarScrollPayload,
  ScrollState,
  ScrollSlotParams,
} from './symbol'
