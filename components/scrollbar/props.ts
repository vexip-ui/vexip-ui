import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ScrollbarPlacement } from './symbol'

export const scrollbarProps = buildProps({
  placement: String as PropType<ScrollbarPlacement>,
  scroll: Number,
  barLength: Number,
  width: Number,
  appear: booleanProp,
  fade: Number,
  barColor: String,
  trackColor: String,
  disabled: booleanProp,
  wrapper: [String, Object] as PropType<string | HTMLElement>,
  duration: Number,
  useTrack: booleanProp,
  trackSpeed: Number,
  onScrollStart: eventProp<(percent: number) => void>(),
  onScroll: eventProp<(percent: number) => void>(),
  onScrollEnd: eventProp<(percent: number) => void>()
})

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
export type ScrollbarCProps = ConfigurableProps<ScrollbarProps, 'scroll'>
