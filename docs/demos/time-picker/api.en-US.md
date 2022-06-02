### TimePicker Props

| Name             | Type              | Description                                                                               | Default         |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------- | -------------- |
| value            | `string \| string[]`   | 时间选择框的值，可以使用 v-model 双向绑定                                          | `'00:00:00'`     |
| visible          | `boolean`           | 设置时间选择窗口的初始打开状态，可以使用 v-model 双向绑定                          | `false`          |
| placement        | `Placement`            | 时间选择窗口出现的位置，可选值同 Popper.js                                         | `'bottom-start'` |
| transfer         | `boolean \| string` | 设置时间选择窗口的渲染位置，设置为 `true` 时默认渲染至 `<body>`                | `false`          |
| format           | `string`            | 根据是否具有 Hms 来控制时间选择列的显示隐藏                                        | `'HH:mm:ss'`     |
| separator        | `string`            | 时间的连接符                                                                       | `':'`            |
| filler           | `string`            | 时间未选择时的填充符，长度固定为 1                                                 | `'-'`            |
| no-filler        | `boolean`           | 是否禁用 filler，如果禁用，初始化后控件内会显示当前 value                          | `false`          |
| clearable        | `boolean`           | 是否允许清空值                                                                     | `false`          |
| no-action        | `boolean`           | 是否禁用时间选择窗口的底部操作栏                                                   | `false`          |
| no-arrow         | `boolean`           | 是否禁用滚轮选择器的箭头指示器                                                     | `false`          |
| candidate        | `number`            | 设置滚轮选择器上下的候选个数，可选范围为 0 ~ 3                                     | `3`              |
| labels           | `Partial<Record<'hour' \| 'minute' \| 'second', string>>`             | 设置在每个时间单元后面的标签                                                       | `{}`             |
| shortcuts        | `{ name: string, value: string \| (() => string) }[]`             | 设置日期快捷选择的候选列表，元素为 `{ name, value }` 的对象，其中 value 可以是函数 | `[]`             |
| steps            | `number[]`             | 分别设置时间选择框每个滚轮的滚动跨度                                               | `[1, 1, 1]`      |
| ctrl-steps       | `number[]`             | 分别设置时间选择框每个滚轮按住 Ctrl 时的滚动跨度                                   | `[5, 5, 5]`      |
| prefix           | `Record<string, any>`            | 前缀图标的名称，使用前缀插槽时无效                                                 | `null`             |
| prefix-color     | `string`            | 前缀内容的颜色，会影响前缀插槽                                                     | `''`             |
| suffix           | `Record<string, any>`            | 后缀图标的名称，使用后缀插槽时无效                                                 | `null`             |
| suffix-color     | `string`            | 后缀内容的颜色，会影响后缀插槽                                                     | `''`             |
| disabled         | `boolean`           | 设置是否禁用日期选择框                                                             | `false`          |
| transition-name  | `string`            | 设置时间选择窗口的显示隐藏过渡效果                                                 | `'vxp-drop'`     |
| ok-text          | `string`            | 时间选择窗口确认按钮的文本内容                                                     | `locale.confirm`         |
| cancel-text      | `string`            | 时间选择窗口取消按钮的文本内容                                                     | `locale.cancel`         |
| is-range         | `boolean`           | 设置是否开启范围选择模式                                                           | `false`          |
| disable-validate | `boolean`           | 当作为 form 控件时，是否禁用触发表单字段验证                                       | `false`          |

### TimePicker Events

| Name          | Description                                                                                               | Parameters                          |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| toggle | 当时间面板显示状态改变时触发，返回当前状态 | `(visible: boolean)` |
| foucs      | 控件聚焦时触发，无返回值                                                                           | -                             |
| blur       | 控件失去焦点时触发，无返回值                                                                       | -                             |
| change     | 当选择的时间发生改变时触发，根据时间选择框类型是否开启了范围模式，会返回一个标准时间或标准时间范围 | `(time: string \| string[])` |
| change-col | 当选择的时间类型发生改变时触发，返回当前类型的名称                                                 | `(type: 'hour' \| 'minute' \| 'second')`                          |
| input      | 当通过按键输入任意类型时间的值发生改变时触发，返回当前类型的名称与输入的值                         | `(type: 'hour' \| 'minute' \| 'second', value: number)`                   |
| enter      | 当使用回车键确定或点击了日期选择窗口的确认按钮时触发，无返回值                                     | -                             |
| cancel     | 当使用 Esc 按键关闭或点击了日期选择窗口的取消按钮时触发，无返回值                                  | -                             |
| shortcut   | 当使用快捷功能选择日期时触发，返回快捷选择的名称和列对应的值                                       | `(name: string, value: string)`                   |
| plus       | 当使用上箭头按键增加时间值时触发，返回类型名称的名称和对应的值                                     | `(type: 'hour' \| 'minute' \| 'second', value: number)`                   |
| minus      | 当使用下箭头按键减少时间值时触发，返回类型名称的名称和列应的值                                     | `(type: 'hour' \| 'minute' \| 'second', value: number)`                   |
| clear      | 当通过清除按钮清空值时触发，无返回值                                                               | -                             |

### TimePicker Slots

| Name   | Description                           | Parameters |
| ------ | ------------------------------ | --- |
| prefix | 前缀内容的插槽，一般为单个图标 | - |
| suffix | 后缀内容的插槽，一般为单个图标 | - |
