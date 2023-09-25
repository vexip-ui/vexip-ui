import Collapse from './collapse.vue'

import type { ComponentPublicInstance } from 'vue'

export { Collapse }
export { collapseProps } from './props'

export type CollapseExposed = ComponentPublicInstance & InstanceType<typeof Collapse>

export type { CollapseProps, CollapseCProps } from './props'
export type { CollapseArrowType } from './symbol'
