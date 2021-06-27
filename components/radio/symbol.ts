import type { InjectionKey } from 'vue'

export interface GroupState {
  currentValue: string | number,
  disabled: boolean,
  updateValue(value: string | number): void
}

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('RADIO_GROUP_STATE')
