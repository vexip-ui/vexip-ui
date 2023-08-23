import Badge from './badge.vue'

import type { ComponentPublicInstance } from 'vue'

export { Badge }
export { badgeProps } from './props'

export type BadgeExposed = ComponentPublicInstance & InstanceType<typeof Badge>

export type { BadgeProps, BadgeCProps } from './props'
export type { BadgeType } from './symbol'
