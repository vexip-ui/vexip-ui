import type { InjectionKey } from 'vue'

export interface ControlState {
  checked: boolean,
  partial: boolean
}

export interface GroupState {
  currentValues: (string | number)[],
  disabled: boolean,
  increaseItem(label: string, value: string | number, checked: boolean): void,
  decreaseItem(label: string): void,
  increaseControl(state: ControlState): void,
  decreaseControl(state: ControlState): void,
  handleControlChange(): void,
  setLabelChecked(label: string, checked: boolean): void,
  replaceLabel(label: string, newLabel: string): void,
  replaceValue(label: string, value: string | number): void
}

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('CHECKBOX_GROUP_STATE')
