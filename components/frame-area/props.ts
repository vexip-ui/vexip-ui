import { booleanProp, booleanStringProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const frameAreaProps = buildProps({
  disabled: booleanProp,
  onFenceStart: eventProp<(event: PointerEvent) => void>(),
  onFence: eventProp<(event: PointerEvent) => void>(),
  onFenceEnd: eventProp<(event: PointerEvent) => void>()
})

export type FrameAreaProps = ExtractPropTypes<typeof frameAreaProps>
export type FrameAreaCProps = ConfigurableProps<ExtractPropTypes<typeof frameAreaProps>>

export const frameAreaItemProps = buildProps({
  wrapper: booleanStringProp
})

export type FrameAreaItemProps = ExtractPropTypes<typeof frameAreaItemProps>
export type FrameAreaItemCProps = ConfigurableProps<ExtractPropTypes<typeof frameAreaItemProps>>
