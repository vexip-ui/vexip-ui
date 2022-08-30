import type { Dateable } from '@vexip-ui/utils'

export type DateType = 'year' | 'month' | 'date'
export type TimeType = 'hour' | 'minute' | 'second'
export type DateTimeType = DateType | TimeType

export type DatePickerType = 'date' | 'datetime' | 'year' | 'month'

export interface DateShortcut {
  name: string,
  value: Dateable | Dateable[] | (() => Dateable | Dateable[])
}

export interface TimeShortcut {
  name: string,
  value: string | string[] | (() => string | string[])
}

export interface DatePickerState {
  type: DatePickerType,
  currentColumn: DateTimeType,
  enabled: Record<DateTimeType, boolean>,
  activated: Record<DateTimeType, boolean>,
  dateValue: Record<DateTimeType, number>,
  enterColumn(type: 'prev' | 'next'): void
}

export const datePickerTypes = Object.freeze<DatePickerType>(['date', 'datetime', 'year', 'month'])
