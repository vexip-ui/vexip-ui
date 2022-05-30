### Select 属性

| 名称            | 类型                      | 说明                                                                | 默认值     |
| --------------- | ------------------------- | ------------------------------------------------------------------- | ---------- |
| visible         | Boolean                   | 设置选项列表是否显示                                                | false      |
| options         | Array                     | 设置选择器的选项，一般用于简单快速生成选项，使用 default 插槽后失效 | []         |
| size            | String                    | 输入框的大小，可选值为 `small`、`default`、`large`                  | 'default'  |
| state           | String                    | 输入框的状态，可选值为 `default`、`success`、`error`、`warning`     | 'default'  |
| disabled        | Boolean                   | 设置是否禁用选择器                                                  | false      |
| outside-close   | Boolean                   | 设置是否可以通过点击组件外部进行关闭                                | false      |
| placeholder     | String                    | 同原生的 palceholder                                                |
| prefix          | String                    | 前缀图标的名称，使用前缀插槽时无效                                  | ''         |
| prefix-color    | String                    | 前缀内容的颜色，会影响前缀插槽                                      | ''         |
| suffix          | String                    | 后缀图标的名称，使用后缀插槽时无效                                  | ''         |
| suffix-color    | String                    | 后缀内容的颜色，会影响后缀插槽                                      | ''         |
| value           | String \| Number \| Array | 选择器的值，可以使用 v-model 双向绑定，多选模式时为数组             | null       |
| clearable       | Boolean                   | 设置是否可以清空值                                                  | false      |
| max-list-height | Number                    | 设置选项列表的最大高度，超过高度后会出现滚动条                      | 300        |
| transition-name | String                    | 选项列表的过渡动画                                                  | 'vxp-drop' |
| placement       | String                    | 选项列表的出现位置，可选值同 Popper.js                              | 'bottom'   |
| transfer        | Boolean \| String         | 设置选项列表的渲染位置，开启但未指定有效选择器时默认渲染至 body     | false      |
| list-class      | String \| Object          | 选项列表的自定义类名                                                | null       |
| multiple        | Boolean                   | 设置是否开启多选模式                                                | false      |
| option-check    | Boolean                   | 设置开启被选选项打勾功能                                            | false      |
| empty-text      | String                    | 设置空选项时的提示语                                                | '暂无数据' |

### Select 事件

| 名称             | 说明                                                                 | 参数         |
| ---------------- | -------------------------------------------------------------------- | ------------ |
| toggle        | 当选项列表显示状态改变时触发，返回当前的状态                         | visible      |
| select        | 当选项被选时触发（无论是否改变），返回被选选项的值和标签             | value, label |
| cancel        | 当选项被取消时触发，仅在多选模式下触发，返回被取消选项的值和标签     | value, label |
| change        | 当被选值改变时触发，返回选项的值和标签，多选模式下为值数组和标签数组 | value, label |
| outside-click | 当点击选择器外部是触发，无返回值                                     | -            |
| outside-close | 当通过点击外部关闭选项列表时触发，无返回值                           | -            |
| clear         | 当通过清除按钮清空值时触发，无返回值                                 | -            |

### Select 插槽

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 选项内容的插槽         |
| prefix  | 前置图标内容的插槽     |
| control | 选择器主控件内容的插槽 |
| suffix  | 后缀图标内容的插槽     |
| empty   | 空选项提示内容的插槽   |
