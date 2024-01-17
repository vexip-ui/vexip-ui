import {
  booleanProp,
  buildProps,
  classProp,
  eventProp,
  iconProp,
  sizeProp,
  stateProp,
  valueProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { ChangeEvent, RadioGroupShape, RadioRawOption, RadioShape } from './symbol'

export const radioProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: valueProp,
  label: valueProp,
  labelClass: classProp,
  disabled: booleanProp,
  tabIndex: [String, Number],
  loading: booleanProp,
  loadingLock: booleanProp,
  name: String,
  shape: String as PropType<RadioShape>,
  onChange: eventProp<EventListener<ChangeEvent>>()
})

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioCProps = ConfigurableProps<RadioProps>

export const radioGroupProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: valueProp,
  vertical: booleanProp,
  disabled: booleanProp,
  options: Array as PropType<RadioRawOption[]>,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  shape: String as PropType<RadioGroupShape>,
  onChange: eventProp<EventListener<ChangeEvent>>()
})

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupCProps = ConfigurableProps<RadioGroupProps>
