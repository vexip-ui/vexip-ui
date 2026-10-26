import Timeline from './timeline.vue'

import type { ComponentPublicInstance } from 'vue'

export { Timeline }
export { timelineProps } from './props'

export type TimelineExposed = ComponentPublicInstance & InstanceType<typeof Timeline>

export type { TimelineProps, TimelineCProps } from './props'
export type { TimelineItemType } from './symbol'
