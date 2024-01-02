import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { FullScreenType } from '@/components/full-screen'
import type { IconEffect } from '@/components/icon'
import type { ClassType, ConfigurableProps } from '@vexip-ui/config'
import type {
  VideoControlLayout,
  VideoControlOption,
  VideoControlType,
  // VideoKernel,
  VideoPlaybackRate,
  VideoSegment,
  VideoShortcutOptions
} from './symbol'

export const videoProps = buildProps({
  src: String,
  srcList: Array as PropType<string[]>,
  noControls: booleanProp,
  videoAttrs: Object,
  time: Number,
  volume: Number,
  playbackRate: Number,
  playbackRates: Array as PropType<(number | VideoPlaybackRate)[]>,
  // kernel: Object as PropType<VideoKernel>,
  controlLayout: Object as PropType<VideoControlLayout>,
  poster: String,
  video: Object as PropType<HTMLVideoElement>,
  segments: Array as PropType<(number | VideoSegment)[]>,
  loading: booleanProp,
  loadingIcon: Object,
  loadingEffect: String as PropType<IconEffect>,
  shortcuts: Object as PropType<VideoShortcutOptions>,
  onPlay: eventProp(),
  onPause: eventProp(),
  onEnded: eventProp(),
  onTimeChange: eventProp<(time: number) => void>(),
  onVolumeChange: eventProp<(volume: number) => void>(),
  onRateChange: eventProp<(rate: number) => void>(),
  onToggleFlip: eventProp<(flip: boolean) => void>(),
  onTogglePip: eventProp<(pip: boolean) => void>(),
  onToggleFull: eventProp<(full: false | FullScreenType) => void>(),
  onPrev: eventProp(),
  onNext: eventProp(),
  onRefresh: eventProp()
})

export type VideoProps = ExtractPropTypes<typeof videoProps>
export type VideoCProps = ConfigurableProps<ExtractPropTypes<typeof videoProps>>

export const videoControlProps = buildProps({
  type: String as PropType<VideoControlType>,
  label: String,
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
