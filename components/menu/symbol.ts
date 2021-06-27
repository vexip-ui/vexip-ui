import type { InjectionKey } from 'vue'
import type { TooltipTheme } from '@/components/tooltip'

export type MenuMarkerType = 'top' | 'right' | 'bottom' | 'left' | 'none'
export type MenuGroupType = 'collapse' | 'dropdown'
export type MenuTheme = 'light' | 'dark'

export interface MenuItemState {
  el: HTMLElement | null,
  label: string,
  indent: number,
  groupExpanded: boolean,
  isUsePopper: boolean,
  parentState: MenuItemState | null,
  updateSonSelected(selected: boolean): void,
  toggleGroupExpanded(expanded: boolean, upword?: boolean): void,
  handleMouseEnter(): void,
  handleMouseLeave(): void
}

export interface MenuState {
  horizontal: boolean,
  accordion: boolean,
  groupType: MenuGroupType,
  theme: MenuTheme,
  tooltipTheme: TooltipTheme,
  currentActive: string,
  isReduced: boolean,
  handleSelect(label: string): void,
  handleExpand(label: string, expanded: boolean): void,
  increaseItem(state: MenuItemState): void,
  decreaseItem(state: MenuItemState): void
}

export const baseIndentWidth = 20 // px
export const MENU_STATE: InjectionKey<MenuState> = Symbol('MENU_STATE')
export const MENU_ITEM_STATE: InjectionKey<MenuItemState> = Symbol('MENU_ITEM_STATE')
