import DatePicker from './date-picker.vue'

export { DatePicker }
export { datePickerProps } from './props'

export type DatePickerExposed = InstanceType<typeof DatePicker>

export type { DatePickerProps, DatePickerCProps } from './props'
export type {
  DateType,
  TimeType,
  DateTimeType,
  DatePickerType,
  DateShortcut,
  TimeShortcut
} from './symbol'
