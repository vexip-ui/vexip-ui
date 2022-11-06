import type { InjectionKey } from 'vue'

export type CarouselArrowType = 'outside' | 'inside' | 'none'
export type CarouselArrowTrigger = 'hover' | 'always'
export type CarouselPointerType = 'outside' | 'inside' | 'none'

export interface ItemState {
  label: number,
  width: number,
  height: number,
  offset: number
}

export interface CarouselState {
  vertical: boolean,
  increaseItem: (item: ItemState) => void,
  decreaseItem: (item: ItemState) => void,
  isItemActive: (label: number) => boolean,
  handleSelect: (label: number) => void
}

export const CAROUSEL_STATE: InjectionKey<CarouselState> = Symbol('CAROUSEL_STATE')
