import type { InjectionKey } from 'vue'

export interface ItemState {
  label: string | number,
  icon: string,
  disabled: boolean,
  labelRenderer: null | ((data: { label: string | number }) => any)
}

export interface TabsState {
  currentActive: string | number,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  refreshLabels: () => void
}

export const TABS_STATE: InjectionKey<TabsState> = Symbol('TABS_STATE')
