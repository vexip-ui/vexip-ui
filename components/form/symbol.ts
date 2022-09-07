import type { Ref, ComputedRef, InjectionKey } from 'vue'
import type { ComponentState } from '@vexip-ui/config'
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
  loading: boolean
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
  state: ComputedRef<ComponentState>,
  disabled: ComputedRef<boolean>,
  loading: ComputedRef<boolean>,
  emitter: EventEmitter,
  labelWidth: Ref<number>,
  validate: () => Promise<string[] | null>,
  reset: () => boolean,
  clearError: () => void,
  getValue: (defaultValue?: unknown) => unknown,
  setValue: (value: unknown, strict?: boolean) => void,
  sync: (instance: any) => void,
  unsync: (instance: any) => void
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

// export type FieldActions = Omit<FieldOptions, 'prop'>

// form
export const FORM_PROPS: InjectionKey<Partial<FormProps>> = Symbol('FORM_PROPS')
export const FORM_FIELDS: InjectionKey<Set<FieldOptions>> = Symbol('FORM_FIELDS')
export const FORM_ACTIONS: InjectionKey<FormActions> = Symbol('FORM_ACTIONS')

// form-item
export const FIELD_OPTIONS: InjectionKey<FieldOptions> = Symbol('FIELD_OPTIONS')
