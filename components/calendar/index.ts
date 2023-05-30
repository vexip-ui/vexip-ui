import Calendar from './calendar.vue'

export { Calendar }
export { calendarProps } from './props'

export type CalendarExposed = InstanceType<typeof Calendar>

export type { CalendarProps, CalendarCProps } from './props'
export type { WeekIndex, MonthIndex } from './symbol'
