import type { Ref, InjectionKey } from 'vue'
import type { ComponentSize, ComponentState } from '@vexip-ui/config'

export interface GroupState {
  currentValue: string | number,
  size: ComponentSize,
  state: ComponentState,
  disabled: boolean,
  updateValue(value: string | number): void,
  registerInput(input: Ref<HTMLElement | null>): void,
  unregisterInput(input: Ref<HTMLElement | null>): void
}

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('RADIO_GROUP_STATE')
