# Calendar

A container that displays data in the form of a calendar. It is generally used in occasions where data is divided by date, such as schedules, class schedules and so on.

## Demos

:::demo calendar/basis

### Basis Usage

The simplest usage, a pure calendar.

:::

:::demo calendar/week-start

### Week Start

The first day of the week can be changed via the `week-start` prop.

:::

:::demo calendar/schedule

### Schedule

The content of the rendered calendar cell can be customized via the `content` slot.

If you think the native scroll bar is not cool, you can add a scroll component by yourself.

:::

## API

### Calendar Props

| Name          | Type                       | Description                                                                                                                             | Default                     | Since    |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| value         | `number \| string \| Date` | The date currently selected, can use `v-model` two-way binding                                                                          | `null`                      | -        |
| year          | `number`                   | Current year of calendar, can use `v-model` two-way binding                                                                             | `new Date().getFullYear()`  | -        |
| month         | `number`                   | Current month of calendar, the optional value is 1 ~ 12, can use `v-model` two-way binding                                              | `new Date().getMonth() + 1` | -        |
| week-days     | `string[]`                 | The label of the week number displayed in the calendar header, an array of size 7 needs to be passed in                                 | `null`                      | -        |
| week-start    | `number`                   | Set the first day of the week in the calendar, the optional value is 0 ~ 7, where 0 is Sunday                                           | `0`                         | -        |
| today         | `number \| string \| Date` | Set today's date in the calendar                                                                                                        | `new Date()`                | -        |
| disabled-date | `(data: Date) => boolean`  | whether is the disabled date of the calendar, receives the current date that needs to be judged as a parameter, returns true to disable | `() => false`               | -        |
| locale        | `LocaleConfig['calendar']` | Set the locale config                                                                                                                   | `null`                      | `2.1.0`  |
| slots         | `CalendarSlots`            | Set rendering functions for slots                                                                                                       | `{}`                        | `2.3.15` |

### Calendar Events

| Name         | Description                                                                           | Parameters                      | Since   |
| ------------ | ------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| select       | Emitted when the date selected in the calendar changes, returns current selected date | `(date: Date)`                  | -       |
| year-change  | Emitted when the year of the calendar is changed, returns current year and month      | `(year: number, month: number)` | `2.1.4` |
| month-change | Emitted when the month of the calendar is changed, returns current year and month     | `(year: number, month: number)` | `2.1.4` |

### Calendar Slots

| Name    | Description                                                                                                | Parameters                                                                                                 | Since    |
| ------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| header  | The header content slot of the calendar, which will replace the entire header of the calendar when used    | -                                                                                                          | -        |
| title   | Calendar's title content slot                                                                              | -                                                                                                          | -        |
| week    | Slot for calendar week number content, `week` parameter is the week number after `week-start` is processed | `{ label: string, index: number, week: number }`                                                           | -        |
| date    | Calendar cell date value slot                                                                              | `{ selected: boolean, date: Date, isPrev: boolean, isNext: boolean, isToday: boolean, disabled: boolean }` | `2.3.15` |
| content | Calendar cell content slot                                                                                 | `{ selected: boolean, date: Date, isPrev: boolean, isNext: boolean, isToday: boolean, disabled: boolean }` | -        |
