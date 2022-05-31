### Input 属性

| 名称         | 类型             | 说明                                                                                              | 默认值    |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------- | --------- |
| type         | String           | 输入框的类型，可选值为 `text`、`password`、`date`、`datetime`、`time`，其中时间相关类型为原生类型 | 'text'    |
| size         | `'small' \| 'default' \| 'large'`           | 输入框的大小                                                | `'default'` |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`           | 输入框的状态                                   | `'default'` |
| prefix       | String           | 前缀图标的名称，使用前缀插槽时无效                                                                | ''        |
| prefix-color | String           | 前缀内容的颜色，会影响前缀插槽                                                                    | ''        |
| suffix       | String           | 后缀图标的名称，使用后缀插槽时无效                                                                | ''        |
| suffix-color | String           | 后缀内容的颜色，会影响后缀插槽                                                                    | ''        |
| formatter    | Function         | 设置在每次值变化后，对输入框的值进行格式化的方法                                                  | null      |
| accessor     | Function         | 设置在事件回调时，对输入的值的读取方法                                                            | null      |
| value        | String \| Number | 设置输入框的值                                                                                    | ''        |
| placeholder  | String           | 设置输入框的占位符                                                                                | ''        |
| autofocus    | Boolean          | 设置输入框的自动聚焦                                                                              | false     |
| spellcheck   | Boolean          | 设置输入框的拼写检查                                                                              | false     |
| autocomplete | String           | 设置输入框的自动完成                                                                              | 'off'     |
| readonly     | Boolean          | 设置输入框的只读属性                                                                              | false     |
| disabled     | Boolean          | 设置是否禁用输入框                                                                                | false     |
| input-class  | String \| Object | 设置输入框 input 元素的类名                                                                       | ''        |
| debounce     | Boolean          | 开启防抖，当快速输入时只触发一次 input 事件                                                       | false     |
| clearable    | Boolean          | 设置是否可以清空值                                                                                | false     |
| max-length   | Number           | 设置输入内容的最大长度，值为 0 时不限制                                                           | 0         |
| before       | String           | 设置输入框的前置内容                                                                              | ''        |
| after        | String           | 设置输入框的后置内容                                                                              | ''        |
| password     | Boolean          | 设置是否显示切换密码可见的按钮                                                                    | false     |
| clearable    | Boolean          | 设置是否可以清空值                                                                                | false     |

### Input 事件

| 名称            | 说明                                                                              | 参数                       |
| --------------- | --------------------------------------------------------------------------------- | -------------------------- |
| focus        | 输入框聚焦时触发，返回事件对象                                                    | FocusEvent                 |
| blur         | 输入框失去焦点时触发，返回事件对象                                                | BlurEvent                  |
| change       | 当输入框值改变时触发，根据 respond 属性会有不同的触发节点，返回读取后的值和原始值 | accessedValue, originValue |
| enter        | 当键入回车时触发，返回按键事件                                                    | KeyUpEvent                 |
| prefix-click | 当点击前缀部分时触发，返回点击事件                                                | ClickEvent                 |
| suffix-click | 当点击后缀部分时触发，返回点击事件                                                | ClickEvent                 |
| key-down     | 当键按下时触发，返回按键事件                                                      | KeyDownEvent               |
| key-press    | 当键按住时触发，返回按键事件                                                      | KeyPressEvent              |
| key-up       | 当键松开时触发，返回按键事件                                                      | KeyUpEvent                 |
| clear        | 当通过清除按钮清空值时触发，无返回值                                              | -                          |

### Input 插槽

| 名称   | 说明                           |
| ------ | ------------------------------ |
| prefix | 前缀内容的插槽，一般为单个图标 |
| suffix | 后缀内容的插槽，一般为单个图标 |
