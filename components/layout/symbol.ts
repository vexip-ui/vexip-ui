import type { ComponentPublicInstance, InjectionKey } from 'vue'
import type { Router } from 'vue-router'
import type { IconMinorProps } from '@/components/icon'
import type { MenuExposed, MenuGroupType, MenuMarkerType } from '@/components/menu'
import type { NativeScrollExposed } from '@/components/native-scroll'
import type { ClassType } from '@vexip-ui/config'
import type { BreakPoint } from '@/components/grid'

export type LayoutSignType = 'aside' | 'header'
export type LayoutConfig = 'nav' | 'color' | 'theme'
export type LayoutSection =
  | 'wrapper'
  | 'section'
  | 'header'
  | 'headerLeft'
  | 'headerMain'
  | 'headerRight'
  | 'headerUser'
  | 'sidebar'
  | 'aside'
  | 'asideTop'
  | 'asideMain'
  | 'asideBottom'
  | 'expandHandler'
  | 'main'
  | 'footer'
  | 'footerLinks'
  | 'copyright'
  | 'scrollbar'

export type LayoutInnerClass = Partial<Record<LayoutSection, ClassType>>
export type LayoutMediaJudger = (breakpoint: BreakPoint) => boolean

export interface LayoutMenuProps {
  active?: string,
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  tooltipReverse?: boolean,
  router?: Router,
  manualRoute?: boolean,
  onExpand?: (label: string, meta: Record<string, any>) => void,
  onReduce?: (label: string, meta: Record<string, any>) => void,
}

export interface LayoutHeaderAction {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  hidden?: boolean,
  meta?: Record<string, any>,
}

export interface LayoutUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>,
}

export interface LayoutFooterLink {
  name: string,
  subname?: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  to?: string,
  target?: string,
  children?: Array<Omit<LayoutFooterLink, 'children'>>,
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
  navConfig: boolean,
  classes: LayoutInnerClass,
  changeInLock: (doChange: () => void) => void,
}

export interface LayoutSlotParams {
  expanded: boolean,
  reduced: boolean,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced: boolean) => void,
}

export interface LayoutHeaderSlotParams extends LayoutSlotParams {
  handleColorChange: (color: string) => void,
  toggleUserDropped: (dropped?: boolean) => void,
}

export interface LayoutExposed extends ComponentPublicInstance {
  scroll?: NativeScrollExposed,
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void,
}

export interface LayoutHeaderExposed extends ComponentPublicInstance {
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void,
  toggleUserDropped: (dropped: boolean) => void,
}

export interface LayoutMainExposed extends ComponentPublicInstance {}

export interface LayoutAsideExposed extends ComponentPublicInstance {
  menu?: MenuExposed,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced?: boolean) => void,
  expandMenuByLabel: (label: string) => void,
}

export const LAYOUT_STATE = '___VXP_LAYOUT_STATE' as unknown as InjectionKey<LayoutState>
