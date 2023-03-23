import type { ComponentPublicInstance } from 'vue'
import type { NativeScrollExposed } from '@/components/native-scroll'

export interface VirtualListExposed extends ComponentPublicInstance {
  scroll?: NativeScrollExposed,
  wrapper?: HTMLElement,
  list?: HTMLElement,
  scrollOffset: number,
  scrollTo: (top: number, behavior?: ScrollBehavior) => void,
  scrollBy: (delta: number, behavior?: ScrollBehavior) => void,
  scrollToKey: (key: string | number | symbol, behavior?: ScrollBehavior) => void,
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void,
  ensureIndexInView: (index: number, behavior?: ScrollBehavior) => void,
  ensureKeyInView: (key: string | number | symbol, behavior?: ScrollBehavior) => void,
  refresh: () => void
}

export interface ScrollPayload {
  clientX: number,
  clientY: number,
  percentX: number,
  percentY: number
}
