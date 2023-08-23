import DatePicker from './date-picker.vue'

import type { ComponentPublicInstance } from 'vue'

export { DatePicker }
export { datePickerProps } from './props'

export type DatePickerExposed = ComponentPublicInstance & InstanceType<typeof DatePicker>

export type { DatePickerProps, DatePickerCProps } from './props'
export type {
  DateType,
  TimeType,
  DateTimeType,
  DatePickerType,
  DatePickerFormatFn,
  DateShortcut,
  TimeShortcut
} from './symbol'
