import type { ComponentPublicInstance } from 'vue'

export type TooltipTheme = 'light' | 'dark'
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'hover-focus' | 'custom'
export type TooltipShift = 'horizontal' | 'vertical' | 'both'

export type TooltipVirtual =
  | {
    getBoundingClientRect: () => DOMRect
  }
  | {
    $el: {
      getBoundingClientRect: () => DOMRect
    }
  }
  | {
    x: number,
    y: number
  }
export interface TooltipExposed extends ComponentPublicInstance {
  toggleVisible: (visible: boolean) => void,
  updatePopper: () => void
}
