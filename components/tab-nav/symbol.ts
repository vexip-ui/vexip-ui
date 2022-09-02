import type { InjectionKey } from 'vue'

export interface ItemState {
  el: HTMLElement | null,
  label: string | number,
  index: number,
  total: number
}

export interface TabNavState {
  currentActive: string | number,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  refreshLabels: () => void
}

export const TAB_NAV_STATE: InjectionKey<TabNavState> = Symbol('TAB_NAV_STATE')
