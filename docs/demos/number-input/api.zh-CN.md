## API

### 属性

| 名称         | 类型             | 说明                                               | 默认值    |
| ------------ | ---------------- | -------------------------------------------------- | --------- |
| size         | String           | 输入框的大小，可选值为 `small`、`default`、`large` | 'default' |
| prefix       | String           | 前缀图标的名称，使用前缀插槽时无效                 | ''        |
| prefix-color | String           | 前缀内容的颜色，会影响前缀插槽                     | ''        |
| suffix       | String           | 后缀图标的名称，使用后缀插槽时无效                 | ''        |
| suffix-color | String           | 后缀内容的颜色，会影响后缀插槽                     | ''        |
| formatter    | Function         | 设置在每次值变化后，对输入框的值进行格式化的方法   | null      |
| accessor     | Function         | 设置在事件回调时，对输入的值的读取方法             | null      |
| value        | String \| Number | 设置输入框的值                                     | ''        |
| placeholder  | String           | 设置输入框的占位符                                 | ''        |
| autofocus    | Boolean          | 设置输入框的自动聚焦                               | false     |
| spellcheck   | Boolean          | 设置输入框的拼写检查                               | false     |
| autocomplete | String           | 设置输入框的自动完成                               | 'off'     |
| precision    | Number           | 在数字类型时，用于设置值的精度 (小数位数)          | 0         |
| readonly     | Boolean          | 设置输入框的只读属性                               | false     |
| step         | Number           | 在数字类型时，用于设置增减按钮单次变化的幅度       | 1         |
| disabled     | Boolean          | 设置是否禁用输入框                                 | false     |
| input-class  | String \| Object | 设置输入框 input 元素的类名                        | ''        |
| debounce     | Boolean          | 开启防抖，当快速输入时只触发一次 input 事件        | false     |

### 事件

| 名称            | 说明                                                                              | 参数                       |
| --------------- | --------------------------------------------------------------------------------- | -------------------------- |
| on-focus        | 输入框聚焦时触发，返回事件对象                                                    | FocusEvent                 |
| on-blur         | 输入框失去焦点时触发，返回事件对象                                                | BlurEvent                  |
| on-change       | 当输入框值改变时触发，根据 respond 属性会有不同的触发节点，返回读取后的值和原始值 | accessedValue, originValue |
| on-enter        | 当键入回车时触发，返回按键事件                                                    | KeyUpEvent                 |
| on-prefix-click | 当点击前缀部分时触发，返回点击事件                                                | ClickEvent                 |
| on-suffix-click | 当点击后缀部分时触发，返回点击事件                                                | ClickEvent                 |
| on-key-down     | 当键按下时触发，返回按键事件                                                      | KeyDownEvent               |
| on-key-press    | 当键按住时触发，返回按键事件                                                      | KeyPressEvent              |
| on-key-up       | 当键松开时触发，返回按键事件                                                      | KeyUpEvent                 |

### 插槽

| 名称   | 说明                           |
| ------ | ------------------------------ |
| prefix | 前缀内容的插槽，一般为单个图标 |
| suffix | 后缀内容的插槽，一般为单个图标 |
