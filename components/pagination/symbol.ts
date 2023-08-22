import type { ComponentPublicInstance } from 'vue'

export type PaginationPlugin = 'total' | 'jump' | 'size'

export interface PaginationExposed extends ComponentPublicInstance {
  changeActive: (active: number, focus?: boolean) => void,
  handlePrev: () => void,
  handleNext: () => void
}
