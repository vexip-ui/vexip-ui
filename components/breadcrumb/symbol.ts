import type { InjectionKey } from 'vue'

export type SeparatorRenderFn = (data: { label: string | number }) => any

export interface BreadcrumbItemState {
  label: string | number
}

export interface BreadcrumbState {
  separator: string,
  separatorRenderer: null | SeparatorRenderFn,
  increaseItem: (item: BreadcrumbItemState) => void,
  decreaseItem: (item: BreadcrumbItemState) => void,
  handleSelect: (label: string | number) => void,
  refreshLabels: () => void,
  handleSeparatorClick: (label: string | number) => void
}

export const BREADCRUMB_STATE: InjectionKey<BreadcrumbState> = Symbol('BREADCRUMB_STATE')
