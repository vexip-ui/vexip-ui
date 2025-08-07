import type { InjectionKey } from 'vue'

export interface BreadcrumbOptions {
  label: string,
  name?: string | (() => string),
}

export type SeparatorRenderFn = (data: { label: string | number }) => any

export interface BreadcrumbItemState {
  label: string | number,
}

export interface BreadcrumbState {
  separator: string,
  separatorRenderer: null | SeparatorRenderFn,
  increaseItem: (item: BreadcrumbItemState) => void,
  decreaseItem: (item: BreadcrumbItemState) => void,
  handleSelect: (label: string | number) => void,
  refreshLabels: () => void,
  handleSeparatorClick: (label: string | number) => void,
}

export type SelectEvent = (label: string | number) => void

export interface BreadcrumbSlots {
  default?: () => any,
  item?: (params: { option: BreadcrumbOptions, index: number }) => any,
  separator?: (params: { label: string | number }) => any,
}

export const BREADCRUMB_STATE = '__VXP_BREADCRUMB_STATE' as unknown as InjectionKey<BreadcrumbState>
