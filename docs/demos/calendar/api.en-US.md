### Calendar Props

| Name          | Type                     | Description                                                               | Default                    |
| ------------- | ------------------------ | ------------------------------------------------------------------ | ------------------------- |
| value         | `number \| string \| Date` | 日历当前选中的日期                                                 | `null`                      |
| year          | `number`                   | 日历当前所在的年份                                                 | `new Date().getFullYear()`  |
| month         | `number`                   | 日历当前所在的月份，可选值为 1 ~ 12                                | `new Date().getMonth() + 1` |
| week-days     | `string[]`                    | 日历头部的星期数显示的标签，需传入一个大小为 7 的数组              | `null`                      |
| week-start    | `number`                   | 设置日历每星期的第一天，可选值为 0 ~ 7，其中 0 为星期天            | `0`                         |
| today         | `number \| string \| Date` | 设置日历的今天日期                                                 | `new Date()`               |
| disabled-date | `(data: Date) => boolean`                 | 是日历的禁用日期，接收当前需要判断的日期作为参数，返回 true 则禁用 | `() => false`               |

### Calendar Events

| Name      | Description                                           | Parameters |
| --------- | ---------------------------------------------- | ---- |
| select | 在日历选中的日期变化时触发，返回当前选中的日期 | `(date: Date)` |

### Calendar Slots

| Name    | Description                                                                                                  | Parameters |
| ------- | ----------------------------------------------------------------------------------------------------- | --- |
| header  | 日历的头部内容插槽，使用后将替换日历的整个头部                                                        | - |
| title   | 日历的标题内容插槽                                                                                    | - |
| week    | 日历星期数内容的插槽，`week` 参数为处理了 `week-start` 后的星期数                              | `(label: string, index: number, week: number)` |
| content | 日历单元格内容插槽 | `(selected: boolean, date: Date, isPrev: boolean, isNext: boolean, isToday: boolean, disabled: boolean)` |
