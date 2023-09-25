import TimelineItem from '../timeline/timeline-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { TimelineItem }
export { timelineItemProps } from '../timeline/props'

export type TimelineItemExposed = ComponentPublicInstance & InstanceType<typeof TimelineItem>

export type { TimelineItemProps, TimelineItemCProps } from '../timeline/props'
