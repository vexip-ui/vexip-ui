import type { InjectionKey } from 'vue'
import type { TabNavSlots } from '@/components/tab-nav'

export interface ItemState {
  label: string | number,
  name: string,
  icon: Record<string, any>,
  disabled: boolean,
  closable?: boolean,
  labelRenderer: null | ((data: { label: string | number }) => any),
}

export interface TabsState {
  currentActive: string | number,
  lazy: boolean,
  lazyLoad: boolean,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  refreshLabels: () => void,
}

export interface TabsSlots extends TabNavSlots {}

export const TABS_STATE = '__VXP_TABS_STATE' as unknown as InjectionKey<TabsState>
