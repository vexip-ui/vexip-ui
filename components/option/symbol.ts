export interface OptionState {
  label: string,
  value: string | number,
  hidden: boolean
}

export interface SelectState {
  currentValue: string | number,
  addOption?(state: OptionState): void,
  removeOption?(state: OptionState): void,
  handleSelect?(value: string | number, label: string): void,
  setCurrentLabel?(label: string): void
}

export const SELECTOR_STATE = Symbol('SELECTOR_STATE')
