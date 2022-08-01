import type { InjectionKey } from 'vue'
import type { Router } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'
import type { MenuMarkerType, MenuGroupType } from '@/components/menu'

export type LayoutSignType = 'aside' | 'header'
export type LayoutConfig = 'nav' | 'color'

export interface LayoutMenuProps {
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  tooltipReverse?: boolean,
  router?: Router,
  manualRoute?: boolean
}

export interface LayoutHeaderAction {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  meta?: Record<string, any>
}

export interface LayoutUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>
}

export interface LayoutFooterLink {
  name: string,
  subname?: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  to?: string,
  target?: string,
  children?: Array<Omit<LayoutFooterLink, 'children'>>
}

export interface LayoutState {
  isLayout: boolean,
  locked: boolean,
  affixed: boolean,
  scrollY: number,
  affixMatched: boolean,
  expanded: boolean,
  reduced: boolean,
  navConfig: boolean
}

export const LAYOUT_STATE = Symbol('LAYOUT_STATE') as InjectionKey<LayoutState>
