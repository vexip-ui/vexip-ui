import type { InjectionKey } from 'vue'

export interface OptionState {
  hidden: boolean,
  hitting: boolean,
  label: string,
  value: string | number
}

export interface SelectState {
  // currentValue: string | number,
  isSelected?(value: string | number): boolean,
  addOption?(state: OptionState): void,
  removeOption?(state: OptionState): void,
  handleSelect?(value: string | number, label: string): void,
  setCurrentLabel?(label: string, value: string | number): void
}

export const SELECTOR_STATE: InjectionKey<SelectState> = Symbol('SELECTOR_STATE')
