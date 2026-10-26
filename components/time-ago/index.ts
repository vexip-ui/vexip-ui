import TimeAgo from './time-ago.vue'

import type { ComponentPublicInstance } from 'vue'

export { TimeAgo }
export { timeAgoProps } from './props'

export type TimeAgoExposed = ComponentPublicInstance & InstanceType<typeof TimeAgo>

export type { TimeAgoProps, TimeAgoCProps } from './props'
