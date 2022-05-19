## API

### 属性

| 属性             | 类型              | 说明                                                                               | 默认值         |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------- | -------------- |
| value            | String \| Array   | 时间选择框的值，可以使用 v-model 双向绑定                                          | new Date()     |
| visible          | Boolean           | 设置时间选择窗口的初始打开状态，可以使用 v-model 双向绑定                          | false          |
| placement        | String            | 时间选择窗口出现的位置，可选值同 Popper.js                                         | 'bottom-start' |
| transfer         | Boolean \| String | 设置时间选择窗口的渲染位置，开启但未指定有效选择器时默认渲染至 body                | false          |
| format           | String            | 根据是否具有 Hms 来控制时间选择列的显示隐藏                                        | 'HH:mm:ss'     |
| separator        | String            | 时间的连接符                                                                       | ':'            |
| filler           | String            | 时间未选择时的填充符，长度固定为 1                                                 | '-'            |
| no-filler        | Boolean           | 是否禁用 filler，如果禁用，初始化后控件内会显示当前 value                          | false          |
| clearable        | Boolean           | 是否允许清空值                                                                     | false          |
| no-action        | Boolean           | 是否禁用时间选择窗口的底部操作栏                                                   | false          |
| no-arrow         | Boolean           | 是否禁用滚轮选择器的箭头指示器                                                     | false          |
| candidate        | Number            | 设置滚轮选择器上下的候选个数，可选范围为 0 ~ 3                                     | 2              |
| labels           | Array             | 设置在每个时间单元后面的标签                                                       | {}             |
| shortcuts        | Array             | 设置日期快捷选择的候选列表，元素为 `{ name, value }` 的对象，其中 value 可以是函数 | []             |
| steps            | Array             | 分别设置时间选择框每个滚轮的滚动跨度                                               | [1, 1, 1]      |
| ctrl-steps       | Array             | 分别设置时间选择框每个滚轮按住 Ctrl 时的滚动跨度                                   | [5, 5, 5]      |
| prefix           | String            | 前缀图标的名称，使用前缀插槽时无效                                                 | ''             |
| prefix-color     | String            | 前缀内容的颜色，会影响前缀插槽                                                     | ''             |
| suffix           | String            | 后缀图标的名称，使用后缀插槽时无效                                                 | ''             |
| suffix-color     | String            | 后缀内容的颜色，会影响后缀插槽                                                     | ''             |
| disabled         | Boolean           | 设置是否禁用日期选择框                                                             | false          |
| transition-name  | String            | 设置时间选择窗口的显示隐藏过渡效果                                                 | 'vxp-drop'     |
| ok-text          | String            | 时间选择窗口确认按钮的文本内容                                                     | '确认'         |
| cancel-text      | String            | 时间选择窗口取消按钮的文本内容                                                     | '取消'         |
| is-range         | Boolean           | 设置是否开启范围选择模式                                                           | false          |
| disable-validate | Boolean           | 当作为 form 控件时，是否禁用触发表单字段验证                                       | false          |

### 事件

| 事件          | 说明                                                                                               | 参数                          |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| on-foucs      | 控件聚焦时触发，无返回值                                                                           | -                             |
| on-blur       | 控件失去焦点时触发，无返回值                                                                       | -                             |
| on-change     | 当选择的时间发生改变时触发，根据时间选择框类型是否开启了范围模式，会返回一个标准时间或标准时间范围 | timeStr \| [startStr, endStr] |
| on-change-col | 当选择的时间类型发生改变时触发，返回当前类型的名称                                                 | type                          |
| on-input      | 当通过按键输入任意类型时间的值发生改变时触发，返回当前类型的名称与输入的值                         | type, value                   |
| on-enter      | 当使用回车键确定或点击了日期选择窗口的确认按钮时触发，无返回值                                     | -                             |
| on-cancel     | 当使用 Esc 按键关闭或点击了日期选择窗口的取消按钮时触发，无返回值                                  | -                             |
| on-shortcut   | 当使用快捷功能选择日期时触发，返回快捷选择的名称和列对应的值                                       | name, value                   |
| on-plus       | 当使用上箭头按键增加时间值时触发，返回类型名称的名称和对应的值                                     | type, value                   |
| on-minus      | 当使用下箭头按键减少时间值时触发，返回类型名称的名称和列应的值                                     | type, value                   |
| on-clear      | 当通过清除按钮清空值时触发，无返回值                                                               | -                             |

### 插槽

| 名称   | 说明                           |
| ------ | ------------------------------ |
| prefix | 前缀内容的插槽，一般为单个图标 |
| suffix | 后缀内容的插槽，一般为单个图标 |
