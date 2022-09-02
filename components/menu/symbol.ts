import type { InjectionKey } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'

export type MenuMarkerType = 'top' | 'right' | 'bottom' | 'left' | 'none'
export type MenuGroupType = 'collapse' | 'dropdown'

export interface MenuOptions {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  group?: boolean,
  meta?: Record<string, any>,
  route?: RouteLocationRaw,
  children?: MenuOptions[]
}

export interface MenuItemState {
  el: HTMLElement | null,
  label: string,
  indent: number,
  groupExpanded: boolean,
  isUsePopper: boolean,
  parentState: MenuItemState | null,
  transfer: boolean | string,
  updateSonSelected(selected: boolean): void,
  toggleGroupExpanded(expanded: boolean, upword?: boolean): void,
  handleMouseEnter(): void,
  handleMouseLeave(): void
}

export interface MenuGroupState {
  indent: number
}

export interface MenuState {
  horizontal: boolean,
  accordion: boolean,
  groupType: MenuGroupType,
  tooltipReverse: boolean,
  currentActive: string,
  isReduced: boolean,
  transfer: boolean | string,
  trigger: 'hover' | 'click',
  markerType: MenuMarkerType,
  handleSelect(label: string, meta: Record<string, any>, route?: RouteLocationRaw): void,
  handleExpand(label: string, expanded: boolean, meta: Record<string, any>): void,
  increaseItem(state: MenuItemState): void,
  decreaseItem(state: MenuItemState): void,
  beforeExpand(): void
}

export const baseIndentWidth = 20 // px
export const MENU_ITEM_STATE: InjectionKey<MenuItemState> = Symbol('MENU_ITEM_STATE')
export const MENU_GROUP_STATE: InjectionKey<MenuGroupState> = Symbol('MENU_GROUP_STATE')
export const MENU_STATE: InjectionKey<MenuState> = Symbol('MENU_STATE')
