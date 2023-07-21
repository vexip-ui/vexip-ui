import type { InjectionKey, Ref } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ComponentSize, ComponentState } from '@vexip-ui/config'

export interface GroupState {
  currentValue: string | number | boolean,
  size: ComponentSize,
  state: ComponentState,
  disabled: boolean,
  button: boolean,
  border: boolean,
  loading: boolean,
  loadingIcon: Record<string, any>,
  loadingLock: boolean,
  loadingEffect: IconEffect,
  updateValue(value: string | number | boolean): void,
  registerInput(input: Ref<HTMLElement | null | undefined>): void,
  unregisterInput(input: Ref<HTMLElement | null | undefined>): void
}

export type ChangeEvent = (value: string | number | boolean) => void

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('RADIO_GROUP_STATE')
