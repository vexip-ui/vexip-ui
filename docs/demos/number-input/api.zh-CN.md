### 预设类型

```ts
type NumberInputControlType = 'right' | 'left' | 'right-fade' | 'left-fade' | 'none'
```

### NumberInput 属性

| 名称           | 类型                                             | 说明                                             | 默认值      | 始于     |
| -------------- | ------------------------------------------------ | ------------------------------------------------ | ----------- | -------- |
| size           | `'small' \| 'default' \| 'large'`                | 输入框的大小，可选值为                           | `'default'` | -        |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | 输入框的状态                                     | `'default'` | -        |
| prefix         | `Record<string, any>`                            | 前缀图标，使用前缀插槽时无效                     | `''`        | -        |
| prefix-color   | `string`                                         | 前缀内容的颜色，会影响前缀插槽                   | `''`        | -        |
| suffix         | `Record<string, any>`                            | 后缀图标，使用后缀插槽时无效                     | `''`        | -        |
| suffix-color   | `string`                                         | 后缀内容的颜色，会影响后缀插槽                   | `''`        | -        |
| formatter      | `(value: number) => string`                      | 设置在每次值变化后，对输入框的值进行格式化的方法 | `null`      | -        |
| accessor       | `(value: number \| null) => any`                 | 设置在事件回调时，对输入的值的读取方法           | `null`      | -        |
| value          | `number \| null`                                 | 设置输入框的值                                   | `null`      | -        |
| placeholder    | `string`                                         | 设置输入框的占位符                               | `''`        | -        |
| autofocus      | `boolean`                                        | 设置输入框的自动聚焦                             | `false`     | -        |
| spellcheck     | `boolean`                                        | 设置输入框的拼写检查                             | `false`     | -        |
| autocomplete   | `boolean`                                        | 设置输入框的自动完成                             | `false`     | -        |
| precision      | `number`                                         | 用于设置值的精度 (小数位数)                      | `0`         | -        |
| readonly       | `boolean`                                        | 设置输入框的只读属性                             | `false`     | -        |
| step           | `number`                                         | 用于设置增减按钮单次变化的幅度                   | `1`         | -        |
| min            | `number`                                         | 设置最小值限制                                   | `-Infinity` | -        |
| max            | `number`                                         | 设置最大值限制                                   | `Infinity`  | -        |
| disabled       | `boolean`                                        | 设置是否禁用输入框                               | `false`     | -        |
| input-class    | `ClassType`                                      | 设置输入框 `<input>` 元素的类名                  | `''`        | -        |
| debounce       | `boolean`                                        | 开启防抖，当快速输入时只触发一次 `input` 事件    | `false`     | -        |
| clearable      | `boolean`                                        | 设置是否可以清空值                               | `false`     | -        |
| loading        | `boolean`                                        | 设置是否为加载中                                 | `false`     | `2.0.0`  |
| loading-icon   | `Record<string, any>`                            | 设置加载中的图标                                 | `Spinner`   | `2.0.0`  |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                         | `false`     | `2.0.0`  |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                         | `false`     | `2.1.0`  |
| sync           | `boolean`                                        | 设置是否为同步输入模式                           | `false`     | `2.0.6`  |
| control-type   | `NumberInputControlType`                         | 设置控件类型                                     | `'right'`   | `2.0.17` |

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
