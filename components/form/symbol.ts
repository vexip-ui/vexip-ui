import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ComponentSize, ComponentState } from '@vexip-ui/config'
import type { EventEmitter } from '@vexip-ui/utils'
import type { Rule } from './validator'

export type FormLabelAlign = 'right' | 'top' | 'left'
export type SubmitMethod = 'get' | 'post' | 'put' | 'delete'

export interface FormProps {
  method: SubmitMethod,
  action: string,
  model: Record<string, any>,
  rules: Record<string, any>,
  labelWidth: number | 'auto',
  labelAlign: FormLabelAlign,
  allRequired: boolean,
  labelSuffix: string,
  hideAsterisk: boolean,
  validateAll: boolean,
  hideLabel: boolean,
  disabled: boolean,
  loading: boolean,
  size: ComponentSize,
  inline: boolean
}

export interface FormItemProps {
  label: string,
  prop: string,
  rules: Rule | Rule[],
  labelWidth: number | 'auto',
  required: boolean,
  htmlFor: string,
  errorTransition: string,
  defaultValue: unknown,
  hideErrorTip: boolean,
  validateAll: boolean,
  hideAsterisk: boolean
}

export interface FieldOptions {
  prop: ComputedRef<string>,
  idFor: ComputedRef<string>,
  labelId: ComputedRef<string>,
  state: ComputedRef<ComponentState>,
  disabled: ComputedRef<boolean>,
  loading: ComputedRef<boolean>,
  size: ComputedRef<ComponentSize>,
  emitter: EventEmitter,
  labelWidth: Ref<number>,
  validate: () => Promise<string[] | null>,
  reset: () => boolean,
  clearError: () => void,
  getValue: (defaultValue?: unknown) => unknown,
  setValue: (value: unknown, strict?: boolean) => void,
  sync: (instance: any) => void,
  unSync: (instance: any) => void
}

export interface FormActions {
  getLabelWidth: () => number,
  validate: () => Promise<string[]>,
  validateFields: (props: string | string[]) => Promise<string[]>,
  reset: () => void,
  resetFields: (props: string | string[]) => void,
  clearError: () => void,
  clearFieldsError: (props: string | string[]) => void
}

// form
export const FORM_PROPS = '__VXP_FORM_PROPS' as unknown as InjectionKey<Partial<FormProps>>
export const FORM_FIELDS = '__VXP_FORM_FIELDS' as unknown as InjectionKey<Set<FieldOptions>>
export const FORM_ACTIONS = '__VXP_FORM_ACTIONS' as unknown as InjectionKey<FormActions>

// form-item
export const FIELD_OPTIONS = '__VXP_FIELD_OPTIONS' as unknown as InjectionKey<FieldOptions>

export const submitMethods = Object.freeze<SubmitMethod[]>(['get', 'post', 'put', 'delete'])
export const labelAligns = Object.freeze<FormLabelAlign[]>(['right', 'top', 'left'])
