import { booleanProp, buildProps, eventProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Dateable } from '@vexip-ui/utils'

export const calendarProps = buildProps({
  locale: localeProp('calendar'),
  value: [Number, String, Date] as PropType<Dateable | Dateable[]>,
  year: Number,
  /**
   * 当前日历显示的月份 (1 ~ 12)
   */
  month: Number,
  /**
   * 头部星期显示的内容，数量须为 7 个
   */
  weekDays: Array as PropType<string[]>,
  weekStart: Number,
  today: [Number, String, Date] as PropType<Dateable>,
  disabledDate: Function as PropType<(data: Date) => boolean>,
  onSelect: eventProp<(date: Date) => void>(),
  onYearChange: eventProp<(year: number, month: number) => void>(),
  onMonthChange: eventProp<(year: number, month: number) => void>()
})

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarCProps = ConfigurableProps<CalendarProps>

export const calendarPanelProps = buildProps({
  locale: localeProp('calendar'),
  /**
   * 选中的日期
   */
  value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
  /**
   * 当前日历显示的年份
   */
  year: Number,
  /**
   * 当前日历显示的月份 (1 ~ 12)
   */
  month: Number,
  /**
   * 头部星期显示的内容，数量须为 7 个
   */
  weekDays: Array as PropType<string[]>,
  weekStart: Number,
  today: [Number, String, Date] as PropType<Dateable>,
  disabledDate: Function as PropType<(data: Date) => boolean>,
  valueType: String as PropType<'start' | 'end'>,
  min: [Number, String, Date] as PropType<Dateable>,
  max: [Number, String, Date] as PropType<Dateable>,
  range: booleanProp,
  onSelect: eventProp<(date: Date) => void>(),
  onHover: eventProp<(date: Date | null) => void>()
})

export type CalendarPanelProps = ExtractPropTypes<typeof calendarPanelProps>
export type CalendarPanelCProps = ConfigurableProps<CalendarPanelProps>
