import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ClassType, ConfigurableProps } from '@vexip-ui/config'

export const videoProps = buildProps({
  noControls: booleanProp,
  videoAttrs: Object,
  onCanplay: eventProp<(event: Event) => void>()
})

export type VideoProps = ExtractPropTypes<typeof videoProps>
export type VideoCProps = ConfigurableProps<ExtractPropTypes<typeof videoProps>>

export const videoControlProps = buildProps({
  name: String,
  type: String,
  tipClass: [String, Array, Object] as PropType<ClassType>,
  disabled: booleanProp,
  shortcut: String,
  hoverOnly: booleanProp,
  onClick: eventProp(),
  onEnter: eventProp(),
  onLeave: eventProp(),
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>()
})

export type VideoControlProps = ExtractPropTypes<typeof videoControlProps>
export type VideoControlCProps = ConfigurableProps<ExtractPropTypes<typeof videoControlProps>>
