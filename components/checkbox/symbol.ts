import type { Ref, InjectionKey } from 'vue'
import type { ComponentSize, ComponentState } from '@vexip-ui/config'

export interface ControlState {
  checked: boolean,
  partial: boolean
}

export interface GroupState {
  currentValues: (string | number)[],
  size: ComponentSize,
  state: ComponentState,
  disabled: boolean,
  loading: boolean,
  loadingLock: boolean,
  increaseItem(value: string | number, checked: boolean, input: Ref<HTMLElement | null>): void,
  decreaseItem(value: string | number, input: Ref<HTMLElement | null>): void,
  increaseControl(state: ControlState): void,
  decreaseControl(state: ControlState): void,
  handleControlChange(): void,
  setItemChecked(value: string | number, checked: boolean): void,
  replaceValue(prevValue: string | number, newValue: string | number): void
}

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('CHECKBOX_GROUP_STATE')
