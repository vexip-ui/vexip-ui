import type { Dateable } from '@/common/utils/date'

export type DateType = 'year' | 'month' | 'date'
export type TimeType = 'hour' | 'minute' | 'second'
export type DateTimeType = DateType | TimeType

export type DatePickerType = 'date' | 'datetime' | 'year' | 'month'

export interface DateShortcut {
  name: string,
  value: Dateable | (() => Dateable)
}

export interface TimeShortcut {
  name: string,
  value: string | (() => string)
}

export interface DatePickerState {
  type: DatePickerType,
  currentColumn: DateTimeType,
  enabled: Record<DateTimeType, boolean>,
  activated: Record<DateTimeType, boolean>,
  dateValue: Record<DateTimeType, number>,
  enterColumn(type: 'prev' | 'next'): void
}

export const START_DATE_STATE = Symbol('START_DATE_STATE')
export const END_DATE_STATE = Symbol('END_DATE_STATE')
