import { buildProps, booleanProp, sizeProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ButtonType, ButtonAttrType } from './symbol'

export const buttonProps = buildProps({
  size: sizeProp,
  type: String as PropType<ButtonType>,
  dashed: booleanProp,
  text: booleanProp,
  simple: booleanProp,
  ghost: booleanProp,
  disabled: booleanProp,
  loading: booleanProp,
  circle: booleanProp,
  loadingIcon: Object,
  loadingSpin: booleanProp,
  icon: Object,
  color: String,
  buttonType: String as PropType<ButtonAttrType>,
  block: booleanProp,
  tag: String,
  noPulse: booleanProp,
  badge: [String, Number],
  onClick: eventProp<(event: MouseEvent) => void>()
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonCProps = ConfigurableProps<ButtonProps>

export const buttonGroupProps = buildProps({
  size: sizeProp,
  type: String as PropType<ButtonType>,
  circle: booleanProp
})

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>
export type ButtonGroupCProps = ConfigurableProps<ButtonGroupProps>
