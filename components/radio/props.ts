import {
  buildProps,
  booleanProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const radioProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: [String, Number],
  label: [String, Number],
  labelClass: classProp,
  disabled: booleanProp,
  border: booleanProp,
  tabIndex: [String, Number],
  loading: booleanProp,
  loadingLock: booleanProp,
  onChange: eventProp<(value: string | number) => void>()
})

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioCProps = ConfigurableProps<RadioProps>

type RawOption =
  | string
  | {
    label: string | number,
    content?: string
  }

export const radioGroupProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: [String, Number],
  vertical: booleanProp,
  disabled: booleanProp,
  button: booleanProp,
  border: booleanProp,
  options: Array as PropType<RawOption[]>,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingSpin: booleanProp,
  onChange: eventProp<(value: string | number) => void>()
})

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupCProps = ConfigurableProps<RadioGroupProps>
