import CalendarPanel from '../calendar/calendar-panel.vue'

import type { ComponentPublicInstance } from 'vue'

export { CalendarPanel }
export { calendarPanelProps } from '../calendar/props'

export type CalendarPanelExposed = ComponentPublicInstance & InstanceType<typeof CalendarPanel>

export type { CalendarPanelProps, CalendarPanelCProps } from '../calendar/props'
