import Ellipsis from './ellipsis.vue'

import type { ComponentPublicInstance } from 'vue'

export { Ellipsis }
export { ellipsisProps } from './props'

export type EllipsisExposed = ComponentPublicInstance & InstanceType<typeof Ellipsis>

export type { EllipsisProps, EllipsisCProps } from './props'

export type { EllipsisSlots } from './symbol'
