import type { VNodeChild } from 'vue'

export type SeparatorRenderFn = (data: { label: string | number }) => VNodeChild

export interface ItemState {
  label: string | number
}

export interface BreadcrumbState {
  separator: string,
  separatorRenderer: null | SeparatorRenderFn,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleSelect: (label: string | number) => void,
  refreshLabels: () => void,
  handleSeparatorClick: (label: string | number) => void
}

export const BREADCRUMB_STATE = Symbol('BREADCRUMB_STATE')
