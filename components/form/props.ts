import { buildProps, booleanProp, sizeProp, eventProp, localeProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ButtonType, ButtonAttrType } from '@/components/button'
import type { RowGridJustify, RowGridAlign } from '@/components/row'
import type { ColumnOptions } from '@/components/column'
import type { Rule } from './validator'
import type { FormLabelAlign, SubmitMethod } from './symbol'

export const formProps = buildProps({
  method: String as PropType<SubmitMethod>,
  action: String,
  model: Object,
  rules: Object,
  labelWidth: [Number, String] as PropType<number | 'auto'>,
  labelAlign: String as PropType<FormLabelAlign>,
  allRequired: booleanProp,
  labelSuffix: String,
  hideAsterisk: booleanProp,
  validateAll: booleanProp,
  hideLabel: booleanProp,
  disabled: booleanProp,
  loading: booleanProp,
  size: sizeProp,
  inline: booleanProp,
  gap: [Number, Array] as PropType<number | number[]>,
  justify: String as PropType<RowGridJustify>,
  align: String as PropType<RowGridAlign>
})

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormCProps = ConfigurableProps<FormProps, 'model'>

const mediaProp = [Number, Object] as PropType<number | ColumnOptions>

export const formItemProps = buildProps({
  locale: localeProp('form'),
  label: String,
  prop: String,
  rules: [Object, Array] as PropType<Rule | Rule[]>,
  labelWidth: Number,
  required: booleanProp,
  htmlFor: String,
  errorTransition: String,
  defaultValue: Object as PropType<any>,
  hideErrorTip: booleanProp,
  validateAll: booleanProp,
  hideAsterisk: booleanProp,
  hideLabel: booleanProp,
  action: booleanProp,
  help: String,
  pure: booleanProp,
  span: Number,
  offset: Number,
  push: Number,
  pull: Number,
  order: Number,
  xs: mediaProp,
  sm: mediaProp,
  md: mediaProp,
  lg: mediaProp,
  xl: mediaProp,
  xxl: mediaProp,
  flex: [Number, String]
})

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemCProps = ConfigurableProps<FormItemProps, 'prop' | 'htmlFor' | 'defaultValue'>

export const formSubmitProps = buildProps({
  size: sizeProp,
  locale: localeProp('form'),
  type: String as PropType<ButtonType>,
  label: String,
  dashed: booleanProp,
  text: booleanProp,
  simple: booleanProp,
  ghost: booleanProp,
  disabled: booleanProp,
  circle: booleanProp,
  loadingIcon: Object,
  loadingEffect: String as PropType<IconEffect>,
  icon: Object,
  color: String,
  buttonType: String as PropType<ButtonAttrType>,
  block: booleanProp,
  tag: String,
  onBeforeSubmit: Function as PropType<() => unknown>,
  onSubmit: eventProp(),
  onError: eventProp<(errors: string[]) => void>()
})

export type FormSubmitProps = ExtractPropTypes<typeof formSubmitProps>
export type FormSubmitCProps = ConfigurableProps<FormSubmitProps, never, 'onBeforeReset'>

export const formResetProps = buildProps({
  size: sizeProp,
  locale: localeProp('form'),
  type: String as PropType<ButtonType>,
  label: String,
  dashed: booleanProp,
  text: booleanProp,
  simple: booleanProp,
  ghost: booleanProp,
  disabled: booleanProp,
  loading: booleanProp,
  circle: booleanProp,
  loadingIcon: Object,
  loadingEffect: String as PropType<IconEffect>,
  icon: Object,
  color: String,
  buttonType: String as PropType<ButtonAttrType>,
  block: booleanProp,
  tag: String,
  onBeforeReset: Function as PropType<() => unknown>,
  onReset: eventProp()
})

export type FormResetProps = ExtractPropTypes<typeof formResetProps>
export type FormResetCProps = ConfigurableProps<FormResetProps, never, 'onBeforeReset'>
