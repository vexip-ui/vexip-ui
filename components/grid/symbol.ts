import type { InjectionKey } from 'vue'

export type LayoutProp = number | string | (number | string)[]

export type GridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export interface CellFlex {
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between',
  align: 'top' | 'middle' | 'bottom'
}

export interface GridState {
  cellFlex: CellFlex | false
}

export interface CellOptions {
  top?: number | string,
  left?: number | string,
  width?: number,
  height?: number,
  right?: number | string,
  bottom?: number | string
}

export const GRID_STATE: InjectionKey<GridState> = Symbol('GRID_STATE')
