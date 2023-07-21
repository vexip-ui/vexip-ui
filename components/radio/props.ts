import {
  booleanProp,
  buildProps,
  classProp,
  eventProp,
  sizeProp,
  stateProp,
  valueProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'

type ChangeEvent =
  | ((value: string | number | boolean) => void)
  | ((value: string) => void)
  | ((value: number) => void)
  | ((value: boolean) => void)

export const radioProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: valueProp,
  label: valueProp,
  labelClass: classProp,
  disabled: booleanProp,
  border: booleanProp,
  tabIndex: [String, Number],
  loading: booleanProp,
  loadingLock: booleanProp,
  onChange: eventProp<ChangeEvent>()
})

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioCProps = ConfigurableProps<RadioProps>

export type RawOption =
  | string
  | {
    label: string | number | boolean,
    content?: string,
    disabled?: boolean
  }

export const radioGroupProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: valueProp,
  vertical: booleanProp,
  disabled: booleanProp,
  button: booleanProp,
  border: booleanProp,
  options: Array as PropType<RawOption[]>,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  onChange: eventProp<ChangeEvent>()
})

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupCProps = ConfigurableProps<RadioGroupProps>
