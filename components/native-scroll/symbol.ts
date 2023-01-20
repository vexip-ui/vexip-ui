import type { ScrollMode } from '@/components/scroll'

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
