export type WeekIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface CalendarPanelSlots {
  header?: () => any,
  week?: (params: { label: string, index: number, week: number }) => any,
  item?: (params: {
    date: Date,
    label: string,
    selected: boolean,
    hovered: boolean,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean,
    inRange: boolean
  }) => any,
  footer?: () => any
}

export interface CalendarSlots {
  header?: () => any,
  title?: () => any,
  week?: (params: { label: string, index: number, week: number }) => any,
  date?: (params: {
    date: Date,
    selected: boolean,
    hovered: boolean,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean
  }) => any,
  content?: (params: {
    selected: boolean,
    hovered: boolean,
    date: Date,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean
  }) => any
}
