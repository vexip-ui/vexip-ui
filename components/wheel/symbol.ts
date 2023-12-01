import type { InjectionKey } from 'vue'

export type WheelRawOption =
  | string
  | number
  | {
    value: string | number,
    label?: string,
    disabled?: boolean
  }

export interface WheelOption {
  value: string | number,
  label: string,
  disabled: boolean,
  meta: WheelRawOption
}

export interface ItemState {
  width: number,
  height: number,
  el?: HTMLElement | null,
  value: number | string,
  disabled: boolean,
  meta: any
}

export interface WheelState {
  increaseItem(item: ItemState): void,
  decreaseItem(item: ItemState): void
}

export const WHEEL_STATE: InjectionKey<WheelState> = Symbol('WHEEL_STATE')
