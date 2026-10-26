import { booleanProp, booleanStringProp, buildProps, eventProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { WheelRawOption, WheelSlots } from './symbol'

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
  options: Array as PropType<WheelRawOption[]>,
  insertEmpty: booleanStringProp,
  disabled: booleanProp,
  loading: booleanProp,
  loadingLock: booleanProp,
  disabledItem: Function as PropType<(value: string | number, data: WheelRawOption) => boolean>,
  noTransition: booleanProp,
  selectable: booleanProp,
  slots: Object as PropType<WheelSlots>,
  onChange: eventProp<(value: string | number, data: WheelRawOption) => void>(),
  onPrev: eventProp<(value: string | number, data: WheelRawOption) => void>(),
  onNext: eventProp<(value: string | number, data: WheelRawOption) => void>(),
  onItemClick: eventProp<(value: string | number, data: WheelRawOption) => void>(),
})

export type WheelProps = ExtractPropTypes<typeof wheelProps>
export type WheelCProps = ConfigurableProps<WheelProps>
