import Divider from './divider.vue'

import type { ComponentPublicInstance } from 'vue'

export { Divider }
export { dividerProps } from './props'

export type DividerExposed = ComponentPublicInstance & InstanceType<typeof Divider>

export type { DividerProps, DividerCProps } from './props'
export type { DividerTextPosition } from './symbol'
