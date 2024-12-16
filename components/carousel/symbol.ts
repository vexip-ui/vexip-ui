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

export interface CarouselSlots {
  default?: () => any,
  prevArrow?: (params: { disabled: boolean }) => any,
  nextArrow?: (params: { disabled: boolean }) => any,
  pointer?: (params: { active: boolean }) => any
}

export const CAROUSEL_STATE = '__VXP_CAROUSEL_STATE' as unknown as InjectionKey<CarouselState>
