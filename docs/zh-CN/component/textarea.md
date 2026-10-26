# Textarea 多行输入框

通过键入内容输入数据，常用于内容较多、需要多行显示的场合。

## 代码示例

:::demo textarea/basis

### 基础用法

最简单的用法。

:::

:::demo textarea/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo textarea/sync

### 同步输入

默认情况下双向绑定是基于 `change` 事件，添加了 `sync` 属性后将变为基于 `input` 事件。

:::

:::demo textarea/max-length

### 最大长度

通过 `max-length` 属性可以设置文本的最大长度。

当传入 `Infinity` 时，将会仅进行字数统计。

:::

:::demo textarea/no-resize

### 禁用缩放

添加 `no-resize` 属性可以禁用缩放功能。

:::

:::demo textarea/loading

### 加载状态

通过 `loading` 属性可以控制多行输入框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo textarea/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

## API

### Textarea 属性

| 名称           | 类型                                             | 说明                                                                                         | 默认值               | 始于     |
| -------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- | -------------------- | -------- |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | 输入框的状态                                                                                 | `'default'`          | -        |
| value          | `string`                                         | 设置输入框的值                                                                               | `''`                 | -        |
| placeholder    | `string`                                         | 设置输入框的占位                                                                             | `locale.placeholder` | -        |
| rows           | `number`                                         | 设置输入框的默认行数                                                                         | `2`                  | -        |
| no-resize      | `boolean`                                        | 是否禁用缩放功能                                                                             | `false`              | -        |
| autofocus      | `boolean`                                        | 设置输入框的自动聚焦                                                                         | `false`              | -        |
| spellcheck     | `boolean`                                        | 设置输入框的拼写检查                                                                         | `false`              | -        |
| autocomplete   | `boolean \| string`                              | 设置输入框的自动完成，布尔值将会被解析为 `'on'` 或 `'off'`                                   | `false`              | -        |
| readonly       | `boolean`                                        | 设置输入框的只读属性                                                                         | `false`              | -        |
| disabled       | `boolean`                                        | 设置是否禁用输入框                                                                           | `false`              | -        |
| debounce       | `boolean`                                        | 为 `input` 事件开启防抖，默认情况下为节流，非响应式属性                                      | `false`              | -        |
| delay          | `number`                                         | 设置 `input` 事件节流或防抖得间隔毫秒，默认节流为 `16` 毫秒，防抖为 `100` 毫秒，非响应式属性 | `null`               | `2.1.25` |
| max-length     | `number`                                         | 设置输入内容的最大长度，值为 `0` 时不限                                                      | `0`                  | -        |
| hide-count     | `boolean`                                        | 设置是否隐藏字数统计                                                                         | `false`              | `2.3.33` |
| loading        | `boolean`                                        | 设置是否为加载中                                                                             | `false`              | `2.0.0`  |
| loading-icon   | `VueComponent`                                   | 设置加载中的图标                                                                             | `Spinner`            | `2.0.0`  |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                                                                     | `false`              | `2.0.0`  |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                                                                     | `false`              | `2.0.0`  |
| sync           | `boolean`                                        | 设置是否为同步输入模式                                                                       | `false`              | `2.0.6`  |
| locale         | `LocaleConfig['input']`                          | 设置多语言配置                                                                               | `null`               | `2.1.0`  |
| control-class  | `ClassType`                                      | 设置输入框控件元素的类名                                                                     | `null`               | `2.1.25` |
| control-attrs  | `Record<string, any>`                            | 设置输入框控件元素的属性                                                                     | `null`               | `2.2.2`  |
| name           | `string`                                         | 设置内部 `<input>` 的 `name` 属性                                                            | `''`                 | `2.2.2`  |

### Textarea 事件

| 名称              | 说明                                         | 参数                        | 始于     |
| ----------------- | -------------------------------------------- | --------------------------- | -------- |
| focus             | 输入框聚焦时触发，返回事件对象               | `(event: FocusEvent)`       | -        |
| blur              | 输入框失去焦点时触发，返回事件对象           | `(event: FocusEvent)`       | -        |
| change            | 当输入框值改变时触发，返回读取后的值和原始值 | `(value: string)`           | -        |
| input             | 当键入了值时触发，返回读取后的值和原始值     | `(value: string)`           | -        |
| enter             | 当键入回车时触发，返回按键事件               | `(event: KeyboardEvent)`    | -        |
| key-down          | 当键按下时触发，返回按键事件                 | `(event: KeyboardEvent)`    | -        |
| key-press         | 当键按住时触发，返回按键事件                 | `(event: KeyboardEvent)`    | -        |
| key-up            | 当键松开时触发，返回按键事件                 | `(event: KeyboardEvent)`    | -        |
| clear             | 当通过清除按钮清空值时触发                   | -                           | -        |
| composition-start | 文本开始合成时触发                           | `(event: CompositionEvent)` | `2.2.14` |
| composition-end   | 文本结束合成时触发                           | `(event: CompositionEvent)` | `2.2.14` |

### Textarea 插槽

| 名称  | 说明             | 参数                | 始于     |
| ----- | ---------------- | ------------------- | -------- |
| count | 字数统计内容插槽 | `{ value: string }` | `2.0.12` |

### Textarea 方法

| 名称      | 说明                           | 签名            | 始于 |
| --------- | ------------------------------ | --------------- | ---- |
| copyValue | 将输入框当前的内容复制到粘贴板 | `() => boolean` | -    |
