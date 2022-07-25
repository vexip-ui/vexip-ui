import type { NativeScroll } from '@/components/native-scroll'

export interface VirtualListExposed {
  scroll: InstanceType<typeof NativeScroll> | null,
  wrapper: HTMLElement | null,
  list: HTMLElement | null,
  scrollOffset: number,
  scrollTo: (top: number, behavior?: ScrollBehavior) => void,
  scrollBy: (delta: number, behavior?: ScrollBehavior) => void,
  scrollToKey: (key: string | number | symbol, behavior?: ScrollBehavior) => void,
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void,
  ensureIndexInView: (index: number, behavior?: ScrollBehavior) => void,
  ensureKeyInView: (key: string | number | symbol, behavior?: ScrollBehavior) => void,
  refresh: () => void
}
