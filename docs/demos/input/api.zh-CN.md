### Input 属性

| 名称         | 类型                                                     | 说明                                                              | 默认值      | 始于    |
| ------------ | -------------------------------------------------------- | ----------------------------------------------------------------- | ----------- | ------- |
| type         | `'text' \| 'password' \| 'date' \| 'datetime' \| 'time'` | 输入框的类型，其中时间相关类型为原生类型                          | `'text'`    | -       |
| size         | `'small' \| 'default' \| 'large'`                        | 输入框的大小                                                      | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`         | 输入框的状态                                                      | `'default'` | -       |
| prefix       | `Record<string, any>`                                    | 前缀图标，使用前缀插槽时无效                                      | `null`      | -       |
| prefix-color | `string`                                                 | 前缀内容的颜色，会影响前缀插槽                                    | `''`        | -       |
| suffix       | `Record<string, any>`                                    | 后缀图标，使用后缀插槽时无效                                      | `null`      | -       |
| suffix-color | `string`                                                 | 后缀内容的颜色，会影响后缀插槽                                    | `''`        | -       |
| formatter    | `(value: string) => string`                              | 设置在每次值变化后，对输入框的值进行格式化的方法                  | `null`      | -       |
| accessor     | `(value: string) => any`                                 | 设置在事件回调时，对输入的值的读取方法                            | `null`      | -       |
| value        | `string`                                                 | 设置输入框的值                                                    | `''`        | -       |
| placeholder  | `string`                                                 | 设置输入框的占位符                                                | `''`        | -       |
| autofocus    | `boolean`                                                | 设置输入框的自动聚焦                                              | `false`     | -       |
| spellcheck   | `boolean`                                                | 设置输入框的拼写检查                                              | `false`     | -       |
| autocomplete | `boolean`                                                | 设置输入框的自动完成                                              | `false`     | -       |
| readonly     | `boolean`                                                | 设置输入框的只读属性                                              | `false`     | -       |
| disabled     | `boolean`                                                | 设置是否禁用输入框                                                | `false`     | -       |
| input-class  | `ClassType`                                              | 设置输入框 `<input>` 元素的类名                                   | `''`        | -       |
| debounce     | `boolean`                                                | 开启防抖，当快速输入时只触发一次 `input` 事件，注意该属性非响应式 | `false`     | -       |
| clearable    | `boolean`                                                | 设置是否可以清空值                                                | `false`     | -       |
| max-length   | `number`                                                 | 设置输入内容的最大长度，值为 `0` 时不限制                         | `0`         | -       |
| before       | `string`                                                 | 设置输入框的前置内容                                              | `''`        | -       |
| after        | `string`                                                 | 设置输入框的后置内容                                              | `''`        | -       |
| password     | `boolean`                                                | 设置是否显示切换密码可见的按钮                                    | `false`     | -       |
| clearable    | `boolean`                                                | 设置是否可以清空值                                                | `false`     | -       |
| loading      | `boolean`                                                | 设置是否为加载中                                                  | `false`     | `2.0.0` |
| loading-icon | `Record<string, any>`                                    | 设置加载中的图标                                                  | `Spinner`   | `2.0.0` |
| loading-lock | `boolean`                                                | 设置在加载中时是否为只读                                          | `false`     | `2.0.0` |
| loading-spin | `boolean`                                                | 设置加载中图标是否使用旋转动画                                    | `false`     | `2.0.0` |
| transparent  | `boolean`                                                | 设置是否为透明模式                                                | `false`     | `2.0.2` |
| sync         | `boolean`                                                | 设置是否为同步输入模式                                            | `false`     | `2.0.6` |

### Input 事件

| 名称         | 说明                                         | 参数                                        | 始于 |
| ------------ | -------------------------------------------- | ------------------------------------------- | ---- |
| focus        | 输入框聚焦时触发，返回事件对象               | `(event: FocusEvent)`                       | -    |
| blur         | 输入框失去焦点时触发，返回事件对象           | `(event: FocusEvent)`                       | -    |
| change       | 当输入框值改变时触发，返回读取后的值和原始值 | `(accessedValue: any, originValue: string)` | -    |
| input        | 当键入了值时触发，返回读取后的值和原始值     | `(accessedValue: any, originValue: string)` | -    |
| enter        | 当键入回车时触发，返回按键事件               | `(event: KeyboardEvent)`                    | -    |
| prefix-click | 当点击前缀部分时触发，返回点击事件           | `(event: MouseEvent)`                       | -    |
| suffix-click | 当点击后缀部分时触发，返回点击事件           | `(event: MouseEvent)`                       | -    |
| key-down     | 当键按下时触发，返回按键事件                 | `(event: KeyboardEvent)`                    | -    |
| key-press    | 当键按住时触发，返回按键事件                 | `(event: KeyboardEvent)`                    | -    |
| key-up       | 当键松开时触发，返回按键事件                 | `(event: KeyboardEvent)`                    | -    |
| clear        | 当通过清除按钮清空值时触发，无返回值         | -                                           | -    |

### Input 插槽

| 名称          | 说明                                                 | 参数                | 始于     |
| ------------- | ---------------------------------------------------- | ------------------- | -------- |
| prefix        | 前缀内容的插槽，一般为单个图标                       | -                   | -        |
| suffix        | 后缀内容的插槽，一般为单个图标                       | -                   | -        |
| before        | 前置内容的插槽，一般为文字内容                       | -                   | -        |
| after         | 后置内容的插槽，一般为文字内容                       | -                   | -        |
| before-action | 前置按钮插槽，优先于 `before` 插槽，用于放置一个控件 | -                   | `2.0.0`  |
| after-action  | 后置按钮插槽，优先于 `after` 插槽，用于放置一个控件  | -                   | `2.0.0`  |
| count         | 字数统计内容插槽                                     | `{ value: string }` | `2.0.12` |
