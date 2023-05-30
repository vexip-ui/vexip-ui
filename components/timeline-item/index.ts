import TimelineItem from '../timeline/timeline-item.vue'

export { TimelineItem }
export { timelineItemProps } from '../timeline/props'

export type TimelineItemExposed = InstanceType<typeof TimelineItem>

export type { TimelineItemProps, TimelineItemCProps } from '../timeline/props'
