import type { InjectionKey } from 'vue'

export type TimelineItemType = 'default' | 'success' | 'error' | 'warning' | 'disabled'

export interface ItemState {
  label: string | number,
  index: number,
  total: number,
  height: number
}

export interface TimelineState {
  dashed: boolean,
  lineColor: string,
  spacing: number | string,
  alternate: boolean,
  horizontal: boolean,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  handleSignalClick: (label: string | number) => void
}

export const TIMELINE_STATE: InjectionKey<TimelineState> = Symbol('TTIMELINE_STATE')
