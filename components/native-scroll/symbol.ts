import type { ScrollMode } from '@/components/scroll'
import type { EventHandler } from '@vexip-ui/utils'

export type NativeScrollMode = Exclude<ScrollMode, 'horizontal-exact'>

export interface ScrollPayload {
  type: NativeScrollMode,
  clientX: number,
  clientY: number,
  percentX: number,
  percentY: number
}

export interface BarScrollPayload {
  type: 'vertical' | 'horizontal',
  clientX: number,
  clientY: number,
  percentX: number,
  percentY: number
}

export interface NativeScrollExposed {
  percentX: number,
  percentY: number,
  currentScroll: {
    x: number,
    y: number
  },
  enableXScroll: Readonly<boolean>,
  enableYScroll: Readonly<boolean>,
  content?: HTMLElement,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => Promise<void>,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => Promise<void>,
  scrollToElement: (
    el: string | Element,
    duration?: number | undefined,
    offset?: number
  ) => Promise<void>,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void,
  getXScrollLimit: () => number[],
  getYScrollLimit: () => number[],
  addScrollListener: (listener: EventHandler) => void,
  removeScrollListener: (listener: EventHandler) => void
}
