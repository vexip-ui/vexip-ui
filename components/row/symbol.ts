import type { InjectionKey } from 'vue'

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
export type Align = 'top' | 'middle' | 'bottom' | 'stretch'

export interface ColumnFlex {
  justify: Justify,
  align: Align
}

export interface RowState {
  columnFlex: ColumnFlex | false,
  gutter: number | number[]
}

export interface ColumnOptions {
  span?: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number
}

export const breakPoints = Object.freeze<BreakPoint[]>(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])

export const ROW_STATE: InjectionKey<RowState> = Symbol('ROW_STATE')
