import type { ComponentPublicInstance, InjectionKey, VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'

export type MenuMarkerType = 'top' | 'right' | 'bottom' | 'left' | 'none'
export type MenuGroupType = 'collapse' | 'dropdown'

export interface MenuOptions {
  label: string,
  icon?: Record<string, any> | (() => any),
  iconProps?: IconMinorProps,
  name?: string | (() => string),
  disabled?: boolean,
  group?: boolean,
  meta?: Record<string, any>,
  route?: RouteLocationRaw,
  children?: MenuOptions[]
}

export interface MenuItemState {
  el: Readonly<HTMLElement | null | undefined>,
  label: Readonly<string>,
  indent: Readonly<number>,
  groupExpanded: boolean,
  showGroup: Readonly<boolean>,
  isUsePopper: Readonly<boolean>,
  parentState: MenuItemState | null,
  transfer: Readonly<boolean | string>,
  cachedExpanded: boolean,
  updateSonSelected(selected: boolean, upstream?: boolean): void,
  toggleGroupExpanded(expanded: boolean, upward?: boolean): void,
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
  arrow: Record<string, any> | (() => any),
  handleSelect(label: string, meta: Record<string, any>, route?: RouteLocationRaw): void,
  handleExpand(label: string, expanded: boolean, meta: Record<string, any>): void,
  increaseItem(state: MenuItemState): void,
  decreaseItem(state: MenuItemState): void,
  doForEachItem(cb: (item: MenuItemState) => void): void,
  renderItemArrow: (params: MenuArrowSlotParams, renderDefault: () => VNode) => void
}

export interface MenuArrowSlotParams {
  groupExpanded: boolean,
  sonSelected: boolean
}

export interface MenuSlots {
  /**
   * @internal
   */
  default?: () => any,
  arrow?: (params: MenuArrowSlotParams) => any
}

export interface MenuItemSlots {
  /**
   * @internal
   */
  default?: () => any,
  /**
   * @internal
   */
  icon?: () => any,
  /**
   * @internal
   */
  group?: () => any,
  arrow?: (params: MenuArrowSlotParams) => any
}

export interface MenuExposed extends ComponentPublicInstance {
  expandItemByLabel: (label: string) => void
}

export interface MenuItemExposed extends ComponentPublicInstance {
  groupExpanded: boolean,
  isGroup: boolean,
  showGroup: boolean,
  isUsePopper: boolean,
  handleSelect: () => void,
  handleMouseEnter: () => void,
  handleMouseLeave: () => void
}

export const MENU_ITEM_STATE = '__VXP_MENU_ITEM_STATE' as unknown as InjectionKey<MenuItemState>
export const MENU_GROUP_STATE = '__VXP_MENU_GROUP_STATE' as unknown as InjectionKey<MenuGroupState>
export const MENU_STATE = '__VXP_MENU_STATE' as unknown as InjectionKey<MenuState>
