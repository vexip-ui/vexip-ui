import Video from './video'

import type { ComponentPublicInstance } from 'vue'

export { Video }
export { videoProps } from './props'
export { videoDefaultShortcuts, videoDefaultControlLayout } from './symbol'

export type VideoExposed = ComponentPublicInstance & InstanceType<typeof Video>

export type { VideoProps, VideoCProps } from './props'
export type {
  VideoPresetControl,
  VideoControlName,
  VideoControlConfig,
  VideoControlLayout,
  VideoPlaybackRate,
  VideoControlType,
  VideoControlOption,
  VideoSegment
} from './symbol'
