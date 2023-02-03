### 预设类型

```ts
type DateType = 'year' | 'month' | 'date'
type TimeType = 'hour' | 'minute' | 'second'
type DateTimeType = DateType | TimeType
type Dateable = number | string | Date
```

### DatePicker 属性

| 名称            | 类型                                                      | 说明                                                                    | 默认值                  | 始于     |
| --------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------- | -------- |
| type            | `'date' \| 'datetime' \| 'year' \| 'month'`               | 日期选择器的类型                                                        | `'date'`                | -        |
| value           | `Dateable \| Dateable[]`                                  | 日期选择器的值，可以使用 `v-model` 双向绑定                             | `new Date()`            | -        |
| size            | `'small' \| 'default' \| 'large'`                         | 输入框的大小                                                            | `'default'`             | -        |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`          | 输入框的状态                                                            | `'default'`             | -        |
| visible         | `boolean`                                                 | 设置日期选择窗口的初始打开状态，可以使用 `v-model` 双向绑定             | `false`                 | -        |
| placement       | `Placement`                                               | 日期选择窗口的出现位置，可选值同 Popper.js                              | `'bottom'`              | -        |
| transfer        | `boolean \| string`                                       | 设置日期选择窗口的渲染位置，开启但未指定有效选择器时默认渲染至 `<body>` | `false`                 | -        |
| format          | `string`                                                  | 在 `datetime` 类型时会根据是否具有 `Hms` 来控制时间选择列的显示隐藏     | `'yyyy-MM-dd HH:mm:ss'` | -        |
| filler          | `string`                                                  | 日期未选择时的填充符，长度固定为 1                                      | `'-'`                   | -        |
| ~~no-filler~~   | `boolean`                                                 | 是否禁用初始填充，如果禁用，初始化后控件内会显示当前 `value`            | `false`                 | -        |
| clearable       | `boolean`                                                 | 是否允许清空值                                                          | `false`                 | -        |
| no-action       | `boolean`                                                 | 是否禁用日历面板的底部操作栏                                            | `false`                 | -        |
| labels          | `Partial<Record<DateTimeType, string>>`                   | 设置在每个日期或时间单元后面的标签                                      | `{}`                    | -        |
| date-separator  | `string`                                                  | 日期部分的连接符                                                        | `'/'`                   | -        |
| time-separator  | `string`                                                  | 时间部分的连接符                                                        | `':'`                   | -        |
| shortcuts       | `{ name: string, value: Dateable \| (() => Dateable) }[]` | 设置日期快捷选择的候选列表                                              | `[]`                    | -        |
| disabled-date   | `(date: Date) => boolean`                                 | 判断日期是否禁用，接受一个日期参数，返回 `true` 则禁用                  | `() => false`           | -        |
| steps           | `number[]`                                                | 分别设置时间选择器每个滚轮的滚动跨度                                    | `[1, 1, 1]`             | -        |
| ctrl-steps      | `number[]`                                                | 分别设置时间选择器每个滚轮按住 Ctrl 时的滚动跨度                        | `[5, 5, 5]`             | -        |
| prefix          | `Record<string, any>`                                     | 前缀图标，使用前缀插槽时无效                                            | `null`                  | -        |
| prefix-color    | `string`                                                  | 前缀内容的颜色，会影响前缀插槽                                          | `''`                    | -        |
| suffix          | `Record<string, any>`                                     | 后缀图标，使用后缀插槽时无效                                            | `null`                  | -        |
| suffix-color    | `string`                                                  | 后缀内容的颜色，会影响后缀插槽                                          | `''`                    | -        |
| no-suffix       | `boolean`                                                 | 设置是否禁用后缀图标                                                    | `false`                 | -        |
| disabled        | `boolean`                                                 | 设置是否禁用日期选择框                                                  | `false`                 | -        |
| transition-name | `string`                                                  | 设置日期选择窗口的显示隐藏过渡效果                                      | `'vxp-drop'`            | -        |
| confirm-text    | `string`                                                  | 日期选择窗口确认按钮的文本内容                                          | `locale.confirm`        | -        |
| cancel-text     | `string`                                                  | 日期选择窗口取消按钮的文本内容                                          | `locale.cancel`         | -        |
| today           | `Dateable`                                                | 设置作为今天的日期，这主要会影响日期选择窗口中日历的一些表现            | `new Date()`            | -        |
| ~~is-range~~    | `boolean`                                                 | 设置是否开启范围选择模式                                                | `false`                 | -        |
| loading         | `boolean`                                                 | 设置是否为加载中                                                        | `false`                 | `2.0.0`  |
| loading-icon    | `Record<string, any>`                                     | 设置加载中的图标                                                        | `Spinner`               | `2.0.0`  |
| loading-lock    | `boolean`                                                 | 设置在加载中时是否为只读                                                | `false`                 | `2.0.0`  |
| loading-lock    | `boolean`                                                 | 设置在加载中时是否为只读                                                | `false`                 | `2.1.0`  |
| min             | `Dateable`                                                | 设置可选的最小日期                                                      | `null`                  | `2.0.14` |
| max             | `Dateable`                                                | 设置可选的最大日期                                                      | `null`                  | `2.0.14` |
| outside-close   | `boolean`                                                 | 设置是否可以通过点击组件外部进行关闭                                    | `true`                  | `2.0.20` |
| outside-cancel  | `boolean`                                                 | 设置点击组件外部进行关闭是否为取消操作                                  | `false`                 | `2.0.20` |
| locale          | `LocaleConfig['calendar'] & LocaleConfig['dataPicker']`   | 设置多语言配置                                                          | `null`                  | `2.1.0`  |
| range           | `boolean`                                                 | 设置是否开启范围选择模式                                                | `false`                 | `2.1.1`  |
| placeholder     | `string \| string[]`                                      | 设置日期选择器的占位符                                                  | `null`                  | `2.1.1`  |

### DatePicker 事件

| 名称       | 说明                                                                                                                                   | 参数                                                        | 始于 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---- |
| toggle     | 当日期面板显示状态改变时触发，返回当前状态                                                                                             | `(visible: boolean)`                                        | -    |
| foucs      | 控件聚焦时触发，无返回值                                                                                                               | -                                                           | -    |
| blur       | 控件失去焦点时触发，无返回值                                                                                                           | -                                                           | -    |
| change     | 当选择的时间发生改变时触发，根据日期选择框类型是否为 `'year'` 以及是否开启了范围模式，会返回一个年份、年份范围、标准日期或标准日期范围 | `(value: string \| number \| number[] \| string[] \| null)` | -    |
| change-col | 当选择的日期类型发生改变时触发，返回当前类型的名称                                                                                     | `(type: DateTimeType \| null)`                              | -    |
| input      | 当通过按键输入任意类型日期的值发生改变时触发，返回当前类型的名称与输入的值                                                             | `(type: DateTimeType, value: number)`                       | -    |
| enter      | 当使用回车键确定或点击了日期选择窗口的确认按钮时触发，无返回值                                                                         | -                                                           | -    |
| cancel     | 当使用 Esc 按键关闭或点击了日期选择窗口的取消按钮时触发，无返回值                                                                      | -                                                           | -    |
| shortcut   | 当使用快捷功能选择日期时触发，返回快捷选择的名称和值                                                                                   | `(name: string, value: number \| string \| Date)`           | -    |
| plus       | 当使用上箭头按键增加日期值时触发，返回类型名称的名称和对应的值                                                                         | `(type: DateTimeType, value: number)`                       | -    |
| minus      | 当使用下箭头按键减少日期值时触发，返回类型名称的名称和列应的值                                                                         | `(type: DateTimeType, value: number)`                       | -    |
| clear      | 当通过清除按钮清空值时触发，无返回值                                                                                                   | -                                                           | -    |

### DatePicker 插槽

| 名称     | 说明                             | 参数 | 始于     |
| -------- | -------------------------------- | ---- | -------- |
| prefix   | 前缀内容的插槽，一般为单个图标   | -    | -        |
| suffix   | 后缀内容的插槽，一般为单个图标   | -    | -        |
| exchange | 开启范围选择时，中间分隔符的插槽 | -    | `2.0.14` |
