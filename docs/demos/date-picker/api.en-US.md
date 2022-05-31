### DatePicker 属性

| 名称             | 类型                              | 说明                                                                                                 | 默认值                |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------- |
| type             | String                            | 时间选择器的类型，可选值为 `date`、`datetime`、`year`、`month`                                       | 'date'                |
| value            | Number \| String \| Date \| Array | 时间选择器的值，可以使用 v-model 双向绑定                                                            | new Date()            |
| size             | String                            | 输入框的大小，可选值为 `small`、`default`、`large`                                                   | 'default'             |
| state            | String                            | 输入框的状态，可选值为 `default`、`success`、`error`、`warning`                                      | 'default'             |
| visible          | Boolean                           | 设置日期选择窗口的初始打开状态，可以使用 v-model 双向绑定                                            | false                 |
| placement        | String                            | 日期选择窗口的出现位置，可选值同 Popper.js                                                           | 'bottom'              |
| transfer         | Boolean \| String                 | 设置日期选择窗口的渲染位置，开启但未指定有效选择器时默认渲染至 body                                  | false                 |
| format           | String                            | 在 `datetime` 类型时会根据是否具有 Hms 来控制时间选择列的显示隐藏                                    | 'yyyy-MM-dd HH:mm:ss' |
| filler           | String                            | 日期未选择时的填充符，长度固定为 1                                                                   | '-'                   |
| no-filler        | Boolean                           | 是否禁用 filler，如果禁用，初始化后控件内会显示当前 value                                            | false                 |
| clearable        | Boolean                           | 是否允许清空值                                                                                       | false                 |
| no-action        | Boolean                           | 是否禁用日历面板的底部操作栏                                                                         | false                 |
| labels           | Array                             | 设置在每个日期或时间单元后面的标签                                                                   | {}                    |
| date-separator   | String                            | 日期部分的连接符                                                                                     | '/'                   |
| time-separator   | String                            | 时间部分的连接符                                                                                     | ':'                   |
| shortcuts        | Array                             | 设置日期快捷选择的候选列表，元素为 `{ name, value }` 的对象，其中 value 可以是函数                   | []                    |
| disable-date     | Function                          | 判断日期是否禁用，接受一个日期参数，返回 true 则禁用，加载日历面板时会对当前面板的所有日期都调用一次 | () => false           |
| steps            | Array                             | 分别设置时间选择器每个滚轮的滚动跨度                                                                 | [1, 1, 1]             |
| ctrl-steps       | Array                             | 分别设置时间选择器每个滚轮按住 Ctrl 时的滚动跨度                                                     | [5, 5, 5]             |
| prefix           | String                            | 前缀图标的名称，使用前缀插槽时无效                                                                   | ''                    |
| prefix-color     | String                            | 前缀内容的颜色，会影响前缀插槽                                                                       | ''                    |
| suffix           | String                            | 后缀图标的名称，使用后缀插槽时无效                                                                   | ''                    |
| suffix-color     | String                            | 后缀内容的颜色，会影响后缀插槽                                                                       | ''                    |
| disabled         | Boolean                           | 设置是否禁用日期选择框                                                                               | false                 |
| transition-name  | String                            | 设置日期选择窗口的显示隐藏过渡效果                                                                   | 'vxp-drop'            |
| ok-text          | String                            | 日期选择窗口确认按钮的文本内容                                                                       | '确认'                |
| cancel-text      | String                            | 日期选择窗口取消按钮的文本内容                                                                       | '取消'                |
| today            | Number \| String \| Date          | 设置作为今天的日期，这主要会影响日期选择窗口中日历的一些表现                                         | new Date()            |
| is-range         | Boolean                           | 设置是否开启范围选择模式                                                                             | false                 |
| disable-validate | Boolean                           | 当作为 form 控件时，是否禁用触发表单字段验证                                                         | false                 |

### DatePicker 事件

| 名称          | 说明                                                                                                                                 | 参数                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| foucs      | 控件聚焦时触发，无返回值                                                                                                             | -                                                             |
| blur       | 控件失去焦点时触发，无返回值                                                                                                         | -                                                             |
| change     | 当选择的时间发生改变时触发，根据日期选择框类型是否为 'year' 以及是否开启了范围模式，会返回一个年份、年份范围、标准日期或标准日期范围 | year \| [startYear, endYear] \| dateStr \| [startStr, endStr] |
| change-col | 当选择的日期类型发生改变时触发，返回当前类型的名称                                                                                   | type                                                          |
| input      | 当通过按键输入任意类型日期的值发生改变时触发，返回当前类型的名称与输入的值                                                           | type, value                                                   |
| enter      | 当使用回车键确定或点击了日期选择窗口的确认按钮时触发，无返回值                                                                       | -                                                             |
| cancel     | 当使用 Esc 按键关闭或点击了日期选择窗口的取消按钮时触发，无返回值                                                                    | -                                                             |
| shortcut   | 当使用快捷功能选择日期时触发，返回快捷选择的名称和值                                                                                 | name, value                                                   |
| plus       | 当使用上箭头按键增加日期值时触发，返回类型名称的名称和对应的值                                                                       | type, value                                                   |
| minus      | 当使用下箭头按键减少日期值时触发，返回类型名称的名称和列应的值                                                                       | type, value                                                   |
| clear      | 当通过清除按钮清空值时触发，无返回值                                                                                                 | -                                                             |

> 日期事件回调的类型  `type` 可选值为 `'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'` 共六个。

### DatePicker 插槽

| 名称   | 说明                           |
| ------ | ------------------------------ |
| prefix | 前缀内容的插槽，一般为单个图标 |
| suffix | 后缀内容的插槽，一般为单个图标 |
