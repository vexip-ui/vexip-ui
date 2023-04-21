# 时间选择器 TimePicker

当你需要选择时间或时间范围时会用到它。

## 代码示例

:::demo timepicker/basis

### 基础用法

可以使用 `v-model:value` 进行双向绑定。

默认情况下，尽管有初始值，时间选择框仍会呈现未未选择的状态。

:::

:::demo timepicker/bound

### 限制范围

通过 `min` 和 `max` 属性，可以快速的设置时间的可选范围。

常规情况下，这两个属性会限制形成单边或双边限制，如果你想要一个中间限制，你可以使 `min` 的值大于 `max`。

:::

:::demo timepicker/filler

### 自定义填充

设置 `filler` 属性的值可以修改选择输入框中的填充符。

:::

:::demo timepicker/labels

### 时间标签

设置 `labels` 属性的值可以为每个时间单元添加标签，常用于添加单位。

:::

:::demo timepicker/loading

### 加载状态

通过 `loading` 属性可以时间选择器器的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo timepicker/range

### 范围选择

添加 `range` 属性可以开启范围选择模式。

范围选择模式下，时间选择框的返回值将变为一个包含开始和结束时间的数组。

:::

:::demo timepicker/shortcuts

### 快捷时间

通过 `shortcuts` 属性可以添加快捷时间。

:::

:::demo timepicker/step

### 调整跨度

通过 `steps` 属性可以分别调整每个时间列的跨度。

需要注意，小时列的数值需要可被 `24` 整除，分和秒列传入的数值需要可被 `60` 整除。

:::

:::demo timepicker/unit-readonly

### 输入框只读

添加 `unit-readonly` 属性可以使输入框内的控件只读，用户只能通过面板选择时间。

注意，这将无法键入时间，使组件失去部分可访问性。

:::

## API

### TimePicker 属性

| 名称            | 类型                                                      | 说明                                                                               | 默认值           | 始于     |
| --------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------- | -------- |
| value           | `string \| string[]`                                      | 时间选择器的值，可以使用 `v-model` 双向绑定                                        | `'00:00:00'`     | -        |
| visible         | `boolean`                                                 | 设置时间选择窗口的初始打开状态，可以使用 `v-model` 双向绑定                        | `false`          | -        |
| placement       | `Placement`                                               | 时间选择窗口出现的位置，可选值同 Popper.js                                         | `'bottom-start'` | -        |
| transfer        | `boolean \| string`                                       | 设置时间选择窗口的渲染位置，设置为 `true` 时默认渲染至 `<body>`                    | `false`          | -        |
| format          | `string`                                                  | 根据是否具有 Hms 来控制时间选择列的显示隐藏                                        | `'HH:mm:ss'`     | -        |
| separator       | `string`                                                  | 时间的连接符                                                                       | `':'`            | -        |
| filler          | `string`                                                  | 时间未选择时的填充符，长度固定为 1                                                 | `'-'`            | -        |
| ~~no-filler~~   | `boolean`                                                 | 是否禁用 filler，如果禁用，初始化后控件内会显示当前 value                          | `false`          | -        |
| clearable       | `boolean`                                                 | 是否允许清空值                                                                     | `false`          | -        |
| no-action       | `boolean`                                                 | 是否禁用时间选择窗口的底部操作栏                                                   | `false`          | -        |
| no-arrow        | `boolean`                                                 | 是否禁用滚轮选择器的箭头指示器                                                     | `false`          | -        |
| candidate       | `number`                                                  | 设置滚轮选择器上下的候选个数，可选范围为 0 ~ 3                                     | `3`              | -        |
| labels          | `Partial<Record<'hour' \| 'minute' \| 'second', string>>` | 设置在每个时间单元后面的标签                                                       | `{}`             | -        |
| shortcuts       | `{ name: string, value: string \| (() => string) }[]`     | 设置日期快捷选择的候选列表，元素为 `{ name, value }` 的对象，其中 value 可以是函数 | `[]`             | -        |
| steps           | `number[]`                                                | 分别设置时间选择器每个滚轮的滚动跨度                                               | `[1, 1, 1]`      | -        |
| ctrl-steps      | `number[]`                                                | 分别设置时间选择器每个滚轮按住 Ctrl 时的滚动跨度                                   | `[5, 5, 5]`      | -        |
| prefix          | `Record<string, any>`                                     | 前缀图标，使用前缀插槽时无效                                                       | `null`           | -        |
| prefix-color    | `string`                                                  | 前缀内容的颜色，会影响前缀插槽                                                     | `''`             | -        |
| suffix          | `Record<string, any>`                                     | 后缀图标，使用后缀插槽时无效                                                       | `null`           | -        |
| suffix-color    | `string`                                                  | 后缀内容的颜色，会影响后缀插槽                                                     | `''`             | -        |
| no-suffix       | `boolean`                                                 | 设置是否禁用后缀图标                                                               | `false`          | -        |
| disabled        | `boolean`                                                 | 设置是否禁用日期选择框                                                             | `false`          | -        |
| transition-name | `string`                                                  | 设置时间选择窗口的显示隐藏过渡效果                                                 | `'vxp-drop'`     | -        |
| ok-text         | `string`                                                  | 时间选择窗口确认按钮的文本内容                                                     | `locale.confirm` | -        |
| cancel-text     | `string`                                                  | 时间选择窗口取消按钮的文本内容                                                     | `locale.cancel`  | -        |
| ~~is-range~~    | `boolean`                                                 | 设置是否开启范围选择模式                                                           | `false`          | -        |
| loading         | `boolean`                                                 | 设置是否为加载中                                                                   | `false`          | `2.0.0`  |
| loading-icon    | `Record<string, any>`                                     | 设置加载中的图标                                                                   | `Spinner`        | `2.0.0`  |
| loading-lock    | `boolean`                                                 | 设置在加载中时是否为只读                                                           | `false`          | `2.0.0`  |
| loading-effect  | `string`                                                  | 设置加载中图标的效果动画                                                           | `false`          | `2.1.0`  |
| min             | `string`                                                  | 设置可选的最小时间                                                                 | `null`           | `2.0.14` |
| max             | `string`                                                  | 设置可选的最大时间                                                                 | `null`           | `2.0.14` |
| outside-close   | `boolean`                                                 | 设置是否可以通过点击组件外部进行关闭                                               | `true`           | `2.0.20` |
| outside-cancel  | `boolean`                                                 | 设置点击组件外部进行关闭是否为取消操作                                             | `false`          | `2.0.20` |
| locale          | `LocaleConfig['timePicker']`                              | 设置多语言配置                                                                     | `null`           | `2.1.0`  |
| range           | `boolean`                                                 | 设置是否开启范围选择模式                                                           | `false`          | `2.1.1`  |
| placeholder     | `string \| string[]`                                      | 设置时间选择器的占位符                                                             | `null`           | `2.1.1`  |
| unit-readonly   | `boolean`                                                 | 设置输入框控件是否只读                                                             | `false`          | `2.1.2`  |

### TimePicker 事件

| 名称       | 说明                                                                                               | 参数                                                    | 始于 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---- |
| toggle     | 当时间面板显示状态改变时触发，返回当前状态                                                         | `(visible: boolean)`                                    | -    |
| foucs      | 控件聚焦时触发，无返回值                                                                           | -                                                       | -    |
| blur       | 控件失去焦点时触发，无返回值                                                                       | -                                                       | -    |
| change     | 当选择的时间发生改变时触发，根据时间选择器类型是否开启了范围模式，会返回一个标准时间或标准时间范围 | `(time: string \| string[])`                            | -    |
| change-col | 当选择的时间类型发生改变时触发，返回当前类型的名称                                                 | `(type: 'hour' \| 'minute' \| 'second')`                | -    |
| input      | 当通过按键输入任意类型时间的值发生改变时触发，返回当前类型的名称与输入的值                         | `(type: 'hour' \| 'minute' \| 'second', value: number)` | -    |
| enter      | 当使用回车键确定或点击了日期选择窗口的确认按钮时触发，无返回值                                     | -                                                       | -    |
| cancel     | 当使用 Esc 按键关闭或点击了日期选择窗口的取消按钮时触发，无返回值                                  | -                                                       | -    |
| shortcut   | 当使用快捷功能选择日期时触发，返回快捷选择的名称和列对应的值                                       | `(name: string, value: string)`                         | -    |
| plus       | 当使用上箭头按键增加时间值时触发，返回类型名称的名称和对应的值                                     | `(type: 'hour' \| 'minute' \| 'second', value: number)` | -    |
| minus      | 当使用下箭头按键减少时间值时触发，返回类型名称的名称和列应的值                                     | `(type: 'hour' \| 'minute' \| 'second', value: number)` | -    |
| clear      | 当通过清除按钮清空值时触发，无返回值                                                               | -                                                       | -    |

### TimePicker 插槽

| 名称     | 说明                             | 参数 | 始于     |
| -------- | -------------------------------- | ---- | -------- |
| prefix   | 前缀内容的插槽，一般为单个图标   | -    | -        |
| suffix   | 后缀内容的插槽，一般为单个图标   | -    | -        |
| exchange | 开启范围选择时，中间分隔符的插槽 | -    | `2.0.14` |
