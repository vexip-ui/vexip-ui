import type { InjectionKey } from 'vue'

export type LayoutProp = number | string | (number | string)[]

export type GridJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export interface CellFlex {
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
  align: 'top' | 'middle' | 'bottom' | 'stretch',
}

export interface GridState {
  cellFlex: CellFlex | false,
  columns: LayoutProp,
}

export interface CellOptions {
  top?: number | string,
  left?: number | string,
  width?: number,
  height?: number,
  right?: number | string,
  bottom?: number | string,
}

export const GRID_STATE = '__VXP_GRID_STATE' as unknown as InjectionKey<GridState>
