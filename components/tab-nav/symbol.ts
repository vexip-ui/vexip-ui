export interface ItemState {
  el: HTMLElement | null,
  label: string | number
}

export interface TabNavState {
  currentActive: string | number,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  refreshLabels: () => void
}

export const TAB_NAV_STATE = Symbol('TAB_NAV_STATE')
