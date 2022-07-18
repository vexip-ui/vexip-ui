export type ScrollMode = 'horizontal' | 'vertical' | 'both'

export interface ScrollPayload {
  type: ScrollMode,
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
