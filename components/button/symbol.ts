import type { InjectionKey } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
export type ButtonAttrType = 'button' | 'submit' | 'reset'

export interface ButtonState {
  index: number,
  isLast: boolean
}

export interface ButtonGroupState {
  type: ButtonType,
  size: ComponentSize,
  increaseItem: (item: ButtonState) => void,
  decreaseItem: (item: ButtonState) => void,
  refreshIndexes: () => void
}

export const GROUP_STATE: InjectionKey<ButtonGroupState> = Symbol('GROUP_STATE')

export const buttonTypes = Object.freeze<ButtonType[]>([
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'error'
])
