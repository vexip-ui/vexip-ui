# Calendar 日历 ==!s|1.3.0==

将数据按照日历的形式展示的容器，一般用于数据按日期划分的场合，例如日程表、课表等等。

## 代码示例

:::demo calendar/basis

### 基础用法

最简单的用法，纯净版日历。

:::

:::demo calendar/week-start

### 每周开始

设置 `week-start` 属性的值可以修改每周开始的第一天。

:::

:::demo calendar/schedule

### 日程表

通过 `content` 插槽可以自定义渲染日历单元格的内容。

如果你觉得原生的滚动条不够酷，你可以自行添加一个滚动组件进去。

:::

## API

### Calendar 属性

| 名称          | 类型                       | 说明                                                               | 默认值                      | 始于    |
| ------------- | -------------------------- | ------------------------------------------------------------------ | --------------------------- | ------- |
| value         | `number \| string \| Date` | 日历当前选中的日期，可以使用 `v-model` 双向绑定                    | `null`                      | -       |
| year          | `number`                   | 日历当前所在的年份，可以使用 `v-model` 双向绑定                    | `new Date().getFullYear()`  | -       |
| month         | `number`                   | 日历当前所在的月份，可选值为 1 ~ 12，可以使用 `v-model` 双向绑定   | `new Date().getMonth() + 1` | -       |
| week-days     | `string[]`                 | 日历头部的星期数显示的标签，需传入一个大小为 7 的数组              | `null`                      | -       |
| week-start    | `number`                   | 设置日历每星期的第一天，可选值为 0 ~ 7，其中 0 为星期天            | `0`                         | -       |
| today         | `number \| string \| Date` | 设置日历的今天日期                                                 | `new Date()`                | -       |
| disabled-date | `(data: Date) => boolean`  | 是日历的禁用日期，接收当前需要判断的日期作为参数，返回 true 则禁用 | `() => false`               | -       |
| locale        | `LocaleConfig['calendar']` | 设置多语言配置                                                     | `null`                      | `2.1.0` |

### Calendar 事件

| 名称         | 说明                                           | 参数                            | 始于    |
| ------------ | ---------------------------------------------- | ------------------------------- | ------- |
| select       | 在日历选中的日期变化时触发，返回当前选中的日期 | `(date: Date)`                  | -       |
| year-change  | 修改日历的年份时触发，返回当前的年月           | `(year: number, month: number)` | `2.1.4` |
| month-change | 修改日历的月份时触发，返回当前的年月           | `(year: number, month: number)` | `2.1.4` |

### Calendar 插槽

| 名称    | 说明                                                              | 参数                                                                                                       | 始于 |
| ------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---- |
| header  | 日历的头部内容插槽，使用后将替换日历的整个头部                    | -                                                                                                          | -    |
| title   | 日历的标题内容插槽                                                | -                                                                                                          | -    |
| week    | 日历星期数内容的插槽，`week` 参数为处理了 `week-start` 后的星期数 | `{ label: string, index: number, week: number }`                                                           | -    |
| content | 日历单元格内容插槽                                                | `{ selected: boolean, date: Date, isPrev: boolean, isNext: boolean, isToday: boolean, disabled: boolean }` | -    |
