import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ClassType, ConfigurableProps } from '@vexip-ui/config'
import type {
  VideoControlLayout,
  VideoControlOption,
  VideoControlType,
  // VideoKernel,
  VideoPlayRate
} from './symbol'

export const videoProps = buildProps({
  src: String,
  noControls: booleanProp,
  videoAttrs: Object,
  playRates: Array as PropType<(number | VideoPlayRate)[]>,
  // kernel: Object as PropType<VideoKernel>,
  controlLayout: Object as PropType<VideoControlLayout>,
  poster: String,
  video: Object as PropType<HTMLVideoElement>,
  onPlay: eventProp(),
  onPause: eventProp(),
  onEnded: eventProp()
})

export type VideoProps = ExtractPropTypes<typeof videoProps>
export type VideoCProps = ConfigurableProps<ExtractPropTypes<typeof videoProps>>

export const videoControlProps = buildProps({
  name: String,
  type: String as PropType<VideoControlType>,
  tipClass: [String, Array, Object] as PropType<ClassType>,
  disabled: booleanProp,
  shortcut: String,
  focusable: booleanProp,
  value: [Number, String],
  options: Array as PropType<(string | VideoControlOption)[]>,
  onClick: eventProp(),
  onEnter: eventProp(),
  onLeave: eventProp(),
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onSelect: eventProp<(option: VideoControlOption) => void>()
})

export type VideoControlProps = ExtractPropTypes<typeof videoControlProps>
export type VideoControlCProps = ConfigurableProps<ExtractPropTypes<typeof videoControlProps>>
