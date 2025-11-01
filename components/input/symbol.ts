import type { ComponentPublicInstance } from 'vue'

export type InputType = 'text' | 'password' | 'date' | 'datetime' | 'time'

export interface InputExposed extends ComponentPublicInstance {
  idFor?: string,
  labelId?: string,
  focused: boolean,
  currentValue: string,
  showPassword: boolean,
  currentLength: number,
  composing: boolean,
  input?: HTMLInputElement | null,
  copyValue: () => boolean,
  focus: (options?: FocusOptions) => void,
  blur: () => void,
}

export type ChangeEvent = (value: string | number) => void

export interface InputSlots {
  prefix?: () => any,
  suffix?: () => any,
  before?: () => any,
  after?: () => any,
  beforeAction?: () => any,
  afterAction?: () => any,
  count?: (params: { value: string }) => any,
  password?: (params: { plain: boolean }) => any,
}
