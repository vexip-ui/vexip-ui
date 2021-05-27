import type { TooltipTheme } from '@/components/tooltip'

export type MenuMarkerType = 'right' | 'left' | 'none'
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
export const MENU_STATE = Symbol('MENU_STATE')
export const MENU_ITEM_STATE = Symbol('MENU_ITEM_STATE')
