import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TimelineItemType } from './symbol'

export const timelineProps = buildProps({
  pending: booleanProp,
  dashed: booleanProp,
  lineColor: String,
  spacing: [Number, String],
  flip: booleanProp,
  horizontal: booleanProp,
  alternate: booleanProp,
  onSignalClick: eventProp<(label: string | number) => void>(),
})

export type TimelineProps = ExtractPropTypes<typeof timelineProps>
export type TimelineCProps = ConfigurableProps<TimelineProps>

export const timelineItemProps = buildProps({
  type: String as PropType<TimelineItemType>,
  color: String,
  label: [Number, String],
  dashed: booleanProp,
  lineColor: String,
  spacing: [Number, String],
  onSignalClick: eventProp<(label: string | number) => void>(),
})

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
export type TimelineItemCProps = ConfigurableProps<TimelineItemProps>
