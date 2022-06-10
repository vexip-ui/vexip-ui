import type { InjectionKey } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type ButtonAttrType = 'button' | 'submit' | 'reset'

export interface ButtonGroupState {
  type: ButtonType,
  size: ComponentSize
}

export const GROUP_STATE: InjectionKey<ButtonGroupState> = Symbol('GROUP_STATE')

export const buttonTypes = Object.freeze<ButtonType>(['default', 'primary', 'info', 'success', 'warning', 'error'])
