import type { Ref } from 'vue'
import type { Rule } from './validator'

export type LabelPosition = 'right' | 'top' | 'left'

export interface FormProps {
  model: Record<string, any>,
  rules: Record<string, any>,
  labelWidth: number,
  labelPosition: LabelPosition,
  allRequired: boolean,
  labelSuffix: string,
  hideAsterisk: boolean,
  validateAll: boolean
}

export interface FormItemProps {
  label: string,
  prop: string,
  rules: Rule | Rule[],
  labelWidth: number,
  required: boolean,
  htmlFor: string,
  errorTransition: string,
  defaultValue: unknown,
  hideErrorTip: boolean,
  validateAll: boolean,
  asterisk: boolean
}

export interface FieldOptions {
  prop: Ref<string>,
  validate(): Promise<string[] | null>,
  reset(): boolean,
  clearError(): void
}

// form
export const FORM_PROPS = Symbol('FORM_PROPS')
export const FORM_FIELDS = Symbol('FORM_FIELDS')

// form-item
export const VALIDATE_FIELD = Symbol('VALIDATE_FIELD')
export const CLEAR_FIELD = Symbol('CLEAR_FIELD')
