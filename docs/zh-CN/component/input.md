# 输入框 Input

通过键入内容输入数据，是最基础的表单域的包装。

## 代码示例

:::demo input/basis

### 基础用法

基础用法，可以使用 `v-model:value` 进行双向绑定。

:::

:::demo input/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo input/clearable

### 可清空

添加 `clearable` 属性可以使控件值可清空。

:::

:::demo input/icon

### 内嵌图标

设置 `prefix` 和 `suffix` 的值或使用同名插槽，可以为输入框添加前置和后置图标。

:::

:::demo input/size

### 改变尺寸

设置 `size` 属性的值可以改变输入框的尺寸，目前一共提供了三种尺寸供选择。

:::

:::demo input/sync

### 同步输入

默认情况下双向绑定是基于 `change` 事件，添加了 `sync` 属性后将变为基于 `input` 事件。

:::

:::demo input/before

### 前后置插槽

使用 `before` 和 `after` 插槽可以将一些内容与输入框组合。

如果你想要放一个按钮、选择器或是其他控件，应该使用 `before-action` 和 `after-action` 插槽。

:::

:::demo input/password

### 密码

将 `type` 属性设置为 `'password'` 可以开启密码输入。

在密码输入模式下添加 `plain-password` 属性可以打开切换密文明文的后缀按钮。

:::

:::demo input/loading

### 加载状态

通过 `loading` 属性可以控制输入框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo input/max-length

### 字数限制

通过 `max-length` 属性可以设置内容的最大长度。

:::

:::demo input/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

:::demo input/transparent

### 透明模式

添加 `transparent` 属性可以消除原有的样式，然后你可以包裹上你喜欢的样式。

:::

## API

### Input 属性

| 名称            | 类型                                                     | 说明                                                                                         | 默认值      | 始于     |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- | -------- |
| type            | `'text' \| 'password' \| 'date' \| 'datetime' \| 'time'` | 输入框的类型，其中时间相关类型为原生类型                                                     | `'text'`    | -        |
| size            | `'small' \| 'default' \| 'large'`                        | 输入框的大小                                                                                 | `'default'` | -        |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`         | 输入框的状态                                                                                 | `'default'` | -        |
| prefix          | `Record<string, any>`                                    | 前缀图标，使用前缀插槽时无效                                                                 | `null`      | -        |
| prefix-color    | `string`                                                 | 前缀内容的颜色，会影响前缀插槽                                                               | `''`        | -        |
| suffix          | `Record<string, any>`                                    | 后缀图标，使用后缀插槽时无效                                                                 | `null`      | -        |
| suffix-color    | `string`                                                 | 后缀内容的颜色，会影响后缀插槽                                                               | `''`        | -        |
| formatter       | `(value: string \| number) => string \| number`          | 设置在每次值变化后，对输入框的值进行格式化的方法                                             | `null`      | -        |
| value           | `string \| number`                                       | 设置输入框的值，可以使用 `v-model` 双向绑定                                                  | `''`        | -        |
| placeholder     | `string`                                                 | 设置输入框的占位符                                                                           | `''`        | -        |
| autofocus       | `boolean`                                                | 设置输入框的自动聚焦                                                                         | `false`     | -        |
| spellcheck      | `boolean`                                                | 设置输入框的拼写检查                                                                         | `false`     | -        |
| autocomplete    | `boolean`                                                | 设置输入框的自动完成                                                                         | `false`     | -        |
| readonly        | `boolean`                                                | 设置输入框的只读属性                                                                         | `false`     | -        |
| disabled        | `boolean`                                                | 设置是否禁用输入框                                                                           | `false`     | -        |
| ~~input-class~~ | `ClassType`                                              | 设置输入框 `<input>` 元素的类名                                                              | `null`      | -        |
| control-class   | `ClassType`                                              | 设置输入框控件元素的类名                                                                     | `null`      | `2.1.25` |
| debounce        | `boolean`                                                | 为 `input` 事件开启防抖，默认情况下为节流，非响应式属性                                      | `false`     | -        |
| delay           | `number`                                                 | 设置 `input` 事件节流或防抖得间隔毫秒，默认节流为 `16` 毫秒，防抖为 `100` 毫秒，非响应式属性 | `null`      | `2.1.25` |
| clearable       | `boolean`                                                | 设置是否可以清空值                                                                           | `false`     | -        |
| max-length      | `number`                                                 | 设置输入内容的最大长度，值为 `0` 时不限制                                                    | `0`         | -        |
| before          | `string`                                                 | 设置输入框的前置内容                                                                         | `''`        | -        |
| after           | `string`                                                 | 设置输入框的后置内容                                                                         | `''`        | -        |
| plain-password  | `boolean`                                                | 设置是否显示查看明文密码的按钮                                                               | `false`     | -        |
| clearable       | `boolean`                                                | 设置是否可以清空值                                                                           | `false`     | -        |
| loading         | `boolean`                                                | 设置是否为加载中                                                                             | `false`     | `2.0.0`  |
| loading-icon    | `Record<string, any>`                                    | 设置加载中的图标                                                                             | `Spinner`   | `2.0.0`  |
| loading-lock    | `boolean`                                                | 设置在加载中时是否为只读                                                                     | `false`     | `2.0.0`  |
| loading-effect  | `string`                                                 | 设置加载中图标的效果动画                                                                     | `false`     | `2.1.0`  |
| transparent     | `boolean`                                                | 设置是否为透明模式                                                                           | `false`     | `2.0.2`  |
| sync            | `boolean`                                                | 设置是否为同步输入模式                                                                       | `false`     | `2.0.6`  |
| locale          | `LocaleConfig['input']`                                  | 设置多语言配置                                                                               | `null`      | `2.1.0`  |

### Input 事件

| 名称              | 说明                               | 参数                        | 始于     |
| ----------------- | ---------------------------------- | --------------------------- | -------- |
| focus             | 输入框聚焦时触发，返回事件对象     | `(event: FocusEvent)`       | -        |
| blur              | 输入框失去焦点时触发，返回事件对象 | `(event: FocusEvent)`       | -        |
| change            | 当输入框值改变时触发               | `(value: string \| number)` | -        |
| input             | 当键入了值时触发                   | `(value: string \| number)` | -        |
| enter             | 当键入回车时触发，返回按键事件     | `(event: KeyboardEvent)`    | -        |
| prefix-click      | 当点击前缀部分时触发，返回点击事件 | `(event: MouseEvent)`       | -        |
| suffix-click      | 当点击后缀部分时触发，返回点击事件 | `(event: MouseEvent)`       | -        |
| key-down          | 当键按下时触发，返回按键事件       | `(event: KeyboardEvent)`    | -        |
| key-press         | 当键按住时触发，返回按键事件       | `(event: KeyboardEvent)`    | -        |
| key-up            | 当键松开时触发，返回按键事件       | `(event: KeyboardEvent)`    | -        |
| clear             | 当通过清除按钮清空值时触发         | -                           | -        |
| composition-start | 文本开始合成时触发                 | `(event: CompositionEvent)` | `2.1.28` |
| composition-end   | 文本结束合成时触发                 | `(event: CompositionEvent)` | `2.1.28` |

### Input 插槽

| 名称          | 说明                                                 | 参数                 | 始于     |
| ------------- | ---------------------------------------------------- | -------------------- | -------- |
| prefix        | 前缀内容的插槽，一般为单个图标                       | -                    | -        |
| suffix        | 后缀内容的插槽，一般为单个图标                       | -                    | -        |
| before        | 前置内容的插槽，一般为文字内容                       | -                    | -        |
| after         | 后置内容的插槽，一般为文字内容                       | -                    | -        |
| before-action | 前置按钮插槽，优先于 `before` 插槽，用于放置一个控件 | -                    | `2.0.0`  |
| after-action  | 后置按钮插槽，优先于 `after` 插槽，用于放置一个控件  | -                    | `2.0.0`  |
| count         | 字数统计内容插槽                                     | `{ value: string }`  | `2.0.12` |
| password      | 查看密码明文按钮的插槽，一般为单个图标               | `{ plain: boolean }` | `2.1.0`  |

### Input 方法

| 名称      | 说明                           | 签名            | 始于     |
| --------- | ------------------------------ | --------------- | -------- |
| copyValue | 将输入框当前的内容复制到粘贴板 | `() => boolean` | `2.1.21` |
