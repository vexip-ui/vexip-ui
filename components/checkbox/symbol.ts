import type { InjectionKey, Ref } from 'vue'
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
  colorMap: Record<string, string> | null,
  stateColor: boolean,
  increaseItem(
    value: string | number,
    checked: boolean,
    input: Ref<HTMLElement | null | undefined>
  ): void,
  decreaseItem(value: string | number, input: Ref<HTMLElement | null | undefined>): void,
  increaseControl(state: ControlState): void,
  decreaseControl(state: ControlState): void,
  handleControlChange(): void,
  setItemChecked(value: string | number, checked: boolean): void,
  replaceValue(prevValue: string | number, newValue: string | number): void
}

export const GROUP_STATE = '__VXP_CHECKBOX_GROUP_STATE' as unknown as InjectionKey<GroupState>
