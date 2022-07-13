import type { InjectionKey } from 'vue'
import type { Router } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'
import type { MenuMarkerType, MenuGroupType, MenuTheme } from '@/components/menu'
import type { TooltipTheme } from '@/components/tooltip'

export type LayoutSignType = 'aside' | 'header'
export type LayoutConfig = 'nav' | 'color'

export interface AsideMenuProps {
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  theme?: MenuTheme,
  tooltipTheme?: TooltipTheme,
  router?: Router,
  manualRoute?: boolean
}

export interface HeaderAction {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  meta?: Record<string, any>
}

export interface HeaderUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>
}

export interface FooterLink {
  name: string,
  subname?: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  to?: string,
  target?: string,
  children?: Array<Omit<FooterLink, 'children'>>
}

export interface LayoutState {
  isLayout: boolean,
  locked: boolean,
  affixed: boolean,
  scrollY: number,
  affixMatched: boolean,
  expanded: boolean,
  expandMatched: boolean,
  reduced: boolean,
  navConfig: boolean
}

export const LAYOUT_STATE = Symbol('LAYOUT_STATE') as InjectionKey<LayoutState>
