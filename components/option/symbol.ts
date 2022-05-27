import type { InjectionKey } from 'vue'

export interface ObjectOption {
  value: string | number,
  label?: string,
  disabled?: boolean,
  divided?: boolean,
  noTitle?: boolean
}

export type RawOption = string | ObjectOption

export interface OptionState extends ObjectOption {
  label: string,
  hidden: boolean,
  hitting: boolean
}

export interface SelectState {
  // currentValue: string | number,
  isSelected?(value: string | number): boolean,
  addOption?(state: ObjectOption): void,
  removeOption?(state: ObjectOption): void,
  handleSelect?(value: string | number, label: string): void,
  setCurrentLabel?(label: string, value: string | number): void
}

export const SELECTOR_STATE: InjectionKey<SelectState> = Symbol('SELECTOR_STATE')
