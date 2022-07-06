### Calendar Props

| Name          | Type                     | Description                                                               | Default                    | Since |
| ------------- | ------------------------ | ------------------------------------------------------------------ | ------------------------- | --- |
| value | `number \| string \| Date` | The date currently selected by the calendar | `null` | - |
| year | `number` | Current year of the calendar | `new Date().getFullYear()` | - |
| month | `number` | Current month of the calendar, the optional value is 1 ~ 12 | `new Date().getMonth() + 1` | - |
| week-days | `string[]` | The label of the week number displayed in the calendar header, an array of size 7 needs to be passed in | `null` | - |
| week-start | `number` | Set the first day of the week in the calendar, the optional value is 0 ~ 7, where 0 is Sunday | `0` | - |
| today | `number \| string \| Date` | Set today's date in the calendar | `new Date()` | - |
| disabled-date | `(data: Date) => boolean` | whether is the disabled date of the calendar, receives the current date that needs to be judged as a parameter, returns true to disable | `() => false` | - |

### Calendar Events

| Name      | Description                                           | Parameters | Since |
| --------- | ---------------------------------------------- | ---- | --- |
| select | Emitted when the date selected in the calendar changes, returns the currently selected date | `(date: Date)` | - |

### Calendar Slots

| Name    | Description                                                                                                  | Parameters | Since |
| ------- | ----------------------------------------------------------------------------------------------------- | --- | --- |
| header | The header content slot of the calendar, which will replace the entire header of the calendar when used | - | - |
| title | Calendar's title content slot | - | - |
| week | Slot for calendar week number content, `week` parameter is the week number after `week-start` is processed | `{ label: string, index: number, week: number }` | - |
| content | Calendar cell content slot | `{ selected: boolean, date: Date, isPrev: boolean, isNext: boolean, isToday: boolean, disabled: boolean }` | - |
