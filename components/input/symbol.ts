import type { ComponentPublicInstance } from 'vue'

export type InputType = 'text' | 'password' | 'date' | 'datetime' | 'time'

export interface InputExposed extends ComponentPublicInstance {
  input?: HTMLElement | null,
  copyValue: () => boolean,
  focus: (options?: FocusOptions) => void,
  blur: () => void
}

export type ChangeEvent = (value: string | number) => void
