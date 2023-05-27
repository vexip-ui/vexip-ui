import Timeline from './timeline.vue'

export { Timeline }
export { timelineProps } from './props'

export type TimelineExposed = InstanceType<typeof Timeline>

export type { TimelineProps, TimelineCProps } from './props'
export type { TimelineItemType } from './symbol'
