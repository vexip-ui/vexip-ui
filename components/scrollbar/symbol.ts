export type ScrollbarPlacement = 'top' | 'right' | 'bottom' | 'left'

export const enum ScrollbarType {
  HORIZONTAL,
  VERTICAL
}

export const scrollbarPlacements = Object.freeze<ScrollbarPlacement[]>([
  'top',
  'right',
  'bottom',
  'left'
])
