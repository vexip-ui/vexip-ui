import type { InjectionKey, ComponentPublicInstance } from 'vue'
import type { Router } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'
import type { MenuMarkerType, MenuGroupType, MenuExposed } from '@/components/menu'
import type { NativeScrollExposed } from '@/components/native-scroll'

export type LayoutSignType = 'aside' | 'header'
export type LayoutConfig = 'nav' | 'color' | 'theme'

export interface LayoutMenuProps {
  active?: string,
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  tooltipReverse?: boolean,
  router?: Router,
  manualRoute?: boolean,
  onExpand?: (label: string, meta: Record<string, any>) => void,
  onReduce?: (label: string, meta: Record<string, any>) => void
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
  expandMatched: boolean,
  useExpand: boolean,
  expanded: boolean,
  reduced: boolean,
  navConfig: boolean
}

export interface LayoutSlotParams {
  expanded: boolean,
  reduced: boolean,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced: boolean) => void
}

export interface LayoutHeaderSlotParams extends LayoutSlotParams {
  handleColorChange: (color: string) => void,
  toggleUserDropped: (dropped?: boolean) => void
}

export interface LayoutExposed extends ComponentPublicInstance {
  scroll?: NativeScrollExposed,
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void
}

export interface LayoutHeaderExposed extends ComponentPublicInstance {
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void,
  toggleUserDropped: (dropped: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LayoutMainExposed extends ComponentPublicInstance {}

export interface LayoutAsideExposed extends ComponentPublicInstance {
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void
}

export const LAYOUT_STATE = Symbol('LAYOUT_STATE') as InjectionKey<LayoutState>
