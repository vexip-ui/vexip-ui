import Calendar from './calendar.vue'

import type { ComponentPublicInstance } from 'vue'

export { Calendar }
export { calendarProps } from './props'

export type CalendarExposed = ComponentPublicInstance & InstanceType<typeof Calendar>

export type { CalendarProps, CalendarCProps } from './props'
export type { WeekIndex, MonthIndex } from './symbol'
