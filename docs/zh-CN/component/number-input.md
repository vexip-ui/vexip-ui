# 数字输入框 NumberInput

通常用在需要以更友好的交互进行数字的输入的场合。

## 代码示例

:::demo number-input/basis

### 基础用法

直接输入数字，或使用右侧的控件进行加减操作。

:::

:::demo number-input/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo number-input/size

### 改变尺寸

设置 `size` 属性的值可以改变输入框的尺寸，目前一共提供了三种尺寸供选择。

:::

:::demo number-input/clearable

### 可清空

添加 `clearable` 属性可以使控件值可清空。

:::

:::demo number-input/icon

### 内嵌图标

设置 `prefix` 和 `suffix` 的值或使用同名插槽，可以为输入框添加前置和后置图标。

:::

:::demo number-input/range

### 数值范围

通过 `min` 和 `max` 属性可以分别设置数值的最大和最小值。

:::

:::demo number-input/precision

### 数值精度

通过 `precision` 属性可以设置数值保留的精度。

:::

:::demo number-input/formatter

### 格式化

通过 `formatter` 属性可以提供一个格式化方法，将会在非输入状态是显示格式化后的值。

:::

:::demo number-input/step

### 变化幅度

设置 `step` 属性可以改变每次增减数值的幅度。

:::

:::demo number-input/loading

### 加载状态

通过 `loading` 属性可以控制数字输入框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo number-input/sync

### 同步输入

默认情况下双向绑定是基于 `change` 事件，添加了 `sync` 属性后将变为基于 `input` 事件。

:::

:::demo number-input/control-type

### 操作类型

通过 `action-type` 属性可以改变控件放置位置或显隐方式。

:::

:::demo number-input/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

## API

### 预设类型

```ts
type NumberInputControlType = 'right' | 'left' | 'right-fade' | 'left-fade' | 'none'
type NumberInputEmptyType = 'NaN' | 'undefined' | 'null'
```

### NumberInput 属性

| 名称           | 类型                                             | 说明                                                                                         | 默认值      | 始于     |
| -------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------- | -------- |
| size           | `'small' \| 'default' \| 'large'`                | 输入框的大小，可选值为                                                                       | `'default'` | -        |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | 输入框的状态                                                                                 | `'default'` | -        |
| prefix         | `Record<string, any>`                            | 前缀图标，使用前缀插槽时无效                                                                 | `''`        | -        |
| prefix-color   | `string`                                         | 前缀内容的颜色，会影响前缀插槽                                                               | `''`        | -        |
| suffix         | `Record<string, any>`                            | 后缀图标，使用后缀插槽时无效                                                                 | `''`        | -        |
| suffix-color   | `string`                                         | 后缀内容的颜色，会影响后缀插槽                                                               | `''`        | -        |
| formatter      | `(value: number) => string`                      | 设置在每次值变化后，对输入框的值进行格式化的方法                                             | `null`      | -        |
| accessor       | `(value: number \| null) => any`                 | 设置在事件回调时，对输入的值的读取方法                                                       | `null`      | -        |
| value          | `number \| null`                                 | 设置输入框的值                                                                               | `null`      | -        |
| placeholder    | `string`                                         | 设置输入框的占位符                                                                           | `''`        | -        |
| autofocus      | `boolean`                                        | 设置输入框的自动聚焦                                                                         | `false`     | -        |
| spellcheck     | `boolean`                                        | 设置输入框的拼写检查                                                                         | `false`     | -        |
| autocomplete   | `boolean`                                        | 设置输入框的自动完成                                                                         | `false`     | -        |
| precision      | `number`                                         | 用于设置值的精度 (小数位数) ，-1 时不做处理                                                  | `-1`        | -        |
| readonly       | `boolean`                                        | 设置输入框的只读属性                                                                         | `false`     | -        |
| step           | `number`                                         | 用于设置增减按钮单次变化的幅度                                                               | `1`         | -        |
| min            | `number`                                         | 设置最小值限制                                                                               | `-Infinity` | -        |
| max            | `number`                                         | 设置最大值限制                                                                               | `Infinity`  | -        |
| disabled       | `boolean`                                        | 设置是否禁用输入框                                                                           | `false`     | -        |
| control-class  | `ClassType`                                      | 设置输入框控件元素的类名                                                                     | `null`      | `2.1.25` |
| debounce       | `boolean`                                        | 为 `input` 事件开启防抖，默认情况下为节流，非响应式属性                                      | `false`     | -        |
| delay          | `number`                                         | 设置 `input` 事件节流或防抖得间隔毫秒，默认节流为 `16` 毫秒，防抖为 `100` 毫秒，非响应式属性 | `null`      | `2.1.25` |
| clearable      | `boolean`                                        | 设置是否可以清空值                                                                           | `false`     | -        |
| loading        | `boolean`                                        | 设置是否为加载中                                                                             | `false`     | `2.0.0`  |
| loading-icon   | `Record<string, any>`                            | 设置加载中的图标                                                                             | `Spinner`   | `2.0.0`  |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                                                                     | `false`     | `2.0.0`  |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                                                                     | `false`     | `2.1.0`  |
| sync           | `boolean`                                        | 设置是否为同步输入模式                                                                       | `false`     | `2.0.6`  |
| control-type   | `NumberInputControlType`                         | 设置控件类型                                                                                 | `'right'`   | `2.0.17` |
| locale         | `LocaleConfig['input']`                          | 设置多语言配置                                                                               | `null`      | `2.1.0`  |
| empty-type     | `NumberInputEmptyType`                           | 设置空值的类型                                                                               | `'NaN'`     | `2.1.8`  |

### NumberInput 事件

| 名称         | 说明                                                                              | 参数                                                | 始于 |
| ------------ | --------------------------------------------------------------------------------- | --------------------------------------------------- | ---- |
| focus        | 输入框聚焦时触发，返回事件对象                                                    | `(event: FocusEvent)`                               | -    |
| blur         | 输入框失去焦点时触发，返回事件对象                                                | `(event: FocusEvent)`                               | -    |
| change       | 当输入框值改变时触发，根据 respond 属性会有不同的触发节点，返回读取后的值和原始值 | `(accessedValue: any, originValue: number \| null)` | -    |
| enter        | 当键入回车时触发，返回按键事件                                                    | `(event: KeyboardEvent)`                            | -    |
| prefix-click | 当点击前缀部分时触发，返回点击事件                                                | `(event: MouseEvent)`                               | -    |
| suffix-click | 当点击后缀部分时触发，返回点击事件                                                | `(event: MouseEvent)`                               | -    |
| key-down     | 当键按下时触发，返回按键事件                                                      | `(event: KeyboardEvent)`                            | -    |
| key-press    | 当键按住时触发，返回按键事件                                                      | `(event: KeyboardEvent)`                            | -    |
| key-up       | 当键松开时触发，返回按键事件                                                      | `(event: KeyboardEvent)`                            | -    |

### NumberInput 插槽

| 名称   | 说明                           | 参数 | 始于 |
| ------ | ------------------------------ | ---- | ---- |
| prefix | 前缀内容的插槽，一般为单个图标 | -    | -    |
| suffix | 后缀内容的插槽，一般为单个图标 | -    | -    |
