import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const fenceProps = buildProps({
  boxable: booleanProp,
  onBoxStart: eventProp<(event: PointerEvent) => void>(),
  onBox: eventProp<(event: PointerEvent) => void>(),
  onBoxEnd: eventProp<(event: PointerEvent) => void>()
})

export type FenceProps = ExtractPropTypes<typeof fenceProps>
export type FenceCProps = ConfigurableProps<ExtractPropTypes<typeof fenceProps>>

export const fenceItemProps = buildProps({
  bool: booleanProp,
  onClick: eventProp<(bool: boolean) => void>()
})

export type FenceItemProps = ExtractPropTypes<typeof fenceItemProps>
export type FenceItemCProps = ConfigurableProps<ExtractPropTypes<typeof fenceItemProps>>
