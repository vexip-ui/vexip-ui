import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const timelineProps = buildProps({
  //
})

export type TimelineProps = ExtractPropTypes<typeof timelineProps>
export type TimelineCProps = ConfigurableProps<TimelineProps, 'viewer'>
