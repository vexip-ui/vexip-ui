import { booleanProp, booleanStringProp, buildProps, eventProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export type RawOption =
  | string
  | number
  | {
    value: string | number,
    label?: string,
    disabled?: boolean
  }

export const wheelProps = buildProps({
  state: stateProp,
  horizontal: booleanProp,
  value: [String, Number],
  /**
   * 上下或左右两侧的候选数
   */
  candidate: Number as PropType<0 | 1 | 2 | 3>,
  arrow: booleanProp,
  pointer: booleanProp,
  options: Array as PropType<RawOption[]>,
  insertEmpty: booleanStringProp,
  disabled: booleanProp,
  loading: booleanProp,
  loadingLock: booleanProp,
  disabledItem: Function as PropType<(value: string | number, data: RawOption) => boolean>,
  onChange: eventProp<(value: string | number, data: RawOption) => void>(),
  onPrev: eventProp<(value: string | number, data: RawOption) => void>(),
  onNext: eventProp<(value: string | number, data: RawOption) => void>()
})

export type WheelProps = ExtractPropTypes<typeof wheelProps>
export type WheelCProps = ConfigurableProps<WheelProps>
