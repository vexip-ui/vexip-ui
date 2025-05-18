import type { Dateable } from '@vexip-ui/utils'
import type { CalendarPanelSlots } from '../calendar'
import type { WheelSlots } from '../wheel'

export type DateType = 'year' | 'month' | 'date'
export type TimeType = 'hour' | 'minute' | 'second'
export type DateTimeType = DateType | TimeType

export type DatePickerType = 'date' | 'datetime' | 'year' | 'month' | 'week'
export type DateShortcutsPlacement = 'top' | 'right' | 'bottom' | 'left'
export type TimeShortcutsPlacement = DateShortcutsPlacement

export type DatePickerFormatFn = (timestamp: number, type: 'start' | 'end') => unknown

export type DateUnitType = DateTimeType | 'week'

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
  FALSE,
}

export type DatePickerChangeEvent = (value: number | number[] | null) => void
export type TimePickerChangeEvent = (value: string | string[]) => void

export const datePickerTypes = Object.freeze<DatePickerType[]>([
  'date',
  'datetime',
  'year',
  'month',
  'week',
])

export const invalidDate = new Date('')

// export const TIME_REG = /^((?:[01]?[0-9])|(?:2[0-3]))((?::[0-5]?[0-9]))?((?::[0-5]?[0-9]))?$/
export const TIME_REG = /^((?:\d{1,2}))((?::\d{1,2}))?((?::\d{1,2}))?$/

export interface TimeWheelSlots {
  hour?: WheelSlots['default'],
  minute?: WheelSlots['default'],
  second?: WheelSlots['default']
}

export interface DatePanelSlots {
  title?: (params: {
    panel: DateType,
    yearStart: number,
    year: number,
    month: number,
    togglePanel: (panel: DateType) => void
  }) => any,
  year?: (params: {
    year: number,
    selected: boolean,
    isNext: boolean,
    disabled: boolean,
    inRange: boolean
  }) => any,
  month?: (params: {
    year: number,
    month: number,
    selected: boolean,
    disabled: boolean,
    inRange: boolean
  }) => any,
  week?: CalendarPanelSlots['week'],
  date?: CalendarPanelSlots['item']
}

export interface DatePickerSlots {
  prefix?: () => any,
  suffix?: () => any,
  exchange?: () => any,
  panelTitle?: DatePanelSlots['title'],
  panelYear?: DatePanelSlots['year'],
  panelMonth?: DatePanelSlots['month'],
  panelWeek?: DatePanelSlots['week'],
  panelDate?: DatePanelSlots['date']
}

export interface TimePickerSlots {
  prefix?: () => any,
  exchange?: () => any,
  suffix?: () => any
}
