import { USE_TOUCH } from '@vexip-ui/utils'

export type ScrollMode = 'horizontal' | 'horizontal-exact' | 'vertical' | 'both'

export interface ScrollPayload {
  type: Exclude<ScrollMode, 'horizontal-exact'>,
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

export interface ScrollState {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: number,
  enableYScroll: number
}

export interface ScrollSlotParams {
  getState: () => ScrollState,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => void,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => void,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => void,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}

export const scrollModes = Object.freeze<ScrollMode[]>([
  'horizontal',
  'horizontal-exact',
  'vertical',
  'both',
])

export const MOVE_EVENT = USE_TOUCH ? 'touchmove' : 'mousemove'
export const UP_EVENT = USE_TOUCH ? 'touchend' : 'mouseup'
