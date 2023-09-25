import Scrollbar from './scrollbar.vue'

import type { ComponentPublicInstance } from 'vue'

export { Scrollbar }
export { scrollbarProps } from './props'

export type ScrollbarExposed = ComponentPublicInstance & InstanceType<typeof Scrollbar>

export type { ScrollbarProps, ScrollbarCProps } from './props'
export type { ScrollbarPlacement } from './symbol'
