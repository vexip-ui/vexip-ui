import type { NativeScroll } from '@/components/native-scroll'

export interface VirtualListExposed {
  scroll: InstanceType<typeof NativeScroll> | null,
  list: HTMLElement | null,
  refresh: () => void
}
