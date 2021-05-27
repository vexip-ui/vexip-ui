export interface ItemState {
  width: number,
  height: number,
  el: HTMLElement | null,
  value: number | string,
  disabled: boolean
}

export interface WheelState {
  increaseItem(item: ItemState): void,
  decreaseItem(item: ItemState): void
}

export const WHEEL_STATE = Symbol('WHEEL_STATE')
