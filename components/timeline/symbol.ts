export type TimelinkItemType = 'normal' | 'success' | 'error' | 'warning' | 'disabled' | 'custom'

export interface ItemState {
  label: string | number
}

export interface TimelineState {
  dashed: boolean,
  lineColor: string,
  spacing: number | string,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleSignalClick: (label: string | number) => void
}

export const TTIMELINE_STATE = Symbol('TTIMELINE_STATE')
