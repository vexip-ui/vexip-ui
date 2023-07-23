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
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { ChangeEvent } from './symbol'

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
  onChange: eventProp<EventListener<ChangeEvent>>()
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
  onChange: eventProp<EventListener<ChangeEvent>>()
})

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupCProps = ConfigurableProps<RadioGroupProps>
