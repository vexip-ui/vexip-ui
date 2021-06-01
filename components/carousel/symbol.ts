export type ClassType = string | Record<string, boolean>
export type ArrowType = 'outside' | 'inside' | 'none'
export type ArrowTrigger = 'hover' | 'always'
export type PointerType = 'outside' | 'inside' | 'none'

export interface ItemState {
  label: number,
  width: number,
  height: number,
  offset: number
}

export interface CarouselState {
  vertical: boolean,
  currentActive: number,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void
}

export const CAROUSEL_STATE = Symbol('CAROUSEL_STATE')
