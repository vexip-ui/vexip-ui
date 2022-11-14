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
export interface TooltipExposed {
  toggleVisible: (visible: boolean) => void,
  updatePopper: () => void
}
