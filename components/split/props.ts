import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const splitProps = buildProps({
  value: Number,
  min: Number,
  max: Number,
  vertical: booleanProp,
  noTransition: booleanProp,
  lazy: booleanProp,
  canFull: booleanProp,
  onChange: eventProp<(value: number) => void>(),
  onFull: eventProp<(type: 'top' | 'right' | 'bottom' | 'left') => void>(),
  onReset: eventProp(),
  onMoveStart: eventProp<(value: number) => void>(),
  onMove: eventProp<(value: number) => void>(),
  onMoveEnd: eventProp<(value: number) => void>(),
})

export type SplitProps = ExtractPropTypes<typeof splitProps>
export type SplitCProps = ConfigurableProps<SplitProps>
