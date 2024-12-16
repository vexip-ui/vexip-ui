import type { InjectionKey } from 'vue'

export interface ItemState {
  label: string | number,
  name: string,
  icon: Record<string, any>,
  disabled: boolean,
  closable?: boolean,
  labelRenderer: null | ((data: { label: string | number }) => any)
}

export interface TabsState {
  currentActive: string | number,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  refreshLabels: () => void
}

export interface TabsSlots {
  prefix?: () => any,
  suffix?: () => any,
  add?: () => any,
  /**
   * @internal
   */
  default?: () => any
}

export const TABS_STATE = '__VXP_TABS_STATE' as unknown as InjectionKey<TabsState>
