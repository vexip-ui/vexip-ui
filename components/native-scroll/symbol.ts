import type { ComponentPublicInstance } from 'vue'
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

export interface NativeScrollState {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: Readonly<boolean>,
  enableYScroll: Readonly<boolean>
}

export interface NativeScrollSlotParams {
  getState: () => NativeScrollState,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => Promise<void>,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => Promise<void>,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => Promise<void>,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}

export interface NativeScrollExposed extends ComponentPublicInstance {
  x: number,
  y: number,
  percentX: number,
  percentY: number,
  xScrollLimit: number,
  yScrollLimit: number,
  enableXScroll: boolean,
  enableYScroll: boolean,
  xBarLength: number,
  yBarLength: number,
  content?: HTMLElement,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => Promise<void>,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => Promise<void>,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => Promise<void>,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void,
  getXScrollLimit: () => number[],
  getYScrollLimit: () => number[],
  addScrollListener: (listener: EventHandler) => void,
  removeScrollListener: (listener: EventHandler) => void
}
