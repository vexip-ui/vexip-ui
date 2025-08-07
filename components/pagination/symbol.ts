import type { ComponentPublicInstance } from 'vue'

export type PaginationPlugin = 'total' | 'jump' | 'size'

export interface PaginationExposed extends ComponentPublicInstance {
  changeActive: (active: number, focus?: boolean) => void,
  handlePrev: () => void,
  handleNext: () => void,
}

export interface PaginationSlots {
  prev?: (params: { disabled: boolean }) => any,
  next?: (params: { disabled: boolean }) => any,
  item?: (params: { page: number, disabled: boolean, active: boolean }) => any,
}
