### Textarea 属性

| 名称         | 类型                                             | 说明                                                            | 默认值               | 始于    |
| ------------ | ------------------------------------------------ | --------------------------------------------------------------- | -------------------- | ------- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 输入框的状态                                                    | `'default'`          | -       |
| value        | `string`                                         | 设置输入框的值                                                  | `''`                 | -       |
| placeholder  | `string`                                         | 设置输入框的占位                                                | `locale.placeholder` | -       |
| rows         | `number`                                         | 设置输入框的默认行数                                            | `2`                  | -       |
| no-resize    | `boolean`                                        | 是否禁用缩放功能                                                | `false`              | -       |
| autofocus    | `boolean`                                        | 设置输入框的自动聚焦                                            | `false`              | -       |
| spellcheck   | `boolean`                                        | 设置输入框的拼写检查                                            | `false`              | -       |
| autocomplete | `boolean`                                        | 设置输入框的自动完成                                            | `false`              | -       |
| readonly     | `boolean`                                        | 设置输入框的只读属性                                            | `false`              | -       |
| disabled     | `boolean`                                        | 设置是否禁用输入框                                              | `false`              | -       |
| debounce     | `boolean`                                        | 开启防抖，当快速输入时只触发一次 `input` 事，注意该属性非响应式 | `false`              | -       |
| max-length   | `number`                                         | 设置输入内容的最大长度，值为 `0` 时不限                         | `0`                  | -       |
| loading      | `boolean`                                        | 设置是否为加载中                                                | `false`              | `2.0.0` |
| loading-icon | `Record<string, any>`                            | 设置加载中的图标                                                | `Spinner`            | `2.0.0` |
| loading-lock | `boolean`                                        | 设置在加载中时是否为只读                                        | `false`              | `2.0.0` |
| loading-spin | `boolean`                                        | 设置加载中图标是否使用旋转动画                                  | `false`              | `2.0.0` |
| sync         | `boolean`                                        | 设置是否为同步输入模式                                          | `false`              | `2.0.6` |
| locale       | `LocaleConfig['input']`                          | 设置多语言配置                                                  | `null`               | `2.1.0` |

### Textarea 事件

| 名称      | 说明                                         | 参数                     | 始于 |
| --------- | -------------------------------------------- | ------------------------ | ---- |
| focus     | 输入框聚焦时触发，返回事件对象               | `(event: FocusEvent)`    | -    |
| blur      | 输入框失去焦点时触发，返回事件对象           | `(event: FocusEvent)`    | -    |
| change    | 当输入框值改变时触发，返回读取后的值和原始值 | `(value: string)`        | -    |
| input     | 当键入了值时触发，返回读取后的值和原始值     | `(value: string)`        | -    |
| enter     | 当键入回车时触发，返回按键事件               | `(event: KeyboardEvent)` | -    |
| key-down  | 当键按下时触发，返回按键事件                 | `(event: KeyboardEvent)` | -    |
| key-press | 当键按住时触发，返回按键事件                 | `(event: KeyboardEvent)` | -    |
| key-up    | 当键松开时触发，返回按键事件                 | `(event: KeyboardEvent)` | -    |
| clear     | 当通过清除按钮清空值时触发，无返回值         | -                        | -    |

### Textarea 插槽

| 名称  | 说明             | 参数                | 始于     |
| ----- | ---------------- | ------------------- | -------- |
| count | 字数统计内容插槽 | `{ value: string }` | `2.0.12` |
