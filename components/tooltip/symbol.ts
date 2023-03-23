import type { ComponentPublicInstance } from 'vue'

export type TooltipTheme = 'light' | 'dark'
export type ToopTipTrigger = 'hover' | 'click' | 'focus' | 'custom'

export type TooltipVirtual =
  | {
    getBoundingClientRect: () => DOMRect
  }
  | {
    x: number,
    y: number
  }
export interface TooltipExposed extends ComponentPublicInstance {
  toggleVisible: (visible: boolean) => void,
  updatePopper: () => void
}
