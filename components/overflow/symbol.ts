import type { ComponentPublicInstance } from 'vue'

export interface OverflowExposed extends ComponentPublicInstance {
  refresh: () => void
}
