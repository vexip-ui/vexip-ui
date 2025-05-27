import type { InjectionKey } from 'vue'

export type TabNavAlign = 'left' | 'center' | 'right'
export type TabNavPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface TabNavItemOptions {
  label: string | number,
  content?: string,
  icon?: Record<string, any>,
  disabled?: boolean,
  closable?: boolean,
  onToggle?: (active: boolean) => void
}

export type TabNavOptions = TabNavItemOptions | string | number

export interface ItemState {
  el?: HTMLElement | null,
  label: string | number,
  index: number,
  total: number
}

export interface TabNavState {
  currentActive: string | number,
  closable: boolean,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleActive: (label: string | number) => void,
  handleClose: (label: string | number) => void,
  refreshLabels: () => void
}

export type ChangeEvent = (label: string | number) => void

export interface TabNavSlots {
  prefix?: () => any,
  suffix?: () => any,
  add?: () => any,
  marker?: () => any,
  /**
   * @internal
   */
  default?: () => any
}

export const TAB_NAV_STATE = '__VXP_TAB_NAV_STATE' as unknown as InjectionKey<TabNavState>

export const trackStyleMap = Object.freeze({
  top: ['left', 'width'],
  right: ['top', 'height'],
  bottom: ['left', 'width'],
  left: ['top', 'height'],
} as const)
