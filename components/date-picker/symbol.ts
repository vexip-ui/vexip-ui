import type { Dateable } from '@vexip-ui/utils'

export type DateType = 'year' | 'month' | 'date'
export type TimeType = 'hour' | 'minute' | 'second'
export type DateTimeType = DateType | TimeType

export type DatePickerType = 'date' | 'datetime' | 'year' | 'month'
export type DateShortcutsPlacement = 'top' | 'right' | 'bottom' | 'left'
export type TimeShortcutsPlacement = DateShortcutsPlacement

export type DatePickerFormatFn = (timestamp: number, type: 'start' | 'end') => unknown

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

export interface DisabledTime {
  hour?(hour: number): boolean,
  minute?(hour: number, minute: number): boolean,
  second?(hour: number, minute: number, second: number): boolean
}

export const enum DisabledType {
  UPSTREAM,
  TRUE,
  AT_MIN_TRUE,
  AT_MAX_TRUE,
  FALSE
}

export type DatePickerChangeEvent = (value: number | number[] | null) => void
export type TimePickerChangeEvent = (value: string | string[]) => void

export const datePickerTypes = Object.freeze<DatePickerType[]>([
  'date',
  'datetime',
  'year',
  'month'
])

export const invalidDate = new Date('')

// export const TIME_REG = /^((?:[01]?[0-9])|(?:2[0-3]))((?::[0-5]?[0-9]))?((?::[0-5]?[0-9]))?$/
export const TIME_REG = /^((?:\d{1,2}))((?::\d{1,2}))?((?::\d{1,2}))?$/
