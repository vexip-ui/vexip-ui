import type { InjectionKey } from 'vue'

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type RowGridJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
export type RowGridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

export interface ColumnFlex {
  justify: RowGridJustify,
  align: RowGridAlign,
}

export interface RowState {
  columnFlex: ColumnFlex | false,
  gap: number | number[],
}

export interface ColumnOptions {
  span?: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number,
}

export const breakPoints = Object.freeze<BreakPoint[]>(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])

export const ROW_STATE = '__VXP_GRID_ROW_STATE' as unknown as InjectionKey<RowState>
