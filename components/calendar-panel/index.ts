import CalendarPanel from '../calendar/calendar-panel.vue'

export { CalendarPanel }
export { calendarPanelProps } from '../calendar/props'

export type CalendarPanelExposed = InstanceType<typeof CalendarPanel>

export type { CalendarPanelProps, CalendarPanelCProps } from '../calendar/props'
