import { booleanProp, buildProps, eventProp, iconProp, sizeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ButtonAttrType, ButtonSlots, ButtonType } from './symbol'

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
  loadingIcon: iconProp,
  loadingEffect: String as PropType<IconEffect>,
  icon: iconProp,
  color: String,
  buttonType: String as PropType<ButtonAttrType>,
  block: booleanProp,
  tag: String,
  noPulse: booleanProp,
  badge: [String, Number],
  slots: Object as PropType<ButtonSlots>,
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
