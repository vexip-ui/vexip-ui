import {
  buildProps,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const checkboxProps = buildProps({
  size: sizeProp,
  state: stateProp,
  checked: booleanProp,
  label: String,
  value: [String, Number],
  labelClass: classProp,
  disabled: booleanProp,
  border: booleanProp,
  control: booleanProp,
  partial: booleanProp,
  tabIndex: [String, Number],
  loading: booleanProp,
  loadingLock: booleanProp,
  onChange: eventProp<(checked: boolean) => void>(),
  onClick: eventProp<(event: MouseEvent) => void>()
})

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxCProps = ConfigurableProps<CheckboxProps>

type RawOption =
  | string
  | {
    value: string | number,
    label?: string,
    control?: boolean
  }

export const checkboxGroupProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: Array as PropType<(string | number)[]>,
  vertical: booleanProp,
  disabled: booleanProp,
  border: booleanProp,
  options: Array as PropType<RawOption[]>,
  loading: booleanProp,
  loadingLock: booleanProp,
  control: booleanStringProp,
  onChange: eventProp<(value: (string | number)[]) => void>()
})

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupCProps = ConfigurableProps<CheckboxGroupProps>
